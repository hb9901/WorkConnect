'use client';
import useTodo from '@/hooks/useTodo';
import useDateStore from '@/store/dateStore';
import { useRef } from 'react';

const FAKE_USER_ID = '8062212a-f117-4492-a8ac-c642afab4a41';

const ToDoAddPage = () => {
  const { addTodo } = useTodo();
  const { selectedDate } = useDateStore();
  const titleRef = useRef(null);
  const startHourRef = useRef(null);
  const startMinuteRef = useRef(null);
  const endHourRef = useRef(null);
  const endMinuteRef = useRef(null);
  const placeRef = useRef(null);
  const startDate = selectedDate.set('hour', 4).set('minute', 10).toISOString();
  const endDate = selectedDate.set('hour', 6).set('minute', 10).toISOString();

  const handleAdd = async () => {
    if (!titleRef.current || !placeRef.current) return;
    const startDate = selectedDate.set('hour', 4).set('minute', 10).toISOString();
    const endDate = selectedDate.set('hour', 6).set('minute', 10).toISOString();
    const todo = {
      id: 21,
      title: '테스트 제목',
      place: '테스트 장소',
      user_id: FAKE_USER_ID,
      is_done: false,
      start_date: startDate,
      end_date: endDate
    };
    await addTodo(todo);
  };

  return (
    <div className="flex flex-col">
      <label>제목</label>
      <input placeholder="Title" ref={titleRef} />
      <label>시작 시간</label>
      <input placeholder="startHour" ref={startHourRef} />
      <label>시작 분</label>
      <input placeholder="startMinute" ref={startMinuteRef} />
      <label>종료 시간</label>
      <input placeholder="endHour" ref={endHourRef} />
      <label>종료 분</label>
      <input placeholder="endMinute" ref={endMinuteRef} />
      <label>장소</label>
      <input placeholder="place" ref={placeRef} />
      <button onClick={handleAdd}>추가</button>
    </div>
  );
};

export default ToDoAddPage;
