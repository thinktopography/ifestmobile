import '../server/lib/environment'
import deploy from 'shipit-deploy'
import utils from 'shipit-utils'
import Shipit from 'shipit-cli'
import mkdirp from 'mkdirp'
import path from 'path'

const shipitfile = (shipit) => {

  deploy(shipit)

  shipit.initConfig({
    default: {
      deployTo: '',
      repositoryUrl: '',
      key: '',
      workspace: path.resolve('repo'),
      ignores: ['.git', 'node_modules'],
      keepReleases: 2,
      strict: 'no'
    },
    production: {
      servers: ''
    }
  })

}

const processor = async () => {

  mkdirp.sync(path.join('repo'))

  const shipit = new Shipit({ environment: 'production' })

  shipitfile(shipit)

  shipit.initialize()

  shipit.start('deploy')

  shipit.on('err', () => process.exit(1))

  shipit.on('task_err', () => process.exit(1))

  shipit.on('task_not_found', () => process.exit(1))

}

processor()
