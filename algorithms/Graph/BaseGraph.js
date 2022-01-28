import { CELL_STATUS } from '../../components/components/Graph/Containts'

const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

class BaseGraph {
    constructor(grid) {
        this.grid = grid.map(a => {return [...a]});
        this.trace = grid.map(a => {return [...a]});
        this.steps = [];
        this.n = grid.length
        this.m = grid[0].length;
        this.top = [];
        for (let i = 0; i < this.n; ++i)
            for (let j = 0; j < this.m; ++j)
                if (grid[i][j] == CELL_STATUS.start)
                    this.start = [i, j]
                else if (grid[i][j] == CELL_STATUS.end)
                    this.end = [i, j]
    }

    highligh_path() {
        let [x, y] = this.end;
        while (x != this.start[0] || y != this.start[1]) {
            [x, y] = this.trace[x][y];
            this.grid[x][y] = CELL_STATUS.path;
        }
        this.add_step();
    }

    add_step() {
        let grid = this.grid.map(a => {return [...a]});
        grid[this.start[0]][this.start[1]] = CELL_STATUS.start;
        grid[this.end[0]][this.end[1]] = CELL_STATUS.end;
        for (let [x, y] of this.top)
            grid[x][y] = CELL_STATUS.open;
        this.steps.push(grid);
    }

    valid(x, y) {
        return 0 <= x && x < this.n && 0 <= y && y < this.m && this.grid[x][y] != CELL_STATUS.block;
    }

    not_visited(x, y) {
        return this.grid[x][y] != CELL_STATUS.visited && this.grid[x][y] != CELL_STATUS.visiting;
    }

    getNeighbor(x, y) {
        let neg = []
        for (let i = 0; i < 4; ++i) {
            let [u, v] = [x + dx[i], y + dy[i]]
            if (this.valid(u, v))
                neg.push([u, v])
        }
        return neg;
    }

    get_steps() {
        this.search()
        return this.steps;
    }
    search() { }
}

export default BaseGraph
