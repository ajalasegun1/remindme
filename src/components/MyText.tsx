import {StyleSheet, Text, TextStyle, useColorScheme, View} from 'react-native';
import React, {ReactNode} from 'react';
import {dark, light} from '../theme/colors';
type Props = {
  children: ReactNode;
  numberOfLines?: number;
  style?: TextStyle | TextStyle[];
};
const MyText = ({children, style, numberOfLines}: Props) => {
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  const DARKTEXT = dark.primaryText;
  const LIGHTTEXT = light.primaryText;
  return (
    <Text
      style={[styles.text, {color: isDark ? DARKTEXT : LIGHTTEXT}, style]}
      numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
};

export default MyText;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Jost',
  },
});
