import * as React from 'react';
import * as ReactNative from 'react-native';
import { StyleSheet } from 'react-native';
import {FloatingAction} from 'react-native-floating-action';

export class SortController extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            runStatus: {
                color: 'green',
                title: 'Run',
                onPress: (e) => this.onRunPress()
            }
        };

        this.onRunPress = this.onRunPress.bind(this);
        this.onGeneratePress = this.onGeneratePress.bind(this);
        this.onResetPress = this.onResetPress.bind(this);
    }

    onGeneratePress(){
        this.props.generate();
    }

    onRunPress(){
        this.setState({
            runStatus: {
                color: 'red',
                title: 'Pause',
                onPress: (e) => this.onPausePress()
            }
        });
        this.props.run();
    }

    onPausePress(){
        this.setState({
            runStatus: {
                color: 'green',
                title: 'Run',
                onPress: (e) => this.onRunPress()
            }
        });
        this.props.pause();
    }

    onResetPress(){
        this.props.reset();
    }

    render(){
        return (
            <ReactNative.View style={{paddingTop: 20, paddingBottom: 20, paddingLeft: 30, paddingRight: 30}}>
                <ReactNative.View style={style.row}>
                    <ReactNative.View style={style.btn_container}>
                        <ReactNative.Button color={'orange'} title='Generate' onPress={this.onGeneratePress}>
                        </ReactNative.Button>
                    </ReactNative.View>
                    <ReactNative.View style={style.btn_container}>
                        <ReactNative.Button {...this.state.runStatus}/>
                    </ReactNative.View>
                    <ReactNative.View style={style.btn_container}>
                        <ReactNative.Button color={'red'} title='Reset' onPress={this.onResetPress}/>
                    </ReactNative.View>
                </ReactNative.View>
            </ReactNative.View>
        )
    }
}

const style = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    btn_container: {
        width: '30%',
        textAlign: 'center',
        margin: 10,
    },
});
