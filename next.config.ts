import type { NextConfig } from "next";


const nextConfig: NextConfig = {

    images: {

        remotePatterns: [

            // ============================
            // Supabase Storage
            // ============================
            {
                protocol: "https",
                hostname: "uccjvjpaoufwvmfipnyc.supabase.co",
                pathname: "/storage/v1/object/public/**",
            },


            // ============================
            // YouTube Thumbnail
            // ============================
            {
                protocol: "https",
                hostname: "img.youtube.com",
                pathname: "/vi/**",
            },


            {
                protocol: "https",
                hostname: "i.ytimg.com",
                pathname: "/vi/**",
            },


        ],

    },

};


export default nextConfig;