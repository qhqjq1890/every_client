import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import Home from './Home';
import Writing from './Writing';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';
import UserIdContext from '../utils/userIdContext';
import PostList from './PostList';
import Post from './Post';

export type HomeStackParamList = {
  Home: undefined;
  Writing: {board: string};
  PostList: {currentBoard: string};
  Post: {title: string; body: string};
};

const Stack = createStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  const {userId} = useContext(UserIdContext);
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerLeft: () => (
            <View>
              <Text style={{paddingLeft: 10}}>{userId}</Text>
            </View>
          ),
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Writing"
        component={Writing}
        options={{headerTitle: '글 작성'}}
      />
      <Stack.Screen
        name="PostList"
        component={PostList}
        options={{
          headerRight: () => (
            <Icon
              style={{paddingRight: 10}}
              name="edit"
              size={24}
              onPress={() => {
                navigation.navigate('Writing', {board: 'fuck'});
              }}
            />
          ),
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen name="Post" component={Post} />
    </Stack.Navigator>
  );
}
