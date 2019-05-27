import '../../server/lib/environment'
import Shipit from 'shipit-cli'
import utils from 'shipit-utils'
import roles from './roles'
import moment from 'moment'

const processor = async () => {

  const shipit = new Shipit({ environment: 'production' })

  shipit.initConfig({
    default: {
      deployTo: '/var/www/app',
      key: `~/.ssh/${process.env.FINGERPRINT}`,
      strict: 'no'
    },
    production: {
      servers: [
        {
          user: 'root',
          host: 'donordialer.tracymitranoforcongress.com',
          port: 2244,
          roles: 'appserver'
        }
      ]
    }
  })

  roles(shipit)

  const timestamp = moment().format('YYYYMMDDHHmmss')

  const deployDir = shipit.config.deployTo

  const releasesDir = `${deployDir}/releases`

  const releaseDir = `${releasesDir}/${timestamp}`

  const sharedDir = `${deployDir}/shared`

  const currentDir = `${deployDir}/current`

  utils.registerTask(shipit, 'servers', [
    'servers:all:configure',
    'servers:appserver:configure',
    'servers:appserver:restart'
  ])

  utils.registerTask(shipit, 'deploy', [
    'deploy:build',
    'deploy:zip',
    'deploy:mkdir',
    'deploy:upload',
    'deploy:unzip',
    'deploy:install',
    'deploy:link_shared',
    'deploy:symlink',
    'deploy:reload_passenger',
    'deploy:cache'
  ])

  utils.registerTask(shipit, 'servers:all:configure', async () => {
    await shipit.remoteCopy('.env.production', '/var/www/app/current/.env', {
      roles: ['appserver']
    })
  })

  utils.registerTask(shipit, 'servers:appserver:configure', async () => {
    await shipit.remoteCopy('src/servers/app/nginx.conf', '/opt/nginx/conf/nginx.conf', { roles: 'appserver' })
  })

  utils.registerTask(shipit, 'servers:appserver:restart', async () => {
    await shipit.remote('systemctl restart nginx', { roles: 'appserver' })
  })

  utils.registerTask(shipit, 'deploy:build', async () => {
    await shipit.local('NODE_ENV=production npm run build')
  })

  utils.registerTask(shipit, 'deploy:zip', async () => {
    await shipit.local('cd ./dist && tar -czf ../tmp/dist.tgz .')
  })

  utils.registerTask(shipit, 'deploy:mkdir', async () => {
    await shipit.remote(`mkdir -p ${releaseDir}`, {
      roles: ['appserver']
    })
  })

  utils.registerTask(shipit, 'deploy:upload', async () => {
    await shipit.remoteCopy('tmp/dist.tgz', `${releaseDir}/dist.tgz`, {
      roles: ['appserver']
    })
  })

  utils.registerTask(shipit, 'deploy:unzip', async () => {
    await shipit.remote('tar -xzf dist.tgz && rm -rf dist.tgz', {
      roles: ['appserver'],
      cwd: releaseDir
    })
  })

  utils.registerTask(shipit, 'deploy:install', async () => {
    await shipit.remote('npm install', {
      roles: ['appserver'],
      cwd: releaseDir
    })
  })

  utils.registerTask(shipit, 'deploy:link_shared', async () => {
    const commands = [
      `ln -s ${sharedDir}/logs ${releaseDir}/logs`,
      `ln -s ${sharedDir}/tmp ${releaseDir}/tmp`
    ]
    await shipit.remote(commands.join(' && '), {
      roles: ['appserver']
    })
  })

  utils.registerTask(shipit, 'deploy:symlink', async () => {
    await shipit.remote(`rm -rf ${currentDir} && ln -s ${releaseDir} ${currentDir}`, {
      roles: ['appserver']
    })
  })

  utils.registerTask(shipit, 'deploy:reload_passenger', () => {
    return shipit.remote(`touch ${currentDir}/tmp/restart.txt`, {
      roles: 'appserver'
    })
  })

  utils.registerTask(shipit, 'deploy:cache', () => {
    return shipit.remote('wget -O - http://127.0.0.1/ping', {
      roles: 'appserver'
    })
  })

  shipit.initialize()

  shipit.on('err', () => process.exit(1))

  shipit.on('task_err', () => process.exit(1))

  shipit.on('task_not_found', () => process.exit(1))

  const args = process.argv.slice(2)

  await shipit.start(args[0])

}

processor()
