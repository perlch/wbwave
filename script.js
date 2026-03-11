
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-btn');
    const styleSel = document.getElementById('style');
    const densInp = document.getElementById('density');
    const ampInp = document.getElementById('amplitude');
    const genBtn = document.getElementById('generate');
    const downBtn = document.getElementById('download');

    function init() {
        const scale = 4; 
        canvas.width = 114.3 * scale * 4; 
        canvas.height = 165.1 * scale * 4;
        draw();
    }

    function draw() {
        const w = canvas.width;
        const h = canvas.height;
        const style = styleSel.value;
        const density = parseInt(densInp.value);
        const amp = parseInt(ampInp.value);
        const thick = 1.2; 
        const seed = Math.random() * 5000;

        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = "black";
        ctx.lineWidth = thick;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        if (style === 'sine') {
            for (let i = 0; i <= density; i++) {
                ctx.beginPath();
                let yBase = (h / density) * i;
                for (let x = 0; x <= w; x += 10) {
                    let y = yBase + Math.sin(x * 0.005 + i + seed) * (amp * 2);
                    x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
                }
                ctx.stroke();
            }
        } else if (style === 'mesh') {
            for (let i = 0; i <= density; i++) {
                ctx.beginPath();
                let xBase = (w / density) * i;
                for (let y = 0; y <= h; y += 15) {
                    let x = xBase + Math.sin(y * 0.003 + seed) * (amp * 1.5);
                    y === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
                }
                ctx.stroke();
            }
        } else if (style === 'interference') {
            for (let i = 0; i < density; i++) {
                ctx.beginPath();
                ctx.arc(w/2, h/2, i * (amp), 0, Math.PI * 2);
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(w/2 + amp*2, h/2 + amp, i * (amp * 0.8), 0, Math.PI * 2);
                ctx.stroke();
            }
        } else if (style === 'ribbons') {
            for (let i = 0; i < density; i++) {
                ctx.beginPath();
                ctx.moveTo(0, h/density * i);
                ctx.bezierCurveTo(w/2, h/density * i + amp * 5, w/2, h/density * i - amp * 5, w, h/density * i);
                ctx.stroke();
            }
        } else if (style === 'noise') {
            for (let i = 0; i < density; i++) {
                ctx.beginPath();
                let y = (h / density) * i;
                ctx.moveTo(0, y);
                for (let x = 0; x < w; x += 30) {
                    let dy = Math.tan(x * 0.0005 + seed + i) * (amp / 2);
                    ctx.lineTo(x, y + dy);
                }
                ctx.stroke();
            }
        } else if (style === 'strands') {
            for (let i = 0; i < density; i++) {
                ctx.beginPath();
                let x = (w / density) * i;
                ctx.moveTo(x, 0);
                ctx.quadraticCurveTo(x + amp * 3 * Math.sin(i + seed), h/2, x, h);
                ctx.stroke();
            }
        }
    }

    toggleBtn.onclick = () => {
        sidebar.classList.toggle('hidden');
        toggleBtn.innerText = sidebar.classList.contains('hidden') ? '▶' : '◀';
    };

    genBtn.onclick = draw;
    [styleSel, densInp, ampInp].forEach(el => el.oninput = draw);

    downBtn.onclick = () => {
        const link = document.createElement('a');
        link.download = 'wbwave-design.jpg';
        link.href = canvas.toDataURL('image/jpeg', 1.0);
        link.click();
    };

    window.onload = init;
