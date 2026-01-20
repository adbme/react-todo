import { toast } from 'react-toastify';
import Checkbox from '../ui/Checkbox';
import { deleteTodoApi, updateTodoApi } from '../../services/todosService';
import { useState, useEffect } from 'react';

export interface Todo {
  title: string;
  content: string;
  done: boolean;
  dueDate: string;
}

export interface FullTodo extends Todo {
  id: number;
}

type TodoItemProps = {
  todo: FullTodo,
  index: number,
  onTodoDeleted: (id: number) => void,
  onTodoUpdated: (id: number, updatedTodo: Partial<Todo>) => void
};

const TodoItem = ({ todo, index, onTodoDeleted, onTodoUpdated }: TodoItemProps) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [isEditingDueDate, setIsEditingDueDate] = useState(false);

  const [localTitle, setLocalTitle] = useState(todo.title);
  const [localContent, setLocalContent] = useState(todo.content);
  const [localDueDate, setLocalDueDate] = useState(todo.dueDate);
  const [localDone, setLocalDone] = useState(todo.done);

  useEffect(() => {
    setLocalTitle(todo.title);
    setLocalContent(todo.content);
    setLocalDueDate(todo.dueDate);
    setLocalDone(todo.done);
  }, [todo]);

  const deleteTodo = (id: number) => async () => {
    try {
      await deleteTodoApi(id);
      onTodoDeleted(id);
      toast.success("Todo deleted successfully");
    } catch (error: unknown) {
      console.error('Failed to delete todo:', error);
      toast.error(error instanceof Error ? error.message : "failed to delete todo");
    }
  };

  const updatedTodo = (fieldName: keyof Todo, value: any) => async () => {
    if (fieldName === 'title') setIsEditingTitle(false);
    if (fieldName === 'content') setIsEditingContent(false);
    if (fieldName === 'dueDate') setIsEditingDueDate(false);

    const updateFields: Partial<Todo> = {
      [fieldName]: fieldName === 'done' ? (value === true || value === 'true') : value,
    };

    try {
      await updateTodoApi(todo.id, updateFields);
      onTodoUpdated(todo.id, updateFields);
      toast.success("Todo updated successfully");
    } catch (error: unknown) {
      console.error('Failed to update todo:', error);
      toast.error(error instanceof Error ? error.message : "failed to update todo");

      if (fieldName === 'title') setLocalTitle(todo.title);
      if (fieldName === 'content') setLocalContent(todo.content);
      if (fieldName === 'dueDate') setLocalDueDate(todo.dueDate);
      if (fieldName === 'done') setLocalDone(todo.done);
    }
  };

  return (
    <div
      style={{ animationDelay: `${index * 100}ms` }}
      className="animate-entry-up bg-white/60 backdrop-blur-[50.1665px] border border-gray-200 p-4 rounded-lg flex flex-col gap-2"
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-4 items-start flex-1">
          <Checkbox
            defaultChecked={localDone}
            onChange={(checked) => {
              setLocalDone(checked);
              updatedTodo('done', checked)();
            }}
          />
          <h1 className={`text-xl relative font-bold flex items-center flex-1 ${localDone ? 'text-gray-400' : ''}`}>
            {localDone && <div className='h-[1.5px] w-full bg-gray-400 absolute'></div>}
            <input
              className={`w-full bg-transparent ${isEditingTitle ? 'ring-1 ring-gray-200 rounded px-1' : 'border-none focus:outline-none'}`}
              type="text"
              value={localTitle}
              onChange={(e) => setLocalTitle(e.target.value)}
              onDoubleClick={() => setIsEditingTitle(true)}
              onBlur={() => updatedTodo('title', localTitle)()}
              onKeyDown={(e) => e.key === 'Enter' && updatedTodo('title', localTitle)()}
              readOnly={!isEditingTitle}
            />
          </h1>
        </div>

        <button
          type='button'
          onClick={deleteTodo(todo.id)}
          className="p-2 bg-gray-100 text-gray-500 rounded-lg hover:bg-gray-300 transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 448 512">
            <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"></path>
          </svg>
        </button>
      </div>

      <div>
        <textarea
          className={`w-full resize-none text-sm bg-transparent ${isEditingContent ? 'ring-1 ring-gray-200 rounded p-1' : 'border-none focus:outline-none text-gray-400 mt-1'}`}
          value={localContent}
          onChange={(e) => setLocalContent(e.target.value)}
          onDoubleClick={() => setIsEditingContent(true)}
          onBlur={() => updatedTodo('content', localContent)()}
          readOnly={!isEditingContent}
          rows={1}
        />
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-400">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <input
          className={`bg-transparent ${isEditingDueDate ? 'ring-1 ring-gray-200 rounded px-1' : 'border-none focus:outline-none'}`}
          type="date"
          value={localDueDate}
          onChange={(e) => setLocalDueDate(e.target.value)}
          onDoubleClick={() => setIsEditingDueDate(true)}
          onBlur={() => updatedTodo('dueDate', localDueDate)()}
          readOnly={!isEditingDueDate}
        />
      </div>
    </div>
  );
};

export default TodoItem;