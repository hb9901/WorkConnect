import { AirPlayIcon } from '@/icons';
import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { ComponentProps } from 'react';

type VideoChatAvatarProps = VariantProps<typeof AvatarVariants> & ComponentProps<'div'>;

const VideoChatAvatar = ({ size = '40px', className, ...props }: VideoChatAvatarProps) => {
  return (
    <div className={clsx(AvatarVariants({ size }), className)} {...props}>
      <AirPlayIcon className={iconVariants({ size })} />
    </div>
  );
};

const AvatarVariants = cva('flex items-center justify-center bg-primary200Main rounded-full', {
  variants: {
    size: {
      '40px': 'w-[40px] h-[40px]',
      '140px': 'w-[140px] h-[140px]'
    }
  },
  defaultVariants: {
    size: '40px'
  }
});

const iconVariants = cva('text-white stroke-current', {
  variants: {
    size: {
      '40px': 'w-[20px] h-[20px]',
      '140px': 'w-[70px] h-[70px]'
    }
  },
  defaultVariants: {
    size: '40px'
  }
});

export default VideoChatAvatar;
