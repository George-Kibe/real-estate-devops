/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "lh3.googleusercontent.com",
            "mernbnb-images-bucket.s3.eu-west-1.amazonaws.com",
            "mernbnb-images-bucket.s3.amazonaws.com",
            "bayut-production.s3.eu-central-1.amazonaws.com",
        ]
    }
};

export default nextConfig;