import HomeMemberCard from '../HomeMemberCard';
import MemberList from '../MemberList';

const HomeMain = () => {
  return (
    <div className="px-[16px] mt-[26px] lg:mt-[22px] lg:pl-[42px] lg:pr-[16px] lg:gap-[42px]">
      <HomeMemberCard />
      <MemberList />
    </div>
  );
};

export default HomeMain;
