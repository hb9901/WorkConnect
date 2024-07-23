import { StrictPropsWithChildren } from "@/types/common";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { HTMLAttributes } from "react";

const LabelClass = cva("", {
  variants: {
    variant: {
      label2: "text-[12px]",
      label1: "text-[10px]",
    },
    weight: {
      bold: "font-bold",
      semibold: "font-semibold",
    },
  },
  defaultVariants: {},
});

type LabelProps = {
  htmlFor: string;
  className?: string;
} & StrictPropsWithChildren<
  VariantProps<typeof LabelClass> & HTMLAttributes<HTMLLabelElement>
>;

const Label = ({
  htmlFor,
  variant,
  weight,
  className,
  children,
  ...props
}: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx(LabelClass({ variant, weight }), className)}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
