declare module '*.lottie' {
  interface LottieAnimation {
    v: string; // 버전
    fr: number; // 프레임 속도
    ip: number; // 시작 프레임
    op: number; // 종료 프레임
    w: number; // 너비
    h: number; // 높이
    nm: string; // 이름
    ddd: number; // 3D 여부
    assets: any[]; // 자산 배열
    layers: any[]; // 레이어 배열
  }

  const content: LottieAnimation;
  export default content;
}
