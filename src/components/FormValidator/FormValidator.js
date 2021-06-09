class FormValidator {
    constructor(data, formElement) {
        this._formElement = formElement;
        this._inActiveButton = data.inactiveButtonClass;
        this._error = data.errorClass;
        this._inputError = data.inputErrorClass;
        // this._inputList = Array.from(formElement.querySelectorAll(data.inputSelector));
        // this._button = formElement.querySelector(data.submitButtonSelector);
    }

    _hideInputError(input) {
        const error = this._formElement.querySelector(`#${input.id}-error`);
        input.classList.remove(this._inputError);
        error.textContent = '';
        error.classList.remove(this._error);
    }

    _showInputError(input, errorMessage) {
        const error = this._formElement.querySelector(`#${input.id}-error`);
        input.classList.add(this._inputError);
        error.textContent = errorMessage;
        error.classList.add(this._error);
    }

    _checkInputValidity(input) {
        if (!input.validity.valid) {
            this._showInputError(input, input.validationMessage);
        } else {
            this._hideInputError(input);
        }
    }

    _enableButton() {
        this._button.classList.remove(this._inActiveButton);
        this._button.removeAttribute('disabled');
    }

    _hasInvalidInput() {
        // return this._inputList.some((input) => !input.validity.valid);
    }

    _disableButton() {
        this._button.classList.add(this._inActiveButton);
        this._button.setAttribute('disabled', 'true');
    }

    toggleButton() {
        if (this._hasInvalidInput()) {
            this._disableButton();
        } else {
            this._enableButton();
        }
    }

    _handleReset() {
        // this._inputList.forEach((input) => {
        //     this._hideInputError(input);
        // });
    }

    _setEventListenersReset() {
        this._formElement.addEventListener('reset', () => {
            this._handleReset();
        });
    }

    enableValidation() {
        // this._inputList.forEach((input) => {
        //     input.addEventListener('input', () => {
        //         this._checkInputValidity(input);
        //         this.toggleButton();
        //     });
        // });

        // this._setEventListenersReset();
    }
}

export default FormValidator;
