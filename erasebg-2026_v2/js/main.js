const canvas = document.getElementById('scratch-canvas');
const ctx = canvas.getContext('2d');

// Загружаем изображения
const imgColor = new Image();
imgColor.src = 'images/bg-color.jpg';

const imgGray = new Image();
imgGray.src = 'images/bg-gray.jpg';

// Виртуальный холст для маски
const maskCanvas = document.createElement('canvas');
const maskCtx = maskCanvas.getContext('2d');

let imgRender = { x: 0, y: 0, width: 0, height: 0 };
let imagesLoaded = 0;

function checkImagesLoad() {
    imagesLoaded++;
    if (imagesLoaded === 2) {
        resizeCanvas();
    }
}

imgColor.onload = checkImagesLoad;
imgGray.onload = checkImagesLoad;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    maskCanvas.width = canvas.width;
    maskCanvas.height = canvas.height;

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = imgColor.width / imgColor.height;

    if (canvasRatio > 1) {
        imgRender.height = canvas.height;
        imgRender.width = canvas.height * imgRatio;
    } else {
        imgRender.height = canvas.height;
        imgRender.width = canvas.height * imgRatio;
    }

    imgRender.x = (canvas.width - imgRender.width) / 2;
    imgRender.y = (canvas.height - imgRender.height) / 2;

    render();
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(imgColor, imgRender.x, imgRender.y, imgRender.width, imgRender.height);

    const topLayerCanvas = document.createElement('canvas');
    const topLayerCtx = topLayerCanvas.getContext('2d');
    topLayerCanvas.width = canvas.width;
    topLayerCanvas.height = canvas.height;

    topLayerCtx.drawImage(imgGray, imgRender.x, imgRender.y, imgRender.width, imgRender.height);

    topLayerCtx.globalCompositeOperation = 'destination-out';
    topLayerCtx.drawImage(maskCanvas, 0, 0);

    ctx.drawImage(topLayerCanvas, 0, 0);
}

window.addEventListener('resize', resizeCanvas);

let isDrawing = false;

function scratch(e) {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();

    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else {
        clientX = e.clientX;
        clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const brushRadius = 60;

    const gradient = maskCtx.createRadialGradient(x, y, 0, x, y, brushRadius);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
    gradient.addColorStop(0.5, 'rgba(0, 0, 0, 1)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    maskCtx.fillStyle = gradient;
    maskCtx.beginPath();
    maskCtx.arc(x, y, brushRadius, 0, Math.PI * 2);
    maskCtx.fill();

    render();
}

// Простые и надежные слушатели событий на холсте
canvas.addEventListener('mousedown', () => isDrawing = true);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseleave', () => isDrawing = false);
canvas.addEventListener('mousemove', scratch);

canvas.addEventListener('touchstart', (e) => {
    isDrawing = true;
    scratch(e);
});
canvas.addEventListener('touchend', () => isDrawing = false);
canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    scratch(e);
});
