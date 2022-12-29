import {StackNavigationProp} from '@react-navigation/stack';
export type RootStackParamList = {
  HomeScreen: HomeScreenNavProps;
  AddScreen: undefined;
};

export type HomeScreenNavProps = {
  navigation: StackNavigationProp<RootStackParamList, 'HomeScreen'>;
};
