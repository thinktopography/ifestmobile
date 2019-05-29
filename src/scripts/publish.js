import mime from 'mime-types'
import moment from 'moment'
import dotenv from 'dotenv'
import aws from 'aws-sdk'
import path from 'path'
import _ from 'lodash'
import fs from 'fs'

dotenv.config({
  path: path.join('.env')
})

aws.config.constructor({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  region: process.env.AWS_REGION || ''
})

const s3 = new aws.S3()

const cloudfront = new aws.CloudFront()

const listFiles = (root) => {

  return fs.readdirSync(path.join(root)).reduce((files, item) => {

    if(_.includes(['.DS_Store','.gitkeep'], item)) return files

    const isDirectory = fs.lstatSync(path.join(root, item)).isDirectory()

    return [
      ...files,
      ...(isDirectory ? listFiles(path.join(root, item)) : [path.join(root, item)])
    ]

  }, [])

}

const getBucket = async (name) => {

  console.log('Finding S3 bucket')

  const buckets = await s3.listBuckets().promise()

  return buckets.Buckets.reduce((found, bucket) => {

    return found || (bucket.Name === name) ? bucket : null

  }, null)

}

const createBucket = async (name) => {

  console.log('Creating S3 bucket')

  await s3.createBucket({
    Bucket: name,
    ACL: 'public-read'
  }).promise()

}

const configureBucket = async (name) => {

  console.log('Configuring S3 bucket')

  await s3.putBucketWebsite({
    Bucket: name,
    WebsiteConfiguration: {
      ErrorDocument: {
        Key: 'index.html'
      },
      IndexDocument: {
        Suffix: 'index.html'
      }
    }
  }).promise()

}

const createDistribution = async (name) => {

  console.log('Creating CloudFront distribution')

  const params = {
    DistributionConfig: {
      CallerReference: moment().format('x'),
      Comment: '',
      CustomErrorResponses: {
        Quantity: 2,
        Items: [
          {
            ErrorCode: 403,
            ErrorCachingMinTTL: 300,
            ResponseCode: '200',
            ResponsePagePath: '/index.html'
          },{
            ErrorCode: 404,
            ErrorCachingMinTTL: 300,
            ResponseCode: '200',
            ResponsePagePath: '/index.html'
          }
        ]
      },
      DefaultCacheBehavior: {
        AllowedMethods: {
          Quantity: 2,
          Items: ['GET','HEAD']
        },
        Compress: true,
        ForwardedValues: {
          QueryString: false,
          Cookies: {
            Forward: 'none'
          }
        },
        MinTTL: 0,
        MaxTTL: 31536000,
        DefaultTTL: 86400,
        SmoothStreaming: false,
        TargetOriginId: `S3-${name}`,
        TrustedSigners: {
          Quantity: 0,
          Enabled: false
        },
        ViewerProtocolPolicy: 'allow-all'
      },
      Enabled: true,
      Origins: {
        Quantity: 1,
        Items: [
          {
            DomainName: `${name}.s3-website-us-east-1.amazonaws.com`,
            Id: `S3-${name}`,
            CustomOriginConfig: {
              HTTPPort: '80',
              HTTPSPort: '443',
              OriginProtocolPolicy: 'http-only'
            }
          }
        ]
      },
      Aliases: {
        Quantity: 1,
        Items: [
          name
        ]
      },
      DefaultRootObject: 'index.html'
    }
  }

  await cloudfront.createDistribution(params).promise()

}

const getDistribution = async (name) => {

  console.log('Finding CloudFront distribution')

  const distributions = await cloudfront.listDistributions().promise()

  return distributions.DistributionList.Items.reduce((id, item) => {

    return id || (item.DefaultCacheBehavior.TargetOriginId === `S3-${name}` ? item : null)

  }, null)

}

const invalidateDistribution = async (distribution, name) => {

  console.log('Invalidating CloudFront distribution')

  const params = {
    DistributionId: distribution.Id,
    InvalidationBatch: {
      CallerReference: moment().format('x'),
      Paths: {
        Quantity: 1,
        Items: ['/*']
      }
    }
  }

  await cloudfront.createInvalidation(params).promise()

}

const listObjects = async (name) => {

  return await s3.listObjects({
    Bucket: name
  }).promise()

}

const emptyBucket = async (name) => {

  console.log('Emptying S3 bucket')

  const keys = await listObjects(name)

  if(keys.Contents.length === 0) return

  await s3.deleteObjects({
    Bucket: name,
    Delete: {
      Objects: keys.Contents.map(({ Key }) => ({ Key }))
    }
  }).promise()

}

const uploadFile = async (name, file) => {

  console.log(`Uploading ${file}`)

  const Body = fs.readFileSync(file)

  await s3.upload({
    ACL: 'public-read',
    Body,
    Bucket: name,
    ContentType: mime.lookup(file),
    Key: file.replace('dist/', '')
  }).promise()

}

const publish = async (name) => {

  const bucket = await getBucket(name)

  if(!bucket) await createBucket(name)

  if(!bucket) await configureBucket(name)

  await emptyBucket(name)

  const files = listFiles('dist')

  await Promise.mapSeries(files, uploadFile.bind(this, name))

  const distribution = await getDistribution(name)

  if(!distribution) await createDistribution(name)

  if(distribution) await invalidateDistribution(distribution, name)

}

publish(process.env.AWS_BUCKET).then(() => process.exit())
