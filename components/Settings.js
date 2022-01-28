import * as React from 'react';
import * as ReactNative from 'react-native';
import { StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';
import { ColorPicker } from './components/ColorPicker';

export class Settings extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            ...this.props.settings
        };
        
        console.log(this.state);
    }
    
    render(){
        return (
            <ReactNative.View style={{padding: 20}}>
                <ReactNative.View style={style.section}>
                    <ReactNative.Text style={style.header}>Sort</ReactNative.Text>
                        <ReactNative.View style={style.prop}>
                            <ReactNative.Text style={style.propName}>Speed (ms)</ReactNative.Text>
                            <ReactNative.Text style={style.propSliderValue}>{this.state.sort_speed}</ReactNative.Text>
                            <Slider minimumValue={50} maximumValue={500} value={this.state.sort_speed} style={style.propSlider} 
                                onSlidingComplete={value => this.setState({sort_speed: Math.round(value)}, () => this.props.updateSettings(this.state))}/>
                        </ReactNative.View>
                        <ReactNative.View style={style.prop}>
                            <ReactNative.Text style={style.propName}>Array size</ReactNative.Text>
                            <ReactNative.Text style={style.propSliderValue}>{this.state.sort_array_size}</ReactNative.Text>
                            <Slider minimumValue={5} maximumValue={30} value={this.state.sort_array_size} style={style.propSlider} 
                                onSlidingComplete={value => this.setState({sort_array_size: Math.round(value)}, () => this.props.updateSettings(this.state))}/>
                        </ReactNative.View>
                        <ReactNative.View style={style.prop}>
                            <ReactNative.Text style={style.propName}>Sorted color</ReactNative.Text>
                            <ColorPicker style={style.propColor} color={this.state.sort_sorted_color}
                                onPressed={value => this.setState({sort_sorted_color: value}, () => this.props.updateSettings(this.state))}/>
                        </ReactNative.View>
                        <ReactNative.View style={style.prop}>
                            <ReactNative.Text style={style.propName}>Comparing color</ReactNative.Text>
                            <ColorPicker style={style.propColor} color={this.state.sort_comparing_color}
                                onPressed={value => this.setState({sort_comparing_color: value}, () => this.props.updateSettings(this.state))}/>
                        </ReactNative.View>
                        <ReactNative.View style={style.prop}>
                            <ReactNative.Text style={style.propName}>Swap color</ReactNative.Text>
                            <ColorPicker style={style.propColor} color={this.state.sort_swapping_color}
                                onPressed={value => this.setState({sort_swapping_color: value}, () => this.props.updateSettings(this.state))}/>
                        </ReactNative.View>
                </ReactNative.View>
                <ReactNative.View style={style.section}>
                    <ReactNative.Text style={style.header}>Graph</ReactNative.Text>
                    <ReactNative.View style={style.prop}>
                        <ReactNative.Text style={style.propName}>Speed (ms)</ReactNative.Text>
                        <ReactNative.Text style={style.propSliderValue}>{this.state.graph_speed}</ReactNative.Text>
                        <Slider minimumValue={50} maximumValue={500} value={this.state.graph_speed} style={style.propSlider} 
                            onSlidingComplete={value => this.setState({graph_speed: Math.round(value)}, () => this.props.updateSettings(this.state))}/>
                    </ReactNative.View>
                    <ReactNative.View style={style.prop}>
                        <ReactNative.Text style={style.propName}>Maze width</ReactNative.Text>
                        <ReactNative.Text style={style.propSliderValue}>{this.state.graph_width}</ReactNative.Text>
                        <Slider minimumValue={5} maximumValue={20} value={this.state.graph_width} style={style.propSlider} 
                            onSlidingComplete={value => this.setState({graph_width: Math.round(value)}, () => this.props.updateSettings(this.state))}/>
                    </ReactNative.View>
                    <ReactNative.View style={style.prop}>
                        <ReactNative.Text style={style.propName}>Maze height</ReactNative.Text>
                        <ReactNative.Text style={style.propSliderValue}>{this.state.graph_height}</ReactNative.Text>
                        <Slider minimumValue={5} maximumValue={20} value={this.state.graph_height} style={style.propSlider} 
                            onSlidingComplete={value => this.setState({graph_height: Math.round(value)}, () => this.props.updateSettings(this.state))}/>
                    </ReactNative.View>
                </ReactNative.View>
            </ReactNative.View>
        );
    }
};

const style = StyleSheet.create({
    header: {
        fontSize: 24,
        marginBottom: 15,
        textAlign: 'center',
    },
    section: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
        marginBottom: 20,
        borderColor: '#dbdbdb',
        borderWidth: 1
    },
    prop: {
        flexDirection: "row",
        alignContent: 'center',
        height: 30,
        paddingBottom: 10
    },  
    propName: {
        width: "50%",
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
    },
    propSliderValue: {
        width: '10%',
    }, 
    propSlider: {
        width: '40%',
    },
    propColor: {
        width: '50%',
    },
});