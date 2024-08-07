import { ChangeEvent, useState } from 'react';

const useInput = () => {
  const [title, setTitle] = useState<string>('');
  const [selectedPriority, setSelectedPriority] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [isPriorityOpen, setIsPriorityOpen] = useState<boolean>(false);
  const [isStatusOpen, setIsStatusOpen] = useState<boolean>(false);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChangePriority = (priority: string) => {
    setSelectedPriority(priority);
  };

  const handleChangeStatus = (status: string) => {
    setSelectedStatus(status);
  };

  const handlePriorityClick = () => {
    setIsPriorityOpen((prev) => !prev);
  };

  const handleStatusClick = () => {
    setIsStatusOpen((prev) => !prev);
  };

  return {
    title,
    selectedPriority,
    selectedStatus,
    isPriorityOpen,
    isStatusOpen,
    setSelectedStatus,
    setSelectedPriority,
    setTitle,
    handleTitleChange,
    handleChangePriority,
    handleChangeStatus,
    handlePriorityClick,
    handleStatusClick
  };
};

export default useInput;
