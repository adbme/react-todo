import TodoItem, { type FullTodo } from '../components/Todo/TodoItem';
import InputGroup from '../components/ui/InputGroup';
import { Suspense, useMemo } from 'react';
import Spinner from '../components/ui/Spinner';
import { toast } from 'react-toastify';
import { ErrorBoundary } from 'react-error-boundary';
import { useTodoStore } from '../store';
import Button from '../components/ui/Button';
import { deleteAllTodosApi } from '../services/todosService';

const SORT_OPTIONS = [
  { label: 'Done', value: 'done' },
  { label: 'Undone', value: 'undone' },
  { label: 'Sort by name (a-z)', value: 'name' },
  { label: 'Sort by due date', value: 'dueDate' },
];

const TodoError = () => (
  <div className="animate-entry-up col-span-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-300 rounded-2xl bg-white/30 backdrop-blur-sm">
    <div className="bg-black p-4 rounded-full mb-4">
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <p className="text-xl font-semibold text-gray-600">No tasks to complete</p>
    <p className="text-gray-400 mt-1">Everything is up to date.</p>
  </div>
);

const TodoListView = () => {
  const todos = useTodoStore((state) => state.todos);
  const clearTodos = useTodoStore((state) => state.clearTodos);
  const sortOption = useTodoStore((state) => state.sortOption);
  const setSortOption = useTodoStore((state) => state.setSortOption);

  const sortedTodos = useMemo(() => {
    let result = [...todos];

    switch (sortOption) {
      case 'done':
        return result.filter(t => t.done);
      case 'undone':
        return result.filter(t => !t.done);
      case 'name':
        return result.sort((a, b) => a.title.localeCompare(b.title));
      case 'dueDate':
        return result.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
      default:
        return result;
    }
  }, [todos, sortOption]);

  const handleDeleteAll = async () => {
    if (todos.length === 0) return;
    
    if (!confirm("Are you sure you want to delete all tasks?")) return;

    const toastId = toast.loading("Deleting all tasks...");
    
    try {
      await deleteAllTodosApi();
      clearTodos();
      toast.update(toastId, { 
        render: "All tasks cleared!", 
        type: "success", 
        isLoading: false, 
        autoClose: 3000 
      });
    } catch (error: any) {
      toast.update(toastId, { 
        render: "Error: " + error.message, 
        type: "error", 
        isLoading: false, 
        autoClose: 3000 
      });
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center p-8">
      <div className="todos-containter h-[70vh] max-md:bottom-[100px] absolute pt-10 max-xl:px-10 w-screen overflow-y-auto">
        <div className="max-w-7xl mx-auto flex items-center justify-between w-full mb-10">
          <div className="flex items-center gap-2">
            <Button 
              type='button' 
              onClick={handleDeleteAll} 
              variant="fill" 
              rounded="normal"
            >
              <svg className="w-4 h-4 mr-2" fill='none' stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear List
            </Button>

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-white/60 backdrop-blur-[50.1665px] rounded-2xl border border-gray-200 px-4 py-3 transition duration-200 w-fit"
            >
              <option value="">All</option>
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <InputGroup placeholder="Search todo name" inputIcon="search">
            Search
          </InputGroup>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          <ErrorBoundary fallback={<TodoError />} onError={(error) => toast.error(error.message)}>
            <Suspense fallback={<Spinner variant="button" text="Loading todos" />}>
              {sortedTodos.map((todo, index) => (
                <TodoItem
                  key={`${todo.id}-${sortOption}`}
                  todo={todo}
                  index={index}
                />
              ))}
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default TodoListView;