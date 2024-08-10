import { useRouter } from 'next/navigation';
import { PageLayout } from '@/components/PageLayout';
import { Check1Icon, XIcon } from '@/icons';
import { StrictPropsWithChildren } from '@/types/common';

type AddChatLayoutProps = {
  title: string;
  onSubmit: () => Promise<void>;
};

const AddChatLayout = ({ title, children, onSubmit }: StrictPropsWithChildren<AddChatLayoutProps>) => {
  const router = useRouter();

  return (
    <PageLayout
      title={title}
      showBottomBar={false}
      TopBarLeftIcon1={<XIcon onClick={() => router.back()} />}
      TopBarRightIcon1={
        <button onClick={onSubmit}>
          <Check1Icon />
        </button>
      }
    >
      {children}
    </PageLayout>
  );
};

export default AddChatLayout;
