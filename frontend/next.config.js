// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }
module.exports = {
  async redirects() {
    return [
      {
        source: '/\\?selectedId=\\:slug',
        destination: '/items/', // Matched parameters can be used in the destination
        permanent: false,
      },
    ]
  },
}

// module.exports = nextConfig
