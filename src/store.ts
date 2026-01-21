import { create } from 'zustand';
import type { Swiper as SwiperType } from 'swiper';
import type { FullTodo } from './components/Todo/TodoItem';

interface TodoState {
  todos: FullTodo[];
  sortOption: string;

  swiper: SwiperType | null;
  activeIndex: number;
  
  setTodos: (todos: FullTodo[]) => void;
  addTodo: (todo: FullTodo) => void;
  removeTodo: (id: number) => void;
  updateTodo: (id: number, updatedFields: Partial<FullTodo>) => void;
  setSortOption: (option: string) => void;
  clearTodos: () => void;
  
  setSwiper: (swiper: SwiperType | null) => void;
  setActiveIndex: (index: number) => void;
  goToSlide: (index: number) => void;
}

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  sortOption: '',
  swiper: null,
  activeIndex: 0,
  
  setTodos: (todos) => set({ todos }),
  addTodo: (newTodo) => set((state) => ({ todos: [...state.todos, newTodo] })),
  removeTodo: (id) => set((state) => ({ todos: state.todos.filter(t => t.id !== id) })),
  updateTodo: (id, updatedFields) => set((state) => ({
    todos: state.todos.map(t => t.id === id ? { ...t, ...updatedFields } : t)
  })),
  setSortOption: (option) => set({ sortOption: option }),
  clearTodos: () => set({ todos: [] }),

  setSwiper: (swiper) => set({ swiper }),
  setActiveIndex: (activeIndex) => set({ activeIndex }),
  goToSlide: (index) => {
    const swiper = get().swiper;
    if (swiper) swiper.slideTo(index);
  }
}));