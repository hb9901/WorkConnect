import Typography from '@/components/Typography';
import { StrictPropsWithChildren } from '@/types/common';

interface InfoFormProps {
  title: string;
  content: string;
}

const InfoForm = ({ title, content, children }: StrictPropsWithChildren<InfoFormProps>) => {
  return (
    <div className="flex flex-row gap-[20px]">
      <div className="flex items-center justify-center w-[38px] h-[38px] rounded-full bg-[#FAFAFA]">{children}</div>
      <div className="flex flex-col gap-[6px]">
        <Typography variant="Subtitle14px" color="grey400">
          {title}
        </Typography>
        <Typography variant="Title16px" color="grey700Black">
          {content}
        </Typography>
      </div>
    </div>
  );
};

export default InfoForm;
