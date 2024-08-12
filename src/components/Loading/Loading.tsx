'use client';

import dynamic from 'next/dynamic';

const DotLottiePlayer = dynamic(() => import('@lottiefiles/dotlottie-react').then((mod) => mod.DotLottieReact), {
  ssr: false
});

const Loading = () => {
  return <DotLottiePlayer src="/lotties/Loading.lottie" loop autoplay />;
};

export default Loading;
