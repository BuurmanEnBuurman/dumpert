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
          // value: "kaas"
        }],
        destination: '/items/', // Matched parameters can be used in the destination
        permanent: false,
      },
    ]
  },
  async headers() {
    return [
      { 
        source: '/:path*{/}?',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp"
          }
        ],
      },
    ]
  },

}

// module.exports = nextConfig
