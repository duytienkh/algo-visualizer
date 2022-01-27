import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import {Sort} from './components/Sort';
import {Graph} from './components/Graph';
import {Settings} from './components/Settings';

const Tab = createBottomTabNavigator();

export default class App extends React.Component {
	constructor(props){
		super(props);
		
		this.state = {
			sort_speed: 300,
		};

		this.updateSettings = this.updateSettings.bind(this);
	}

	updateSettings(s){
		console.log(s);
		this.setState(s);
	}

	render(){
		return (
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
					<Tab.Screen name='Graph' component={Graph}/>
					<Tab.Screen name='Settings' children={() => <Settings updateSettings={this.updateSettings}/>}/>
				</Tab.Navigator>
			</NavigationContainer>
		);
	}
}
