import React from 'react';
export interface SettingsMenuToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
export const SettingsMenuToggle: (
  props: SettingsMenuToggleProps & React.RefAttributes<HTMLButtonElement>
) => React.ReactNode = /* @__PURE__ */ React.forwardRef<HTMLButtonElement, SettingsMenuToggleProps>(
  function SettingsMenuToggle(props: SettingsMenuToggleProps, ref) {
    const { mergedProps } = useSettingsToggle({ props });

    return (
      <button ref={ref} {...mergedProps}>
        {props.children}
      </button>
    );
  }
);

export default SettingsMenuToggle;
