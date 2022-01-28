import * as React from 'react';
import { Button, View } from 'react-native';
import { Cell } from './Graph/Cell'
import { CELL_STATUS } from './Graph/Containts';
import { GenerateMaze } from './Graph/MazeGen'
export class GraphMonitor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: []
        }
        this.generateMaze = this.generateMaze.bind(this);
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
        this.setState({ grid });
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
            </View>
        )
    }
}
