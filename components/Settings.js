import * as React from 'react';
import * as ReactNative from 'react-native';
import { StyleSheet } from 'react-native';

export class Settings extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            sort_speed: 300,
            sort_array_size: 10,
        }

    }

    render(){
        return (
            <ReactNative.View style={{padding: 20}}>
                <ReactNative.Text style={style.header}>Sort</ReactNative.Text>
                <ReactNative.View style={style.prop}>
                    <ReactNative.Text style={style.propName}>Speed</ReactNative.Text>
                    <ReactNative.TextInput style={style.propValue} keyboardType='numeric' onChangeText={value => this.setState({sort_speed: parseInt(value ? value : '0')}, () => this.props.updateSettings(this.state))} value={this.state.sort_speed.toString()}/>
                </ReactNative.View>
                <ReactNative.View style={style.prop}>
                    <ReactNative.Text style={style.propName}>Array Size</ReactNative.Text>
                    <ReactNative.TextInput style={style.propValue} keyboardType='numeric' onChangeText={value => this.setState({sort_array_size: parseInt(value ? value : '0')}, () => this.props.updateSettings(this.state))} value={this.state.sort_array_size.toString()}/>
                </ReactNative.View>
                <ReactNative.View style={style.prop}>
                    <ReactNative.Text style={style.propName}>Sorted Color</ReactNative.Text>
                </ReactNative.View>
                <ReactNative.View style={style.prop}>
                    <ReactNative.Text style={style.propName}>Comparing Color</ReactNative.Text>
                </ReactNative.View>
                <ReactNative.View style={style.prop}>
                    <ReactNative.Text style={style.propName}>Swap Color</ReactNative.Text>
                </ReactNative.View>
                <ReactNative.Text style={style.header}>Graph</ReactNative.Text>
            </ReactNative.View>
        );
    }
};

const style = StyleSheet.create({
    header: {
        fontSize: 24,
        marginBottom: 15,
        marginTop: 15
    },
    prop: {
        flexDirection: "row",
        alignContent: 'center',
        height: 30,
        paddingBottom: 10
    },  
    propName: {
        width: "60%",
        textAlignVertical: 'center',
        paddingLeft: 10,
    },
    propValue: {
        width: "40%",
        textAlignVertical: 'center',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        backgroundColor: 'white',
    }
});