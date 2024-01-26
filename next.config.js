const withBundleAnalyzer = require('@next/bundle-analyzer')
const withTM = require('next-transpile-modules')


const isProd = process.env.NODE_ENV === 'production'

let assetPrefix = ''
let basePath = ''

if (isProd) {
  const repo = 'teams'
  assetPrefix = `/${repo}`
  basePath = `/${repo}`
}

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
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: 'file-loader',
        options: {
          outputPath: "models",
        }
      }
    });
    return config;
  }
}

module.exports = (_phase, { defaultConfig: _ }) => {
  const plugins = [
    withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' }),
    withTM([]) // add modules you want to transpile here
  ]
  return plugins.reduce((acc, plugin) => plugin(acc), { ...config })
}
