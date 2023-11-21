import React, {useState, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {RootStackParamList} from '../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import UserIdContext from '../utils/userIdContext';

function Login(): JSX.Element {
  const {userId, setUserId} = useContext(UserIdContext);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const login = async () => {
    const response = await fetch('http://54.206.58.214:3000/user/login', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        userId: inputValues.id,
        password: inputValues.password,
      }),
    });
    const resData = await response.json();
    if (resData.server_message === 'login success') {
      setUserId(inputValues.id);
      navigation.replace('BottomTab');
    } else {
      Alert.alert(resData.server_message);
    }
  };

  const initialValue = {
    id: '',
    password: '',
  };

  const [inputValues, setInputValues] = useState(initialValue);
  const onChangeText = (key: string, value: string) => {
    setInputValues({...inputValues, [key]: value});
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
      <Text style={styles.text1}>
        아직 회원이 아니신가요?
        <Text
          style={styles.text2}
          onPress={() => {
            navigation.navigate('Register');
          }}>
          {' '}
          회원가입
        </Text>
      </Text>
      <View style={styles.tabView}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.tabText} onPress={login}>
            로그인
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

export default Login;
