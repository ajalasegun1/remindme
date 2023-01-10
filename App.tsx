import React from 'react';
import codePush from 'react-native-code-push';

import RootStack from './src/navigation/RootStack';

let codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_START};

const App = () => {
  return <RootStack />;
};

export default codePush(codePushOptions)(App);
