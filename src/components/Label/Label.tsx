import { StrictPropsWithChildren } from '@/types/common';
import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { HTMLAttributes } from 'react';

type LabelProps = {
  htmlFor: string;
  className?: string;
} & StrictPropsWithChildren<VariantProps<typeof LabelClass> & HTMLAttributes<HTMLLabelElement>>;

const Label = ({ htmlFor, variant, className, children, ...props }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className={clsx(LabelClass({ variant }), className)} {...props}>
      {children}
    </label>
  );
};

const LabelClass = cva('text-[14px] font-normal leading-[130%] tracking-[-0.28px]', {
  variants: {
    variant: {
      primary: 'text-primary200Main',
      grey: 'text-grey700Black',
      error: 'text-error'
    }
  },
  defaultVariants: {
    variant: 'primary'
  }
});

export default Label;
