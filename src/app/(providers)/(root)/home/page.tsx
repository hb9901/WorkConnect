'use client';
import Header from './_components/Header';
import HomeMemberCard from './_components/HomeMemberCard';
import MemberExistComponent from './_components/MemberExistComponent';
import MemberNotExistComponent from './_components/MemberNotExistComponent';

const page = () => {
  const userInfo = {
    name: '이름',
    position: 'Position',
    status: 'Status'
  };
  const workspaceUserList = [];

  return (
    <div>
      <Header />
      <main className="px-[16px] mt-[26px]">
        <HomeMemberCard name={userInfo.name} position={userInfo.position} status={userInfo.status} />

        {workspaceUserList.length === 0 ? <MemberExistComponent /> : <MemberNotExistComponent />}
      </main>
    </div>
  );
};

export default page;
