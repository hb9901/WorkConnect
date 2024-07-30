import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { ElementType, PropsWithChildren } from 'react';

type TypographyProps = {
  as?: ElementType;
  className?: string;
  color?: string;
} & VariantProps<typeof typographyClass>;

const Typography = ({
  as: Component = 'div',
  variant,
  className,
  color,
  children,
  ...props
}: PropsWithChildren<TypographyProps>) => {
  return (
    <Component className={clsx(typographyClass({ variant, color }), className)} {...props}>
      {children}
    </Component>
  );
};

const typographyClass = cva('leading-[130%] tracking-[-2%]', {
  variants: {
    variant: {
      Title22px: 'text-[22px] font-medium',
      Title20px: 'text-[20px] font-medium',
      Title18px: 'text-[18px] font-medium',
      Title16px: 'text-[16px] font-medium',
      Title14px: 'text-[14px] font-medium',
      Subtitle18px: 'text-[18px] font-normal',
      Subtitle16px: 'text-[16px] font-normal',
      Subtitle14px: 'text-[14px] font-normal',
      Subtitle12px: 'text-[12px] font-normal',
      Body16px: 'text-[16px] font-normal',
      Body14px: 'text-[14px] font-normal',
      Body12px: 'text-[12px] font-normal'
    },
    color: {
      grey900: 'text-grey900',
      grey800: 'text-grey800',
      grey700Black: 'text-grey700Black',
      grey600: 'text-grey600',
      grey500: 'text-grey500',
      grey400: 'text-grey400',
      grey300: 'text-grey300',
      grey200: 'text-grey200',
      grey100: 'text-grey100',
      grey50: 'text-grey50',
      primary900: 'text-primary900',
      primary800: 'text-primary800',
      primary700: 'text-primary700',
      primary600: 'text-primary600',
      primary500: 'text-primary500',
      primary400: 'text-primary400',
      primary300: 'text-primary300',
      primary200Main: 'text-primary200Main',
      primary100: 'text-primary100',
      primary50: 'text-primary50',
      secondary50: 'text-secondary50',
      secondary100Main: 'text-secondary100Main',
      secondary200: 'text-secondary200',
      secondary300: 'text-secondary300',
      secondary400: 'text-secondary400',
      secondary500: 'text-secondary500',
      secondary600: 'text-secondary600',
      secondary700: 'text-secondary700',
      secondary800: 'text-secondary800',
      secondary900: 'text-secondary900',
      caution: 'text-caution',
      error: 'text-error',
      information: 'text-information',
      success: 'text-success'
    }
  },
  defaultVariants: {
    variant: 'Subtitle16px',
    color: 'grey300'
  }
});

export default Typography;
