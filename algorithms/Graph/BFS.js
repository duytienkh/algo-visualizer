import BaseGraph from "./BaseGraph";
import { CELL_STATUS } from '../../components/components/Graph/Containts'

class BFS extends BaseGraph {
    search() {
        this.bfs(...this.start);
    }
    bfs(x, y) {
        let queue = [];
        let next_queue = [[x, y]];
        while (next_queue.length) {
            queue = next_queue;
            next_queue = [];
            for ([x, y] of queue) {
                this.grid[x][y] = CELL_STATUS.visited;
                if (x == this.end[0] && y == this.end[1])
                    return;
                for (let [u, v] of this.getNeighbor(x, y)) if (this.not_visited(u, v)) {
                    next_queue.push([u, v]);
                    this.grid[u][v] = CELL_STATUS.visiting;
                }
            }
            this.add_step();
        }
    }
}

export default BFS
