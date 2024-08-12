'use client';
import BottomSheet from '@/components/BottomSheet';
import Button from '@/components/Button';
import TextField from '@/components/TextField';
import Typography from '@/components/Typography';
import useTodoList from '@/hooks/useTodo';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import CalendarIcon from '@/icons/Calendar.svg';
import ChevronDownIcon from '@/icons/ChevronDownIcon.svg';
import ChevronRightIcon from '@/icons/ChevronRight.svg';
import ChevronUpIcon from '@/icons/ChevronUpIcon.svg';
import ClockIcon from '@/icons/Clock.svg';
import FlagIcon from '@/icons/Flag.svg';
import ListIcon from '@/icons/List.svg';
import MapPinIcon from '@/icons/MapPin.svg';
import { useSnackBar } from '@/providers/SnackBarContext';
import useDateStore from '@/store/dateStore';
import useUserStore from '@/store/userStore';
import { Tables } from '@/types/supabase';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import WeekButtons from '../../../_components/DateButtons';
import MonthDate from '../../../_components/MonthDate';
import DateBottom from './_components/DateBottom/DateBottom';
import Header from './_components/Header';
import InputCard from './_components/InputCard';
import OptionCard from './_components/OptionCard';
import useBottomTime from './_hooks/useBottomTime';
import useInput from './_hooks/useInput';

const priorityList = ['high', 'medium', 'low'];
const statusList = ['진행 전', '진행 중', '완료'];
type ToDoAddPageProps = {
  params: {
    id: string;
  };
};

const ToDoAddPage = ({ params }: ToDoAddPageProps) => {
  const initTime = dayjs().set('hour', 9).set('minute', 0);
  const queryClient = useQueryClient();
  const { openSnackBar } = useSnackBar();
  const { workspaceUserId } = useUserStore();
  const workspaceId = useWorkspaceId();
  const { addTodo, updateTodo } = useTodoList(workspaceUserId);
  const todoList = queryClient.getQueryData<Tables<'todo'>[]>([`todo${workspaceUserId}`]);
  const selectedTodo = todoList && todoList.filter((todo) => todo.id == params.id)[0];
  const existTitle = selectedTodo && selectedTodo.title;
  const existStatus = selectedTodo && selectedTodo.status;
  const existPriority = selectedTodo && selectedTodo.priority;
  const initStartTime = selectedTodo ? dayjs(selectedTodo.start_date) : initTime;
  const initEndTime = selectedTodo ? dayjs(selectedTodo.end_date) : initTime;
  const { selectedDate } = useDateStore();
  const [isDateBottomSheetOpen, setIsDateBottomSheetOpen] = useState<boolean>(false);

  const {
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
  } = useInput();

  const {
    startTime,
    endTime,
    isStartTime,
    isTimeBottomSheetOpen,
    setStartTime,
    setEndTime,
    handleSetStartTime,
    handleSetEndTime,
    handleTimeClick,
    hanldeBottomSheetClick
  } = useBottomTime(initStartTime, initEndTime);

  const placeRef = useRef<HTMLInputElement>(null);
  const place = selectedTodo && selectedTodo.place;
  const date = dayjs(selectedDate).format('YYYY.MM.DD');
  const startTimeFormat = dayjs(startTime).format('a hh:mm');
  const endTimeFormat = dayjs(endTime).format('a hh:mm');
  const router = useRouter();

  useEffect(() => {
    const initTime = dayjs().set('hour', 9).set('minute', 0);
    initStartTime ? setStartTime(initStartTime) : setStartTime(initTime);
    initEndTime ? setEndTime(initEndTime) : setEndTime(initTime);
    if (!(existPriority && existStatus && existTitle)) return;
    setSelectedStatus(existStatus);
    setSelectedPriority(existPriority);
    setTitle(existTitle);
  }, [todoList]);

  const handleAdd = async () => {
    if (!title || !placeRef.current || !workspaceUserId || !selectedPriority || !selectedStatus) {
      openSnackBar({ message: '빈 입력 값이 존재합니다!' });
      return;
    }
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
        title: title,
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
        title: title,
        place: placeRef.current.value,
        workspace_user_id: workspaceUserId,
        start_date: startDate,
        end_date: endDate,
        priority: selectedPriority,
        status: selectedStatus
      };
      await updateTodo({ todo, id });
    }
    router.push(`/${workspaceId}/to-do-list`);
  };

  const handleClickCalendar = () => {
    setIsDateBottomSheetOpen((prev) => !prev);
  };

  return (
    <div className="bg-white">
      <header>
        <Header />
      </header>
      <div className="flex flex-col gap-[20px] mt-[24px] px-[16px]">
        <TextField
          id="1"
          label="일정 이름"
          value={title}
          placeholder="일정 이름을 입력해주세요."
          LabelColor="grey700Black"
          children=""
          onChange={handleTitleChange}
        />
        <div className="flex flex-col gap-[6px]">
          <Typography variant="Body14px" color="grey700Black" className="px-[6px] mb-[2px]">
            기본 설정
          </Typography>
          <InputCard>
            <button className="flex flex-row w-full gap-[12px]" onClick={handleClickCalendar}>
              <CalendarIcon className="w-[20px] h-[20px] stroke-[#2F323C]" />
              <Typography variant="Subtitle16px" color="grey700Black">
                {date}
              </Typography>
            </button>
          </InputCard>
          <InputCard>
            <ClockIcon className="w-[20px] h-[20px] stroke-[#2F323C]" />
            <div className="flex flex-row items-center gap-[4px]">
              <button onClick={() => handleTimeClick(true)}>{startTimeFormat}</button>
              <ChevronRightIcon className="w-[16px] h-[16px] stroke-[#9096A7]" />
              <button onClick={() => handleTimeClick(false)}>{endTimeFormat}</button>
            </div>
          </InputCard>
          <InputCard>
            <button className="flex flex-row w-full justify-between" onClick={handleStatusClick}>
              <div className="flex flex-row items-center gap-[12px]">
                <ListIcon className="w-[20px] h-[20px] stroke-[#2F323C]" />
                <Typography variant="Subtitle16px" color="grey700Black">
                  진행 상태
                </Typography>
              </div>
              <div>
                {isStatusOpen ? (
                  <ChevronUpIcon className="w-[20px] h-[20px] stroke-[#9096A7]" />
                ) : (
                  <ChevronDownIcon className="w-[20px] h-[20px] stroke-[#9096A7]" />
                )}
              </div>
            </button>
          </InputCard>
          <div className="flex flex-col mt-[6px] gap-[4px]">
            {isStatusOpen &&
              statusList.map((status) => (
                <OptionCard
                  key={status}
                  option={status}
                  selectedOption={selectedStatus}
                  handleChange={handleChangeStatus}
                />
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-[6px]">
          <Typography variant="Body14px" color="grey700Black" className="px-[6px] mb-[2px]">
            추가 설정
          </Typography>
          <InputCard>
            <MapPinIcon className="w-[20px] h-[20px] stroke-[#2F323C]" />
            <Typography variant="Subtitle16px" color="grey700Black">
              <input
                defaultValue={place ? place : ''}
                placeholder="장소를 입력해주세요."
                className="focus:outline-none"
                ref={placeRef}
              />
            </Typography>
          </InputCard>
          <InputCard>
            <button className="flex flex-row w-full justify-between gap-[12px]" onClick={handlePriorityClick}>
              <div className="flex flex-row items-center gap-[12px]">
                <FlagIcon className="w-[20px] h-[20px] stroke-[#2F323C]" />
                <Typography variant="Subtitle16px" color="grey700Black">
                  우선 순위
                </Typography>
              </div>

              {isPriorityOpen ? (
                <ChevronUpIcon className="w-[20px] h-[20px] stroke-[#9096A7]" />
              ) : (
                <ChevronDownIcon className="w-[20px] h-[20px] stroke-[#9096A7]" />
              )}
            </button>
          </InputCard>

          <div className="flex flex-col mt-[6px] gap-[4px]">
            {isPriorityOpen &&
              priorityList.map((priority) => (
                <OptionCard
                  key={priority}
                  option={priority}
                  selectedOption={selectedPriority}
                  handleChange={handleChangePriority}
                />
              ))}
          </div>
        </div>

        <Button theme="primary" isFullWidth={true} className="mt-[65px] mb-[20px]" onClick={handleAdd}>
          {params.id === 'new' ? '작성 완료' : '수정 완료'}
        </Button>
      </div>

      <BottomSheet isOpen={isTimeBottomSheetOpen} onClose={hanldeBottomSheetClick}>
        <DateBottom
          isStartTime={isStartTime}
          handleClose={hanldeBottomSheetClick}
          startTime={startTime}
          endTime={endTime}
          handleSetStartTime={handleSetStartTime}
          handleSetEndTime={handleSetEndTime}
        />
      </BottomSheet>
      <BottomSheet isOpen={isDateBottomSheetOpen} onClose={handleClickCalendar}>
        <WeekButtons />
        <MonthDate />
      </BottomSheet>
    </div>
  );
};

export default ToDoAddPage;
