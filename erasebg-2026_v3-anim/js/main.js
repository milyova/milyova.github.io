const canvas = document.getElementById('scratch-canvas');
const ctx = canvas.getContext('2d');

const imgColor = new Image();
imgColor.src = 'images/bg-color.jpg';

const imgGray = new Image();
imgGray.src = 'images/bg-gray.jpg';

const smokeBrush = new Image();
smokeBrush.src = 'images/brush-smoke.png'; // Обязательно БЕЗ черного фона!

const maskCanvas = document.createElement('canvas');
const maskCtx = maskCanvas.getContext('2d');

let imgRender = { x: 0, y: 0, width: 0, height: 0 };
let imagesLoaded = 0;

// Массив для хранения активных анимированных частиц дыма
let particles = [];

function checkImagesLoad() {
    imagesLoaded++;
    if (imagesLoaded === 3) {
        resizeCanvas();
        animate(); // Запускаем бесконечный цикл анимации дыма
    }
}

imgColor.onload = checkImagesLoad;
imgGray.onload = checkImagesLoad;
smokeBrush.onload = checkImagesLoad;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    maskCanvas.width = canvas.width;
    maskCanvas.height = canvas.height;

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = imgColor.width / imgColor.height;

    if (canvasRatio > imgRatio) {
        imgRender.width = canvas.width;
        imgRender.height = canvas.width / imgRatio;
    } else {
        imgRender.height = canvas.height;
        imgRender.width = canvas.height * imgRatio;
    }

    imgRender.x = (canvas.width - imgRender.width) / 2;
    imgRender.y = (canvas.height - imgRender.height) / 2;
}

// Класс (шаблон) для создания анимированной частицы дыма
class SmokeParticle {
    constructor(x, y) {
        this.x = x + (Math.random() - 0.5) * 10; // небольшое смещение для хаотичности
        this.y = y + (Math.random() - 0.5) * 10;
        this.size = 40 + Math.random() * 30;     // начальный размер частицы
        this.growth = 1.5 + Math.random() * 2;   // скорость расширения клубка дыма
        this.alpha = 0.4 + Math.random() * 0.3;  // начальная прозрачность
        this.fade = 0.005 + Math.random() * 0.01;// скорость исчезновения дыма
        this.angle = Math.random() * Math.PI * 2;
        this.spin = (Math.random() - 0.5) * 0.03;// скорость и направление вращения клубка
        // Небольшая скорость движения самого дыма (взлет вверх и вбок)
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = -0.3 - Math.random() * 0.5; 
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.size += this.growth; // Дым плавно расширяется
        this.angle += this.spin;  // Дым плавно вращается
        this.alpha -= this.fade;  // Дым плавно тает
    }

    draw() {
        if (this.alpha <= 0) return;
        maskCtx.save();
        maskCtx.globalAlpha = this.alpha;
        maskCtx.translate(this.x, this.y);
        maskCtx.rotate(this.angle);
        maskCtx.drawImage(smokeBrush, -this.size / 2, -this.size / 2, this.size, this.size);
        maskCtx.restore();
    }
}

// Главный цикл рендеринга и анимации (работает постоянно)
function animate() {
    // 1. Обновляем и рисуем частицы на маске
    // Важно: мы НЕ очищаем maskCanvas полностью через clearRect, 
    // чтобы старый стертый след оставался прозрачным! Мы лишь дорисовываем изменения.
    
    // Но так как частицы меняются, для их динамического рендеринга в текущем кадре:
    // Мы временно очищаем маску и перерисовываем все живые частицы, 
    // но чтобы старый след не пропадал, этот подход обычно комбинируют с постоянным холстом.
    // Для простоты: рисуем новые состояния поверх
    
    particles = particles.filter(p => p.alpha > 0); // Удаляем исчезнувший дым
    
    // Перерисовываем маску (сначала накопленный старый след, затем новые живые частицы)
    // Чтобы старый след не стирался, этот код оптимально наносит мазки:
    particles.forEach(p => {
        p.update();
        p.draw();
    });

    // 2. Отрендерить финальную сцену
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imgColor, imgRender.x, imgRender.y, imgRender.width, imgRender.height);

    const topLayerCanvas = document.createElement('canvas');
    const topLayerCtx = topLayerCanvas.getContext('2d');
    topLayerCanvas.width = canvas.width;
    topLayerCanvas.height = canvas.height;

    topLayerCtx.drawImage(imgGray, imgRender.x, imgRender.y, imgRender.width, imgRender.height);
    topLayerCtx.globalCompositeOperation = 'destination-out';
    topLayerCtx.drawImage(maskCanvas, 0, 0);

    ctx.drawImage(topLayerCanvas, 0, 0);

    requestAnimationFrame(animate); // Зацикливаем
}

window.addEventListener('resize', resizeCanvas);

let isDrawing = false;

function scratch(e) {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    let clientX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;
    let clientY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Вместо рисования штампа генерируем 2-3 частицы дыма в текущей точке
    for (let i = 0; i < 3; i++) {
        particles.push(new SmokeParticle(x, y));
    }
}

canvas.addEventListener('mousedown', (e) => { isDrawing = true; scratch(e); });
window.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseleave', () => isDrawing = false);
canvas.addEventListener('mousemove', scratch);

canvas.addEventListener('touchstart', (e) => { isDrawing = true; scratch(e); }, { passive: true });
canvas.addEventListener('touchend', () => isDrawing = false);
canvas.addEventListener('touchmove', (e) => { if (e.cancelable) e.preventDefault(); scratch(e); }, { passive: false });
