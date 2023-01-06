import {
  StyleSheet,
  View,
  Pressable,
  useColorScheme,
  Alert,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MySafeContainer from '../components/MySafeContainer';
import {RootStackParamList} from '../navigation/navTypes';
import {RemindersItemType} from '../components/Homescreen/homeScreenTypes';
import {StackScreenProps} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/app/store';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {dark, light} from '../theme/colors';
import MyText from '../components/MyText';
import {
  toggleMarkAsDone,
  togglePinned,
  deleteReminder,
} from '../redux/features/reminderSlice';
import PushNotification from 'react-native-push-notification';

export type EditScreenProps = StackScreenProps<
  RootStackParamList,
  'EditScreen'
>;

const EditScreen = ({navigation, route}: EditScreenProps) => {
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  const dispatch = useDispatch();
  const [notification, setnotification] = useState<RemindersItemType>();
  const {notification_id} = route.params;
  const reminders = useSelector((state: RootState) => state.reminders);
  useEffect(() => {
    findReminder();
  }, [reminders]);
  const findReminder = () => {
    const found = reminders.find(
      item => item.notification_id === notification_id,
    );
    // console.log({found});
    setnotification(found);
  };

  const handleMark = () => {
    Alert.alert(
      'Caution',
      'If you mark this reminder as done, this reminder alert will be cancelled',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'Continue', onPress: () => handleMarkAsDone()},
      ],
    );
  };

  const handleMarkAsDone = () => {
    dispatch(toggleMarkAsDone(notification_id));
    PushNotification.cancelLocalNotification(notification_id);
    Alert.alert('Reminder has been marked as done');
  };

  const handlePinned = () => {
    if (notification?.pinned) {
      dispatch(togglePinned(notification_id));
      Alert.alert('Reminder has been unpinned');
    } else {
      dispatch(togglePinned(notification_id));
      Alert.alert('Reminder has been pinned');
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Are you sure you want to delete this reminder?',
      'Note that your reminder notification will be stopped if this reminder is not due',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => finallyDelete(),
        },
      ],
    );
  };

  const finallyDelete = () => {
    PushNotification.cancelLocalNotification(notification_id);
    dispatch(deleteReminder(notification_id));
    Alert.alert('Reminder Deleted', '', [
      {
        text: 'OK',
        onPress: () => navigation.pop(),
      },
    ]);
  };

  return (
    <MySafeContainer style={styles.container}>
      <View style={styles.header}>
        <Pressable hitSlop={40} onPress={() => navigation.pop()}>
          <Ionicons
            name="ios-chevron-back-sharp"
            size={30}
            color={isDark ? dark.primaryText : light.primaryText}
          />
        </Pressable>
        <Pressable hitSlop={40} onPress={() => handlePinned()}>
          <MaterialCommunityIcons
            name={notification?.pinned ? 'pin-off' : 'pin'}
            size={25}
            color={isDark ? dark.primaryText : light.primaryText}
          />
        </Pressable>
      </View>
      <View style={{paddingHorizontal: 8, flex: 1}}>
        <MyText style={styles.title}>{notification?.title}</MyText>
        <MyText style={styles.body}>{notification?.body}</MyText>
      </View>
      <View style={{paddingHorizontal: 8}}>
        {!notification?.done && (
          <>
            <Pressable
              style={[styles.btn, {backgroundColor: 'teal'}]}
              onPress={() => handleMark()}>
              <MyText style={{fontSize: 16, fontWeight: '600', color: 'white'}}>
                {notification?.done ? 'Mark as undone' : 'Mark as done'}
              </MyText>
            </Pressable>
            <View style={{height: 10}} />
          </>
        )}
        <Pressable
          style={[styles.btn, {backgroundColor: '#e30000'}]}
          onPress={() => handleDelete()}>
          <MyText style={{fontSize: 16, fontWeight: '600', color: 'white'}}>
            Delete
          </MyText>
        </Pressable>
      </View>
    </MySafeContainer>
  );
};

export default EditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'teal',
    paddingVertical: Platform.OS === 'android' ? 10 : 0,
  },
  header: {
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    // backgroundColor: 'green',
  },
  title: {
    fontSize: 25,
    fontFamily: 'Jost',
    fontWeight: '600',
  },
  body: {
    fontSize: 16,
    fontFamily: 'Jost',
    fontWeight: '500',
  },
  btn: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
});
