import { memo, use, useCallback, useEffect, useMemo, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import LandingView from '../../views/LandingView';
import TodoListView from '../../views/TodoListView';
import { fetchTodos } from '../../services/todosService';
import type { FullTodo } from '../Todo/TodoItem';
import { useTodoStore } from '../../store';


interface Option {
  label: string,
  value: string,
  sortFunction?: (todos: FullTodo[]) => FullTodo[]
}

const sortTodoByName = (todos: FullTodo[]) => {

  const sortedTodos = [...todos].sort((a, b) => {
    return a.title.localeCompare(b.title);
  });

  return sortedTodos;
}

let options: Option[];

const sortTodoByDueDate = (todos: FullTodo[]) => {
  const sortedTodos = [...todos].sort((a, b) => {
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  return sortedTodos;
}

const sortTodoByDone = (todos: FullTodo[], doneStatus: boolean) => {
  const sortedTodos = todos.filter(todo => todo.done === doneStatus);
  return sortedTodos;
}

options = [
  { label: 'Done', value: 'done', sortFunction: (todos) => sortTodoByDone(todos, true) },
  { label: 'Undone', value: 'undone', sortFunction: (todos) => sortTodoByDone(todos, false) },
  { label: 'Sort by name (a-z)', value: 'name', sortFunction: sortTodoByName },
  { label: 'Sort by due date (soonest first)', value: 'dueDate', sortFunction: sortTodoByDueDate },
];

const todoPromise = fetchTodos();

const Main = memo(() => {
  const initialTodos = use(todoPromise);
  const setTodos = useTodoStore(state => state.setTodos);
  const setSwiper = useTodoStore(state => state.setSwiper);
  const setActiveIndex = useTodoStore(state => state.setActiveIndex);

  useEffect(() => {
    setTodos(initialTodos);
  }, [initialTodos, setTodos]);

  return (
    <main className="w-screen">
      <Swiper 
        onSwiper={setSwiper} 
        onSlideChange={(s) => setActiveIndex(s.activeIndex)}
      >
        <SwiperSlide><TodoListView /></SwiperSlide>
        <SwiperSlide><LandingView /></SwiperSlide>
      </Swiper>
    </main>
  );
});

export default Main;
