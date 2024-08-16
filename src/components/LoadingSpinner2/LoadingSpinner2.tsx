'use client';
import Lottie from 'react-lottie-player';
import lottieJson from '../../../public/test.json';

const LoadingSpinner2 = () => {
  return <Lottie loop play animationData={lottieJson} />;
};

export default LoadingSpinner2;
