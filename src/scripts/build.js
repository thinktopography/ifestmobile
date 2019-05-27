import { transform } from 'babel-core'
import webpack from 'webpack'
import rimraf from 'rimraf'
import mkdirp from 'mkdirp'
import dotenv from 'dotenv'
import env from './env/env'
import path from 'path'
import ncp from 'ncp'
import fs from 'fs'

dotenv.load({ path: path.join('.env') })

const config = require(`../web/config/webpack.${process.env.NODE_ENV}.config`).default

const copy = (src, dest) => new Promise((resolve, reject) => ncp(src, dest, (err) => {
  if(err) reject(err)
  resolve()
}))

const transpile = (source) => {

  const transpiled = transform(source, {
    presets: [
      'babel-preset-es2015',
      'babel-preset-stage-0'
    ],
    plugins: [
      'transform-promise-to-bluebird',
      ['transform-runtime', { polyfill: false }]
    ]
  })

  return transpiled.code

}

const compilePath = async (base) => {

  const dest = base.replace('src/server', 'dist')

  mkdirp.sync(dest)

  await Promise.map(fs.readdirSync(base), async (entity) => {

    const entityPath = path.join(base, entity)

    if(fs.lstatSync(entityPath).isDirectory()) return await compilePath(entityPath)

    if(path.extname(entityPath) !== '.js') return await copy(entityPath, path.join(dest, entity))

    fs.writeFileSync(path.join(dest, entity), transpile(fs.readFileSync(entityPath, 'utf8')))

  })

}

const webpackClient = () => new Promise((resolve, reject) => {

  webpack(config).run((err, stats) => {

    if(err) reject(err)

    resolve(stats)

  })

})

const compileServer = async () => {

  console.log('Compiling server')

  await compilePath(path.join('src','server'))

  await copy(path.join('package.json'), path.join('dist','package.json'))

  await copy(path.join('package-lock.json'), path.join('dist','package-lock.json'))

  await env(path.join('dist'))

}

const compileClient = async () => {

  console.log('Compiling client')

  await webpackClient()

}


const build = async () => {

  await Promise.all([
    compileServer(),
    compileClient()
  ])


}

build().then(() => process.exit())
