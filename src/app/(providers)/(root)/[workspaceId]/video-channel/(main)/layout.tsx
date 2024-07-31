import { StrictPropsWithChildren } from '@/types/common';
import Header from './_components/Header';

const Layout = ({ children }: StrictPropsWithChildren) => {
  return (
    <section>
      <div>
        <Header />
        {children}
      </div>
    </section>
  );
};

export default Layout;
