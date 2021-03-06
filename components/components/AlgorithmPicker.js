import * as React from 'react';
import * as ReactNative from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';

export class AlgorithmPicker extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            algorithms: props.list,
            selectedAlgorithm: ""
        }

        this.setAlgorithm = this.setAlgorithm.bind(this);
    }

    setAlgorithm(name){
        this.setState({
            selectedAlgorithm: name
        });

        this.props.cb(name);
    }

    createOptions(){
        //algo = this.state.algorithms;
        const jsx = [];

        this.state.algorithms.forEach(element => {
            jsx.push(<Picker.Item label={element} value={element} key={element}/>);
        });

        return jsx;

    }

    render(){
        return (
            <ReactNative.View style={style.container}>
                <ReactNative.Text>
                    Select Algorithm
                </ReactNative.Text>
                <ReactNative.View style={style.picker_container}>
                    <Picker selectedValue={this.state.selectedAlgorithm}
                            onValueChange={(itemValue, itemIndex) => this.setAlgorithm(itemValue)}
                            mode='dropdown'
                            style={style.dropdown}>
                        {this.createOptions()}
                    </Picker>
                </ReactNative.View>
            </ReactNative.View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        padding: 10,
    },
    picker_container: {

    },
    dropdown: {
        color: 'blue',
    }
});
