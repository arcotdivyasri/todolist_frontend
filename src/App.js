import React, { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // GET TODOS
  function getTodos() {
    fetch("https://todolist-backend-39qv.onrender.com/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.log(err));
  }

  // ADD TODO
  function addTodo() {
    if (text.trim() === "") return;

    fetch("https://todolist-backend-39qv.onrender.com/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: text })
    })
      .then((res) => res.json())
      .then(() => {
        setText("");
        getTodos();
      })
      .catch((err) => console.log(err));
  }

  // DELETE TODO
  function deleteTodo(text) {
    fetch("https://todolist-backend-39qv.onrender.com/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: text })
    })
      .then((res) => res.json())
      .then(() => {
        getTodos();
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Todo List</h2>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter todo"
      />

      <button onClick={addTodo}>
        Add
      </button>

      <ul>
        {todos.map((t, i) => (
          <li key={i}>
            {t.text}

            <button onClick={() => deleteTodo(t.text)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;