import React, {useContext} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TimeTable from './TimeTable';
import HomeStack from './HomeStack';
import Icon from 'react-native-vector-icons/FontAwesome';

function BottomTabs(): JSX.Element {
  const TabBarIcon = (focused: boolean, name: string) => {
    let iconName: string = '';
    let color;

    if (name === 'Home') iconName = 'home';
    else if (name === 'TimeTable') iconName = 'table';

    color = focused ? '#1E82FF' : 'gray';
    return <Icon name={iconName} color={color} size={24} />;
  };

  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="홈 화면"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => TabBarIcon(focused, 'Home'),
        }}
      />
      <Tab.Screen
        name="시간표"
        component={TimeTable}
        options={{
          tabBarIcon: ({focused}) => TabBarIcon(focused, 'TimeTable'),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});

export default BottomTabs;
