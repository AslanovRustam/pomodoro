import React, { useState } from "react";
import s from "./task.module.css";
import Modal from "../modal/modal";
import initialTasks from "../tasks.json";
import shortid from "shortid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TaskList() {
  const [tasks, setTasks] = useState(initialTasks);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowmodal] = useState(false);
  const [currentPost, setCurrentPost] = useState("");

  window.localStorage.setItem("tasks", JSON.stringify(tasks));
  const localTasks = window.localStorage.getItem("tasks");
  const parsedTasks = JSON.parse(localTasks);
  console.log("currentPost", currentPost);

  const notify = () =>
    toast.error("Please, fill in name and description of your new task", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const toggleModal = (task) => {
    setShowmodal(!showModal);
    setCurrentPost(task);
    console.log("task in toggle", task);
  };
  const newTask = {
    id: shortid.generate(),
    name,
    description,
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };
  const addTask = (task) => {
    if (name && description) {
      setTasks([task, ...tasks]);
      setName("");
      setDescription("");
      return;
    }

    notify();
  };

  const editTask = (updTask) => {
    setTasks(
      tasks.map((task) => {
        if (updTask.id === task.id) {
          return (task = {
            id: task.id,
            name: updTask.name,
            description: updTask.description,
          });
        }
        return task;
      })
    );

    setShowmodal(!showModal);
  };

  return (
    <>
      <div className={s.taskListContainer}>
        <div className={s.addTaskContainer}>
          <form>
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
          </form>
          <button
            className={s.buttonAdd}
            type="button"
            onClick={() => addTask(newTask)}
          >
            Add Task
          </button>
        </div>
        <ul>
          {parsedTasks.map((task) => (
            <li key={task.id} className={s.taskContainer}>
              <h1 className={s.taskName}>{task.name}</h1>
              <span className={s.taskDescription}>{task.description}</span>
              <button
                className={s.buttonEdit}
                type="button"
                onClick={() => toggleModal(task)}
                // onClick={() => editTask(task)}
              >
                Edit
              </button>
              <button
                className={s.buttonDelete}
                type="button"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      {showModal && (
        <Modal
          onClose={toggleModal}
          task={currentPost}
          editTask={editTask}
          addTask={addTask}
        />
      )}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
