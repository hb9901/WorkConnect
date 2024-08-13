'use client';

import EditTextField from '@/components/EditTextField';
import FileEmpty from '@/components/FileEmpty';
import { useState } from 'react';

const page = () => {
  const [value, setValue] = useState('');

  return (
    <div>
      <FileEmpty className="mt-[40px]" />
      <div className="ml-[300px] w-[343px]">
        <EditTextField type="text" value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
    </div>
  );
};

export default page;
