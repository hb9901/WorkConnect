import { TagTheme } from '@/types/todotag';
import clsx from 'clsx';
import Typography from '../Typography';

interface TagProps {
  children: string;
  theme: TagTheme;
}

const styles = {
  High: 'bg-primary50 text-primary300',
  Medium: 'bg-secondary100Main text-secondary700',
  Low: 'bg-grey50 text-grey400'
};

const Tag = ({ theme, children, ...props }: TagProps) => {
  return (
    <Typography
      className={clsx(`rounded-[100px] py-[4px] px-[12px] whitespace-nowrap`, styles[theme])}
      variant="Body12px"
      {...props}
    >
      {children}
    </Typography>
  );
};

export default Tag;
