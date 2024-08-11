import HomeMemberCard from '../_components/HomeMemberCard';
import MemberList from '../_components/MemberList';

const Homepage = () => {
  return (
    <div className="px-[16px] mt-[26px] sm:mt-[22px] sm:pl-[42px] sm:pr-[16px] sm:gap-[42px]">
      <HomeMemberCard />
      <MemberList />
    </div>
  );
};

export default Homepage;
