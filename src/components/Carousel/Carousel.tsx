import {
  View,
  FlatList,
  Image,
  useWindowDimensions,
  ViewabilityConfig,
  ViewToken,
} from 'react-native';
import {useState, useRef} from 'react';
import DoublePressable from '../DoublePressable';
import colors from '../../theme/colors';

interface ICarousel {
  images: string[];
  onDoublePressed?: () => void;
}

const Carousel = ({images, onDoublePressed = () => {}}: ICarousel) => {
  const {width} = useWindowDimensions();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
      if (viewableItems.length > 0) {
        setActiveImageIndex(viewableItems[0].index || 0);
      }
    },
  );

  return (
    <View style={{alignItems: 'center'}}>
      <FlatList
        data={images}
        renderItem={({item}) => (
          <DoublePressable onDoublePress={onDoublePressed}>
            <Image
              source={{
                uri: item,
              }}
              style={{width: width, aspectRatio: 1}}
              resizeMode="cover"
            />
          </DoublePressable>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig}
      />
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: 0,
        }}>
        {images.map((image, index) => (
          <View
            style={{
              width: 10,
              aspectRatio: 1,
              borderRadius: 5,
              backgroundColor:
                activeImageIndex === index ? colors.primary : colors.white,
              margin: 5,
            }}
            key={index}
          />
        ))}
      </View>
    </View>
  );
};

export default Carousel;
