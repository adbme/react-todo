import { type ReactNode, useActionState, useState } from 'react';
import Button from '../ui/Button';
import type { FullTodo, Todo } from '../Todo/TodoItem';
import { toast } from 'react-toastify';
import type swiper from 'swiper';
import { createTodo } from '../../services/todosService';

interface InputGroupProps {
  children?: ReactNode;
  className?: string;
  placeholder?: string;
  inputIcon?: 'search' | null;
  onSubmit: (todo: FullTodo) => void;
  swiper: swiper | null;
}

const InputGroup = ({
  children,
  className = '',
  placeholder = '',
  inputIcon = null,
  swiper,
  onSubmit,
}: InputGroupProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleBlur = (e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsFocused(false);
    }
  };

  const isValid = title.trim().length > 0 && content.trim().length > 0 && dueDate.trim().length > 0;

  const handleTodoCreation = async (state, formData: FormData) => {
    if (!isValid) {
      const message = "Please fill in all fields"
      toast.error(message)
      return message;
    };

    const newTodo: Todo = {
      title,
      content,
      dueDate: dueDate,
      done: false,
    };

    try {
      const createdTodo = await createTodo(newTodo);
      onSubmit(createdTodo);
    } catch (error: any) {
      console.error('Failed to create todo:', error);
      const message = error?.message || "failed to create todo";
      toast.error(message);
      return message;
    }

    if (swiper) {
      swiper.slideTo(0);
    }

    const message = "Todo created successfully"
    toast.success(message)
    return message;
  };

  const [currentState, formAction, isPending] = useActionState(handleTodoCreation, "");

  const inputIcons = {
    search: (
      <svg
        className="w-4 h-4"
        fill="currentColor"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
      </svg>
    ),
  };

  return (
    <form action={formAction}>
      <div
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        className={`${isFocused ? 'animate-custom-shadow' : 'no-shadow'} ${inputIcon ? 'pr-0' : ''} bg-white flex flex-col rounded-2xl border border-gray-200 ${className}`}
      >
        <div className='flex items-center gap-4 pr-3'>
          <div className="absolute ml-6 opacity-40">
            {inputIcon && inputIcons[inputIcon]}
          </div>

          <input
            type="text"
            name="title"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            className={` !border-none !outline-none !ring-0 ${inputIcon ? 'pl-14 py-0' : 'pl-8 py-6'}`}
            placeholder={placeholder}

          />
          <Button disabled={!isValid || isPending} type='submit' variant="fill" rounded="normal">
            {isValid && !isPending ? (
              <svg className="popup-animate w-4 h-8" fill='currentColor' viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"></path>
              </svg>
            ) : isPending ? (
              <svg className="animate-spin w-4 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              children
            )}
          </Button>
        </div>
        <div
          className={`
          ${inputIcon ? 'hidden' : 'flex flex-col gap-y-4 px-4 overflow-hidden transition-all duration-300 ease-in-out'}
          ${isFocused ? 'max-h-[400px] opacity-100 p-4' : 'max-h-0 opacity-0 pb-0'}
        `}
        >
          <textarea
            name="content"
            id="content"
            onChange={(e) => setContent(e.target.value)}
            className="!border-none !outline-none transform transition-all p-4 w-full duration-200 rounded-lg focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 bg-gray-100 text-gray-600"
            placeholder="Description..."
          />
          <input
            type='date'
            name='due_date'
            id='due_date'
            onChange={(e) => setDueDate(e.target.value)}
            className="!border-none !outline-none transform transition-all p-4 w-full duration-200 rounded-lg focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 bg-gray-100 text-gray-400"
          />
        </div>
      </div>
    </form>
  );
};

export default InputGroup;
