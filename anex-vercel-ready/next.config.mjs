/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    const security = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
      { key: "X-Frame-Options", value: "DENY" },
      {
        key: "Content-Security-Policy",
        value:
          "default-src 'self'; img-src 'self' data: blob:; media-src 'self' blob:; " +
          "style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
          "connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
      }
    ];
    return [
      { source: "/(.*)", headers: security },
      { source: "/desk/:path*", headers: [{ key: "Cache-Control", value: "no-store, private" }] },
      { source: "/api/:path*", headers: [{ key: "Cache-Control", value: "no-store" }] }
    ];
  }
};
export default nextConfig;
