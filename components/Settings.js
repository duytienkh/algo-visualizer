import * as React from 'react';
import * as ReactNative from 'react-native';
import { StyleSheet} from 'react-native';

export class Settings extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            ...this.props.settings
        };
        
    }
    
    render(){
        return (
            <ReactNative.View style={{padding: 20}}>
                <ReactNative.Text style={style.header}>Sort</ReactNative.Text>
                <ReactNative.View style={style.prop}>
                    <ReactNative.Text style={style.propName}>Speed (ms)</ReactNative.Text>
                    <ReactNative.TextInput style={style.propValue} keyboardType='numeric' 
                        onChangeText={value => this.setState({sort_speed: parseInt(value ? value : '0')}, () => this.props.updateSettings(this.state))} 
                        value={this.state.sort_speed.toString()}/>
                </ReactNative.View>
                <ReactNative.View style={style.prop}>
                    <ReactNative.Text style={style.propName}>Array size</ReactNative.Text>
                    <ReactNative.TextInput style={style.propValue} keyboardType='numeric' 
                        onChangeText={value => this.setState({sort_array_size: parseInt(value ? value : '0')}, () => this.props.updateSettings(this.state))} 
                        value={this.state.sort_array_size.toString()}/>
                </ReactNative.View>
                <ReactNative.View style={style.prop}>
                    <ReactNative.Text style={style.propName}>Sorted color</ReactNative.Text>
                </ReactNative.View>
                <ReactNative.View style={style.prop}>
                    <ReactNative.Text style={style.propName}>Comparing color</ReactNative.Text>
                </ReactNative.View>
                <ReactNative.View style={style.prop}>
                    <ReactNative.Text style={style.propName}>Swap color</ReactNative.Text>
                </ReactNative.View>

                <ReactNative.Text style={style.header}>Graph</ReactNative.Text>
                <ReactNative.View style={style.prop}>
                    <ReactNative.Text style={style.propName}>Speed (ms)</ReactNative.Text>
                    <ReactNative.TextInput style={style.propValue} keyboardType='numeric' 
                        onChangeText={value => this.setState({graph_speed: parseInt(value ? value : '0')}, () => this.props.updateSettings(this.state))} 
                        value={this.state.graph_speed.toString()}/>
                </ReactNative.View>
                <ReactNative.View style={style.prop}>
                    <ReactNative.Text style={style.propName}>Maze width</ReactNative.Text>
                    <ReactNative.TextInput style={style.propValue} keyboardType='numeric' 
                        onChangeText={value => this.setState({graph_width: parseInt(value ? value : '0')}, () => this.props.updateSettings(this.state))} 
                        value={this.state.graph_width.toString()}/>
                </ReactNative.View>
                <ReactNative.View style={style.prop}>
                    <ReactNative.Text style={style.propName}>Maze height</ReactNative.Text>
                    <ReactNative.TextInput style={style.propValue} keyboardType='numeric' 
                        onChangeText={value => this.setState({graph_height: parseInt(value ? value : '0')}, () => this.props.updateSettings(this.state))} 
                        value={this.state.graph_height.toString()}/>
                </ReactNative.View>
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