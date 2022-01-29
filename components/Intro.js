import * as React from 'react';
import * as ReactNative from 'react-native';

export class Intro extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            fadeAnim: 1
        }

        this.fadeOut = this.fadeOut.bind(this);
        this.fadeOut();
    }

    fadeOut(){
        console.log(this.state.fadeAnim);
        let obj = this,
            op = this.state.fadeAnim;
        if (op > 0.05){
            setTimeout(() => {
                this.setState({fadeAnim: op - 0.1}, () => this.fadeOut());
            }, 120);
        } else {
            this.props.switchScreen();
        }
    }

    render(){
        return (
            <ReactNative.Animated.View style={{...style.container, opacity: this.state.fadeAnim}}>
                <ReactNative.Text style={style.app_name}>
                    AlgoVisualizer 
                </ReactNative.Text>
            </ReactNative.Animated.View>
        )
    }
};

const style = ReactNative.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    app_name: {
        textAlign: 'center',
        fontSize: 25,
    }
});