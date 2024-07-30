import Typography from '../Typography';

export interface HelperTextProps {
  message?: string;
  isError?: boolean;
  isSuccess?: boolean;
}

const HelperText = ({ message, isError, isSuccess }: HelperTextProps) => {
  const messageColor = isError ? 'error' : isSuccess ? 'success' : 'grey200';

  return (
    <div>
      <Typography variant="Body14px" color={messageColor} className="px-[6px]">
        {message}
      </Typography>
    </div>
  );
};

export default HelperText;
