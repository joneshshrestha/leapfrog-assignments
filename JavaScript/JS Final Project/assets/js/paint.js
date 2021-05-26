const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const save = document.getElementById('jsSave');

const INITIAL_COLOR = '#2c2c2c';
const INITIAL_CANVAS_SIZE = 470;

//css 사이즈가 아닌 canvas 자체적으로 width와 height를 줘야 동작한다.(pixel modifier)
canvas.width = INITIAL_CANVAS_SIZE;
canvas.height = INITIAL_CANVAS_SIZE;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

// 캔버스에서 마우스가 벗어났을 때 이벤트
// 캔버스에서 마우스를 클릭했다가 뗐을 때 이벤트
function stopPainting() {
    painting = false;
}

// 캔버스에 마우스를 클릭했을 때 이벤트
function startPainting() {
    painting = true;
}

// 캔버스 위에서 마우스를 움직일 때 이벤트
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    //움직이면서 path를 만듬
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        //마우스를 클릭했을 때 그리기 시작
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

// 색 변경
function handleChangeColor(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

// 붓 사이즈 변경
function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

// Fill, Paint 모드 변경
function handleModeClick() {
    if(filling) {
        filling = false;
        mode.innerText = 'Fill';
    } else {
        filling = true;
        mode.innerText = 'Paint';
    }
}

// Fill 모드 상태일 때 색채우기 기능
function handleCanvasClick() {
    if(!filling) return;

    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// 마우스 오른쪽 버튼 클릭 prevent
function handleContextMenu(event) {
    event.preventDefault();
}

// 이미지 저장
function handleSaveClick() {
    const image = canvas.toDataURL(); //default : image/png
    const link = document.createElement('a');
    link.href = image;
    link.download = 'canvas_img';
    link.click();
}

function init() {
    // 마우스가 캔버스 내부에서 인지할 수 있도록 이벤트 리스너 추가
    if (canvas) {
        canvas.addEventListener('mousemove', onMouseMove);
        canvas.addEventListener('mousedown', startPainting);
        canvas.addEventListener('mouseup', stopPainting);
        canvas.addEventListener('mouseleave', stopPainting);
        canvas.addEventListener('click', handleCanvasClick);
        canvas.addEventListener('contextmenu', handleContextMenu);
    }

    // 각각의 색을 클릭했을 때 이벤트 리스너 추가
    [...colors].map((color) => {
        color.addEventListener('click', handleChangeColor);
    });

    // range 슬라이더 변경 시 이벤트 리스너 추가
    if (range) {
        range.addEventListener('input', handleRangeChange);
    }

    // Fill, Paint 모드 변경 시 이벤트 리스너 추가
    if (mode) {
        mode.addEventListener('click', handleModeClick);
    }

    if (save) {
        save.addEventListener('click', handleSaveClick);
    }
}

init();