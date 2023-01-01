import {StyleSheet, Text, View, useColorScheme, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {dark, light} from '../theme/colors';

type Props = {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
};
const MyLayerView = ({children, style}: Props) => {
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  return (
    <View
      style={[{backgroundColor: isDark ? dark.layer2 : light.layer2}, style]}>
      {children}
    </View>
  );
};

export default MyLayerView;

const styles = StyleSheet.create({});
