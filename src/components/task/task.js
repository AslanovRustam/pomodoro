import React, { useState } from "react";
import s from "./task.module.css";

export default function Task() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const reset = () => {
    setName("");
    setDescription("");
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    // // onSubmit(name, number);
    // const getState = store.getState();
    // // console.log(getState.contacts.contacts);
    // const getContacts = getState.contacts.contacts.map((contact) =>
    //   contact.name.toLocaleLowerCase()
    // );
    // const isGetContactAlready = getContacts.includes(name.toLocaleLowerCase());
    // if (isGetContactAlready) {
    //   alert(`${name} is already in contacts!`);
    //   reset();
    //   return;
    // } else {
    reset();
    // return onSubmit(name, number);
    // }
  };

  return (
    <div className={s.taskContainer}>
      <form className={s.formContainer} onSubmit={handleSubmitForm}>
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
        <button type="submit" className={s.buttonAdd}>
          Add new task
        </button>
      </form>
    </div>
  );
}
