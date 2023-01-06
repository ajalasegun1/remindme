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
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/navTypes';

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

        <MyText style={[styles.timeContainer, {borderColor: 'white'}]}>
          {dayjs(item.date).format('MMM DD')}, {dayjs(item.time).format('H:mm')}
        </MyText>
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
    borderColor: '#d3d3d3',
    borderWidth: 1,
    width: '60%',
    padding: 3,
    borderRadius: 6,
    color: 'white',
  },
});
