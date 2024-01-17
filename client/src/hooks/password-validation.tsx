import { useState, useEffect } from 'react';

export const usePasswordValidation = () => {
  const [password, validatePassword] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const passwordIsValid = (password: string) =>
    !(!password
      || password.length < 8
      || !/\d/.test(password)
      || !/[!@#$%^&*]/.test(password)
      || !/[A-Z]/.test(password)
      || !/[a-z]/.test(password)
      || /\s/.test(password));

  useEffect(() => {
    if (!password) {
      setPasswordErrorMessage('');
      return;
    }

    if (password.length < 8) {
      setPasswordErrorMessage('Password must be at least 8 characters');
      return;
    }

    if (!/\d/.test(password)) {
      setPasswordErrorMessage('Password must contain at least one number');
      return;
    }

    if (!/[!@#$%^&*]/.test(password)) {
      setPasswordErrorMessage('Password must contain at least one special character');
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setPasswordErrorMessage('Password must contain at least one uppercase letter');
      return;
    }

    if (!/[a-z]/.test(password)) {
      setPasswordErrorMessage('Password must contain at least one lowercase letter');
      return;
    }

    if (/\s/.test(password)) {
      setPasswordErrorMessage('Password must not contain any spaces');
      return;
    }

    setPasswordErrorMessage('');
  }, [password]);

  return {
    passwordIsValid,
    passwordErrorMessage,
    validatePassword
  };
};
