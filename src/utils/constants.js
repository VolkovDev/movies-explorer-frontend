const nameInput = 'nameInput';

const movieInput = 'movieInput';

const emailInput = 'emailInput';

const passwordInput = 'passwordInput';

const validationProfile = {
  inputSelector: '.profile__input',
  inactiveButtonClass: 'profile__button_block',
  submitButtonSelector: '.profile__button',
  inputErrorClass: 'profile__input_type_error',
  errorClass: 'profile__input-error_active',
  errorSelector: '.profile__input-error',
}

const validationAuth = {
  inputSelector: '.auth__input',
  inactiveButtonClass: 'auth__submit-button_block',
  submitButtonSelector: '.auth__submit-button',
  inputErrorClass: 'auth__input_type_error',
  errorClass: 'auth__input-error_active',
  errorSelector: '.auth__input-error',
}

export {
  emailInput, passwordInput, nameInput, movieInput,
  validationAuth, validationProfile
};
