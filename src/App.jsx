import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";




const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [error, setError] = useState("");

  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [data, setData] = useState([]);
  const loading = 0;

  useEffect(() => {
    const fetchData = async() => {

      await fetch(`${import.meta.env.VITE_API_URL}/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${import.meta.env.VITE_API_KEY}`)
        .then(res => res.json())
        .then(result => {
          setData(result)
          console.log(result);
    });
    console.log("Latitude is:", lat);
    console.log("Longitude is:", lon);
  }
  fetchData();
  }, [lat, lon]);


  const addTodo = useCallback(
    (state) => {
      state.preventDefault();
      if (newTodo.trim()) {
        setTodos((prevTodos) => [
          ...prevTodos,
          {
            id: Date.now() + newTodo.trim(), //tempID,
            text: newTodo.trim(),
            completed: false,
          },
        ]);

        setNewTodo("");
        setError("");
      } else {
        setError("Cannot add an empty todo");
      }
    },
    [newTodo],
  );

  const toggleTodo = useCallback((id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }, []);

  const removeTodo = useCallback((id) => {

    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  return (
    <div style={{ margin: "0 20px" }}>
      <h1>Todo List</h1>
      <form
        onSubmit={addTodo}
        aria-label="Add New Todo"
        data-testid="todo-form"
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "10px",
        }}
      >
        <label htmlFor="new-todo">New Todo</label>
        <input
          id="new-todo"
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
          data-testid="new-todo-input"
        />
        <button type="submit" data-testid="add-todo-button">
          Add Todo
        </button>
      </form>
      {error && (
        <p role="alert" data-testid="error-message">
          {error}
        </p>
      )}
      <ul data-testid="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "10px",
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              data-testid={`todo-item-${todo.id}-checkbox`}
            />
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
              data-testid={`todo-item-${todo.id}-text`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => removeTodo(todo.id)}
              aria-label={`Remove ${todo.text}`}
              data-testid={`todo-item-${todo.id}-remove-button`}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
	{(typeof data.main != 'undefined') ? (
          <>
            <p>{data.name} Weather:</p>
            <p> Wind Speed: {data.wind.speed} m/s</p>
            <p>temperature: {data.main.temp} °C</p>
            <p> Humidity: {data.main.humidity}% </p>
	    <p> Weather: {data.weather[0].description}</p>
          </> 
         ): (
          <div></div>
         )}

    </div>
  );
};

export default App;

