import * as React from 'react';
import { View } from 'react-native';
import { Cell } from './Graph/Cell'
import { CELL_STATUS } from './Graph/Containts';
import { GenerateMaze } from './Graph/MazeGen'
export class GraphMonitor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: []
        }
    }
    componentDidMount() {
        const grid = []
        for (let row = 0; row < 10; ++row) {
            const curRow = []
            for (let col = 0; col < 13; ++col)
                curRow.push(CELL_STATUS.blank);
            grid.push(curRow);
        }
        this.setState({ grid }, this.generateMaze);
    }
    generateMaze() {
        const { grid } = this.state;
        GenerateMaze(grid);
        this.setState({ grid });
    }
    render() {
        const { grid } = this.state;
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                {grid.map((row, rowId) => {
                    return (
                        <View key={rowId} style={{ flexDirection: 'row' }}>
                            {row.map((col, colId) => <Cell x={rowId} y={colId} value={col}></Cell>)}
                        </View>
                    )
                })}
            </View>
        )
    }
}
