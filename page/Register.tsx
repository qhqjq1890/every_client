import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

function Register(): JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const initialValue = {
    id: '',
    password: '',
    passwordConfirm: '',
  };

  const [inputValues, setInputValues] = useState(initialValue);
  const onChangeText = (key: string, value: string) => {
    setInputValues({...inputValues, [key]: value});
  };

  const register = async (
    id: string,
    password: string,
    passwordConfirm: string,
  ) => {
    if (!id || !password || !passwordConfirm) {
      Alert.alert('빈 칸을 모두 채워주세요');
    } else if (password !== passwordConfirm) {
      Alert.alert('비밀번호를 똑같이 입력해주세요');
    } else {
      const response = await fetch('http://54.206.58.214:3000/user/register', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
          userId: inputValues.id,
          password: inputValues.password,
        }),
      });
      const resData = await response.json();
      Alert.alert(resData.server_message);
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.viewStyle}>
      <Text>아이디</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => {
          onChangeText('id', text);
        }}></TextInput>
      <Text>비밀번호</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeText('password', text)}
        secureTextEntry></TextInput>
      <Text>비밀번호 확인</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeText('passwordConfirm', text)}
        secureTextEntry></TextInput>
      <View style={styles.tabView}>
        <TouchableOpacity style={styles.button}>
          <Text
            style={styles.tabText}
            onPress={() => {
              register(
                inputValues.id,
                inputValues.password,
                inputValues.passwordConfirm,
              );
            }}>
            회원가입
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  input: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 5,
  },
  text1: {
    marginLeft: 10,
  },
  text2: {
    color: 'black',
  },
  button: {
    marginTop: 10,
    backgroundColor: 'black',
    paddingHorizontal: 10,
    paddingVertical: 15,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  tabText: {
    color: 'white',
  },
  tabView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Register;
