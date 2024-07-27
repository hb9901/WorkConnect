'use client';
import useTodoList from '@/hooks/useTodo';
import useDateStore from '@/store/dateStore';
import useTimeModalStore from '@/store/timeModalStore';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import Header from './_components/Header';

const FAKE_USER_ID = '9f144ad8-59c1-4da1-be3d-e9e1c207eddb';
const priorityList = ['high', 'medium', 'low'];
const statusList = ['진행 전', '진행 중', '진행 완료'];
type ToDoAddPageProps = {
  params: {
    id: string;
  };
};

const ToDoAddPage = ({ params }: ToDoAddPageProps) => {
  const { setTimeModalOpen } = useTimeModalStore();
  const { todoList, addTodo } = useTodoList();
  const selectedTodo = todoList && todoList.filter((todo) => todo.id == params.id)[0];
  const { selectedDate } = useDateStore();
  const [selectedPriority, setSelectedPriority] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [isPriorityOpen, setIsPriorityOpen] = useState<boolean>(false);
  const [isStatusOpen, setIsStatusOpen] = useState<boolean>(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const placeRef = useRef<HTMLInputElement>(null);
  const existStatus = selectedTodo && selectedTodo.status;
  const existPriority = selectedTodo && selectedTodo.priority;
  const startTime = selectedTodo ? dayjs(selectedTodo.start_date).format('a hh:MM') : 'am 09:00';
  const endTime = selectedTodo ? dayjs(selectedTodo.end_date).format('a hh:MM') : 'pm 09:00';
  const date = dayjs(selectedDate).format('YYYY.MM.DD');

  useEffect(() => {
    setSelectedStatus(existStatus);
    setSelectedPriority(existPriority);
  }, [existStatus, existPriority]);

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

  const handleTimeClick = () => {
    setTimeModalOpen();
  };

  const handleAdd = async () => {
    if (!titleRef.current || !placeRef.current) return;
    const startDate = selectedDate.set('hour', 4).set('minute', 10).toISOString();
    const endDate = selectedDate.set('hour', 6).set('minute', 10).toISOString();
    const todo = {
      id: crypto.randomUUID(),
      title: titleRef.current.value,
      place: placeRef.current.value,
      user_id: FAKE_USER_ID,
      start_date: startDate,
      end_date: endDate,
      priority: selectedPriority,
      status: selectedStatus
    };
    await addTodo(todo);
  };

  return (
    <>
      <header>
        <Header />
      </header>
      <div className="flex flex-col gap-4 mt-5 px-4">
        <strong>{date}</strong>
        <input
          placeholder="Title"
          defaultValue={selectedTodo && selectedTodo.title}
          ref={titleRef}
          className="text-3xl font-bold"
        />
        <div className="flex flex-row justify-around">
          <button onClick={handleTimeClick}>{startTime}</button>
          <div>{`>`}</div>
          <button onClick={handleTimeClick}>{endTime}</button>
        </div>
        <div className="flex flex-row justify-between">
          <div>장소</div>
          <input placeholder="place" ref={placeRef} defaultValue={selectedTodo && selectedTodo.place} />
        </div>
        <div className="flex flex-row justify-between">
          <div>순위</div>
          <button onClick={handlePriorityClick}>+</button>
        </div>
        {isPriorityOpen &&
          priorityList.map((priority) => (
            <label key={priority} className="flex flex-row mx-4 justify-between">
              <div className="text-sm">{priority}</div>
              <input
                value={priority}
                type="checkbox"
                name="priority"
                checked={priority === selectedPriority}
                onChange={() => handleChangePriority(priority)}
              />
            </label>
          ))}
        <div className="flex flex-row justify-between">
          <div>진행 상태</div>
          <button onClick={handleStatusClick}>+</button>
        </div>
        {isStatusOpen &&
          statusList.map((status) => (
            <label key={status} className="flex flex-row mx-4 justify-between">
              <div className="text-sm">{status}</div>
              <input
                value={status}
                type="checkbox"
                name="status"
                checked={status === selectedStatus}
                onChange={() => handleChangeStatus(status)}
              />
            </label>
          ))}

        <button onClick={handleAdd}>추가</button>
      </div>
    </>
  );
};

export default ToDoAddPage;
