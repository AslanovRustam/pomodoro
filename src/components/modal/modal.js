import React, { useState } from "react";
import { createPortal } from "react-dom";
import s from "./modal.module.css";

const modalRoot = document.querySelector("#modal-root");

export default function Modal({ onClose, task, editTask }) {
  const [name, setName] = useState(task ? task.name : "");
  const [description, setDescription] = useState(task ? task.description : "");

  const newTask = { id: task.id, name: name, description: description };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    editTask(newTask);
  };
  const handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div>
      <div className={s.Modal__backdrop} onClick={handleBackdropClick}>
        <form className={s.formtStyle} onSubmit={handleSubmitForm}>
          <input
            className={s.input}
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Name"
          />
          <textarea
            className={s.textArea}
            rows="5"
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
            placeholder="Description"
          ></textarea>
          <button type="submit" className={s.buttonEdit}>
            {task ? "Edit task" : "Add task"}
          </button>
        </form>
      </div>
    </div>,
    modalRoot
  );
}
