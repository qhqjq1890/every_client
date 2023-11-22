import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import Hotpost from '../component/Hotpost';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from './HomeStack';

function Home(): JSX.Element {
  const [boardList, setBoardList] = useState([]);
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const fuck = async () => {
    const response = await fetch('http://54.206.58.214:3000/board');
    const resData = await response.json();
    const fuck = resData.board.map((shit: any) => shit.boardName);
    setBoardList(fuck);
  };

  return (
    <View>
      <ScrollView>
        <View style={styles.boardView}>
          <Text style={styles.boardNameText}>🔥실시간 인기글🔥</Text>
          <Hotpost
            _id="6550de3fe3d480c7d464d08b"
            name="👤익명"
            date="11/16 03:01"
            title="mz세대 어쩌고 하는거 나도 빡쳤는데"
            post={`이유를 알것 같음\n1. 교수님한테 이메일이나 문자 보내는 방법을 모름 그냥 소`}
          />
          <Hotpost
            _id="6550de3fe3d480c7d464d08b"
            name="👤익명"
            date="11/16 03:01"
            title="심심해서 비게 보고있는데 문득 페이커가"
            post="새삼 대단하다는 생각이 드네"
          />
          <Hotpost
            _id="6550de3fe3d480c7d464d08b"
            name="👤익명"
            date="11/16 03:01"
            title="심심해서 비게 보고있는데 문득 페이커가"
            post="새삼 대단하다는 생각이 드네"
          />
          <Hotpost
            _id="6550de3fe3d480c7d464d08b"
            name="👤익명"
            date="11/16 03:01"
            title="심심해서 비게 보고있는데 문득 페이커가"
            post="새삼 대단하다는 생각이 드네"
          />
        </View>

        <View style={styles.boardView}>
          <Text style={styles.boardNameText} onPress={fuck}>
            전체 게시판
          </Text>
          <View style={styles.boardTitleView}>
            <Text
              style={styles.boardText}
              onPress={() =>
                navigation.navigate('PostList', {currentBoard: '자유 게시판'})
              }>
              🗽자유 게시판
            </Text>
            <Text style={styles.postTitleText}>자유가 아니면 죽음을!</Text>
          </View>
          <View style={styles.boardTitleView}>
            <Text
              style={styles.boardText}
              onPress={() =>
                navigation.navigate('PostList', {currentBoard: '유머 게시판'})
              }>
              🤣유머 게시판
            </Text>
            <Text style={styles.postTitleText}>
              내 배꼽 도대체 어디로 간거죠?
            </Text>
          </View>
          <View style={styles.boardTitleView}>
            <Text
              style={styles.boardText}
              onPress={() =>
                navigation.navigate('PostList', {
                  currentBoard: '컴퓨터 공학 게시판',
                })
              }>
              💻컴퓨터 공학 게시판
            </Text>
            <Text style={styles.postTitleText}>
              컴퓨터 수리할 줄 모릅니다.. 진짜로
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  boardNameText: {
    marginLeft: 10,
    marginBottom: 10,
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  boardView: {
    paddingTop: 10,
    paddingBottom: 10,
    borderStyle: 'solid',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: 10,
    padding: 5,
  },
  boardTitleView: {
    flexWrap: 'wrap',
  },
  boardText: {
    color: 'black',
    marginLeft: 10,
    marginBottom: 5,
  },
  postTitleText: {
    color: 'gray',
    paddingLeft: 20,
    paddingBottom: 20,
    fontSize: 12,
  },
});

export default Home;
