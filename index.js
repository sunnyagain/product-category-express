require('@babel/register')({
    presets: ['@babel/preset-env']
})

const Bootstrap = require('./src/Bootstrap').default
Bootstrap.init()