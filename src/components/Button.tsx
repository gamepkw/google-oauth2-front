import React from 'react';

interface ButtonComponentProps {
  children: React.ReactNode;
  disabled?: boolean;
  handleButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  children,
  disabled,
  handleButtonClick,
}) => {
  return (
    <button
      type='submit'
      disabled={disabled}
      onClick={handleButtonClick}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;
