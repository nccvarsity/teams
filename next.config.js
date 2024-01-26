const withBundleAnalyzer = require('@next/bundle-analyzer')
const withTM = require('next-transpile-modules')

const isGithubActions = process.env.GITHUB_ACTIONS || false

let assetPrefix = ''
let basePath = ''

if (isGithubActions) {
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '')
  assetPrefix = `/${repo}/`
  basePath = `/${repo}`
}

/**
 * @type {import('next').NextConfig}
 */
const config = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: true
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
          outputPath: 'models'
        }
      }
    })
    return config
  }
}

module.exports = (_phase, { defaultConfig: _ }) => {
  const plugins = [
    withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' }),
    withTM([]) // add modules you want to transpile here
  ]
  return plugins.reduce((acc, plugin) => plugin(acc), { ...config })
}
