import React, { Component } from 'react';
import { TouchableOpacity,ScrollView,Image,View, Text, StyleSheet} from 'react-native';
import Communications from 'react-native-communications';
import Feather from 'react-native-vector-icons/Feather';


const resizeMode = 'center';
const text = 'This is some text inlaid in an <Image />';

/* 猫の詳細情報 */
const PointDetailScreen = ({ navigation }) => (

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
        source={{ uri: navigation.state.posts.uri }}
      />
    </View>

    <View
      style={styles.container}
    >
      <ScrollView>
        // <Text style={[styles.heading, { marginTop: 24,marginBottom: 24 }]}>{navigation.state.params.sex} {navigation.state.params.age}</Text>
        // <Image style={{width:'100%',height:400,marginVertical:10}} source={{uri:navigation.state.params.image}}/>
        // <Text style={styles.paragraph}>{navigation.state.params.detail}</Text>
        <TouchableOpacity onPress={() => Communications.phonecall('117', true)}>
          <View style={styles.button}>
            <Text style={styles.button_label}>この子を飼いたい！</Text><Feather name="phone-call" size={24} color={'#ffffff'} />
          </View>
        </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
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

export default PointDetailScreen;
