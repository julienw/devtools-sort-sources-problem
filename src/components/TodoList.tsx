import { useLoaderData } from "react-router-dom";
import { LoaderReturnValue } from "../logic/todo-loader";
import { TodoItem } from "./TodoItem";
import { List } from "@mui/material";

export function TodoList() {
    const { filteredTodos } = useLoaderData() as LoaderReturnValue;
    return (
        <List>
            {filteredTodos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </List>
    );
}
