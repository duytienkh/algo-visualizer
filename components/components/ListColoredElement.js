import { StyleSheet, View, Text } from 'react-native';

const block_width = 30;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'baseline',
        flexDirection: 'row',
    },
});


function ListColoredElement({ array, sorted, swapping, comparing}) {
    return (
        <View style={styles.container}>
            {array.map((val, i) => {
                var bg = 'blue';
                if (sorted.includes(val)) {
                    bg = 'green';
                }
                if (swapping.includes(i)) {
                    bg = 'purple'
                }
                if (comparing.includes(i)) {
                    bg = 'red'
                }
                var style = {
                    width: block_width,
                    height: val * block_width,
                    backgroundColor: bg,
                    margin: 5,
                }
                return <View key={i} style={style}></View>
            })}
        </View>
    );
}

export default ListColoredElement
// export
