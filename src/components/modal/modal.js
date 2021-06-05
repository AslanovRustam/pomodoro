import React, { useState } from "react";
import { createPortal } from "react-dom";
import shortid from "shortid";
import s from "./modal.module.css";

const modalRoot = document.querySelector("#modal-root");

export default function Modal({ onClose, task }) {
  const [name, setName] = useState(task ? task.name : "");
  const [description, setDescription] = useState(task ? task.description : "");

  const generateId = shortid.generate();

  const newTask = { id: generateId, name, description };
  // {
  //   task ? { id, name, description } : { id: generateId, name, description };
  // }

  const reset = () => {
    setName("");
    setDescription("");
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    reset();
    onClose(newTask);
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
