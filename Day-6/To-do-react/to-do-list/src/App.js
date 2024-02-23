import React, { useState } from 'react';
// import '@babel/generator';
import Todoinput from './components/Todoinput';

function App() {
  const [listTodo, setListTodo] = useState([]);

  let addList = (inputText) => {
    setListTodo([...listTodo, inputText]);
  };
  return (
    <div className="main-container">
      <div className="center-container">
        <Todoinput addList={addList} />
      </div>
    </div>
  );
}

export default App;
