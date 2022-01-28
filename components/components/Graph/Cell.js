import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { CELL_STATUS } from './Containts'
export class Cell extends Component {
    render() {
        const { value } = this.props
        let color = 'white'
        if (value == CELL_STATUS.block)
            color = 'black'
        if (value == CELL_STATUS.start)
            color = 'green'
        if (value == CELL_STATUS.end)
            color = 'blue'
        if (value == CELL_STATUS.visited) {
            color = 'darkgray'
        }
        if (value == CELL_STATUS.visiting) {
            color = 'aqua'
        }
        if (value == CELL_STATUS.open) {
            color = 'chartreuse'
        }
        return (
            <View style={{ ...styles.cell, backgroundColor: color }}>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cell: {
        width: 15,
        height: 15,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
        margin: 1,
    },
});
