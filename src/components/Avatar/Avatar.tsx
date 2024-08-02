import { ComponentProps } from 'react';
import { PersonFilledIcon } from '@/icons';
import Image from 'next/image';
import { cva, VariantProps } from 'class-variance-authority';

type AvatarProps = Omit<ComponentProps<'img'>, 'width' | 'height'> & {
  size?: NonNullable<VariantProps<typeof AvatarVariants>['size']>;
} & Omit<VariantProps<typeof AvatarVariants>, 'size'>;

const Avatar = ({ src, size = '48px', variant, ...props }: AvatarProps) => {
  if (!src) {
    return (
      <div className={AvatarVariants({ size, variant })} {...props}>
        <PersonFilledIcon className={AvatarIconVariants({ size })} />
      </div>
    );
  }

  const imageSize = parseInt(size.replace('px', ''));

  return (
    <Image
      src={src}
      alt="프로필"
      className={AvatarVariants({ size, variant })}
      width={imageSize}
      height={imageSize}
      {...props}
    />
  );
};

const AvatarVariants = cva('object-cover flex items-center justify-center bg-[#BDBDBD]', {
  variants: {
    size: {
      '48px': 'w-[48px] h-[48px]',
      '40px': 'w-[40px] h-[40px]',
      '32px': 'w-[32px] h-[32px]',
      '24px': 'w-[24px] h-[24px]',
      '18px': 'w-[18px] h-[18px]'
    },
    variant: {
      square: '',
      circle: 'rounded-full',
      rounded: 'rounded-[5px]'
    }
  },
  defaultVariants: {
    size: '48px',
    variant: 'circle'
  }
});

const AvatarIconVariants = cva('stroke-white', {
  variants: {
    size: {
      '48px': 'w-[29px] h-[29px]',
      '40px': 'w-[24px] h-[24px]',
      '32px': 'w-[24px] h-[24px]',
      '24px': 'w-[20px] h-[20px]',
      '18px': 'w-[18px] h-[18px]'
    }
  },
  defaultVariants: {
    size: '48px'
  }
});

export default Avatar;
