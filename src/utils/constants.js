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

const updateSuccessСompletedMessage = 'Данные были успешно обновлены';
const loginErrorMessage = 'Почта или пароль могли быть введены не верно или такого пользователь не существует'
const shortFilmCheckbox = 'shortFilmCheckbox';
const successСompletedMessage = 'Регистрация была успешной';
const searchMovieErrorMessage = 'Во время запроса произошла какя-то ошибка';
const errorsMessage = 'Ошибка';

const renderSiseWindow1280 = 6;
const renderSiseWindow1024 = 6;
const renderSiseWindow768 = 6;
const renderSiseWindow320 = 3;


const defaultSiseWindow1280 = 3;
const defaultSiseWindow1024 = 3;
const defaultSiseWindow768 = 3;
const defaultSiseWindow320 = 3;








export {
  emailInput, passwordInput, nameInput, movieInput,
  validationAuth, validationProfile, shortFilmCheckbox, successСompletedMessage, errorsMessage, updateSuccessСompletedMessage, loginErrorMessage, searchMovieErrorMessage,
  renderSiseWindow1280, renderSiseWindow1024, renderSiseWindow768, renderSiseWindow320,
  defaultSiseWindow1280, defaultSiseWindow1024, defaultSiseWindow768,
  defaultSiseWindow320,
};


