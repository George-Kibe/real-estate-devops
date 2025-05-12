/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [new URL('https://storage.googleapis.com/**')],
  },
};

export default nextConfig;
