import {View, Text, Alert, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {RouteProp} from '@react-navigation/native';
import {HomeStackParamList} from './HomeStack';
import Hotpost from '../component/Hotpost';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export interface Response {
  _id: string;
  title: string;
  authorId: string;
  body: string;
  comments: any[];
  date: Date;
  votes: number;
  __v: number;
}

export interface Date {
  $date: string;
}

export default function PostList() {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  type PostListRouteProp = RouteProp<HomeStackParamList, 'PostList'>;
  const route = useRoute<PostListRouteProp>();
  const [posts, setPosts] = useState<Response[]>([]);

  useEffect(() => {
    fetch(`http://54.206.58.214:3000/posts/${route.params.currentBoard}`)
      .then(data => data.json())
      .then(resdata => setPosts(resdata.post))
      .catch(error =>
        console.error('데이터를 불러오는 동안 에러 발생:', error),
      );
  }, [posts]);
  useEffect(() => {
    navigation.setOptions({title: route.params.currentBoard});
    navigation.setOptions({
      headerRight: () => (
        <Icon
          style={{paddingRight: 10}}
          name="edit"
          size={24}
          onPress={() => {
            navigation.navigate('Writing', {board: route.params.currentBoard});
          }}
        />
      ),
    });
  }, []);
  return (
    <View>
      <FlatList
        data={posts}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <View style={{borderBottomColor: 'black', borderWidth: 1}}>
            <Hotpost
              _id={item._id}
              name={item.authorId}
              date={item.date.toString()}
              title={item.title}
              post={item.body}
            />
          </View>
        )}
      />
    </View>
  );
}
