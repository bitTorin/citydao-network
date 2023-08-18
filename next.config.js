/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    nextConfig,
    env: {
        TEST_TOKEN: process.env.TOKEN,
    },
};
