const withBundleAnalyzer = require('@next/bundle-analyzer')
const withTM = require('next-transpile-modules')

const repo = 'teams'
const assetPrefix = `/${repo}/`
const basePath = `/${repo}`

/**
 * @type {import('next').NextConfig}
 */
const config = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp']
  },
  assetPrefix: assetPrefix,
  basePath: basePath,
  experimental: {},
  compiler: {
    styledComponents: true
  },
  output: 'export',
  module: {
    rules: [{
      test: /\.(glb|gltf)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: "/_next/models",
          outputPath: "models",
        }
      }
    }]
  }
}

module.exports = (_phase, { defaultConfig: _ }) => {
  const plugins = [
    withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' }),
    withTM([]) // add modules you want to transpile here
  ]
  return plugins.reduce((acc, plugin) => plugin(acc), { ...config })
}
