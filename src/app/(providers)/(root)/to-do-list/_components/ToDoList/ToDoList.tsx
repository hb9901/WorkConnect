"use client";
const MOCK_TODOLIST = [
  {
    todo_id: 1,
    title: "Title1",
    time: "13:00 ~ 15:00",
    place: "회의실",
    attendees: ["user1", "user2", "user3"],
  },
  {
    todo_id: 1,
    title: "Title2",
    time: "11:00 ~ 12:00",
    place: "전략실",
    attendees: ["user4", "user5"],
  },
  {
    todo_id: 1,
    title: "Title6",
    time: "16:00 ~ 17:00",
    place: "회의실3",
    attendees: ["user1", "user2", "user3", "user4"],
  },
];

const ToDoList = () => {
  return (
    <div className="flex flex-col gap-y-4 mt-5">
      {MOCK_TODOLIST.map((todo) => (
        <div className="border border-black">
          <strong>{todo.title}</strong>
          <div>
            {todo.time} | {todo.place}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToDoList;
