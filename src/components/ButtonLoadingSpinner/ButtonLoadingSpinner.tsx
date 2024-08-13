'use client';

import clsx from 'clsx';
import dynamic from 'next/dynamic';

interface LoadingSpinnerProps {
  className?: string;
}

const DotLottiePlayer = dynamic(() => import('@lottiefiles/dotlottie-react').then((mod) => mod.DotLottieReact), {
  ssr: false
});

const ButtonLoadingSpinner = ({ className }: LoadingSpinnerProps) => {
  return <DotLottiePlayer src="/lotties/ButtonLoading.lottie" loop autoplay className={clsx('w-36 h-36', className)} />;
};

export default ButtonLoadingSpinner;
