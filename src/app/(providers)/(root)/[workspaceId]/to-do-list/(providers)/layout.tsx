import ModalProvider from '@/providers/ModalProvider';

function TodoListProvidersLayout({ children }: { children: React.ReactNode }) {
  return <ModalProvider>{children}</ModalProvider>;
}

export default TodoListProvidersLayout;
