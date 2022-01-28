const HORIZONTAL = 0;
const VERTICAL = 1;

function random(l, r) {
    return l + Math.round(Math.random() * (r - l));
}

const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];
var height = 0;
var width = 0;
var cur_grid = [];

function insideGrid(x, y) {
    return 0 <= x && x < height && 0 <= y && y < width;
}

function validCell(x, y) {
    let cntNegOne = 0;
    for (let u = x - 1; u <= x + 1; ++u)
        for (let v = y - 1; v <= y + 1; ++v)
            if (insideGrid(u, v) && cur_grid[u][v] == 1 && (u != x || v != y))
                ++cntNegOne;
    return (cntNegOne < 3) && cur_grid[x][y] != 1;
}

function getNeg(x, y) {
    let neg = []
    for (let i = 0; i < 4; ++i) {
        let [u, v] = [x + dx[i], y + dy[i]]
        if (insideGrid(u, v))
            neg.push([u, v])
    }
    return neg;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function GenerateMaze(grid) {
    height = grid.length
    width = grid[0].length
    cur_grid = grid;
    let stack = []
    stack.push([random(0, height - 1), random(0, width - 1)])

    while (stack.length) {
        let [x, y] = stack.pop();
        if (validCell(x, y)) {
            grid[x][y] = 1;
            let neg = getNeg(x, y);
            shuffleArray(neg);
            stack.push(...neg);
        }
    }
    for (let i = 0; i < height; ++i)
        for (let j = 0; j < width; ++j)
            if (grid[i][j] == 1)
                grid[i][j] = 0;
            else grid[i][j] = -1;
}
