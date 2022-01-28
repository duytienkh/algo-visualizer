import BaseGraph from "./BaseGraph";
import { CELL_STATUS } from '../../components/components/Graph/Containts'

class DFS extends BaseGraph {
    search() {
        this.dfs(...this.start);
    }
    dfs(x, y) {
        if (x == this.end[0] && y == this.end[1]) {
            return true;
        }
        this.grid[x][y] = CELL_STATUS.visiting;
        this.top = [x, y]
        this.add_step();
        for (let [u, v] of this.getNeighbor(x, y)) if (this.not_visited(u, v)) {
            if (this.dfs(u, v))
                return true;
        }
        this.grid[x][y] = CELL_STATUS.visited;
        return false;
    }
}

export default DFS
