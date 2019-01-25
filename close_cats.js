
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

import AsyncStorageREPL from 'async-storage-repl';
// import ImagePicker from 'react-native-image-picker';
import Modal from "react-native-modal";
// import RNFetchBlob from 'rn-fetch-blob'


AsyncStorageREPL().connect();

const STATUSBAR_HEIGHT = Platform.OS == 'ios' ? 20 : StatusBar.currentHeight;


const {
  width: DEVICE_WIDTH,
} = Dimensions.get('window');

const RowNum = 1;

const TODO ="@todoapp.todo";

/* スタイル */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(228, 254, 253, 1)',
    paddingTop: STATUSBAR_HEIGHT,
  },
  filter:{
    height:200,
    flexDirection:'row',
  },
  todolist:{
    flex: 1,
  },
  input:{
    height:200,
    flexDirection:'row',
  },
  inputText:{
    flex: 1,
    borderBottomWidth:1,
    borderTopWidth:1,
    borderRightWidth:1,
    borderLeftWidth:1,
    backgroundColor: 'rgba(249, 249, 249, 1)',
  },
  inputButton:{
    width:100,
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(14, 13, 13, .38)',
    // marginVertical: 12,
  },
  imageGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
  selected_image:{
    width: 100,
    height: 100,
    margin: 10,
  },
  imageSel: {
    position: "absolute",
    top: 15,
    left: 15,
  },
  check: {
    height: 20,
    width: 20,
  },
  xbutton:{
    backgroundColor: '#eeeeee',
  }
});

class CloseCats extends Component {

  constructor(props){
    super(props)
    this.state = {
      posts:[],
      currentIndex:0,
      inputText:"",
      isModalVisible: false,
      images: [],
      imageSel: [],
      selPhoto: "",
      imageUri:"",
      // point_id:0,
    }
  }

  componentDidMount() {
    this.loadTodo()
  }

  loadTodo = async () => {
    try{
      // const todoString = await AsyncStorage.getItem(TODO)
      // if (todoString){
      //   const posts = JSON.parse(todoString)
      //   const currentIndex = posts.length
      //   this.setState({posts: posts, currentIndex: currentIndex})
      // }
      fetch("https://peaceful-savannah-94553.herokuapp.com/points.json")
        .then(response => response.json())
        .then(responseJson => this.setState({
          posts: responseJson,
        }))
        .catch(e => console.log(e));
        const currentIndex = posts.length
        this.setState({currentIndex: currentIndex})
    } catch(e){
      console.log(e)
    }
  }

  saveTodo = async (posts) =>{
    try{
      const todoString = JSON.stringify(posts)
      await AsyncStorage.setItem(TODO, todoString)
      //ここ

      // RNFetchBlob.fetch('POST', 'http://153.126.192.106:3000/users/', {
      //   'Content-Type': 'application/json',
      // }, [
      //   {
      //    ontent: 'binarydata',
      //    point_id : '1',
      //    data: RNFetchBlob.wrap(posts.uri)
      //    }
      // ])


      // Alert.alert(todoString);
    }catch(e){
      console.log(e)
    }
  }

  onAddItem = () =>{
    const detail = this.state.inputText
    if (detail == ""){
      return
    }
    const id = this.state.currentIndex + 1
    // const point_id = this.props.navigation.state.params
    // Alert.alert(JSON.stringify(this.props.navigation.state.params))
    const point_id = this.props.navigation.state.params.pointId
    // const point_id = 1
    const imageUri = this.state.imageUri
    const newPosts = {id: id,point_id:point_id,detail:detail,uri:imageUri}
    const posts = [...this.state.posts, newPosts]
    this.setState({
      posts: posts,
      currentIndex: id,
      inputText: "",//文字入力を初期化
    })
    this.saveTodo(posts)
    // this.saveTodo(newPosts)
   //  const itemId = this.props.navigation.getParam('itemId', 'NO-ID');
   // const otherParam = this.props.navigation.getParam('otherParam', 'some default value');
    // Alert.alert(JSON.stringify(this.props.navigation.state.params))
    this.props.navigation.state.params.refresh();
    // this.props.navigation.state.params.refresh(this.loadTodo());
    this.props.navigation.goBack()
  }

  _handleButtonPress = () => {
    let svThis = this
    CameraRoll.getPhotos({first:50})
      .then(function(obj){
        console.log(obj)
        svThis.storeImages(obj.edges, svThis)
      })
  };

  _toggleModal = () => {
    this._handleButtonPress();
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  storeImages= (edges,svThis) => {
    const images = edges.map((asset) => {
      //Alert.alert(asset.node.image.uri)
      return asset.node.image
    })

    let imgSel = []
    images.map((img) => {
      imgSel.push({uri: img.uri, selected: false})
    })

    svThis.setState({images: images, imageSel: imgSel})
  }

  logImageError = (err) => {
    console.log(err)
  }

  handleClick = (img) => {
    let imgSel = this.state.imageSel.map((sel) => {
      if (sel.uri == img.uri){
        sel.selected = !sel.selected
      }
      return sel
    })

    this.setState({imageSel: imgSel, selPhoto: img.uri})
  }

  render() {
    let imgs = []

    imgs = this.state.images.map((img) => {
      let selTrue = false
      let selView = null
      this.state.imageSel.map((sel) => {
        if (sel.uri == img.uri && sel.selected == true){
          selTrue = true
        }
      })

      return (
        <TouchableHighlight
          style={styles.tphoto}
          key={img.uri}
          // onPress={() => this._setImageUri(img)}>
          onPress={() => this.setState({ isModalVisible: !this.state.isModalVisible, imageUri: img.uri })}>
          <View>
            <Image style={styles.image} source={{uri: img.uri}} />
          </View>
        </TouchableHighlight>
      )
    })


    return (
      <View style={styles.container}>
        <View style={styles.input}>
          { /* テキスト入力とボタンを追加 */ }
          <TextInput
            onChangeText={(text) => this.setState({inputText: text})}
            value={this.state.inputText}
            style={styles.inputText}
            placeholder="おすすめポイント"
          />

        </View>

        <View style={{ flex: 1 }}>

          { /* 投稿画像の選択画面表示ボタン */}
          <Button title="Select Image" onPress={this._toggleModal} />


          { /* 投稿画像の選択画面 */}
          <Modal isVisible={this.state.isModalVisible}>
            <View style={{ flex: 1 }}>
              <Button title="X" onPress={this._toggleModal} style={styles.xbutton} />
              <ScrollView>
                <View style={styles.imageGrid} >
                  {imgs}
                </View>
              </ScrollView>
            </View>
          </Modal>
          <View>
            {this.state.imageUri ? <Image style={styles.selected_image} source={{uri: this.state.imageUri}} /> : null}
          </View>
            {this.state.imageUri ? <Button
              onPress={this.onAddItem}
              title="Add"
              color="#841584"
              style={styles.inputButton}
            />: null}
        </View>
      </View>
    );
  }
}


export default CloseCats
