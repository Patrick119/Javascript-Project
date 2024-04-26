// Variable global para almacenar el temporizador del mensaje de error
let errorTimeout;
function generateVirtualKeyboard() {
    const keyboardContainer = document.querySelector('.virtual-keyboard');
    const keyboardLayout = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'Limpiar', '0', '<-'];

    keyboardContainer.innerHTML = '';

    keyboardLayout.forEach(key => {
        const button = document.createElement('button');
        button.textContent = key;
        button.addEventListener('click', () => {
            const passwordInput = document.getElementById('password');
            const value = button.textContent;

            if (value === 'Limpiar') {
                passwordInput.value = '';
            } else if (value === '<-') {
                passwordInput.value = passwordInput.value.slice(0, -1);
            } else {
                passwordInput.value += value;
            }
        });
        keyboardContainer.appendChild(button);
    });
}
// Función para generar el captcha
function generateCaptcha() {
    const captchaImages = ['Pictures/captcha1.png', 'Pictures/captcha2.png', 'Pictures/captcha3.png', 'Pictures/captcha4.png'];
    const randomIndex = Math.floor(Math.random() * captchaImages.length);
    const captchaImg = document.getElementById('captcha');
    captchaImg.src = captchaImages[randomIndex];
}

// Función para mostrar mensajes de error
function showError(message) {
    // Eliminar el mensaje de error anterior si existe
    if (errorTimeout) {
        clearTimeout(errorTimeout);
        const errorContainer = document.querySelector('.error-message');
        if (errorContainer) {
            errorContainer.remove();
        }
    }

    const errorContainer = document.createElement('div');
    errorContainer.classList.add('error-message');
    const errorMessage = document.createElement('p');
    errorMessage.textContent = message;
    errorContainer.appendChild(errorMessage);
    document.body.appendChild(errorContainer);
    errorTimeout = setTimeout(() => {
        errorContainer.remove();
    }, 3000); // Eliminar el mensaje después de 3 segundos
}

// Función para validar que solo se ingresen números y la longitud sea la correcta
function validateInput(inputField, maxLength) {
    const inputValue = inputField.value;
    const onlyNumbers = /^\d+$/; // Expresión regular para permitir solo números

    if (!onlyNumbers.test(inputValue)) {
        showError("Por favor, ingresa solo números.");
        inputField.value = inputValue.replace(/\D/g, ''); // Eliminar cualquier caracter que no sea número
    }

    if (inputValue.length > maxLength) {
        showError(`El máximo de dígitos permitidos es ${maxLength}.`);
        inputField.value = inputValue.slice(0, maxLength); // Limitar la longitud al máximo permitido
    }
}

// Evento al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    generateVirtualKeyboard();
    generateCaptcha();

    // Botón Cambiar Captcha
    const changeCaptchaButton = document.getElementById('change-captcha');
    changeCaptchaButton.addEventListener('click', generateCaptcha);

    // Eventos de validación para el campo de DNI
    const dniInput = document.getElementById('dni');
    dniInput.addEventListener('input', () => {
        validateInput(dniInput, 8); // Validar que solo se ingresen números y la longitud sea 8
    });

    // Eventos de validación para el campo de número de tarjeta
    const cardNumberInput = document.getElementById('card-number');
    cardNumberInput.addEventListener('input', () => {
        validateInput(cardNumberInput, 16); // Validar que solo se ingresen números y la longitud sea 16
    });

    // Evento para cancelar el mensaje de error si se presiona otra tecla incorrecta durante su desvanecimiento
    document.body.addEventListener('keydown', () => {
        clearTimeout(errorTimeout);
        const errorContainer = document.querySelector('.error-message');
        if (errorContainer) {
            errorContainer.remove();
        }
    });
});