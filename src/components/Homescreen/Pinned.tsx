import {
  ListRenderItem,
  StyleSheet,
  useColorScheme,
  View,
  FlatList,
  Text,
} from 'react-native';
import React from 'react';
import MyText from '../MyText';
import {bgColors, dark, light} from '../../theme/colors';
// import {FlatList} from 'react-native-gesture-handler';
import {ItemType, RemindersItemType} from './homeScreenTypes';
import dayjs from 'dayjs';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/app/store';

const Pinned = () => {
  const reminders = useSelector((state: RootState) => state.reminders);
  const pinned = reminders.filter(item => item.pinned === true);
  const theme = useColorScheme();
  const isDark = theme === 'dark';

  const renderItem: ListRenderItem<RemindersItemType> = ({item, index}) => (
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
    fontWeight: '600',
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
});
