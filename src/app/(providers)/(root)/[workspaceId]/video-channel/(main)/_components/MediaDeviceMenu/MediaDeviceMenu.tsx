import { MediaDeviceMenuProps, MediaDeviceSelect } from '@livekit/components-react';
import { useLayoutEffect, useRef, useState } from 'react';

const MediaDeviceMenu = ({
  kind,
  initialSelection,
  onActiveDeviceChange,
  tracks,
  requestPermissions = false,
  ...props
}: MediaDeviceMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [updateRequired, setUpdateRequired] = useState<boolean>(true);
  const [needPermissions, setNeedPermissions] = useState(requestPermissions);
  const handleActiveDeviceChange = (kind: MediaDeviceKind, deviceId: string) => {
    setIsOpen(false);
    onActiveDeviceChange?.(kind, deviceId);
  };
  const tooltip = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (isOpen) {
      setNeedPermissions(true);
    }
  }, [isOpen]);

  return (
    <>
      <div className="lk-device-menu" ref={tooltip} style={{ visibility: isOpen ? 'visible' : 'hidden' }}>
        {kind ? (
          <MediaDeviceSelect
            initialSelection={initialSelection}
            onActiveDeviceChange={(deviceId) => handleActiveDeviceChange(kind, deviceId)}
            onDeviceListChange={setDevices}
            kind={kind}
            track={tracks?.[kind]}
            requestPermissions={needPermissions}
          />
        ) : (
          <>
            <h2>Audio inputs</h2>
            <MediaDeviceSelect
              kind="audioinput"
              onActiveDeviceChange={(deviceId) => handleActiveDeviceChange('audioinput', deviceId)}
              onDeviceListChange={setDevices}
              track={tracks?.audioinput}
              requestPermissions={needPermissions}
            />
            <div className="lk-device-menu-heading">Video inputs</div>
            <MediaDeviceSelect
              kind="videoinput"
              onActiveDeviceChange={(deviceId) => handleActiveDeviceChange('videoinput', deviceId)}
              onDeviceListChange={setDevices}
              track={tracks?.videoinput}
              requestPermissions={needPermissions}
            />
          </>
        )}
      </div>
    </>
  );
};

export default MediaDeviceMenu;
