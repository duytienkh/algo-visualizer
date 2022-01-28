import { CELL_STATUS } from './Containts'

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
    let cntNegVisited = 0;
    for (let u = x - 1; u <= x + 1; ++u)
        for (let v = y - 1; v <= y + 1; ++v)
            if (insideGrid(u, v) && cur_grid[u][v] != 0 && (u != x || v != y))
                ++cntNegVisited;
    return (cntNegVisited < 3) && cur_grid[x][y] == 0;
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
    for (let i = 0; i < height; ++i)
        for (let j = 0; j < width; ++j)
            grid[i][j] = 0;
    cur_grid = grid;
    let stack = []
    let start = [random(0, height - 1), random(0, width - 1)]
    let end = start;
    let max_d = 1;
    stack.push([...start, 1])

    while (stack.length) {
        let [x, y, d] = stack.pop();
        if (validCell(x, y)) {
            grid[x][y] = d;
            if (d > max_d) {
                end = [x, y];
                max_d = d;
            }
            let neg = getNeg(x, y);
            shuffleArray(neg);
            for (var cell of neg)
                stack.push([...cell, d + 1]);
        }
    }
    for (let i = 0; i < height; ++i)
        for (let j = 0; j < width; ++j)
            if (grid[i][j] == 0) {
                if (random(1, 4) == 1)
                    grid[i][j] = CELL_STATUS.blank;
                else
                    grid[i][j] = CELL_STATUS.block;
            }
            else grid[i][j] = CELL_STATUS.blank;

    grid[start[0]][start[1]] = CELL_STATUS.start;
    grid[end[0]][end[1]] = CELL_STATUS.end;
}
