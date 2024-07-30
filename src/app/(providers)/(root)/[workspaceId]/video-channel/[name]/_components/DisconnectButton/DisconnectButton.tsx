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
      <button ref={ref} {...buttonProps}>
        {props.children}
      </button>
    );
  }
);
export default DisconnectButton;
