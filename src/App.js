import "./App.css";
import { TextField, Button } from "@material-ui/core";
import { useState, useEffect } from "react";
import { dataBase } from "./api/config";
import firebase from "firebase";
import TodoList from "./TodoList";

const App = () => {
  const [todoTask, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    dataBase.collection("todos").onSnapshot((query) =>
      setTodos(
        query.docs.map((el) => ({
          id: el.id,
          todo: el.data().todo,
          inprogress: el.data().inprogress,
        }))
      )
    );
  };

  const addTodo = (e) => {
    e.preventDefault();

    dataBase.collection("todos").add({
      inprogress: true,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      todo: todoTask,
    });

    setTodo("");
  };

  return (
    <div className="App">
      <h1 className="title">Todo app &#11093;&#129302;&#11093;</h1>
      <form className="inputTodo">
        <TextField
          value={todoTask}
          onChange={(e) => setTodo(e.target.value)}
          className="inputForm"
          id="outlined-basic"
          variant="outlined"
          label="Write new task... &#10067;"
        ></TextField>
        <Button
          className="btnPusher"
          onClick={addTodo}
          type="submit"
          variant="outlined"
          color="secondary"
        >
          Secondary
        </Button>
      </form>

      {todos.map((el) => (
        <TodoList
          key={el.id}
          id={el.id}
          todo={el.todo}
          inprogress={el.inprogress}
        />
      ))}
    </div>
  );
};

export default App;
