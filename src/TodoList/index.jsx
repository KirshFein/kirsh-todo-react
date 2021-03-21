import "./TodoList.css";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Button } from "@material-ui/core";
import { dataBase } from "../api/config";

// eslint-disable-next-line react/prop-types
const TodoList = ({ todo, inprogress, id }) => {
  const toggleProgress = () => {
    dataBase.collection("todos").doc(id).update({
      inprogress: !inprogress,
    });
  };

  const deleteTodo = () => {
    dataBase.collection("todos").doc(id).delete();
  };

  return (
    <div className="todo">
      <ListItem>
        <ListItemText
          primary={todo}
          secondary={inprogress ? "In progress" : "Complete"}
        />
      </ListItem>
      <Button onClick={toggleProgress}>
        {inprogress ? `Done` : `Not Done`}
      </Button>
      <Button onClick={deleteTodo}>&#10060;</Button>
    </div>
  );
};

export default TodoList;
