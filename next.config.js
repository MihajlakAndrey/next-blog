/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
 
  images: {
    disableStaticImages: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/**',
      },
    ],
  },
}
