import { useState, useEffect } from 'react';

export const useEmailValidation = () => {
  const [email, validateEmail] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const emailIsValid = (email: string) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);

  useEffect(() => {
    if (!email) {
      setEmailErrorMessage('');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailErrorMessage('Email must be valid');
      return;
    }

    setEmailErrorMessage('');
  }, [email]);

  return { emailIsValid, emailErrorMessage, validateEmail };
};
