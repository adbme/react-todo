import type { FullTodo, Todo } from "../components/Todo/TodoItem";

const API_URL = 'https://api.todos.in.jt-lab.ch/todos';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const createTodo = async (todo: Todo): Promise<FullTodo> => {
    const apiData = {
        title: todo.title,
        content: todo.content,
        done: todo.done,
        due_date: todo.dueDate
    };

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Prefer': 'return=representation',
            'Accept': 'application/vnd.pgrst.object+json'
        },
        body: JSON.stringify(apiData),
    });

    // PROD: SUPPRIMER
    await delay(500);

    if (!response.ok) throw new Error('Failed to create todo');

    const createdTodo: FullTodo = await response.json();
    return createdTodo;
}

const fetchTodos = async (): Promise<FullTodo[]> => {
    const response = await fetch(API_URL);

    // PROD: SUPPRIMER
    await delay(500);

    if (!response.ok) throw new Error('Failed to fetch todos');

    const data = await response.json();

    return data.map((item: any) => ({
        id: item.id,
        title: item.title,
        content: item.content,
        done: item.done,
        dueDate: item.due_date,
    }));
}

const deleteTodoApi = async (id: number | string): Promise<void> => {
    const response = await fetch(`${API_URL}?id=eq.${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json'
        },
    });

    // PROD: SUPPRIMER
    await delay(500);

    console.log("delete response", response);

    if (!response.ok) {
        throw new Error(`Failed to delete todo with id ${id}`);
    }
};


export {
    fetchTodos,
    createTodo,
    deleteTodoApi
}