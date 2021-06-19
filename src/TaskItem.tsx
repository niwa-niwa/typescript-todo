import React, {useState} from "react";
import styles from "./TaskItem.module.css";
import { ListItem, TextField, Grid } from "@material-ui/core";
import DeleteOutlineOutLinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { db } from './firebase';

interface PROPS {
  id: string;
  title: string;
}

const TaskItem: React.FC<PROPS> = (props) => {
  const [title, setTitle] = useState(props.title);

  const editTask = () => {
    db.collection("tasks").doc(props.id).set({title:title}, {merge:true});
  }

  const deleteTask = () => {
    db.collection('tasks').doc(props.id).delete();
  }

  return (
    <div>
      <ListItem>
        <h2>{props.title}</h2>
        <Grid container justify="flex-end">
          <TextField
            InputLabelProps={{ shrink: true, }}
            label="Edit task"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          />
        </Grid>
        <button className={styles.taskItem__icon} onClick={editTask}>
          <EditOutlinedIcon />
        </button>
        <button className={styles.taskItem__icon} onClick={deleteTask}>
          <DeleteOutlineOutLinedIcon />
        </button>
      </ListItem>
    </div>
  );
};

export default TaskItem;
