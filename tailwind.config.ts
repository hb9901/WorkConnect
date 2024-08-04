import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      animation: {
        spin: 'spin 1s linear infinite'
      },
      keyframes: {
        spin: {
          '0%': { tranform: 'rotate(0deg)' },
          '100%': { tranform: 'rotate(360deg)' }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      colors: {
        primary25: '#EBECFE',
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
        secondary50: '#FCFDFC',
        secondary100Main: '#DBEDDB',
        secondary200: '#B8DBB8',
        secondary300: '#96CA96',
        secondary400: '#74B974',
        secondary500: '#53A753',
        secondary600: '#428542',
        secondary700: '#316331',
        secondary800: '#204120',
        secondary900: '#0F1F0F',
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
        bgBackground1: '#FAFAFA',
        bgProfile: '#BDBDBD',
        error: '#FD4E39',
        caution: '#FFC73C',
        success: '#05AC4B',
        information: '#3989FF'
      }
    }
  },
  plugins: [require('tailwind-scrollbar-hide')]
};
export default config;
