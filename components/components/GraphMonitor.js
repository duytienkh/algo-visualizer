import * as React from 'react';
import { Button, View } from 'react-native';
import { Cell } from './Graph/Cell'
import { CELL_STATUS } from './Graph/Containts';
import { GenerateMaze } from './Graph/MazeGen'
import DFS from '../../algorithms/Graph/DFS'
import BFS from '../../algorithms/Graph/BFS'
import AStar from '../../algorithms/Graph/AStar'
import { GraphController } from './GraphController';

function simulate(i, steps, obj) {
    setTimeout(function () {
        obj.setState({
            ...obj.state,
            grid: steps[i],
        })
        if (i + 1 < steps.length) {
            obj.setState({
                ...obj.state,
                current_step: i + 1,
            })
            if (obj.state.searching)
                simulate(i + 1, steps, obj);
        }
        else {
            obj.setState({
                ...obj.state,
                searching: false,
                current_step: i + 1,
            })
        }
    }, obj.props.settings.graph_speed);
}

export class GraphMonitor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            searching: false,
            current_step: 0,
        }
        this.generateMaze = this.generateMaze.bind(this);
        this.search = this.search.bind(this);
        this.resetSearch = this.resetSearch.bind(this);
        this.pauseSearch = this.pauseSearch.bind(this);
        this.getAlgorithm = this.getAlgorithm.bind(this);
    }
    componentDidMount() {
        this.generateMaze();
    }
    generateMaze() {
        const grid = [];
        for (let row = 0; row < this.props.settings.graph_height; ++row) {
            const curRow = []
            for (let col = 0; col < this.props.settings.graph_width; ++col)
                curRow.push(CELL_STATUS.blank);
            grid.push(curRow);
        }
        GenerateMaze(grid);
        this.initial_grid = grid.map(a => {return [...a]});
        this.resetSearch();
    }

    getAlgorithm(){
        let name = this.props.getSelectedAlgorithm();
        switch (name) {
            case "DFS":
                return new DFS(this.initial_grid);
            case "BFS":
                return new BFS(this.initial_grid);
            case "A*":
                return new AStar(this.initial_grid);
            default:
                return new DFS(this.initial_grid);
        }
    }

    pauseSearch() {
        this.setState({
            ...this.state,
            searching: false,
        })
    }

    resetSearch() {
        this.setState({
            searching: false,
            grid: this.initial_grid.map(a => {return [...a]}),
            current_step: 0,
        })
    }

    search() {
        this.setState({
            ...this.state,
            searching: true,
        }, () => {
            let algo = this.getAlgorithm();
            let steps = algo.get_steps();
            if (this.state.current_step < steps.length)
                simulate(this.state.current_step, steps, this);
        })
    }
    render() {
        const { grid } = this.state;
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                {grid.map((row, rowId) => {
                    return (
                        <View key={rowId} style={{ flexDirection: 'row' }}>
                            {row.map((col, colId) => <Cell value={col} key={`cell-${rowId}-${colId}`} settings={this.props.settings}></Cell>)}
                        </View>
                    )
                })}
                <GraphController generate={this.generateMaze} run={this.search} pause={this.pauseSearch} reset={this.resetSearch}/>
            </View>
        )
    }
}
