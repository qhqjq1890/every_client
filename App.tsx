import React, {createContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Login from './page/Login';
import Register from './page/Register';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabs from './page/BottomTab';
import {UserIdContextProvider} from './utils/userIdContext';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  BottomTab: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return (
    <UserIdContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen
            name="BottomTab"
            component={BottomTabs}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserIdContextProvider>
  );
}

const styles = StyleSheet.create({});

export default App;
