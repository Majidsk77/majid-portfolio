import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      // /v2/* → promoted main routes (temporary — flip to permanent after confirming no crawled /v2 URLs)
      { source: '/v2',                          destination: '/',                         permanent: false },
      { source: '/v2/about',                    destination: '/about',                    permanent: false },
      { source: '/v2/selected-work',            destination: '/selected-work',            permanent: false },
      { source: '/v2/ai-playground',            destination: '/ai-playground',            permanent: false },
      { source: '/v2/ai-playground/boundaries', destination: '/ai-playground/boundaries', permanent: false },
      { source: '/v2/work/google-boba',         destination: '/work/google-boba',         permanent: false },
      { source: '/v2/work/exact',               destination: '/work/exact',               permanent: false },
      { source: '/v2/work/imc-prosperity',      destination: '/work/imc-prosperity',      permanent: false },
    ]
  },
};

export default nextConfig;
