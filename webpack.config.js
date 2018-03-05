  const path = require('path');

  module.exports = {
    entry: './www/app/main.js',
    output: {
      path: path.resolve(__dirname, 'www/dist'),
      filename: 'bundle.js',
      publicPath:"/public/"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude:[path.resolve(__dirname, "node_modules")],
          loader:"babel-loader",
          options:{
            presets:["es2015"],
            plugins:["transform-runtime","transform-object-rest-spread","syntax-object-rest-spread"]
          }
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              less: 'vue-style-loader!css-loader!less-loader'
            }
          }
        },
        {
          test: /\.less$/,
          use: [
            {
                loader: "style-loader" // creates style nodes from JS strings 
            }, 
            {
                loader: "css-loader" // translates CSS into CommonJS 
            }, 
            {
                loader: "less-loader" // compiles Less to CSS 
              }
          ]
        },
        {
            test: /\.css$/,
            use: [
              {
                  loader: "style-loader" // creates style nodes from JS strings 
              }, 
              {
                  loader: "css-loader" // translates CSS into CommonJS 
              }
            ]
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath:"./",
            outputPath:'app/assets/images/'
          }
        } 
      ]
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
      }
    },
    watch:true
  };