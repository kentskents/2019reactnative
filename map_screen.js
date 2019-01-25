import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import { StackNavigator} from 'react-navigation'
import Feather from 'react-native-vector-icons/Feather';
import DetailScreen from './detail';
import MyMaps from './my_map';
import HeaderTitleLogo from './src/components/HeaderTitleLogo';
// import WantCats from './want_cats';
import PostsList from './posts_list';
import CloseCats from './close_cats';
// import Post from './post';

const mapScreen = StackNavigator({
    /* マップ画面 */
    Main: {
        screen: MyMaps,
        navigationOptions:({navigation}) => ({
            headerTitle: <HeaderTitleLogo />,
            headerTitleStyle:{ color: '#ffffff'},
            headerRight:(
              <TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")}>
                <Image source={require('./src/img/humberger.png')} style={ styles.menu } />
              </TouchableOpacity>
            ),
            // headerStyle: { paddingRight: 10, paddingLeft: 10,backgroundColor: 'rgba(255, 191, 50, 1)'},
            headerStyle: { paddingRight: 10, paddingLeft: 10,backgroundColor: '#FAFBFB'},
        })
    },
    /* 投稿の詳細画面 */
    Detail: {
        // screen: PointDetailScreen,
        screen: DetailScreen,
        navigationOptions: (props) => ({
            title: "投稿データ",
            headerTitleStyle:{ color: '#6D6F6F'},
            headerStyle: { paddingRight: 10, paddingLeft: 10,backgroundColor: '#D8F6FF'},
            // headerTitleStyle:{ color: '#ffffff'},
            // headerStyle: { paddingRight: 10, paddingLeft: 10,backgroundColor: 'rgba(255, 191, 50, 1)'},
        })
    },
    /* 投稿一覧画面 */
    List: {
        // screen: PointDetailScreen,
        screen: PostsList,
        navigationOptions: (navigation,props) => ({
            title: "リスト",
            headerTitleStyle:{ color: '#6D6F6F'},
            headerStyle: { paddingRight: 10, paddingLeft: 10,backgroundColor: '#D8F6FF'},
            // headerTitleStyle:{ color: '#ffffff'},
            // headerStyle: { paddingRight: 10, paddingLeft: 10,backgroundColor: 'rgba(255, 191, 50, 1)'},
        })
    },
    /* 投稿画面 */
    Post: {
        // screen: PointDetailScreen,
        screen: CloseCats,
        navigationOptions: (props) => ({
            title: "投稿",
            headerTitleStyle:{ color: '#6D6F6F'},
            headerStyle: { paddingRight: 10, paddingLeft: 10,backgroundColor: '#D8F6FF'},
            // headerTitleStyle:{ color: '#ffffff'},
            // headerStyle: { paddingRight: 10, paddingLeft: 10,backgroundColor: 'rgba(255, 191, 50, 1)'},
        })
    },
})

const styles = StyleSheet.create ({
    menu: {
        width: 20,
    }
});

export default mapScreen;
