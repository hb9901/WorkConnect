import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      colors: {
        primary50: '#D3D3FD',
        primary100: '#A1A3FC',
        primary200Main: '#7173FA',
        primary300: '#3F42F8',
        primary400: '#0E11F6',
        primary500: '#070ACA',
        primary600: '#050899',
        primary700: '#040567',
        primary800: '#020336',
        primary900: '#000005',
        grey50: '#E5E7EB',
        grey100: '#C9CCD4',
        grey200: '#ACB1BE',
        grey300: '#9096A7',
        grey400: '#737B91',
        grey500: '#5C6275',
        grey600: '#464A59',
        grey700Black: '#2F323C',
        grey800: '#191A1F',
        grey900: '#020203',
        white: '#FFFFFF',
        background: '#FAFAFA',
        error: '#FD4E39',
        caution: '#FFC73C',
        success: '#05AC4B',
        information: '#3989FF'
      }
    }
  },
  plugins: []
};
export default config;
