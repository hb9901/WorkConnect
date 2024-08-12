'use client';

import { useParams } from 'next/navigation';

const useGetChannelId = () => {
  const { id } = useParams();
  return Number(Array.isArray(id) ? id[0] : id);
};

export default useGetChannelId;
