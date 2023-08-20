/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "https://citydao-network.vercel.app, https://citydao-network-bittorin.vercel.app/, https://citydao-network-git-main-bittorin.vercel.app/" },
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
    }

}

module.exports = {
    nextConfig,
    env: {
        MAPBOX_TOKEN: process.env.MAPBOX,
    },
};
