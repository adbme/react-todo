import TodoItem, { type TodoItemProps } from '../components/Todo/TodoItem';
import Button from '../components/ui/Button';
import InputDate from '../components/ui/InputDate';
import InputGroup from '../components/ui/InputGroup';
import OptionButton from '../components/ui/OptionButton';
import { use, Suspense } from 'react';
import Spinner from '../components/ui/Spinner';
import { toast } from 'react-toastify';
import { ErrorBoundary } from 'react-error-boundary';

const TodoError = () => {
  return (
    <>
      <div className="animate-entry-up col-span-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-300 rounded-2xl bg-white/30 backdrop-blur-sm transition-all animate-in fade-in zoom-in duration-500">
        <div className="bg-black p-4 rounded-full mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-xl font-semibold text-gray-600">No tasks to complete</p>
        <p className="text-gray-400 mt-1">Everything is up to date.</p>
      </div>
    </>
  )
}

const TodoList = () => {
  const todos = use(fetchTodos);
  return (
    <>
      {todos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          content={todo.content}
          done={todo.done}
          dueDate={todo.dueDate}
          index={index}
        />
      ))}
    </>
  );
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const fetchTodos = fetch("https://api.todos.in.jt-lab.ch:443/todos")
  .then(async (res) => {
    // PROD : delete
    await delay(5000);

    if (!res.ok) throw new Error('API Error');

    return res.json() as Promise<TodoItemProps[]>;
  })
  .catch((err) => {
    throw new Error("Failed to fetch todos, check network")
  });



const TodoListView = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center p-8">
      <div className="todos-containter h-[70vh] max-md:bottom-[100px] absolute pt-10 max-xl:px-10 w-screen overflow-y-auto">
        <div className="max-w-7xl mx-auto flex items-center justify-between w-full mb-10">
          <div className="flex items-center gap-2">
            <OptionButton>All</OptionButton>

            <OptionButton>Done</OptionButton>

            <OptionButton>Undone</OptionButton>
            <InputDate />
          </div>

          <InputGroup placeholder="Search todo name" inputIcon="search">
            Search
          </InputGroup>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          <ErrorBoundary fallback={<TodoError />} onError={(error) => {toast.error(error.message);}}>
            <Suspense fallback={<Spinner variant="button" text="Loading todos" />}>
              <TodoList />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default TodoListView;
