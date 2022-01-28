import { View } from 'react-native';
import { Dimensions } from 'react-native';

const block_width = 30;
const window_width = Dimensions.get('window').width;

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
                
                
                let block_margin = 5,
                    block_width = Math.round((window_width - (array.length + 1) * block_margin) / array.length),
                    block_height = val * block_width;
                
                var style = {
                    width: block_width,
                    height: block_height,
                    backgroundColor: bg,
                    marginLeft: block_margin,
                }
                return <View key={i} style={style}></View>
            })}
        </View>
    );
}

export default ListColoredElement
