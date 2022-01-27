import * as React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import ListColoredElement from './ListColoredElement'
import BubbleSort from '../../algorithms/BubbleSort'
import InsertionSort from '../../algorithms/InsertionSort'
import SelectionSort from '../../algorithms/SelectionSort'

export class SortMonitor extends React.Component {
    state = { array: [], sorted: [], swapping: [], comparing: [], sorting: false }
    componentDidMount() {
        this.generate_random_array();
    }

    generate_random_array() {
        this.setState({
            ...this.state,
            array: Array.from({ length: 7 }, () => Math.floor(Math.random() * 9) + 1),
        })
    }

    render() {
        const handleSort = () => {
            if (this.state.sorting) {
                return;
            }
            var obj = this;

            // TODO: let user config this
            var simulation_speed = 300;

            this.setState({
                ...this.state,
                sorted: [],
                swapping: [],
                comparing: [],
                sorting: true,
            }, () => {
                // TODO: Able to specify algorithm
                var sort = new SelectionSort(this.state.array);
                var steps = sort.get_steps();
                function simulate(i) {
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
                            simulate(i + 1);
                        } else {
                            obj.setState({
                                ...obj.state,
                                sorting: false,
                            })
                        }
                    }, simulation_speed)
                }
                simulate(0);
            });
        }
        return (
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={{ paddingRight: 10 }}>
                        <Button title='Click to sort' onPress={handleSort} />
                    </View>
                    <Button title='Generate' onPress={() => this.generate_random_array()} />
                </View>
                <ListColoredElement
                    array={this.state.array}
                    sorted={this.state.sorted}
                    swapping={this.state.swapping}
                    comparing={this.state.comparing}
                    style={styles.list_colored}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    list_colored: {
        justifyContent: 'center',
        alignItems: 'baseline',
        flexDirection: 'row',
    },
});
