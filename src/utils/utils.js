import React, { useCallback } from 'react';
import FormValidator from '../components/FormValidator/FormValidator';
import { validationAuth, validationProfile } from './constants';

const convertTime = (min) => {
  return `${Math.floor(min / 60)}ч ${min % 60}м`
}

const validateForm = (form, config) => {
  const formValidator = new FormValidator(config, form);
  formValidator.enableValidation();
  return formValidator;
};

const validateAuth = (form) => {
  return validateForm(form, validationAuth);
}

const validateProfile = (form) => {
  return validateForm(form, validationProfile);
}

const checkShort = (movie) => {
  return movie.duration <= 40;
}
function Validate(initialValues) {
  const [values, setValues] = React.useState(initialValues);
  const [isValid, setIsValid] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);

      setIsValid(newIsValid);

      setErrors(newErrors);

    },
    [
      setValues,
      setErrors,
      setIsValid
    ]
  );

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setValues({ ...values, [name]: value });
    setIsValid(target.closest("form").checkValidity());
    setErrors({ ...errors, [name]: target.validationMessage });

  };

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm
  };
}
export {
  convertTime,
  Validate,
  checkShort,
  validateAuth,
  validateProfile
};

