import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
  useColorScheme,
  Pressable,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MyText from '../components/MyText';
import Pinned from '../components/Homescreen/Pinned';
import MySafeContainer from '../components/MySafeContainer';
import {RemindersItemType} from '../components/Homescreen/homeScreenTypes';
import {dark, light} from '../theme/colors';
import dayjs from 'dayjs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {HomeScreenNavProps} from '../navigation/navTypes';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/app/store';
import MyView from '../components/MyView';
import emptyImage from '../assets/images/emptyBoy.png';

const HomeScreen = ({navigation}: HomeScreenNavProps) => {
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  const reminders = useSelector((state: RootState) => state.reminders);

  const renderItem: ListRenderItem<RemindersItemType> = ({item, index}) => (
    <Pressable
      onPress={() =>
        navigation.push('EditScreen', {notification_id: item.notification_id})
      }
      style={{flex: 1}}>
      <View style={[styles.item, {backgroundColor: item.backgroundColor}]}>
        <MyText style={styles.title} numberOfLines={2}>
          {item.title}
        </MyText>
        <MyText style={styles.body} numberOfLines={2}>
          {item.body}
        </MyText>

        <MyText style={[styles.timeContainer, {borderColor: 'white'}]}>
          {dayjs(item.date).format('MMM DD')}, {dayjs(item.time).format('H:mm')}
        </MyText>
      </View>
    </Pressable>
  );
  const headerComponent = () => (
    <>
      {reminders.length > 0 && (
        <>
          <Pinned />
          <MyText style={[styles.text2, {color: light.secondaryText}]}>
            List
          </MyText>
        </>
      )}
    </>
  );

  return (
    <MySafeContainer style={styles.container}>
      <MyText style={styles.text}>Reminders</MyText>
      {reminders.length > 0 ? (
        <FlatList
          data={reminders}
          renderItem={renderItem}
          ListHeaderComponent={headerComponent}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <MyView style={styles.emptyContainer}>
          <Image source={emptyImage} style={styles.emptyImage} />
        </MyView>
      )}

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
    color: 'white',
  },
  body: {
    fontSize: 15,
    color: 'white',
  },
  timeContainer: {
    borderColor: '#d3d3d3',
    borderWidth: 1,
    width: '60%',
    padding: 3,
    borderRadius: 6,
    color: 'white',
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
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyImage: {
    width: 350,
    height: 350,
  },
});
