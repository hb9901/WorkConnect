import BackButton from '../../auth/_components/BackButton';

const NewWorkSpacePage = () => {
  return (
    <main className="flex justify-center items-center">
      <div className="flex flex-col w-[375px] h-dvh px-4">
        <div className="flex w-[375px] h-[52px] pt-[14px] pb-[12px] items-center relative">
          <BackButton className="absolute left-0" />
          <strong className="text-[20px] text-[#2E2E2E] font-semibold text-center flex-1">
            새 워크스페이스 만들기
          </strong>
        </div>
        <strong className="text-[20px] text-[#2E2E2E] font-semibold pt-[42px] pb-[28px] flex items-center">
          계정 정보 입력
        </strong>
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col">
            <label className="text-[14px] text-[#333] opacity-60 pl-[6px] pb-2" htmlFor="email">
              조직이름
            </label>
            <input
              className="py-[12px] px-[16px] rounded-lg border border-[#C7C7C7] shadow-md focus:outline-none"
              type="text"
              placeholder="회사, 단체, 조직 이름 입력."
              required={true}
            />
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button
            className="w-full text-lg py-[12px] px-[22px] bg-[#333] text-white rounded-lg shadow-md"
            type="button"
          >
            가입하기
          </button>
        </div>
      </div>
    </main>
  );
};

export default NewWorkSpacePage;
