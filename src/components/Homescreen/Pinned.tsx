import {
  ListRenderItem,
  StyleSheet,
  useColorScheme,
  View,
  FlatList,
  Pressable,
} from 'react-native';
import React from 'react';
import MyText from '../MyText';
import {dark, light} from '../../theme/colors';
import {RemindersItemType} from './homeScreenTypes';
import dayjs from 'dayjs';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/app/store';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/navTypes';
import Ionicons from 'react-native-vector-icons/Ionicons';

type NavigationType = StackNavigationProp<RootStackParamList, 'EditScreen'>;

const Pinned = () => {
  const reminders = useSelector((state: RootState) => state.reminders);
  const pinned = reminders.filter(item => item.pinned === true);
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  const navigation = useNavigation<NavigationType>();

  const renderItem: ListRenderItem<RemindersItemType> = ({item, index}) => (
    <Pressable
      onPress={() =>
        navigation.push('EditScreen', {notification_id: item.notification_id})
      }
      style={{flex: 0.5}}>
      <View style={[styles.item, {backgroundColor: item.backgroundColor}]}>
        <MyText style={styles.title} numberOfLines={2}>
          {item.title}
        </MyText>
        <MyText style={styles.body} numberOfLines={2}>
          {item.body}
        </MyText>

        <MyText style={{marginBottom: 8, color: 'white'}}>
          Repeat -{' '}
          <MyText style={{fontWeight: '700', color: 'white'}}>Once</MyText>
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
            Pinned
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

export default Pinned;

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
    borderRadius: 6,
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
