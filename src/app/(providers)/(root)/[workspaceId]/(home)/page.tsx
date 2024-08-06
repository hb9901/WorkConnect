import HomeMemberCard from '../_components/HomeMemberCard';
import MemberList from '../_components/MemberList';

const Homepage = () => {
  return (
    <div>
      <main className="px-[16px] mt-[26px]">
        <HomeMemberCard />
        <MemberList />
      </main>
    </div>
  );
};

export default Homepage;
