import React, { Component } from 'react';
import { TouchableOpacity,ScrollView,Image,View, Text, StyleSheet,Dimensions} from 'react-native';
import Communications from 'react-native-communications';
import Feather from 'react-native-vector-icons/Feather';

const resizeMode = 'center';
const text = 'This is some text inlaid in an <Image />';

/* 猫の詳細情報 */
const DetailScreen = ({ navigation }) => (

  <View
    style={{
      flex: 1,
      // backgroundColor: '#eee',
    }}
  >
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <Image
        style={{
          flex: 1,
          // resizeMode,rgba(255, 255, 255, 0.85)
          width: '100%',
          height: '100%',
        }}
        source={{ uri: navigation.state.params.uri }}
      />
    </View>

    <View
      style={styles.container}
    >
      <ScrollView>
        <Image style={{width:'100%',height:400,marginVertical:10}} source={{uri:navigation.state.params.uri}}/>
        <Text style={styles.heading}>{navigation.state.params.title}</Text>
        <Text style={styles.paragraph}>{navigation.state.params.detail}</Text>
      </ScrollView>
    </View>

  </View>

);

/* スタイル */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'transparent',
    backgroundColor: 'rgba(250, 236, 205, 0.85)',
    // alignItems: 'center',
    alignItems: 'stretch',
    justifyContent: 'center',
    // paddingHorizontal: 30,
    // marginHorizontal:30,
  },
  heading: {
    fontSize: 24,
    color: '#503a14',
  },
  paragraph: {
    fontSize: 18,
    color: '#503a14',
    paddingBottom: 30,
  },
  button:{
    width: '70%',
    height: 70,
    left: '15%',
    alignItems: 'center',
    backgroundColor: 'rgba(136, 97, 10, 1)',
    borderRadius : 10,
    marginVertical:30,
  },
  button_label:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    paddingTop: 10,
  },
});

export default DetailScreen;
