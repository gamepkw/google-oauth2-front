import React from 'react';

interface UsernameComponentProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Specify the event type
  usernameError: any;
}

const UsernameComponent: React.FC<UsernameComponentProps> = ({
  formData,
  handleChange,
  usernameError,
}) => {
  return (
    <div className="username-container" id="usernameContainer">
      <div>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          // maxLength={10}
          // pattern="[0-9]*"
          required
        />
        {usernameError && <span className="username-error">{usernameError}</span>}
      </div>
    </div>
  );
};

export default UsernameComponent;
