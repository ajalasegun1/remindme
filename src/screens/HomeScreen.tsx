import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MyText from '../components/MyText';
import Pinned from '../components/Homescreen/Pinned';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView
        style={{flex: 1, paddingTop: 8}}
        showsVerticalScrollIndicator={false}> */}
      <MyText style={styles.text}>Reminders</MyText>
      <Pinned />
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
