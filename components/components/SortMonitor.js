import * as React from 'react';
import { View, Button, StyleSheet, Dimensions } from 'react-native';
import {ListColoredElement} from './ListColoredElement';
import BubbleSort from '../../algorithms/Sort/BubbleSort';
import InsertionSort from '../../algorithms/Sort/InsertionSort';
import SelectionSort from '../../algorithms/Sort/SelectionSort';
import QuickSort from '../../algorithms/Sort/QuickSort';
import HeapSort from '../../algorithms/Sort/HeapSort';
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
            obj.setState({
                ...obj.state,
                current_step: i + 1,
            })
            if (obj.state.sorting) {
                simulate(i + 1, steps, obj, simulation_speed);
            }
        } else {
            obj.setState({
                ...obj.state,
                sorting: false,
                current_step: i + 1,
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
            sorting: false,
            current_step: 0,
        }

        this.handleSort = this.handleSort.bind(this);
        this.pauseSort = this.pauseSort.bind(this);
        this.resetSort = this.resetSort.bind(this);
        this.generate_random_array = this.generate_random_array.bind(this);
    }

    componentDidMount() {
        this.generate_random_array();
    }

    generate_random_array() {
        this.initial_array = Array.from({ length: this.props.settings.sort_array_size }, () => Math.floor(Math.random() * this.props.settings.sort_array_size) + 1);
        this.setState({
            sorting: false,
            sorted: [],
            swapping: [],
            comparing: [],
            array: this.initial_array.slice(),
            current_step: 0,
        })
    }

    getSort(){
        let sortName = this.props.getSelectedAlgorithm();
        switch (sortName) {
            case "Bubble Sort":
                return new BubbleSort(this.initial_array);
            case "Insertion Sort":
                return new InsertionSort(this.initial_array);
            case "Quick Sort":
                return new QuickSort(this.initial_array);
            case "Selection Sort":
                return new SelectionSort(this.initial_array);
            case "Heap Sort":
                return new HeapSort(this.initial_array);
            default:
                return new BubbleSort(this.initial_array);
        }
    }

    handleSort(){
        if (this.state.sorting) {
            return;
        }
        let obj = this;

        let simulation_speed = this.props.settings.sort_speed;

        this.setState({
            ...this.state,
            sorting: true,
        }, () => {
            let sort = this.getSort();
            let steps = sort.get_steps();
            if (this.state.current_step < steps.length)
                simulate(this.state.current_step, steps, obj, simulation_speed);
        });
    }

    resetSort() {
        this.setState({
            sorted: [],
            swapping: [],
            comparing: [],
            sorting: false,
            array: this.initial_array,
            current_step: 0,
        })
    }

    pauseSort(){
        this.setState({
            ...this.state,
            sorting: false,
        })
    }

    render() {
        const height = Math.round(Dimensions.get('window').height * 0.5);
        return (
            <View>
                <ListColoredElement
                    settings={this.props.settings}
                    array={this.state.array}
                    sorted={this.state.sorted}
                    swapping={this.state.swapping}
                    comparing={this.state.comparing}
                    height={height}
                    style={{marginLeft: 50, marginRight: 50, justifyContent: 'center', alignItems: 'baseline', flexDirection: 'row', height: height}}
                />
                <SortController run={this.handleSort} pause={this.pauseSort} generate={this.generate_random_array} reset={this.resetSort}/>
            </View>
        )
    }
}
