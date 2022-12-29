import {StyleSheet, Text, View, Pressable, useColorScheme} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import MySafeContainer from '../components/MySafeContainer';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/navTypes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInput} from 'react-native-gesture-handler';
import {dark, light} from '../theme/colors';
import {bgColors} from '../theme/colors';

type AddScreenProps = StackScreenProps<RootStackParamList, 'AddScreen'>;

const AddScreen = ({navigation}: AddScreenProps) => {
  const {one, two, three, four} = bgColors;
  const titleRef = useRef<TextInput>(null);
  const bodyRef = useRef<TextInput>(null);
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  const [color, setColor] = useState<string>(one);
  const colorArray = [one, two, three, four];
  useEffect(() => {
    titleRef.current?.focus();
  }, []);
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
        placeholder="Title"
        placeholderTextColor={'darkgrey'}
        numberOfLines={1}
        maxLength={20}
        returnKeyType="next"
        onSubmitEditing={() => bodyRef.current?.focus()}
      />
      <TextInput
        style={[
          styles.bodyInput,
          {color: isDark ? dark.primaryText : light.primaryText},
        ]}
        ref={bodyRef}
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
          <Pressable style={styles.btn}>
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
});
