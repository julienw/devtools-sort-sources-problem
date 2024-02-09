import { TodoInput } from "./TodoInput";
import { TodoList } from "./TodoList";
import { TodoNav } from "./TodoNav";
import { TodoExtraActions } from "./TodoExtraActions";

export function TodoListPage() {
    return (
        <>
            <TodoInput />
            <TodoList />
            <TodoExtraActions />
            <TodoNav />
        </>
    );
}
