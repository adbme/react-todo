import { memo, use, useCallback, useEffect, useState } from 'react';
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

const Main = memo(({ setSwiper, setActiveIndex, swiper }: MainProps) => {
  const initalTodos = use(todoPromise);
  const [todos, setTodos] = useState(initalTodos);
  const [sortOption, setSortOption] = useState<string>('');

  const addTodo = (newTodo: FullTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }

  const removeTodo = useCallback((id: number) => {
    setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
  }, []);

  const updateTodo = useCallback((id: number, updatedTodo: Partial<FullTodo>) => {
    setTodos((prevTodos) => prevTodos.map(todo => {
      if (todo.id === id) {
        return { ...todo, ...updatedTodo };
      }
      return todo;
    }));
  }, []);

  const sortTodos = (option: string) => {
    setSortOption(option);

    console.log("Sorting todos by:", option);

    // const selectedOption = options.find(opt => opt.value === option);
    // if (selectedOption && selectedOption.sortFunction) {
    //   setTodos((prevTodos) => {
    //     const todosCopy = [...prevTodos];
    //     todosCopy.sort(selectedOption.sortFunction);
    //     return todosCopy;
    //   });
    // }
  }

  let todosToDisplay = todos;
  const selectedOption = options.find(opt => opt.value === sortOption);
    if (selectedOption && selectedOption.sortFunction) {
      console.log(todos)
      todosToDisplay = selectedOption.sortFunction(todos);

      console.log("Todos sorted:", todosToDisplay);
    }

  return (
    <main className="w-screen">
      <Swiper
        className="mySwiper h-full"
        onSwiper={setSwiper}
        onSlideChange={(s) => setActiveIndex(s.activeIndex)}
      >
        <SwiperSlide>
          <TodoListView todos={todosToDisplay} onTodoDeleted={removeTodo} onTodoUpdated={updateTodo} options={options} sortOption={sortOption} onTodoSorted={sortTodos} />
        </SwiperSlide>

        <SwiperSlide>
          <LandingView swiper={swiper} onTodoCreated={addTodo} />
        </SwiperSlide>
      </Swiper>
    </main>
  );
});

export default Main;
