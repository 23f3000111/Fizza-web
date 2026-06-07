/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Run the nightly-leads scheduler when the server boots (see instrumentation.ts)
  experimental: {
    instrumentationHook: true,
  },
};

export default nextConfig;
