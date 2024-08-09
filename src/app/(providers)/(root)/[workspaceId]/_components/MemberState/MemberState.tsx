import Typography from '@/components/Typography';

interface MemberStateProps {
  state: string | null;
}
const MemberState = ({ state }: MemberStateProps) => {
  return (
    <div>
      {/*모바일*/}
      <Typography variant="Title14px" color="grey700Black" className="lg:hidden">
        {state}
      </Typography>
      {/*pc*/}
      <Typography variant="Title16px" color="grey700Black" className="hidden lg:flex">
        {state}
      </Typography>
    </div>
  );
};

export default MemberState;
