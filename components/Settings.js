import * as React from 'react';
import * as ReactNative from 'react-native';
import { StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class Settings extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            sort_speed: 300,
            sort_array_size: 10,
        }
        
        this.getData();

    }
    saveData = async () => {
        try {
          await AsyncStorage.setItem('sort_speed',this.state.sort_speed.toString())
          await AsyncStorage.setItem('sort_array_size',this.state.sort_array_size.toString())
          console.log(this.state)
        } catch (e) {
          console.log(e)
        }
      }
      getData = async () => {
        try {
          const value_sort_speed = await AsyncStorage.getItem('sort_speed')
          const value_sort_array_size = await AsyncStorage.getItem('sort_array_size')
          if(value_sort_speed !== null && value_sort_array_size!== null) {
            this.setState({sort_speed:parseInt(value_sort_speed)})
            this.setState({sort_array_size:parseInt(value_sort_array_size)})
            //console.log(value_sort_array_size)
          }
        } catch(e) {
            console.log(e)
        }
      }
    render(){
        return (
            <ReactNative.View style={{padding: 20}}>
                <ReactNative.Text style={style.header}>Sort</ReactNative.Text>
                <ReactNative.View style={style.prop}>
                    <ReactNative.Text style={style.propName}>Speed (ms)</ReactNative.Text>
                    <ReactNative.TextInput style={style.propValue} keyboardType='numeric' onChangeText={value => this.setState({sort_speed: parseInt(value ? value : '0')}, () => this.props.updateSettings(this.state))} value={this.state.sort_speed.toString()}/>
                </ReactNative.View>
                <ReactNative.View style={style.prop}>
                    <ReactNative.Text style={style.propName}>Array size</ReactNative.Text>
                    <ReactNative.TextInput style={style.propValue} keyboardType='numeric' onChangeText={value => this.setState({sort_array_size: parseInt(value ? value : '0')}, () => this.props.updateSettings(this.state))} value={this.state.sort_array_size.toString()}/>
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
                <ReactNative.View style={style.btn_container}>
                    <ReactNative.Button 
                        title='Save' 
                        onPress={this.saveData}>
                    </ReactNative.Button>
                </ReactNative.View>
                {/* <ReactNative.View style={style.btn_container}>
                    <ReactNative.Button 
                        title='Get' 
                        onPress={this.getData}>
                    </ReactNative.Button>
                </ReactNative.View> */}
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