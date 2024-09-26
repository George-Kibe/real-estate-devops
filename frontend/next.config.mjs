/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        domains: [
            "lh3.googleusercontent.com",
            "mernbnb-images-bucket.s3.eu-west-1.amazonaws.com",
            "mernbnb-images-bucket.s3.amazonaws.com",
            "bayut-production.s3.eu-central-1.amazonaws.com",
            "housinglink.org",
            "cdn.rentcafe.com",
            "s3.amazonaws.com",
            "images.pexels.com",
            "apartments.com",
        ]
    }
};

export default nextConfig;
