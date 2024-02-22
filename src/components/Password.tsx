import React from 'react';

interface PasswordComponentProps {
  formData: any;
  name: any;
  placeholder: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passwordError: any;
}

const PasswordComponent: React.FC<PasswordComponentProps> = ({
  formData,
  name,
  placeholder,
  handleChange,
  passwordError,
}) => {

  return (
    <div className="password-container" id="passwordContainer">
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData[name]}
        onChange={handleChange}
        required
      />
      {passwordError && <span
        className="password-error">{passwordError}</span>}
    </div>
  );
};

export default PasswordComponent;
