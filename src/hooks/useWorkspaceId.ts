import { useParams } from 'next/navigation';

const useWorkspaceId = () => {
  const params = useParams();
  return Number(params.workspaceId);
};

export default useWorkspaceId;
