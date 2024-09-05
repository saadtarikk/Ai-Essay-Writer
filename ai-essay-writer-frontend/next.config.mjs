const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:3000/:path*',
        },
      ];
    },
  };
  
  export default nextConfig;