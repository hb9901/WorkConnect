/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'ripbxzxpvscuqgdjpkix.supabase.co'
      }
    ]
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      removeViewBox: false,
                      addAttributesToSVGElement: {
                        params: {
                          attributes: [{ preserveAspectRatio: 'xMidYMid meet' }]
                        }
                      }
                    }
                  }
                }
              ]
            }
          }
        }
      ]
    });

    config.module.rules.push({
      test: /\.lottie$/,
      use: [
        {
          loader: 'lottie-loader'
        }
      ]
    });

    config.module.rules.push({
      test: /\.json$/,
      type: 'javascript/auto',
      use: 'json-loader'
    });

    return config;
  }
};

export default nextConfig;
