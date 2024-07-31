import { useDisconnectButton } from '@livekit/components-react';
import React from 'react';

export interface DisconnectButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  stopTracks?: boolean;
}

export const DisconnectButton: (
  props: DisconnectButtonProps & React.RefAttributes<HTMLButtonElement>
) => React.ReactNode = /* @__PURE__ */ React.forwardRef<HTMLButtonElement, DisconnectButtonProps>(
  function DisconnectButton(props: DisconnectButtonProps, ref) {
    const { buttonProps } = useDisconnectButton(props);
    return (
      <button
        ref={ref}
        {...buttonProps}
        className="bg-error p-4 hover:brightness-90 text-white rounded-lg h-[33px] flex items-center justify-center "
      >
        {props.children}
      </button>
    );
  }
);
export default DisconnectButton;
