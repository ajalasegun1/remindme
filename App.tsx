import React, {type PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import MyText from './src/components/MyText';
import {light, dark} from './src/theme/colors';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Hello world!</Text>
      <MyText>Check</MyText>
      <View
        style={{
          width: '100%',
          height: '40%',
          backgroundColor: dark.layer,
        }}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    fontSize: 30,
    fontFamily: 'Jost',
    // fontWeight: 'bold',
  },
});

export default App;
