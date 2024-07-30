'use client';

import { useRouter } from 'next/navigation';

const ToDoAddButton = () => {
  const router = useRouter();
  const handleClickAdd = () => {
    router.push(`to-do-list/add/new`);
  };
  return <button onClick={handleClickAdd}>ToDoAddButton</button>;
};

export default ToDoAddButton;
