
import React, { Component } from 'react';
// import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import {
  // ListView,
  ActivityIndicator,
  ScrollView,
  Button,
  CameraRoll,
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  Platform,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  AsyncStorage,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';

// import Carousel from 'react-native-carousel';
import AsyncStorageREPL from 'async-storage-repl';




const {
  height: DEVICE_HEIGHT,
  width: DEVICE_WIDTH,
} = Dimensions.get('window');

const RowNum = 2;

AsyncStorageREPL().connect();
const TODO ="@todoapp.todo";

/* スタイル */
const styles = StyleSheet.create({

  container2: {
    width: 375,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    // flexDirection: 'column',
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // alignItems: 'flex-end',
    backgroundColor: '#ffe9a6',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingHorizontal: 16,
  },
  heading: {
    fontSize: 24,
    color: 'rgba(230, 180, 31, 0.38)',
  },
  paragraph: {
    fontSize: 18,
    color: '#737373',
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(14, 13, 13, .38)',
    // marginVertical: 12,
  },
  inputButton:{
    // position: 'absolute',
    // height: 120,
    // width: 120,
    bottom:0,
    left:0,
  },
  footerOverlay: {
    alignSelf: 'center',
    flex: 1,
    height: 60,
    width: 80,
    position: "absolute",
    bottom: 0,
    // opacity: 0.5,
    justifyContent: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});


class PostsList extends Component {

  constructor(props){
    super(props)
    this.state = {
      posts:[],
      filtered_posts:[],
      // point_id:0,
    }
  }

  componentDidMount() {
    this.loadTodo()
  }

  loadFunc = () => {
    this.loadTodo()
  }

  loadTodo = async () => {
    try{
      const todoString = await AsyncStorage.getItem(TODO)
      if (todoString){
        const posts = JSON.parse(todoString)
        // const currentIndex = posts.length
        // this.setState({posts: posts, currentIndex: currentIndex})
        this.setState({posts: posts})
        const filtered_posts = this.state.posts.filter(x => x.point_id === this.props.navigation.state.params.id)
        this.setState({filtered_posts: filtered_posts})
      }
    } catch(e){
      console.log(e)
    }
  }


  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <FlatList
            data={this.state.filtered_posts}
            // data={this.state.posts}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.key}
                style={styles.listItem}
                /* 猫の画像をクリックすると詳細にジャンプ */
                // onPress={() => this.props.navigation.navigate('Detail', item,{ refresh : this.componentWillMount.bind(this)})}
                onPress={() => this.props.navigation.navigate('Detail', item)}
              >
                {item.uri ? <Image style={{width:DEVICE_WIDTH,height:550}} source={{uri:item.uri}}/> : null}
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.container}
          />
        </ScrollView>
        <View style={styles.footerOverlay}>
          <Button
            // onPress={() => this.props.navigation.navigate('Post',this.props.navigation.state.params.id,{ refresh : this.componentWillMount.bind(this)})}
            onPress={() => {this.props.navigation.navigate('Post',{
              pointId: this.props.navigation.state.params.id,
              refresh: this.loadFunc
            })}
          }
            title="POST"
            color= '#578EFD'
            style={styles.inputButton}
          />
        </View>
      </View>
    )
  }
}


export default PostsList
