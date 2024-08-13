import HomeMemberCard from '../_components/HomeMemberCard';
import MemberList from '../_components/MemberList';

const Homepage = () => {
  return (
    <div className="px-[16px] mt-[26px] lg:mt-[22px] lg:pl-[42px] lg:pr-[16px] lg:gap-[42px]">
      <HomeMemberCard />
      <MemberList />
    </div>
  );
};

export default Homepage;
