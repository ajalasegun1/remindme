import {StackNavigationProp} from '@react-navigation/stack';
import {EditScreenPropsType} from '../components/Homescreen/homeScreenTypes';
export type RootStackParamList = {
  HomeScreen: HomeScreenNavProps;
  AddScreen: undefined;
  EditScreen: EditScreenPropsType;
};

export type HomeScreenNavProps = {
  navigation: StackNavigationProp<RootStackParamList, 'HomeScreen'>;
};
