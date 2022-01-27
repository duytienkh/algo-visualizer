import { View } from 'react-native';

const block_width = 30;

function ListColoredElement({ array, sorted, swapping, comparing, style}) {
    return (
        <View style={style}>
            {array.map((val, i) => {
                var bg = 'blue';
                if (sorted.includes(i)) {
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
