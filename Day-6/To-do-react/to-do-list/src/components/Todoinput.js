import React, { useState } from 'react';
import '../';

function Todoinput(props) {
  const [inputText, setInputText] = useState('');
  return (
    <div className="input-container">
      <input
        type="text"
        className="input-box-todos"
        placeholder="enter your todos"
        onChange={(e) => {
          setInputText(e.target.value);
        }}
      />
      <button
        className="Add-to-list"
        onClick={() => {
          props.addList(inputText);
          setInputText('');
        }}
      >
        Add
      </button>
      <div>{inputText}</div>
    </div>
  );
}

export default Todoinput;
