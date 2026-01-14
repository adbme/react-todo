import Checkbox from '../ui/Checkbox';

export interface TodoItemProps {
  id: number;
  title: string;
  content: string;
  done: boolean;
  dueDate: string;
  index?: number;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const TodoItem = ({ id, title, content, done, dueDate, index = 0 }: TodoItemProps) => {
  return (
    <div style={{
      animationDelay: `${index * 100}ms`
    }} className="animate-entry-up bg-white/60 backdrop-blur-[50.1665px] border border-gray-200 p-4 rounded-lg flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <div className="flex gap-4 items-start flex-1">
          <Checkbox defaultChecked={done} />
          <h1
            className={`text-xl font-bold ${done ? 'line-through text-gray-400' : ''}`}
          >
            {/* PROD: SUPPRIMER LE ID */}
            {title} - ({id})
          </h1>
        </div>

        <button className="p-2 bg-gray-100 text-gray-500 rounded-lg hover:bg-gray-300 transition-colors">
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 448 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"></path>
          </svg>
        </button>
      </div>
      <div>
        <p className="truncate text-gray-400 text-sm mt-1">{content}</p>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
        <svg
          className="w-4 h-4"
          fill="currentColor"
          viewBox="0 0 448 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z" />
        </svg>
        <span>{formatDate(dueDate)}</span>
      </div>
    </div>
  );
};

export default TodoItem;
