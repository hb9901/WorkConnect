'use client';
import useTodoList from '@/hooks/useTodo';
import useDateStore from '@/store/dateStore';
import useTimeModalStore from '@/store/timeModalStore';
import useUserStore from '@/store/userStore';
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
  const { workspaceUserId } = useUserStore();
  const { startTime, endTime, setTimeModalOpen, setStartTime, setEndTime, setStart, setEnd } = useTimeModalStore();
  const { todoList, addTodo, updateTodo } = useTodoList(workspaceUserId);
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
  const existStartTime = selectedTodo && dayjs(selectedTodo.start_date);
  const existEndTime = selectedTodo && dayjs(selectedTodo.end_date);
  const place = selectedTodo && selectedTodo.place;
  const date = dayjs(selectedDate).format('YYYY.MM.DD');
  const startTimeFormat = dayjs(startTime).format('a hh:mm');
  const endTimeFormat = dayjs(endTime).format('a hh:mm');

  useEffect(() => {
    const initTime = selectedDate.set('hour', 9).set('minute', 0);
    existStartTime ? setStartTime(existStartTime) : setStartTime(initTime);
    existEndTime ? setEndTime(existEndTime) : setEndTime(initTime);
    if (!(existPriority && existStatus)) return;

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

  const handleTimeClick = (isStart: boolean) => {
    isStart ? setStart() : setEnd();
    isStart ? setStartTime(dayjs(startTime)) : setEndTime(dayjs(endTime));
    setTimeModalOpen();
  };

  const handleAdd = async () => {
    if (!titleRef.current || !placeRef.current || !workspaceUserId) return;
    const startDate = selectedDate
      .set('hour', dayjs(startTime).hour())
      .set('minute', dayjs(startTime).minute())
      .toISOString();
    const endDate = selectedDate
      .set('hour', dayjs(endTime).hour())
      .set('minute', dayjs(endTime).minute())
      .toISOString();
    if (params.id === 'new') {
      const todo = {
        id: crypto.randomUUID(),
        title: titleRef.current.value,
        place: placeRef.current.value,
        workspace_user_id: workspaceUserId,
        start_date: startDate,
        end_date: endDate,
        priority: selectedPriority,
        status: selectedStatus
      };
      await addTodo(todo);
    } else {
      const id = params.id;
      const todo = {
        title: titleRef.current.value,
        place: placeRef.current.value,
        user_id: FAKE_USER_ID,
        start_date: startDate,
        end_date: endDate,
        priority: selectedPriority,
        status: selectedStatus
      };
      await updateTodo({ todo, id });
    }
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
          <button onClick={() => handleTimeClick(true)}>{startTimeFormat}</button>
          <div>{`>`}</div>
          <button onClick={() => handleTimeClick(false)}>{endTimeFormat}</button>
        </div>
        <div className="flex flex-row justify-between">
          <div>장소</div>
          <input placeholder="place" ref={placeRef} defaultValue={place ? place : ''} />
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

        <button onClick={handleAdd}>{params.id === 'new' ? '추가' : '수정'}</button>
      </div>
    </>
  );
};

export default ToDoAddPage;
