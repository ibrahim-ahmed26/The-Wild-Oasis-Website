/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qkfipiszaklwcwnlnruv.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/Cabins/**",
      },
    ],
  },
  // output: "export",
};

export default nextConfig;
