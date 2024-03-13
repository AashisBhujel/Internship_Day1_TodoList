import React, { useEffect, useState } from 'react';
import './App.css';
import TodoInput from './components/Todoinput';
import Todolist from './components/Todolist';

function App() {
  const [listTodo, setListTodo] = useState([]);
  const [deletedTasks, setDeletedTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const addList = (inputText) => {
    if (inputText !== '')
      setListTodo([...listTodo, { text: inputText, completed: false }]);
  };

  const deleteListItem = (key) => {
    const deletedTask = listTodo[key];
    const newListTodo = listTodo.filter((_, index) => index !== key);
    setListTodo(newListTodo);
    setDeletedTasks([...deletedTasks, deletedTask]);
  };

  const handleComplete = (index) => {
    const newListTodo = [...listTodo];
    newListTodo[index].completed = true;
    setListTodo(newListTodo);
  };

  const filterList = () => {
    switch (filter) {
      case 'pending':
        const todo = listTodo.filter((task) => !task.completed);
        setListTodo(todo);
        return;
      case 'completed':
        return listTodo.filter((task) => task.completed);
      case 'deleted':
        return deletedTasks;
      default:
        return listTodo;
    }
  };

useEffect(()=>{
  filterList()
},[filter])

  return (
    <div className="main-container">
      <div className="center-container">
        <h1 className="app-heading">TODO LIST</h1>
        <div className="dropdown">
          <button className="dropbtn">FilterStatus</button>
          <div className="dropdown-content">
            <button onClick={() => setFilter('pending')}>Pending</button>
            <button onClick={() => setFilter('completed')}>Completed</button>
            <button onClick={() => setFilter('deleted')}>Deleted</button>
          </div>
        </div>

        <TodoInput addList={addList} />
        <hr />
        {listTodo?.map((listItem, i) => (
          <Todolist
            key={i}
            index={i}
            item={listItem.text}
            completed={listItem.completed}
            deleteItem={deleteListItem}
            handleComplete={handleComplete}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
