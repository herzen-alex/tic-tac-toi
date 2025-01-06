let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
];

let currentPlayer = 'circle'; // Startspieler

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

            tableHTML += `
                <td id="cell-${index}" onclick="makeMove(${index}, this)">
                    ${symbol}
                </td>`;
        }
        tableHTML += '</tr>';
    }
    tableHTML += '</table>';
    container.innerHTML = tableHTML;
}


function makeMove(index, cell) {
    if (fields[index] !== null) return;

    fields[index] = currentPlayer;
    cell.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG();
    cell.onclick = null;

    if (checkWinner()) return;

    currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]            
    ];

    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            drawWinningLine(combo);
            setTimeout(() => alert(`${fields[a]} gewinnt!`), 1000);
            return true;
        }
    }

    return false;
}



function drawWinningLine([a, b, c]) {
    const container = document.getElementById('content');
    const [start, end] = [document.getElementById(`cell-${a}`), document.getElementById(`cell-${c}`)];
    const rectStart = start.getBoundingClientRect();
    const rectEnd = end.getBoundingClientRect();

    const line = document.createElement('div');
    line.style = `
        position: absolute;
        height: 5px;
        background: white;
        transform-origin: 0 50%;
        left: ${rectStart.left + rectStart.width / 2}px;
        top: ${rectStart.top + rectStart.height / 2}px;
        width: ${Math.hypot(rectEnd.left - rectStart.left, rectEnd.top - rectStart.top)}px;
        transform: rotate(${Math.atan2(rectEnd.top - rectStart.top, rectEnd.left - rectStart.left) * 180 / Math.PI}deg);
    `;
    container.appendChild(line);
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




