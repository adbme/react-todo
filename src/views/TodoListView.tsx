import TodoItem from "../components/Todo/TodoItem";
import Button from "../components/ui/Button";
import InputDate from "../components/ui/InputDate";
import InputGroup from "../components/ui/InputGroup";
import OptionButton from "../components/ui/OptionButton";

const TodoListView = () => {
    const todos = [
        {
            id: 1,
            title: "Complete project documentation",
            description: "Write comprehensive documentation for the new feature including API endpoints and usage examples",
            done: false,
            dueDate: "2026-01-15"
        },
        {
            id: 2,
            title: "Review pull requests",
            description: "Review and approve pending pull requests from team members",
            done: true,
            dueDate: "2026-01-08"
        },
        {
            id: 3,
            title: "Update dependencies",
            description: "Update all npm packages to their latest stable versions and test for breaking changes",
            done: false,
            dueDate: "2026-01-20"
        },
        {
            id: 4,
            title: "Fix responsive design issues",
            description: "Address mobile layout problems on the dashboard page",
            done: false,
            dueDate: "2026-01-12"
        },
        {
            id: 5,
            title: "Team meeting preparation",
            description: "Prepare slides and agenda for weekly team sync meeting",
            done: true,
            dueDate: "2026-01-07"
        },
        {
            id: 6,
            title: "Optimize database queries",
            description: "Identify and optimize slow queries affecting application performance",
            done: false,
            dueDate: "2026-01-25"
        }
    ];

    return (
        <div className="w-screen h-screen flex items-center justify-center p-8">
            <div className="todos-containter h-[70vh] max-md:bottom-[100px] absolute pt-10 max-xl:px-10 w-screen overflow-y-auto">

                <div className="max-w-7xl mx-auto flex items-center justify-between w-full mb-10">
                    <div className="flex items-center gap-2">

                        <OptionButton >
                            All
                        </OptionButton>

                        <OptionButton >
                            Done
                        </OptionButton>

                        <OptionButton >
                            Undone
                        </OptionButton>
                                                <InputDate />

                    </div>

                    <InputGroup placeholder="Search todo name" inputIcon="search">
                        Search
                    </InputGroup>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
                    {todos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            id={todo.id}
                            title={todo.title}
                            description={todo.description}
                            done={todo.done}
                            dueDate={todo.dueDate}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TodoListView;