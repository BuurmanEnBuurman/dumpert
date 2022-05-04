// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }
module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        has:[{
          type: "query",
          key: "selectedId",
          value: "kaas"
        }],
        destination: '/items/', // Matched parameters can be used in the destination
        permanent: false,
      },
    ]
  },
}

// module.exports = nextConfig
