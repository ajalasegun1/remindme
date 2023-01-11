import {
  ListRenderItem,
  StyleSheet,
  useColorScheme,
  View,
  FlatList,
  Text,
  Pressable,
} from 'react-native';
import React from 'react';
import MyText from '../MyText';
import {bgColors, dark, light} from '../../theme/colors';
import {ItemType, RemindersItemType} from './homeScreenTypes';
import dayjs from 'dayjs';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/app/store';
import {RootStackParamList} from '../../navigation/navTypes';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type NavigationType = StackNavigationProp<RootStackParamList, 'EditScreen'>;

const Done = () => {
  const reminders = useSelector((state: RootState) => state.reminders);
  const pinned = reminders.filter(item => item.done);
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  const navigation = useNavigation<NavigationType>();

  const renderItem: ListRenderItem<RemindersItemType> = ({item, index}) => (
    <Pressable
      style={{flex: 0.5}}
      onPress={() =>
        navigation.push('EditScreen', {notification_id: item.notification_id})
      }>
      <View style={[styles.item, {backgroundColor: item.backgroundColor}]}>
        <MyText style={styles.title} numberOfLines={2}>
          {item.title}
        </MyText>
        <MyText style={styles.body} numberOfLines={2}>
          {item.body}
        </MyText>

        <MyText style={{marginBottom: 8, color: 'white'}}>
          Repeat -{' '}
          <MyText
            style={{
              fontWeight: '700',
              color: 'white',
              textTransform: 'capitalize',
            }}>
            {' '}
            {item.repeat}
          </MyText>
        </MyText>

        <View style={styles.dateTimeHolder}>
          <>
            <Ionicons name="ios-calendar" size={14} color="white" />
            <MyText style={[styles.timeContainer]}>
              {dayjs(item.date).format('MMM DD')}
            </MyText>
          </>
          <View style={{width: 10}} />
          <>
            <Ionicons name="ios-time" size={14} color="white" />

            <MyText style={styles.timeContainer2}>
              {dayjs(item.time).format('H:mm')}
            </MyText>
          </>
        </View>
      </View>
    </Pressable>
  );
  return (
    <View style={styles.container}>
      {pinned.length > 0 && (
        <>
          <MyText style={[{color: light.secondaryText}, styles.text]}>
            Done
          </MyText>
          <FlatList
            data={pinned}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
          />
        </>
      )}
    </View>
  );
};

export default Done;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  text: {
    textTransform: 'uppercase',
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 10,
  },
  item: {
    flex: 1,
    padding: 10,
    margin: 4,
    borderRadius: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
  body: {
    fontSize: 15,
    color: 'white',
  },
  timeContainer: {
    color: 'white',
    marginLeft: 5,
  },
  timeContainer2: {
    color: 'white',
    fontWeight: '700',
    marginLeft: 3,
  },
  dateTimeHolder: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
