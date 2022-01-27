import * as React from 'react';
import * as ReactNative from 'react-native';
import ListColoredElement from './ListColoredElement'
import BubbleSort from '../../algorithms/BubbleSort'

export class SortMonitor extends React.Component{
    state = {array: [], sorted: [], swapping: [], comparing: [], sorting: false}
    componentDidMount() {
        this.setState({
            ...this.state,
            array: [8, 9, 3, 4, 5, 6, 2], //we should generate a random array instead of doing this
        })
    }

    render(){
        const handleSort = () => {
            if (this.state.sorting) {
                return;
            }

            this.setState({
                sorted: [],
                swapping: [],
                comparing: [],
                sorting: true,
                array: [8, 9, 3, 4, 5, 6, 2], //we should generate a random array instead of doing this
            });
            var sort = new BubbleSort(this.state.array);
            var steps = sort.get_steps();
            var obj = this;
            function simulate(i) {
                setTimeout(function() {
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
                    else if (arr == null) { //comparing
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
                        simulate(i + 1);
                    } else {
                        obj.setState({
                            ...obj.state,
                            sorting: false,
                        })
                    }
                }, 300)
            }
            simulate(0);
        }
        return (
            <ReactNative.View>
                <ReactNative.Button title='Click to sort' onPress={handleSort}/>
                <ListColoredElement
                    array={this.state.array}
                    sorted={this.state.sorted}
                    swapping={this.state.swapping}
                    comparing={this.state.comparing}
                />
            </ReactNative.View>
        )
    }
}
