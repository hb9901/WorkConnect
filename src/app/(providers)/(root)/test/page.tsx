'use client';

import EditTextField from '@/components/EditTextField';
import { ChangeEvent, useState } from 'react';

const page = () => {
  const [value, setValue] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="w-[343px]">
      <EditTextField value={value} onChange={handleChange} />
    </div>
  );
};

export default page;
