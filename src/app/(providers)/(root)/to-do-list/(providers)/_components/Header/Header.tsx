'use client';

const Header = () => {
  return (
    <header>
      <div className="grid grid-cols-3 items-center j h-10 px-4 w-full border-b-2 border-slate-200">
        <button className="flex items-center justify-start text-sm">뒤로가기</button>
        <div className="flex items-center justify-center font-bold text-lg">일정 관리</div>
        <div className="flex items-center justify-end">알림??</div>
      </div>
    </header>
  );
};

export default Header;
