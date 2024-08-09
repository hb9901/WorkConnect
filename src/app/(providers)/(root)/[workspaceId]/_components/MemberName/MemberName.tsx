import ResponsiveTypography from '@/components/ResponsiveTypography';

interface MemberNameProps {
  name: string;
}

const MemberName = ({ name }: MemberNameProps) => {
  return (
    <div>
      <ResponsiveTypography pcVariant="Title20px" mobileVariant="Title18px" color="grey700Black">
        {name}
      </ResponsiveTypography>
    </div>
  );
};

export default MemberName;
