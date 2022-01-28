import * as React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import ListColoredElement from './ListColoredElement';
import BubbleSort from '../../algorithms/BubbleSort';
import InsertionSort from '../../algorithms/InsertionSort';
import SelectionSort from '../../algorithms/SelectionSort';
import QuickSort from '../../algorithms/QuickSort';
import { SortController } from './SortController';


function simulate(i, steps, obj, simulation_speed) {
    setTimeout(function () {
        obj.setState({
            ...obj.state,
            swapping: [],
            comparing: [],
        })
        const [x, y, arr, correct] = steps[i]
        if (correct != null) {
            var sorted = obj.state.sorted;
            sorted.push(correct);
            obj.setState({
                ...obj.state,
                sorted: sorted,
            })
        }
        else if (arr == null) {
            //comparing
            obj.setState({
                ...obj.state,
                comparing: [x, y],
            })
        }
        else {
            //swap x, y
            obj.setState({
                ...obj.state,
                swapping: [x, y],
                array: arr,
            })
        }

        if (i + 1 < steps.length) {
            simulate(i + 1, steps, obj, simulation_speed);
        } else {
            obj.setState({
                ...obj.state,
                sorting: false,
            })
        }
    }, simulation_speed)
}

export class SortMonitor extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            array: [], 
            sorted: [], 
            swapping: [], 
            comparing: [], 
            sorting: false
        }

        this.handleSort = this.handleSort.bind(this);
        this.pauseSort = this.pauseSort.bind(this);
        this.generate_random_array = this.generate_random_array.bind(this);
    }
    
    componentDidMount() {
        this.generate_random_array();
    }

    generate_random_array() {
        this.setState({
            sorting: false,
            sorted: [],
            swapping: [],
            comparing: [],
            array: Array.from({ length: this.props.settings.sort_array_size }, () => Math.floor(Math.random() * this.props.settings.sort_array_size) + 1),
        })
    }

    getSort(){
        let sortName = this.props.getSelectedAlgorithm();
        switch (sortName) {
            case "Bubble Sort":
                return new BubbleSort(this.state.array);
            case "Insertion Sort":
                return new InsertionSort(this.state.array);
            case "Quick Sort":
                return new QuickSort(this.state.array);
            case "Selection Sort":
                return new SelectionSort(this.state.array);
            default:
                return new BubbleSort(this.state.array);
        }
    }

    handleSort(){
        if (this.state.sorting) {
            return;
        }
        let obj = this;

        // TODO: let user config this
        let simulation_speed = this.props.settings.sort_speed;

        this.setState({
            sorted: [],
            swapping: [],
            comparing: [],
            sorting: true,
        }, () => {
            let sort = this.getSort();
            let steps = sort.get_steps();
            simulate(0, steps, obj, simulation_speed);
        });   
    }

    pauseSort(){

    }

    render() {
        return (
            <View>
                <ListColoredElement
                    array={this.state.array}
                    sorted={this.state.sorted}
                    swapping={this.state.swapping}
                    comparing={this.state.comparing}
                    style={{marginLeft: 50, marginRight: 50, justifyContent: 'center', alignItems: 'baseline', flexDirection: 'row', height: 300}}
                />
                <SortController run={this.handleSort} pause={this.pauseSort} generate={this.generate_random_array}/>
            </View>
        )
    }
}
