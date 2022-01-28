import * as React from 'react';
import { Button, View } from 'react-native';
import { Cell } from './Graph/Cell'
import { CELL_STATUS } from './Graph/Containts';
import { GenerateMaze } from './Graph/MazeGen'
import DFS from '../../algorithms/Graph/DFS'
import BFS from '../../algorithms/Graph/BFS'

function simulate(i, steps, obj) {
    console.log(i);
    setTimeout(function () {
        obj.setState({grid: steps[i], searched: true})
        if (i + 1 < steps.length) {
            simulate(i + 1, steps, obj);
        }
    }, 100)
}

export class GraphMonitor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: []
        }
        this.generateMaze = this.generateMaze.bind(this);
        this.search = this.search.bind(this);
    }
    componentDidMount() {
        const grid = []
        for (let row = 0; row < 15; ++row) {
            const curRow = []
            for (let col = 0; col < 20; ++col)
                curRow.push(CELL_STATUS.blank);
            grid.push(curRow);
        }
        this.setState({ grid }, this.generateMaze);
    }
    generateMaze() {
        const { grid } = this.state;
        GenerateMaze(grid);
        this.setState({ grid, searched: false });
    }
    search() {
        const { grid, searched } = this.state;
        console.log(searched);
        if (searched)
            return;
        let algo = new BFS(grid);
        let steps = algo.get_steps();
        simulate(0, steps, this);
    }
    render() {
        const { grid } = this.state;
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                {grid.map((row, rowId) => {
                    return (
                        <View key={rowId} style={{ flexDirection: 'row' }}>
                            {row.map((col, colId) => <Cell value={col} key={`cell-${rowId}-${colId}`}></Cell>)}
                        </View>
                    )
                })}
                <Button title='Generate maze' onPress={this.generateMaze}></Button>
                <Button title='Search' onPress={this.search}></Button>
            </View>
        )
    }
}
