import {
  FlatList,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MyText from '../components/MyText';
import Pinned from '../components/Homescreen/Pinned';
import Reminders from '../components/Homescreen/Reminders';
import MySafeContainer from '../components/MySafeContainer';
import {HomeType} from '../components/Homescreen/homeScreenTypes';
import {ItemType} from '../components/Homescreen/homeScreenTypes';
import {dark, light} from '../theme/colors';
import dayjs from 'dayjs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeScreenNavProps, RootStackParamList} from '../navigation/navTypes';

const HomeScreen = ({navigation}: HomeScreenNavProps) => {
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  const feat = [
    {
      id: 1,
      title: 'Coffee',
      body: 'Prepare hot coffee for frineds',
      date: new Date(),
      time: new Date(),
      color: 'red',
      pinned: false,
    },
    {
      id: 2,
      title: 'Coffee',
      body: '',
      date: new Date(),
      time: new Date(),
      color: 'cyan',
      pinned: false,
    },
    {
      id: 3,
      title: 'Coffee',
      body: 'Prepare hot coffee for frineds',
      date: new Date(),
      time: new Date(),
      color: 'teal',
      pinned: false,
    },
    {
      id: 4,
      title: 'Coffee',
      body: 'Prepare hot coffee for frineds',
      date: new Date(),
      time: new Date(),
      color: 'purple',
      pinned: false,
    },
    {
      id: 5,
      title: 'Coffee',
      body: '',
      date: new Date(),
      time: new Date(),
      color: 'orange',
      pinned: false,
    },
  ];
  const renderItem: ListRenderItem<ItemType> = ({item, index}) => (
    <View style={[styles.item, {backgroundColor: item.color}]}>
      <MyText style={styles.title} numberOfLines={2}>
        {item.title}
      </MyText>
      <MyText style={styles.body} numberOfLines={2}>
        {item.body}
      </MyText>

      <MyText
        style={[
          styles.timeContainer,
          {borderColor: isDark ? dark.primaryText : light.primaryText},
        ]}>
        {dayjs(item.date).format('MMM DD')}, {dayjs(item.time).format('H:mm')}
      </MyText>
    </View>
  );
  const headerComponent = () => (
    <>
      <Pinned />
      <MyText style={[styles.text2, {color: light.secondaryText}]}>
        Upcoming
      </MyText>
    </>
  );
  return (
    <MySafeContainer style={styles.container}>
      <MyText style={styles.text}>Reminders</MyText>
      <FlatList
        data={feat}
        renderItem={renderItem}
        ListHeaderComponent={headerComponent}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
      <Pressable
        style={styles.add}
        onPress={() => navigation.push('AddScreen')}>
        <Ionicons name="add" size={30} color="white" />
      </Pressable>
    </MySafeContainer>
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
  text2: {
    textTransform: 'uppercase',
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 20,
  },
  item: {
    flex: 1,
    padding: 10,
    margin: 4,
    borderRadius: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  body: {
    fontSize: 15,
  },
  timeContainer: {
    borderColor: '#d3d3d3',
    borderWidth: 1,
    width: '60%',
    padding: 3,
    borderRadius: 6,
  },
  add: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    backgroundColor: 'teal',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
});
