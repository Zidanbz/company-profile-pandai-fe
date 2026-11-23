/** @type {import('next').NextConfig} */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const uploadSource = siteUrl ? new URL(siteUrl) : null;

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: uploadSource ? [{
      protocol: uploadSource.protocol.replace(":", ""),
      hostname: uploadSource.hostname,
      port: uploadSource.port,
      pathname: "/uploads/**",
    }] : [],
    domains: ["localhost", "res.cloudinary.com", "images.unsplash.com", "web.globallink.net.id"],
  },
};

export default nextConfig;
