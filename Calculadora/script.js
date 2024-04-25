let displayValue = '';
let stack = [];

function addToDisplay(value) {
    displayValue += value;
    document.getElementById('display').value = displayValue;
}

function clearLast() {
    displayValue = displayValue.slice(0, -1);
    document.getElementById('display').value = displayValue;
}

function clearDisplay() {
    displayValue = '';
    document.getElementById('display').value = displayValue;
}

function calculate() {
    let expression = displayValue;

    // Reemplazar "mod" con la función Math.floor() para calcular el módulo
    expression = expression.replace(/mod/g, '%');

    // Reemplazar "sqrt" con la función Math.sqrt() para calcular la raíz cuadrada
    expression = expression.replace(/sqrt/g, 'Math.sqrt');

    // Reemplazar "x²" con la expresión correspondiente para calcular x al cuadrado
    expression = expression.replace(/x²/g, '*');

    // Reemplazar "pi" con la constante Math.PI para detectar el valor de pi
    expression = expression.replace(/pi/g, 'Math.PI');

    // Reemplazar "^" con la función Math.pow() para calcular la potencia
    expression = expression.replace(/\^/g, '**');

    // Calcular la expresión evaluada
    const result = eval(expression);

    // Agregar la operación a la pila de operaciones
    stack.push(displayValue + ' = ' + result);

    // Actualizar el valor mostrado en la calculadora
    displayValue = result;
    document.getElementById('display').value = displayValue;

    // Actualizar la lista de operaciones
    updateStack();
}


function updateStack() {
    const stackList = document.getElementById('operations');
    stackList.innerHTML = '';
    stack.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        stackList.appendChild(li);
    });
}

// Función para limpiar la pila de operaciones
function clearStack() {
    stack = []; // Limpiar la pila
    updateStack(); // Actualizar la vista de la pila
}

function updateStack() {
    const stackList = document.getElementById('operations');
    stackList.innerHTML = '';
    stack.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item;
        // Agregar evento onclick para restaurar la operación
        li.onclick = function() {
            restoreOperation(index);
        };
        stackList.appendChild(li);
    });
}

function restoreOperation(index) {
    // Obtener la operación seleccionada de la pila
    const selectedOperation = stack[index];
    // Actualizar el valor de la calculadora con la operación seleccionada
    displayValue = selectedOperation.split('=')[0].trim();
    document.getElementById('display').value = displayValue;

    // Eliminar las operaciones por encima de la seleccionada en la pila
    stack.splice(index + 1);
    // Actualizar la vista de la pila
    updateStack();
}
