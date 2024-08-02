import { PageLayout } from '@/components/PageLayout';

function TodoListHomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageLayout title="" showTopBar={false}>
      {children}
    </PageLayout>
  );
}

export default TodoListHomeLayout;
