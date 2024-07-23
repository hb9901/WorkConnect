const AuthVerifyPage = () => {
  return (
    <main className="flex justify-center items-center">
      <div className="flex flex-col w-[375px] h-dvh px-4">
        <div className="flex w-[375px] h-[52px] pt-[14px] pb-[12px] items-center">
          <button className="text-[20px] font-bold text-[#333333]">←</button>
        </div>
        <div className="flex-grow">
          <h1 className="text-[20px] text-[#2E2E2E] font-semibold pt-[42px] pb-[28px] flex items-center">
            인증 코드 입력
          </h1>
          <p className="text-[16px] text-[#333] font-normal pb-[12px]">
            이메일로 전송된 6자리 인증 코드를 입력 후 [가입 완료] 버튼을
            클릭해주세요.
          </p>
          <div className="flex justify-between gap-2">
            <input
              type="text"
              maxLength={1}
              className="border-[1px] border-[#333] rounded-lg text-center flex-grow w-full h-16 text-lg"
            />
            <input
              type="text"
              maxLength={1}
              className="border-[1px] border-[#333] rounded-lg text-center flex-grow w-full h-16 text-lg"
            />
            <input
              type="text"
              maxLength={1}
              className="border-[1px] border-[#333] rounded-lg text-center flex-grow w-full h-16 text-lg"
            />
            <input
              type="text"
              maxLength={1}
              className="border-[1px] border-[#333] rounded-lg text-center flex-grow w-full h-16 text-lg"
            />
            <input
              type="text"
              maxLength={1}
              className="border-[1px] border-[#333] rounded-lg text-center flex-grow w-full h-16 text-lg"
            />
            <input
              type="text"
              maxLength={1}
              className="border-[1px] border-[#333] rounded-lg text-center flex-grow w-full h-16 text-lg"
            />
          </div>
          <button className="text-[12px] text-[#333] font-normal underline pb-7 mt-4">
            인증번호 재전송
          </button>
        </div>
        <div className="flex justify-center pb-4">
          <button className="w-full text-lg py-[12px] px-[22px] bg-[#333] text-white rounded-lg shadow-md">
            가입 완료
          </button>
        </div>
        <button className="text-[#333] text-center text-[12px] font-normal underline pb-7">
          처음부터 다시 하기
        </button>
      </div>
    </main>
  );
};

export default AuthVerifyPage;
