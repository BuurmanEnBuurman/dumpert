// /** @type {import('next').NextConfig} */
module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        has:[{
          type: "query",
          key: "selectedId",
        }],
        destination: '/item/:selectedId*', // Matched parameters can be used in the destination
        permanent: false,
      },
    ]
  },
}