'use client';

import clsx from 'clsx';
import dynamic from 'next/dynamic';

interface LoadingSpinnerProps {
  className?: string;
}

const DotLottiePlayer = dynamic(() => import('@lottiefiles/dotlottie-react').then((mod) => mod.DotLottieReact), {
  ssr: false
});

const LoadingSpinner = ({ className }: LoadingSpinnerProps) => {
  return <DotLottiePlayer src="/lotties/Loading.lottie" loop autoplay className={clsx('w-72 h-72 pl-6', className)} />;
};

export default LoadingSpinner;
