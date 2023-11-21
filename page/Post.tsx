import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {RouteProp} from '@react-navigation/native';
import {HomeStackParamList} from './HomeStack';

type PostListRouteProp = RouteProp<HomeStackParamList, 'Post'>;

export default function Post() {
  const route = useRoute<PostListRouteProp>();
  const title = route.params.title;
  const body = route.params.body;
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    backgroundColor: 'white',
    paddingBottom: 10,
  },
  body: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 50,
    paddingTop: 20,
    borderWidth: 1,
    borderColor: 'gray',
  },
});
