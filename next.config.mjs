/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'hlcnwrulbgheyhthjldj.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/devko/**',
      },
    ],
  },
};

export default nextConfig;
