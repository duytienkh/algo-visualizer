import * as React from 'react';
import * as ReactNative from 'react-native';
import { StyleSheet } from 'react-native';

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

    render(){
        return (
            <ReactNative.View style={{paddingTop: 20, paddingBottom: 20, paddingLeft: 50, paddingRight: 50}}>
                <ReactNative.View style={style.row}>
                    <ReactNative.View style={style.btn_container}>
                        <ReactNative.Button color={'orange'} title='Generate' onPress={this.props.generate}>
                        </ReactNative.Button>
                    </ReactNative.View>
                    <ReactNative.View style={style.btn_container}>
                        <ReactNative.Button {...this.state.runStatus}/>
                    </ReactNative.View>
                    <ReactNative.View style={style.btn_container}>
                        <ReactNative.Button color={'red'} title='Reset'/>
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