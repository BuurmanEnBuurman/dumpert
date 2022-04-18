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
        // solution source for ReferenceError: SharedArrayBuffer is not defined https://github.com/ffmpegwasm/ffmpeg.wasm/issues/263#issuecomment-1007050005
        source: '/:path*',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
    ]
  },

}

// module.exports = nextConfig
