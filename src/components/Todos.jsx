import { useEffect, useState } from "react";

/* import useFetch from "../hooks/useFetch";
 */
import Header from "./Header";
import AddTodos from "./AddTodoForm";
import Table from "./Table";
import Footer from "./Footer";
import Overview from "./Overview";

const Todos = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    title: "",
    priority: "",
  });

  const [todos, setTodos] = useState([]);

  /*  const { data, error, loading } = useFetch(
    "https://jsonplaceholder.typicode.com/todos"
  ); */

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const data = await response.json();
        setTodos(
          data.map((obj) => ({
            ...obj,
            createdAt: new Date().toLocaleString(),
            priority: "Low",
          }))
        );
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log(todos);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTodos((preValue) => [
      {
        ...values,
        completed: false,
        createdAt: new Date().toLocaleString(),
        id: todos.length + 1,
      },
      ...preValue,
    ]);
    setValues({
      title: "",
      priority: "",
    });
  };

  console.log(values);

  const handleUpdateTodo = (id) => {
    /*   const updateTodo = todos.filter((todo) => todo.id === id);
    setvalues((_) => updateTodo.title);
    setUpdate((_) => id); */
  };

  const handleDeleteTodo = (id) => {
    const deleteTodo = todos.filter((todo) => todo.id !== id);
    setTodos((_) => deleteTodo);
  };

  const handleComplete = (index) => {
    const newTodos = todos.map((todo, idx) => {
      if (index === idx) {
        return { ...todo, completed: !todo.completed };
      } else {
        return todo;
      }
    });
    setTodos((_) => newTodos);
  };

  const handleClearTodos = () => {
    setTodos((_) => []);
  };

  const pendingTasks = todos
    .filter((todo) => todo.completed === false)
    .map((tasks) => tasks);

  const completedTasks = todos
    .filter((todo) => todo.completed !== false)
    .map((tasks) => tasks);

  return (
    <>
      <Header todos={todos} pendingTasks={pendingTasks} />
      <div className="container">
        <AddTodos
          values={values}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <Overview
          handleClearTodos={handleClearTodos}
          pendingTasks={pendingTasks}
          completedTasks={completedTasks}
        />
        <Table
          todos={todos}
          error={error}
          loading={loading}
          handleComplete={handleComplete}
          handleUpdateTodo={handleUpdateTodo}
          handleDeleteTodo={handleDeleteTodo}
        />
      </div>
      <Footer />
    </>
  );
};

export default Todos;
