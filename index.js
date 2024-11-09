import { shapes } from "./shapes";
let currentShape;
function drawTetrisPlayground(x, y, target) {
    if (x <= 0 || y <= 0)
        throw new Error('x and y cannot be negative');
    for (let rowsCount = 0; rowsCount < y; rowsCount++) {
        const row = document.createElement('div');
        row.className = 'row';
        row.dataset['row'] = rowsCount.toString();
        for (let cellsCount = 0; cellsCount < x; cellsCount++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset['cell'] = cellsCount.toString();
            row.append(cell);
        }
        target.append(row);
    }
}
const tetrisPlaygroundTarget = document.querySelector('.tetris-playground');
if (tetrisPlaygroundTarget) {
    try {
        drawTetrisPlayground(10, 20, tetrisPlaygroundTarget);
    }
    catch (e) {
        if (e instanceof Error) {
            console.log(e.message);
        }
        else {
            console.log('An unknown error occurred');
        }
    }
}
else {
    console.error("Target element '.tetris-playground' not found.");
}
function getRandomShape() {
    const shapeKeys = Object.keys(shapes);
    const shapeKey = shapeKeys[Math.floor(Math.random() * shapeKeys.length)];
    return shapes[shapeKey];
}
// Инициализируем `currentShape` случайной фигурой
currentShape = getRandomShape();
function renderShape() {
    if (!tetrisPlaygroundTarget || !currentShape)
        return;
    removePreviousShape();
    const rowsToColor = currentShape.shape.length;
    const cellsToColor = currentShape.shape[0].length;
    for (let rowIndex = 0; rowIndex < rowsToColor; rowIndex++) {
        const row = tetrisPlaygroundTarget.children[rowIndex];
        for (let cellIndex = 0; cellIndex < cellsToColor; cellIndex++) {
            const cell = row.children[cellIndex];
            cell.style.backgroundColor = currentShape.shape[rowIndex][cellIndex] ? currentShape.color : '';
        }
    }
}
function removePreviousShape() {
    if (!tetrisPlaygroundTarget)
        return;
    const rows = tetrisPlaygroundTarget.children;
    for (let row of rows) {
        for (let cell of row.children) {
            cell.style.backgroundColor = '';
        }
    }
}
function rotateShape(shape) {
    if (shape.length === 2 && shape[0].length === 2)
        return shape;
    const rotatedShape = [];
    for (let rowsCount = 0; rowsCount < shape[0].length; rowsCount++) {
        rotatedShape.push([]);
    }
    for (let i = shape.length - 1, k = 0; i >= 0; i--, k++) {
        for (let j = 0; j < shape[0].length; j++) {
            rotatedShape[j][k] = shape[i][j];
        }
    }
    return rotatedShape;
}
// Первоначальный рендеринг случайной фигуры
renderShape();
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && currentShape) {
        currentShape.shape = rotateShape(currentShape.shape);
        renderShape();
    }
});
