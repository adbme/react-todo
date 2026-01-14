import { memo, use, useCallback, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import LandingView from '../../views/LandingView';
import TodoListView from '../../views/TodoListView';
import { fetchTodos } from '../../services/todosService';
import type { FullTodo } from '../Todo/TodoItem';

type MainProps = {
  setSwiper: (S: SwiperType | null) => void
  setActiveIndex: (n: number) => void
  swiper: SwiperType | null
}

const todoPromise = fetchTodos();

const Main = memo(({ setSwiper, setActiveIndex, swiper }: MainProps) => {
  const initalTodos = use(todoPromise);
  const [todos, setTodos] = useState(initalTodos);

  const addTodo = (newTodo: FullTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }

  const removeTodo = useCallback((id: number) => {
    setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
  }, []);

  return (
    <main className="w-screen">
      <Swiper
        className="mySwiper h-full"
        onSwiper={setSwiper}
        onSlideChange={(s) => setActiveIndex(s.activeIndex)}
      >
        <SwiperSlide>
          <TodoListView todos={todos} onTodoDeleted={removeTodo} />
        </SwiperSlide>

        <SwiperSlide>
          <LandingView swiper={swiper} onTodoCreated={addTodo} />
        </SwiperSlide>
      </Swiper>
    </main>
  );
});

export default Main;
