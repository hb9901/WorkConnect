'use client';
import Typography from '@/components/Typography';
import { useSearchParams } from 'next/navigation';

const UserEmail = () => {
  const searchParams = useSearchParams();
  const userEmail = searchParams.get('email');

  return (
    <Typography variant="Title20px" color="grey700Black" className="lg:text-[22px]">
      {userEmail}
    </Typography>
  );
};

export default UserEmail;
