import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import { Intro } from './components/Intro';
import {Sort} from './components/Sort';
import {Graph} from './components/Graph';
import {Settings} from './components/Settings';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Tab = createBottomTabNavigator();

export default class App extends React.Component {
	constructor(props){
		super(props);
		
		this.state = {
			sort_speed: 300,
			sort_array_size: 10,
			sort_sorted_color: 'red',
			sort_comparing_color: 'blue',
			sort_swapping_color: 'yellow',
			graph_speed: 300,
			graph_width: 10,
			graph_height: 10,

			intro: true,
		};

		this.fetchSettings();

		this.updateSettings = this.updateSettings.bind(this);
		this.switchScreen = this.switchScreen.bind(this);
	}

	async updateSettings(s){
		console.log(s);
		this.setState(s, () => {
			try {
				AsyncStorage.setItem('settings', JSON.stringify(this.state));
			} catch (e) {
				console.log(e)
			}
		});
	}

	async fetchSettings(){
		try {
            let response = await AsyncStorage.getItem('settings');
			if (response == null) return;
            let settings = JSON.parse(response);            
			this.setState({...settings, intro: true});
        } catch(e) {
            console.log(e)
        }
	}

	switchScreen(){
		this.setState({intro: false});
	}

	render(){
		return (
			this.state.intro ? 
			<Intro switchScreen={this.switchScreen}/> :
			<NavigationContainer>
				<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;
			
						if (route.name === 'Sort') {
							iconName = 'cellular-outline';
						} else if (route.name === 'Settings') {
							iconName = 'options-outline';
						} else if (route.name === 'Graph'){
							iconName = 'git-merge-outline';
						}
			
						return <Ionicons name={iconName} size={size} color={color} />;
					},
					tabBarActiveTintColor: 'tomato',
					tabBarInactiveTintColor: 'gray',
				})}>
					<Tab.Screen name='Sort' children={() => <Sort settings={this.state}/>}/>
					<Tab.Screen name='Graph' children={() => <Graph settings={this.state}/>}/>
					<Tab.Screen name='Settings' children={() => <Settings updateSettings={this.updateSettings} settings={this.state}/>}/>
				</Tab.Navigator>
			</NavigationContainer>
		);
	}
}
