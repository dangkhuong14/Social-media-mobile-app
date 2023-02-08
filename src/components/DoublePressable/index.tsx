import {ReactNode, useEffect} from 'react';
import {Pressable} from 'react-native';

interface IDoublePress {
  onDoublePress?: () => void;
  children: ReactNode;
}

const DoublePressable = ({
  onDoublePress = () => {},
  children,
}: IDoublePress) => {
  let lastPress = 0;

  const handleDoublePress = () => {
    let now = Date.now();

    if (now - lastPress < 300) {
      onDoublePress();
    }

    lastPress = now;
  };

  return <Pressable onPress={handleDoublePress}>{children}</Pressable>;
};

export default DoublePressable;
