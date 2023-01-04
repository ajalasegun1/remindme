import {
  StyleSheet,
  Text,
  View,
  Pressable,
  useColorScheme,
  Modal,
  Alert,
} from 'react-native';
import React, {useState, useRef, useEffect, useCallback} from 'react';
import MySafeContainer from '../components/MySafeContainer';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/navTypes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInput} from 'react-native-gesture-handler';
import {dark, light} from '../theme/colors';
import {bgColors} from '../theme/colors';
import {HEIGHT} from '../constants/dimensions';
import MyView from '../components/MyView';
import MyLayerView from '../components/MyLayerView';
import MyText from '../components/MyText';
import DatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';
import PushNotification from 'react-native-push-notification';
import {nanoid} from '@reduxjs/toolkit';
import {addReminder} from '../redux/features/reminderSlice';
import {useDispatch} from 'react-redux';

type AddScreenProps = StackScreenProps<RootStackParamList, 'AddScreen'>;

const AddScreen = ({navigation}: AddScreenProps) => {
  const {one, two, three, four} = bgColors;
  const titleRef = useRef<TextInput>(null);
  const bodyRef = useRef<TextInput>(null);
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  const [color, setColor] = useState<string>(one);
  const [showModal, setShowModal] = useState(false);
  const colorArray = [one, two, three, four];
  const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [time, setTime] = useState(new Date());
  const [openTime, setOpenTime] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    titleRef.current?.focus();
    PushNotification.createChannel(
      {
        channelId: 'channel-id', // (required)
        channelName: 'My channel', // (required)
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }, []);

  const createNotification = () => {
    // console.log('I was fired!!!');
    const notification_id = nanoid();
    const id = nanoid();
    compareDates();

    if (!compareDates()) return Alert.alert('You have to select a future date');

    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      channelId: 'channel-id',
      id: notification_id,
      title: 'You have a reminder',
      message: title, // (required)
      date: getAccurateDate(),
      userInfo: {notification_id},

      /* Android Only Properties */
      repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
    });

    const payload = {
      notification_id,
      id,
      title,
      body,
      date: dayjs(date).toISOString(),
      time: dayjs(time).toISOString(),
      pinned: false,
      backgroundColor: color,
    };
    dispatch(addReminder(payload));
    setShowModal(false);
    setTimeout(() => {
      Alert.alert('Reminder Created!', '', [
        {
          text: 'Ok',
          onPress: () => navigation.pop(),
          style: 'cancel',
        },
      ]);
    }, 500);
  };
  const getAccurateDate = useCallback(() => {
    const maindate = date;
    const hours = time.getHours();
    const minutes = time.getMinutes();
    maindate.setHours(hours);
    maindate.setMinutes(minutes);
    maindate.setSeconds(0);
    return maindate;
  }, [date, time]);

  const compareDates = () => {
    // console.log(dayjs().isBefore(dayjs(getAccurateDate())));
    return dayjs().isBefore(dayjs(getAccurateDate()));
  };

  const openModal = () => {
    if (!title && !body) {
      Alert.alert('Please enter the tile and body of your reminder');
      return;
    }
    setShowModal(true);
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
        <Pressable hitSlop={40}>
          <MaterialCommunityIcons
            name="pin"
            size={25}
            color={isDark ? dark.primaryText : light.primaryText}
          />
        </Pressable>
      </View>
      <View></View>
      <TextInput
        style={[
          styles.titleInput,
          {color: isDark ? dark.primaryText : light.primaryText},
        ]}
        ref={titleRef}
        value={title}
        onChangeText={val => setTitle(val)}
        placeholder="Title"
        placeholderTextColor={'darkgrey'}
        numberOfLines={1}
        maxLength={30}
        returnKeyType="next"
        onSubmitEditing={() => bodyRef.current?.focus()}
      />
      <TextInput
        style={[
          styles.bodyInput,
          {color: isDark ? dark.primaryText : light.primaryText},
        ]}
        ref={bodyRef}
        value={body}
        onChangeText={val => setBody(val)}
        placeholder="Body"
        placeholderTextColor={'darkgrey'}
        multiline
        numberOfLines={10}
        maxLength={600}
        returnKeyType="done"
        onSubmitEditing={() => bodyRef.current?.blur()}
      />
      <View
        style={[
          styles.footer,
          {backgroundColor: isDark ? dark.background : light.background},
        ]}>
        <View style={styles.btnHolder}>
          <Pressable style={styles.btn} onPress={() => openModal()}>
            <Ionicons name="checkmark" size={20} color="#fff" />
          </Pressable>
        </View>
        <View style={styles.selectorContainer}>
          {colorArray.map(item => (
            <Pressable
              key={item}
              style={[styles.colorItem, {backgroundColor: item}]}
              onPress={() => setColor(item)}>
              {color === item && (
                <Ionicons name="checkmark" size={20} color="#fff" />
              )}
            </Pressable>
          ))}
        </View>
      </View>
      <Modal visible={showModal} transparent={true} animationType={'slide'}>
        <View style={styles.modalContainer}>
          <MyView style={styles.modalContent}>
            <MyText style={styles.heading}>When should we remind you?</MyText>
            <Pressable
              onPress={() => setOpenDate(true)}
              style={{width: '100%'}}>
              <MyLayerView style={styles.items2}>
                <MyText>{dayjs(date).format('MMMM D')}</MyText>
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color={isDark ? 'white' : 'black'}
                />
              </MyLayerView>
            </Pressable>
            <View style={{height: 10}} />
            <Pressable
              onPress={() => setOpenTime(true)}
              style={{width: '100%'}}>
              <MyLayerView style={styles.items2}>
                <MyText>{dayjs(time).format('h:mm a')}</MyText>
                <Ionicons
                  name="time-outline"
                  size={20}
                  color={isDark ? 'white' : 'black'}
                />
              </MyLayerView>
            </Pressable>
            <View style={{height: 40}} />
            <View style={styles.modalFooter}>
              <Pressable onPress={() => setShowModal(false)}>
                <MyText style={styles.cancel}>Close</MyText>
              </Pressable>
              <View style={{width: 10}} />
              <Pressable onPress={() => createNotification()}>
                <View style={styles.saveBtn}>
                  <MyText style={styles.saveText}>Save</MyText>
                </View>
              </Pressable>
            </View>
          </MyView>
        </View>
        <DatePicker
          modal
          mode="date"
          minimumDate={new Date()}
          open={openDate}
          date={date}
          onConfirm={date => {
            setOpenDate(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpenDate(false);
          }}
        />
        <DatePicker
          modal
          mode="time"
          //   minimumDate={new Date()}
          open={openTime}
          date={time}
          onConfirm={date => {
            setOpenTime(false);
            setTime(date);
          }}
          onCancel={() => {
            setOpenTime(false);
          }}
        />
      </Modal>
    </MySafeContainer>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    // backgroundColor: 'green',
  },
  titleInput: {
    marginHorizontal: 8,
    // backgroundColor: 'green',
    fontSize: 25,
    fontFamily: 'Jost',
    fontWeight: '600',
    paddingHorizontal: 8,
  },
  bodyInput: {
    marginHorizontal: 8,
    marginTop: 8,
    // backgroundColor: 'green',
    fontSize: 16,
    fontFamily: 'Jost',
    fontWeight: '500',
    paddingHorizontal: 8,
    textAlignVertical: 'top',
  },
  footer: {
    height: 100,
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  btnHolder: {
    // backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -25,
  },
  btn: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'teal',
    borderRadius: 25,
  },
  selectorContainer: {
    // backgroundColor: 'red',
    marginTop: 10,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  colorItem: {
    width: 40,
    height: 40,
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    height: HEIGHT / 3,
    width: '90%',
    // backgroundColor: 'green',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  items2: {
    // backgroundColor: 'teal',
    width: '100%',
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalFooter: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    // justifyContent: 'flex-end',
  },
  cancel: {
    fontWeight: '500',
    fontSize: 16,
  },
  saveBtn: {
    backgroundColor: 'teal',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  saveText: {
    fontWeight: '800',
    fontSize: 16,
    color: 'white',
  },
  heading: {
    fontWeight: '700',
    fontSize: 22,
    marginBottom: 20,
  },
});
