import { forwardRef } from 'react';

const FileInput = forwardRef<
  HTMLInputElement,
  {
    name: string;
    accept: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
>(({ name, accept, onChange }, ref) => {
  return <input type="file" ref={ref} name={name} className="hidden" onChange={onChange} accept={accept} />;
});

export default FileInput;
