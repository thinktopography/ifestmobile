import webpack from 'webpack'


const config = require('../web/config/webpack.production.config').default

const webpackClient = () => new Promise((resolve, reject) => {

  webpack(config).run((err, stats) => {

    if(err) reject(err)

    resolve(stats)

  })

})

const compileClient = async () => {

  console.log('Compiling client')

  await webpackClient()

}


const build = async () => {

  await compileClient()


}

build().then(() => process.exit())
