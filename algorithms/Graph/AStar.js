import BaseGraph from "./BaseGraph";
import { CELL_STATUS } from '../../components/components/Graph/Containts'
import PriorityQueue from 'js-priority-queue'
class AStar extends BaseGraph {
    search() {
        this.astar(...this.start);
    }
    h(x, y) {
        return Math.abs(x - this.end[0]) + Math.abs(y - this.end[1]);
    }
    astar(x, y) {
        let queue = new PriorityQueue({ comparator: function(a, b) { return a[0] - b[0]; }});
        let g = Array.from(Array(this.n), () => Array.from(Array(this.m), () => 10000));
        let f = Array.from(Array(this.n), () => Array.from(Array(this.m), () => 10000));
        g[x][y] = 0;
        f[x][y] = this.h(...this.start);
        queue.queue([f[x][y], x, y]);
        while (queue.length) {
            const [s, x, y] = queue.dequeue();
            if (s != f[x][y])
                continue;
            this.grid[x][y] = CELL_STATUS.visited;
            if (x == this.end[0] && y == this.end[1]) {
                this.highligh_path();
                return;
            }
            for (let [u, v] of this.getNeighbor(x, y)) {
                let s = g[x][y] + 1;
                if (s < g[u][v]) {
                    this.trace[u][v] = [x, y];
                    g[u][v] = s;
                    f[u][v] = s + this.h(u, v);
                    queue.queue([f[u][v], u, v]);
                    this.grid[u][v] = CELL_STATUS.visiting;
                }
            }
            this.add_step();
        }
    }
}

export default AStar
