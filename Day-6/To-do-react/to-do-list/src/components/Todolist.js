import React from 'react';

function Todolist(props) {
  const handleComplete = () => {
    props.handleComplete(props.index);
  };

  return (
    <li className={`list-item ${props.completed ? 'completed' : ''}`}>
      <span
        className="task"
        onClick={() => {
          if (!props.completed) {
            handleComplete();
          }
        }}
      >
        {props.item}
      </span>
      <span className="icons">
        {!props.completed && <p>Status : Pending</p>}

        <button
          className="delete-btn"
          onClick={(e) => {
            props.deleteItem(props.index);
          }}
        >
          Delete
        </button>
        {!props.completed && (
          <button className="complete-btn" onClick={handleComplete}>
            Complete
          </button>
        )}
        {props.completed && (
          <button className="complete-btn" disabled>
            Done
          </button>
        )}
      </span>
    </li>
  );
}

export default Todolist;
