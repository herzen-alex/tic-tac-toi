let fields = [
    null,
    'circle',
    'cross',
    null,
    null,
    null,
    null,
    null,
    null
];

function init() {
    render();
}

function render() {
    const container = document.getElementById('content');
    let tableHTML = '<table>';

    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            let symbol = '';
            if (fields[index] === 'circle') {
                symbol = generateCircleSVG(); // Kreis
            } else if (fields[index] === 'cross') {
                symbol = generateCrossSVG(); // Kreuz
            }
            tableHTML += `<td>${symbol}</td>`;
        }
        tableHTML += '</tr>';
    }
    tableHTML += '</table>';
    container.innerHTML = tableHTML;
}

function generateCircleSVG() {
    return `
    <svg width="70" height="70" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle 
            cx="50" 
            cy="50" 
            r="45" 
            stroke="#00B0EF" 
            stroke-width="5" 
            fill="none" 
            stroke-dasharray="282.74" 
            stroke-dashoffset="282.74"
        >
            <animate 
                attributeName="stroke-dashoffset" 
                from="282.74" 
                to="0" 
                dur="500ms" 
                fill="freeze" 
                repeatCount="1"
            />
        </circle>
    </svg>`;
}

function generateCrossSVG() {
    return `
    <svg width="70" height="70" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <line 
            x1="20" y1="20" x2="80" y2="80" 
            stroke="#FFC000" 
            stroke-width="5" 
            stroke-linecap="round"
        >
            <animate 
                attributeName="x2" 
                from="20" 
                to="80" 
                dur="500ms" 
                fill="freeze" 
            />
            <animate 
                attributeName="y2" 
                from="20" 
                to="80" 
                dur="500ms" 
                fill="freeze" 
            />
        </line>
        <line 
            x1="80" y1="20" x2="20" y2="80" 
            stroke="#FFC000" 
            stroke-width="5" 
            stroke-linecap="round"
        >
            <animate 
                attributeName="x2" 
                from="80" 
                to="20" 
                dur="500ms" 
                begin="500ms"
                fill="freeze" 
            />
            <animate 
                attributeName="y2" 
                from="20" 
                to="80" 
                dur="500ms" 
                begin="500ms"
                fill="freeze" 
            />
        </line>
    </svg>`;
}


