import { toast } from 'react-toastify';
import Checkbox from '../ui/Checkbox';
import { deleteTodoApi, updateTodoApi } from '../../services/todosService';
import { useState } from 'react';

export interface Todo {
  title: string;
  content: string;
  done: boolean;
  dueDate: string;
}

export interface FullTodo extends Todo {
  id: number;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

type TodoItemProps = { todo: FullTodo, index: number, onTodoDeleted: (id: number) => void, onTodoUpdated: (id: number, updatedTodo: Partial<Todo>) => void };

const TodoItem = ({ todo, index, onTodoDeleted, onTodoUpdated }: TodoItemProps) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [isEditingDueDate, setIsEditingDueDate] = useState(false);
  const [localTitle, setLocalTitle] = useState(todo.title);
  const [localContent, setLocalContent] = useState(todo.content);
  const [localDueDate, setLocalDueDate] = useState(todo.dueDate);
  const [localDone, setLocalDone] = useState(todo.done);

  const deleteTodo = (id: number) => async () => {
    try {
      await deleteTodoApi(id);
      onTodoDeleted(id);
      toast.success("Todo deleted successfully")
    } catch (error: unknown) {
      console.error('Failed to delete todo:', error);
      toast.error(error instanceof Error ? error.message : "failed to delete todo");
    }

  }

  const updatedTodo = (fieldName: keyof Todo, value: string) => async () => {
    if (fieldName === 'title') setIsEditingTitle(false)
    else if (fieldName === 'content') setLocalContent(value);
    else if (fieldName === 'dueDate') setLocalDueDate(value);
    else if (fieldName === 'done') setLocalDone(value === 'true');

    const updateFields: Partial<Todo> = {
      [fieldName]: fieldName === 'done' ? (value === 'true') : value,
    };

    try {
      await updateTodoApi(todo.id, updateFields);
      onTodoUpdated(todo.id, updateFields as FullTodo);
    }
    catch (error: unknown) {
      console.error('Failed to update todo:', error);
      toast.error(error instanceof Error ? error.message : "failed to update todo");
    }
  }

  return (
    <form>
      <div style={{
        animationDelay: `${index * 100}ms`
      }} className="animate-entry-up bg-white/60 backdrop-blur-[50.1665px] border border-gray-200 p-4 rounded-lg flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <div className="flex gap-4 items-start flex-1">
            <Checkbox defaultChecked={localDone} onChange={async (e) => { setLocalDone(e); updatedTodo('done', e ? 'true' : 'false')(); }} />
            <h1
              className={`text-xl relative font-bold flex items-center ${todo.done ? 'text-gray-400' : ''}`}
            >
              {todo.done && (
                <div className='h-[1.5px] w-full bg-gray-400 absolute'>
                </div>
              )}

              <input
                className={`w-full ${isEditingTitle ? '' : 'border-none focus:outline-none'}`}
                type="text"
                value={`${localTitle}`}
                onChange={(e) => setLocalTitle(e.target.value)}
                onDoubleClick={() => setIsEditingTitle(true)}
                onBlur={(e) => updatedTodo('title', e.target.value)()}
                readOnly={!isEditingTitle}
              />
              {/* PROD: SUPPRIMER ID */}
              ({todo.id})
            </h1>
          </div>

          <button onClick={deleteTodo(todo.id)} className="p-2 bg-gray-100 text-gray-500 rounded-lg hover:bg-gray-300 transition-colors">
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 448 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"></path>
            </svg>
          </button>
        </div>
        <div>
          <p className="truncate text-gray-400 text-sm mt-1">
            <textarea
              className={`w-full resize-none ${isEditingContent ? '' : 'border-none focus:outline-none'}`}
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
              onDoubleClick={() => setIsEditingContent(true)}
              onBlur={(e) => updatedTodo('content', e.target.value)()}
              readOnly={!isEditingContent}
            />
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-400">

          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <input
            className={`text-sm text-gray-400 ${isEditingDueDate ? '' : 'border-none focus:outline-none'}`}
            type="date"
            value={localDueDate}
            onChange={(e) => setLocalDueDate(e.target.value)}
            onDoubleClick={() => setIsEditingDueDate(true)}
            onBlur={(e) => updatedTodo('dueDate', e.target.value)()}
            readOnly={!isEditingDueDate}
          />
        </div>
      </div>
    </form>
  );
};

export default TodoItem;
