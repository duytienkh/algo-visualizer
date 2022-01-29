import * as React from 'react';
import * as ReactNative from 'react-native';

const colors = ['red', 'cyan', 'yellow', 'orange', 'purple', 'green'];

export class ColorPicker extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            current: this.props.color,
        }

        this.updateColor = this.updateColor.bind(this);
    }

    updateColor(){
        this.props.onPressed(this.state.current);
    }

    colorList(){
        let jsx = [];
        colors.forEach(color => {
            let bg = color,
                bd = this.state.current == color ? 2 : 0,
                op = this.state.current == color ? 1 : 0.2;
            jsx.push(<ReactNative.View style={{...style.cell, backgroundColor: bg, borderWidth: bd, opacity: op}} key={color} onTouchEnd={() => this.setState({current: color}, () => this.updateColor())}/>);
        });
        return jsx;
    }

    render(){
        return (
            <ReactNative.View style={{...this.props.style, flexDirection: 'row', flex: 1, justifyContent: 'center'}}>
                {this.colorList()}
            </ReactNative.View>
        )
    }
}

const style = ReactNative.StyleSheet.create({
    cell: {
        width: 20,
        height: 20,
        marginLeft: 5,
        borderRadius: 10,
    },
});
