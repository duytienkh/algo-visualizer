import * as React from 'react';
import * as ReactNative from 'react-native';
import { AlgorithmPicker } from './components/AlgorithmPicker';
import { GraphMonitor } from './components/GraphMonitor';

export class Graph extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            algorithms: [
                "DFS",
                "BFS",
                "A*",
            ],
            selectedAlgorithm: "DFS"
        }

        this.setSelectedAlgorithm = this.setSelectedAlgorithm.bind(this);
        this.getSelectedAlgorithm = this.getSelectedAlgorithm.bind(this);
    }

    setSelectedAlgorithm(algorithm){
        this.setState({
            selectedAlgorithm: algorithm
        });
    }

    getSelectedAlgorithm(){
        return this.state.selectedAlgorithm;
    }

    render(){
        return (
            <ReactNative.View>
                <AlgorithmPicker cb={this.setSelectedAlgorithm} list={this.state.algorithms}/>
                <GraphMonitor getSelectedAlgorithm={this.getSelectedAlgorithm} settings={this.props.settings}/>
            </ReactNative.View>
        );
    }
};
