import {View, Text, Alert} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../page/HomeStack';

export type HotPostProps = {
  _id: string;
  name: string;
  date: string;
  title: string;
  post: string;
};

export default function Hotpost({_id, name, date, title, post}: HotPostProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const toPostPage = async () => {
    const response = await fetch(
      `http://54.206.58.214:3000/posts/자유 게시판/${_id}`,
    )
      .then(data => data.json())
      .then(result =>
        navigation.navigate('Post', {
          title: result.post.title,
          body: result.post.body,
        }),
      );
  };

  return (
    <View
      style={{
        paddingHorizontal: 10,
        marginBottom: 20,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingBottom: 10,
        }}>
        <Text style={{color: 'black'}}>{name}</Text>
        <Text>{date.toString()}</Text>
      </View>
      <Text style={{fontWeight: '900', color: 'black'}} onPress={toPostPage}>
        {title}
      </Text>
      <Text style={{color: 'black'}}>{post.substring(0, 35) + ' ...'}</Text>
    </View>
  );
}
