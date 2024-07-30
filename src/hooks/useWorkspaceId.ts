import { useParams } from 'next/navigation';

const useWorkspaceId = () => {
  const params = useParams();
  return params.workspaceId;
};

export default useWorkspaceId;
