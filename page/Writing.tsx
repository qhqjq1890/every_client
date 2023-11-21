import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import UserIdContext from '../utils/userIdContext';
import {useNavigation, RouteProp, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from './HomeStack';
export default function Writing() {
  type WritingRouteProp = RouteProp<HomeStackParamList, 'Writing'>;
  const route = useRoute<WritingRouteProp>();
  const {userId} = useContext(UserIdContext);
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const initialValue = {
    title: '',
    post: '',
  };

  const [inputValues, setInputValues] = useState(initialValue);
  const onChangeText = (key: string, value: string) => {
    setInputValues({...inputValues, [key]: value});
  };
  const postfetch = async () => {
    const response = await fetch('http://54.206.58.214:3000/posts', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        boardName: route.params.board,
        authorId: userId,
        title: inputValues.title,
        body: inputValues.post,
      }),
    });
    const resData = await response.json();
    navigation.pop();
  };

  return (
    <View>
      <TextInput
        style={styles.title}
        placeholder="제목"
        placeholderTextColor={'gray'}
        onChangeText={text => {
          onChangeText('title', text);
        }}></TextInput>
      <TextInput
        textAlignVertical="top"
        style={styles.body}
        multiline={true}
        placeholder="글 내용"
        onChangeText={text => {
          onChangeText('post', text);
        }}
      />
      <TouchableOpacity>
        <Text style={styles.button} onPress={postfetch}>
          완료
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    width: '80%',
    alignSelf: 'center',
    marginBottom: 20,
    height: 40,
  },
  body: {
    width: '80%',
    alignSelf: 'center',
    height: '60%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'skyblue',
    padding: 10,
    alignSelf: 'center',
    borderRadius: 5,
  },
});
