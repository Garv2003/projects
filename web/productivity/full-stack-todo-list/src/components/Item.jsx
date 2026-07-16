import { useState, useEffect, useRef } from "react";
import {
  useDeleteTodo,
  useToggleCompleteTodo,
  useUpdateTodo,
} from "@/hook/hook";

function Item({ item }) {
  const [editing, setEditing] = useState(false);
  const { mutate, isPending } = useDeleteTodo();
  const { mutate: toggleComplete, isPending: isPendingToggle } =
    useToggleCompleteTodo();
  const { mutate: updateTodo, isPending: isPendingUpdate } = useUpdateTodo();
  const inputRef = useRef(null);

  const handleDelete = () => {
    mutate(item._id);
  };

  const completeTodo = () => {
    toggleComplete(item._id);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const handleInpuSubmit = (event) => {
    event.preventDefault();
    const title = inputRef.current.value;
    updateTodo({ id: item._id, title: title });
    setEditing(false);
  };

  return (
    <>
      <li
        id={item?._id}
        className="todo_item"
        style={{
          filter: editing ? "blur(5px)" : "none",
        }}
      >
        <button
          className="todo_items_left"
          onClick={completeTodo}
          disabled={isPendingToggle}
        >
          <svg
            clipRule="evenodd"
            fillRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width={34}
            height={34}
            stroke="#22C55E"
            fill={item.completed ? "#22C55E" : "#0d0d0d"}
          >
            <circle cx="11.998" cy="11.998" fillRule="nonzero" r="9.998" />
          </svg>
          <p
            style={item.is_completed ? { textDecoration: "line-through" } : {}}
          >
            {item?.title}
          </p>
        </button>
        <div className="todo_items_right">
          <button onClick={handleEdit} disabled={isPendingUpdate}>
            <span className="visually-hidden">Edit</span>
            <svg
              clipRule="evenodd"
              fillRule="evenodd"
              strokeLinejoin="round"
              strokeMiterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              width={32}
              height={34}
            >
              <path
                d="m11.25 6c.398 0 .75.352.75.75 0 .414-.336.75-.75.75-1.505 0-7.75 0-7.75 0v12h17v-8.749c0-.414.336-.75.75-.75s.75.336.75.75v9.249c0 .621-.522 1-1 1h-18c-.48 0-1-.379-1-1v-13c0-.481.38-1 1-1zm1.521 9.689 9.012-9.012c.133-.133.217-.329.217-.532 0-.179-.065-.363-.218-.515l-2.423-2.415c-.143-.143-.333-.215-.522-.215s-.378.072-.523.215l-9.027 8.996c-.442 1.371-1.158 3.586-1.264 3.952-.126.433.198.834.572.834.41 0 .696-.099 4.176-1.308zm-2.258-2.392 1.17 1.171c-.704.232-1.274.418-1.729.566zm.968-1.154 7.356-7.331 1.347 1.342-7.346 7.347z"
                fillRule="nonzero"
              />
            </svg>
          </button>
          <button onClick={handleDelete} disabled={isPending}>
            <span className="visually-hidden">Delete</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              clipRule="evenodd"
              fillRule="evenodd"
              strokeLinejoin="round"
              strokeMiterlimit="2"
              viewBox="0 0 24 24"
              width={32}
              height={34}
            >
              <path
                d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z"
                fillRule="nonzero"
              />
            </svg>
          </button>
        </div>
      </li>
      {editing ? (
        <li
          className="todo_item"
          style={{
            position: "absolute",
            top: "30px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <form
            className="edit-form"
            onSubmit={handleInpuSubmit}
            style={{
              width: "100%",
            }}
          >
            <label
              htmlFor="edit-todo"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                ref={inputRef}
                type="text"
                name="edit-todo"
                id="edit-todo"
                defaultValue={item?.title}
              />
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <svg
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  height="1.4em"
                  width="1.4em"
                  onClick={() => setEditing(false)}
                  style={{ cursor: "pointer" }}
                >
                  <path
                    fill="currentColor"
                    d="M15.854 12.854L11 8l4.854-4.854a.503.503 0 000-.707L13.561.146a.499.499 0 00-.707 0L8 5 3.146.146a.5.5 0 00-.707 0L.146 2.439a.499.499 0 000 .707L5 8 .146 12.854a.5.5 0 000 .707l2.293 2.293a.499.499 0 00.707 0L8 11l4.854 4.854a.5.5 0 00.707 0l2.293-2.293a.499.499 0 000-.707z"
                  />
                </svg>
                <svg
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  height="2em"
                  width="2em"
                  onClick={handleInpuSubmit}
                  style={{ cursor: "pointer" }}
                >
                  <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7l233.4-233.3c12.5-12.5 32.8-12.5 45.3 0z" />
                </svg>
              </div>
            </label>
          </form>
        </li>
      ) : null}
    </>
  );
}

export default Item;
