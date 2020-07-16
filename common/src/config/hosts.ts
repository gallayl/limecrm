export const Hosts = {
  service: {
    baseUrl: process.env.SERVICE_BASE_URL || 'http://localhost',
    port: process.env.SERVICE_PORT || 9090,
    urls: {
      getImageList: '/images',
      postImage: '/images',
      getSingleImage: '/images/:id',
    },
  },
  frontend: process.env.FRONTEND_URL || 'http://localhost:8080',
}
