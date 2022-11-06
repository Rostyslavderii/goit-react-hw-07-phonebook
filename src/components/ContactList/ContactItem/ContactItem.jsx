import React from 'react';

export const ContactItem = ({ id, onDelete, name, number }) => {
  console.log(id);
  return (
    <li className="contact">
      <span className="contact-name">{name}</span>:&nbsp;{number}
      <button
        className="delete-contact-btn"
        type="button"
        onClick={() => onDelete(id)}
      >
        Delete
      </button>
    </li>
  );
};
