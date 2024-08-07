'use client';

import { useParams } from 'next/navigation';
import { useGetChannelName } from './useQueryChat';

//TODO 채널 이름 가져오는거 훅으로 뺄거고 중복된 정보는 로컬에서 가져오기
const useGetChannelName = () => {
  const { id } = useParams();
  const stringId = Array.isArray(id) ? id[0] : id;
  const { data: groupChannelName } = useGetChannelName({ id: stringId });
};

export default useGetChannelName;
