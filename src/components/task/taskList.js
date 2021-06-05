import React, { useState } from "react";
import s from "./task.module.css";
import Modal from "../modal/modal";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  "& > *": {
    margin: theme.spacing(1),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const starterTasks = [
  { name: "Start learning typescript", description: "Watch tutorial" },
  { name: "Improve the level of english", description: "Sign up for courses" },
];

export default function TaskList() {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowmodal] = useState(false);
  const [currentPost, setCurrentPost] = useState("");

  const toggleModal = (task) => {
    setShowmodal(!showModal);
    setCurrentPost(task);
  };

  return (
    <>
      <div className={s.taskListContainer}>
        <ul>
          {starterTasks.map((task) => (
            <li key={task.name}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    {task.name}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{task.description}</Typography>
                </AccordionDetails>
                <Button
                  style={{ margin: "10px" }}
                  variant="contained"
                  color="primary"
                >
                  Edit task
                </Button>
                <Button
                  style={{ margin: "10px" }}
                  className={s.taskBtn}
                  variant="contained"
                  color="secondary"
                  //   className={classes.button}
                  startIcon={<DeleteIcon />}
                  onClick={(e) => toggleModal(task)}
                >
                  Delete
                </Button>
              </Accordion>
            </li>
          ))}
        </ul>
      </div>
      {showModal && <Modal onClose={toggleModal} user={currentPost} />}
    </>
    // <div className={s.taskListContainer}>
    //   <ul>
    //     {starterTasks.map((task) => (
    //       <li>
    //         <h1>{task.name}</h1>
    //         <span>{task.description}</span>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
}
