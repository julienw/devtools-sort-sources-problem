import { TextField, IconButton, Box } from "@mui/material";
import { Add as AddIcon, KeyboardDoubleArrowDown as KeyboardDoubleArrowDownIcon } from "@mui/icons-material";
import { useFetcher, useLoaderData } from "react-router-dom";
import type { LoaderReturnValue } from "../logic/todo-loader";
export function TodoInput() {
    const { allTodos } = useLoaderData() as LoaderReturnValue;
    const hasTodos = allTodos.length > 0;
    const areAllCompleted = allTodos.every((todo) => todo.done);
    const fetcher = useFetcher();
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            {hasTodos ? (
                <fetcher.Form action={`/api/todos/toggleAll/${!areAllCompleted}`} method="post">
                    <IconButton type="submit" aria-label={areAllCompleted ? "Reset all entries" : "Mark all entries as completed"} sx={areAllCompleted ? { color: "black" } : null}>
                        <KeyboardDoubleArrowDownIcon />
                    </IconButton>
                </fetcher.Form>
            ) : null}
            <fetcher.Form
                method="POST"
                action="/api/todos/new"
                style={{ display: "flex", alignItems: "center", flex: "auto" }}
                onSubmit={(e) => {
                    const form = e.currentTarget;
                    const { todoText } = form.elements as unknown as { todoText: HTMLInputElement };

                    setTimeout(() => {
                        todoText.value = "";
                    });
                }}
            >
                <TextField name="todoText" placeholder="What needs to be done?" sx={{ flex: "auto" }} />
                <IconButton aria-label="add" type="submit">
                    <AddIcon />
                </IconButton>
            </fetcher.Form>
        </Box>
    );
}
