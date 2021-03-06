import * as React from 'react';
import * as ReactNative from 'react-native';
import { AlgorithmPicker } from './components/AlgorithmPicker'
import { SortMonitor } from './components/SortMonitor';

export class Sort extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            algorithms: [
                "Bubble Sort",
                "Insertion Sort",
                "Quick Sort",
                "Selection Sort",
                "Heap Sort",
            ],
            selectedAlgorithm: "Bubble Sort"
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
                <SortMonitor getSelectedAlgorithm={this.getSelectedAlgorithm} settings={this.props.settings}/>
            </ReactNative.View>
        );
    }
};
