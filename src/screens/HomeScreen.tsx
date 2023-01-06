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
import Done from '../components/Homescreen/Done';
import MySafeContainer from '../components/MySafeContainer';
import {
  RemindersItemType,
  ReminderListType,
} from '../components/Homescreen/homeScreenTypes';
import {dark, light} from '../theme/colors';
import dayjs from 'dayjs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {HomeScreenNavProps} from '../navigation/navTypes';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/app/store';
import MyView from '../components/MyView';
import emptyImage from '../assets/images/emptybox.png';

const HomeScreen = ({navigation}: HomeScreenNavProps) => {
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  const reminders = useSelector((state: RootState) => state.reminders);
  const [filteredReminder, setFiltered] = useState<ReminderListType>([]);

  useEffect(() => {
    const filter = reminders.filter(item => !item.done);
    setFiltered(filter);
  }, [reminders]);

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
          <MyText
            style={{
              fontWeight: '700',
              textTransform: 'capitalize',
              color: 'white',
            }}>
            {item.repeat}
          </MyText>
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
          {filteredReminder.length > 0 && (
            <MyText style={[styles.text2, {color: light.secondaryText}]}>
              List
            </MyText>
          )}
        </>
      )}
    </>
  );

  const footerComponent = () => <>{reminders.length > 0 && <Done />}</>;

  return (
    <MySafeContainer style={styles.container}>
      <MyText style={styles.text}>Reminders</MyText>
      {reminders.length > 0 ? (
        <FlatList
          data={filteredReminder}
          renderItem={renderItem}
          ListHeaderComponent={headerComponent}
          ListFooterComponent={footerComponent}
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
    fontWeight: '700',
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
    fontWeight: '700',
    color: 'white',
  },
  body: {
    fontSize: 15,
    color: 'white',
    marginBottom: 8,
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
    backgroundColor: 'transparent',
  },
  emptyImage: {
    width: 350,
    height: 350,
  },
});
