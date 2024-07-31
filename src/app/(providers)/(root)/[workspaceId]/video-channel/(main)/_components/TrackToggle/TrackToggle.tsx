import Typography from '@/components/Typography';
import type { CaptureOptionsBySource, ToggleSource } from '@livekit/components-core';
import { useTrackToggle } from '@livekit/components-react';
import { TrackPublishOptions } from 'livekit-client';
import * as React from 'react';
import ToggleIcon from '../ToggleIcon/getSourceIcon';
export interface TrackToggleProps<T extends ToggleSource>
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  source: T;
  showIcon?: boolean;
  initialState?: boolean;
  /**
   * Function that is called when the enabled state of the toggle changes.
   * The second function argument `isUserInitiated` is `true` if the change was initiated by a user interaction, such as a click.
   */
  onChange?: (enabled: boolean, isUserInitiated: boolean) => void;
  captureOptions?: CaptureOptionsBySource<T>;
  publishOptions?: TrackPublishOptions;
  onDeviceError?: (error: Error) => void;
}

const TrackToggle: <T extends ToggleSource>(
  props: TrackToggleProps<T> & React.RefAttributes<HTMLButtonElement>
) => React.ReactNode = /* @__PURE__ */ React.forwardRef(function TrackToggle<T extends ToggleSource>(
  { showIcon, ...props }: TrackToggleProps<T>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { buttonProps, enabled } = useTrackToggle(props);
  return (
    <button ref={ref} {...buttonProps} className="flex flex-col items-center">
      {(showIcon ?? true) && <ToggleIcon source={props.source} enabled={enabled} />}
      <Typography variant={'Subtitle12px'} color="grey700Black" as="p">
        {props.children}
      </Typography>
    </button>
  );
});

export default TrackToggle;
