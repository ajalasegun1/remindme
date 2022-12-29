import {ListRenderItem, StyleSheet, useColorScheme, View} from 'react-native';
import React from 'react';
import MyText from '../MyText';
import {bgColors, dark, light} from '../../theme/colors';
import {FlatList} from 'react-native-gesture-handler';
import {ItemType} from './homeScreenTypes';
import dayjs from 'dayjs';

const Pinned = () => {
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
    },
    {
      id: 2,
      title: 'Coffee',
      body: '',
      date: new Date(),
      time: new Date(),
      color: 'cyan',
    },
    {
      id: 3,
      title: 'Coffee',
      body: 'Prepare hot coffee for frineds',
      date: new Date(),
      time: new Date(),
      color: 'teal',
    },
    {
      id: 4,
      title: 'Coffee',
      body: 'Prepare hot coffee for frineds',
      date: new Date(),
      time: new Date(),
      color: 'purple',
    },
    {
      id: 5,
      title: 'Coffee',
      body: '',
      date: new Date(),
      time: new Date(),
      color: 'orange',
    },
  ];

  const MYCOLOR = bgColors.two;

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
        {dayjs(item.date).format('MMM DD')}, {dayjs(item.time).format('H:m')}
      </MyText>
    </View>
  );
  return (
    <View style={styles.container}>
      <MyText style={[{color: light.secondaryText}, styles.text]}>
        Pinned
      </MyText>
      <FlatList
        data={feat}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
      />
    </View>
  );
};

export default Pinned;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  text: {
    textTransform: 'uppercase',
    fontWeight: '600',
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
});
