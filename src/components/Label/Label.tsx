import { StrictPropsWithChildren } from '@/types/common';
import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { HTMLAttributes } from 'react';

type LabelProps = {
  htmlFor: string;
  className?: string;
} & StrictPropsWithChildren<VariantProps<typeof LabelClass> & HTMLAttributes<HTMLLabelElement>>;

const Label = ({ htmlFor, color: variant, className, children, ...props }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className={clsx(LabelClass({ color: variant }), className)} {...props}>
      {children}
    </label>
  );
};

const LabelClass = cva('text-[14px] font-normal leading-[130%] tracking-[-0.28px]', {
  variants: {
    color: {
      primary: 'text-primary200Main',
      grey: 'text-grey700Black',
      error: 'text-error'
    }
  },
  defaultVariants: {
    color: 'primary'
  }
});

export default Label;
