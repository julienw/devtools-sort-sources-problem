import { Input, ListItem, ListItemIcon, ListItemButton, ListItemText, Checkbox, IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useState } from "react";
import { useFetcher } from "react-router-dom";
import { type Todo } from "../logic/todo-model";

export function TodoItem({ todo }: { todo: Todo }) {
    const [edit, setEdit] = useState(false);
    const labelId = `checkbox-list-label-${todo.id}`;
    const fetcher = useFetcher();

    return (
        <ListItem
            secondaryAction={
                <>
                    <IconButton edge="end" aria-label="edit" onClick={() => setEdit(!edit)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="remove" onClick={() => fetcher.submit(null, { action: `/api/todos/${todo.id}/remove`, method: "POST" })}>
                        <DeleteIcon />
                    </IconButton>
                </>
            }
            disablePadding
        >
            {edit ? (
                <Input
                    defaultValue={todo.text}
                    autoFocus={true}
                    onKeyDown={(e) => {
                        if (e.code === "Escape") setEdit(false);
                    }}
                    sx={{ marginLeft: "72px", height: "50px" }}
                />
            ) : (
                <ListItemButton role={undefined} sx={{ marginRight: "40px" /* The margin compensates for the 2 icons in secondaryAction */ }} onClick={() => fetcher.submit(null, { action: `/api/todos/${todo.id}/toggle`, method: "POST" })}>
                    <ListItemIcon>
                        <Checkbox edge="start" checked={todo.done} tabIndex={-1} inputProps={{ "aria-labelledby": labelId }} />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={todo.text} />
                </ListItemButton>
            )}
        </ListItem>
    );
}
