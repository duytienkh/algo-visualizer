import React from 'react';
import { View } from 'react-native';
import { Dimensions } from 'react-native';
import { Animated } from 'react-native';

const window_width = Dimensions.get('window').width;

export class ListColoredElement extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={this.props.style}>
                {
                    this.props.array.map((val, i) => {
                        let bg = 'blue';
                        if (this.props.sorted.includes(i)) {
                            bg = 'green';
                        }
                        if (this.props.swapping.includes(i)) {
                            bg = 'purple'
                        }
                        if (this.props.comparing.includes(i)) {
                            bg = 'red'
                        }
                        
                        let frame_padding = 10,
                            block_margin = 5,
                            block_width = Math.round((window_width - 2 * frame_padding - (this.props.array.length + 1) * block_margin) / this.props.array.length),
                            block_height = Math.round(val * this.props.height / Math.max(...this.props.array));
                        
                        let style = {
                            width: block_width,
                            height: block_height,
                            backgroundColor: bg,
                            marginLeft: block_margin,
                        }
                        return <View key={i} style={style}></View>
                })}
            </View>
        );
    }
};