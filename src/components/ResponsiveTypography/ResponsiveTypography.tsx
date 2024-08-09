import { StrictPropsWithChildren } from '@/types/common';
import { ValueOf } from 'next/dist/shared/lib/constants';
import Typography from '../Typography';
import { TypographyVariant } from '../Typography/Typography';

type ResponsiveTypographyProps = {
  mobileVariant: ValueOf<Pick<TypographyVariant, 'variant'>>;
  pcVariant: ValueOf<Pick<TypographyVariant, 'variant'>>;
  color: ValueOf<Pick<TypographyVariant, 'color'>>;
};

const ResponsiveTypography = ({
  mobileVariant,
  pcVariant,
  color,
  children
}: StrictPropsWithChildren<ResponsiveTypographyProps>) => {
  if (!color) return;

  return (
    <>
      {/*모바일*/}
      <Typography variant={mobileVariant} color={color} className="line-clamp-1 lg:hidden">
        {children}
      </Typography>
      {/*pc*/}
      <Typography variant={pcVariant} color={color} className="hidden lg:line-clamp-1">
        {children}
      </Typography>
    </>
  );
};

export default ResponsiveTypography;
