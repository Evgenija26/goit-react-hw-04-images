import React from 'react';
import css from './Button.module.css';

export const Button = ({ onClick }) => {
  return (
    <div className={css.btn__wrapper}>
      <button type="button" className={css.Button} onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

//  default Button
