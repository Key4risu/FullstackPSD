/** @type {import { 'next' } from "module";} */
const nextConfig = {
    iamges: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "utfs.io"
            }
        ]
    }
};

export default nextConfig;