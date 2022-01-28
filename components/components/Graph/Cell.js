import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import { CELL_STATUS } from './Containts'
export class Cell extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {x, y, value} = this.props
        let color = 'white'
        if (value == CELL_STATUS.block)
            color = 'black'
        return (
            <View style={{...styles.cell, backgroundColor: color}} key={`cell-${x}-${y}`}>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cell: {
        width: 25,
        height: 25,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
        margin: 1,
    },
});
