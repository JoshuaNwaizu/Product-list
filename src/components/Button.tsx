// import React from 'react'

import React from 'react';

interface Button {
  text: string;
  onClick?: () => void;
  className: string;
}

const Button: React.FC<Button> = ({ text, onClick, className }) => {
  return (
    <button
      className={className}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
