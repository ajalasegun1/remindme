import {StyleSheet, Text, useColorScheme, View, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {dark, light} from '../theme/colors';

type Props = {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
};
const MySafeContainer = ({children, style}: Props) => {
  const theme = useColorScheme();
  const isDark = theme === 'dark';

  return (
    <SafeAreaView
      style={[
        {backgroundColor: isDark ? dark.background : light.background},
        style,
      ]}>
      {children}
    </SafeAreaView>
  );
};

export default MySafeContainer;

const styles = StyleSheet.create({});
