const apiKey = "YOUR_API_KEY"; // Securely inject this via backend if possible
const $ = id => document.getElementById(id);
const els = {
    canvas: $('canvas'), prompt: $('ai-prompt'), btn: $('generate-btn'),
    loader: $('ai-loader'), btnText: $('btn-text'), empty: $('empty-state'),
    props: $('element-properties'), toast: $('toast')
};

let selectedElement = null;

const showToast = msg => {
    els.toast.textContent = msg;
    els.toast.classList.add('show');
    setTimeout(() => els.toast.classList.remove('show'), 3000);
};

// Simplified RGB to Hex conversion
const rgbToHex = rgb => rgb?.match(/\d+/g)?.reduce((acc, val) => acc + parseInt(val).toString(16).padStart(2, '0'), '#') || "#3b82f6";

async function generateImage() {
    const prompt = els.prompt.value.trim();
    if (!prompt) return showToast("Please enter a description!");

    els.btn.disabled = true;
    els.loader.style.display = 'block';
    els.btnText.textContent = "Creating...";

    try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ instances: [{ prompt }], parameters: { sampleCount: 1 } })
        });
        const { predictions } = await res.json();
        
        if (!predictions?.[0]?.bytesBase64Encoded) throw new Error("Failed to generate.");
        
        addElement('image', `data:image/png;base64,${predictions[0].bytesBase64Encoded}`);
        showToast("Image generated successfully!");
    } catch (err) {
        console.error(err);
        showToast("Error generating image.");
    } finally {
        els.btn.disabled = false;
        els.loader.style.display = 'none';
        els.btnText.textContent = "Generate AI Art";
    }
}

function selectElement(el) {
    selectedElement?.classList.remove('selected');
    (selectedElement = el)?.classList.add('selected');
    els.props.classList.toggle('active', !!el);

    if (el) {
        const isShape = !el.querySelector('img');
        $('elem-color').parentElement.style.display = isShape ? 'block' : 'none';
        if (isShape) $('elem-color').value = rgbToHex(el.style.backgroundColor);
        $('elem-size').value = parseInt(el.style.width);
        $('elem-opacity').value = (el.style.opacity || 1) * 100;
    }
}

function addElement(type, content) {
    els.empty.style.display = 'none';
    const el = Object.assign(document.createElement('div'), { className: 'canvas-element' });
    
    Object.assign(el.style, {
        left: '50px', top: '50px', zIndex: els.canvas.children.length + 1,
        width: type === 'image' ? '300px' : '120px', height: type === 'image' ? 'auto' : '120px',
        backgroundColor: type === 'image' ? 'transparent' : '#3b82f6',
        borderRadius: type === 'circle' ? '50%' : '0'
    });

    if (type === 'image') el.appendChild(Object.assign(document.createElement('img'), { src: content }));

    // Self-contained drag logic removes the need for global drag state variables
    el.onmousedown = e => {
        e.stopPropagation();
        selectElement(el);
        const startX = e.clientX, startY = e.clientY, ex = parseInt(el.style.left), ey = parseInt(el.style.top);
        const move = ev => Object.assign(el.style, { left: ex + ev.clientX - startX + 'px', top: ey + ev.clientY - startY + 'px' });
        const up = () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
        window.addEventListener('mousemove', move); window.addEventListener('mouseup', up);
    };

    els.canvas.appendChild(el);
    selectElement(el);
}

// --- CONTROLS BINDINGS ---
els.btn.onclick = generateImage;
els.canvas.onmousedown = e => e.target === els.canvas && selectElement(null);
document.querySelectorAll('.shape-btn').forEach(b => b.onclick = () => addElement(b.dataset.type));

const bind = (id, ev, fn) => $(id).addEventListener(ev, fn);

bind('canvas-bg', 'input', e => els.canvas.style.backgroundColor = e.target.value);
bind('canvas-radius', 'input', e => els.canvas.style.borderRadius = e.target.value + 'px');

bind('elem-color', 'input', e => { if (selectedElement && !selectedElement.querySelector('img')) selectedElement.style.backgroundColor = e.target.value; });
bind('elem-size', 'input', e => {
    if (!selectedElement) return;
    selectedElement.style.width = e.target.value + 'px';
    if (!selectedElement.querySelector('img')) selectedElement.style.height = e.target.value + 'px';
});
bind('elem-opacity', 'input', e => selectedElement && (selectedElement.style.opacity = e.target.value / 100));

bind('delete-elem', 'click', () => {
    selectedElement?.remove();
    selectElement(null);
    if (!els.canvas.children.length) els.empty.style.display = 'block';
});

bind('clear-canvas', 'click', () => {
    els.canvas.replaceChildren(); // Modern, fast way to clear innerHTML
    selectElement(null);
    els.empty.style.display = 'block';
    els.canvas.style.backgroundColor = $('canvas-bg').value = '#ffffff';
    showToast("Canvas cleared.");
});

bind('download-btn', 'click', async () => {
    selectElement(null);
    try {
        const canvasImg = await html2canvas($('capture-area'), { backgroundColor: null, scale: 2, logging: false, useCORS: true });
        Object.assign(document.createElement('a'), { download: `design-${Date.now()}.png`, href: canvasImg.toDataURL('image/png') }).click();
        showToast("Design downloaded!");
    } catch (err) { console.error(err); showToast("Download failed."); }
});