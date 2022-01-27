import * as React from 'react';
import * as ReactNative from 'react-native';
import { AlgorithmPicker } from './components/AlgorithmPicker'
import { SortMonitor } from './components/SortMonitor';
import { SortController } from './components/SortController';

export class Sort extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            selectedAlgorithm: ""
        }

        this.setSelectedAlgorithm = this.setSelectedAlgorithm.bind(this);
    }

    setSelectedAlgorithm(algorithm){
        this.setState({
            selectedAlgorithm: algorithm
        });
    }

    render(){
        return (
            <ReactNative.View>
                <AlgorithmPicker cb={this.setSelectedAlgorithm}/>
                <SortMonitor/>
                <SortController/>
            </ReactNative.View>
        );
    }
};
