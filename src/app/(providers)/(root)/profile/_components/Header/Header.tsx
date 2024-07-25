'use client';

interface HeaderProps {
  title: string;
  type: 'edit' | 'profile' | 'myPage';
}

const Header = ({ title, type }: HeaderProps) => {
  return (
    <header>
      <div className="grid grid-cols-3 items-center j h-10 px-4 w-full border-b-2 border-slate-200">
        <button className="flex items-center justify-start text-sm">뒤로가기</button>
        <div className="flex items-center justify-center font-bold text-lg">{title}</div>
        <div className="flex items-center justify-end">
          {type === 'myPage' && <button className="text-sm">로그아웃</button>}
          {type === 'edit' && <button className="text-sm">수정완료?</button>}
        </div>
      </div>
    </header>
  );
};

export default Header;
