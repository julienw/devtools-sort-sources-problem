export type Todo = {
    id: number;
    text: string;
    done: boolean;
};

const todos: Todo[] = [];
let todoIdCounter: number = 0;

// Returns the todos list, filtered according to the filter.
// If the filter is "all" it returns the model directly without slicing it.
// Typescript should prevent the caller from doing any mutation.
export function getTodos(filter: "all" | "completed" | "active" = "all"): ReadonlyArray<Readonly<Todo>> {
    if (filter === "all") return todos;

    const keepDone = filter === "completed";
    return todos.filter(({ done }) => done === keepDone);
}

// Returns the new id.
export function pushTodo(todoText: string): number {
    todos.push({
        id: ++todoIdCounter,
        text: todoText,
        done: false,
    });
    return todoIdCounter;
}

// Returns true if todoId is a valid id, false otherwise.
export function toggleTodo(todoId: number) {
    const todo = todos.find(({ id }) => id === todoId);
    if (!todo) return false;
    todo.done = !todo.done;
    return true;
}

export function toggleAll(value: boolean) {
    for (const todo of todos) {
        todo.done = value;
    }
}

// Returns true if todoId is a valid id, false otherwise.
export function removeTodo(todoId: number) {
    const todoIndex = todos.findIndex(({ id }) => id === todoId);
    if (todoIndex < 0) {
        return false;
    }
    todos.splice(todoIndex, 1);
    return true;
}
