// import { AppRegistry } from 'react-native';
// import MyMap from './my_map';
//
// AppRegistry.registerComponent('Tour2018', () => MyMap);


import React, { Component } from 'react';
// import { AppRegistry } from 'react-native';
import { AppRegistry, Image } from 'react-native';
import { TabNavigator, DrawerNavigator } from 'react-navigation';
import Feather from 'react-native-vector-icons/Feather';
// import tabNav from './tabnav';
import mapScreen from './map_screen';


const drawernav = DrawerNavigator({
    DrawerItem1: {
        // screen: tabNav,
        screen: mapScreen,
        navigationOptions: {
            drawerLabel: "メニュー",
            drawerIcon: ({ tintColor }) => <Image source={require('./src/img/close.png')} />
        },
    }
});

AppRegistry.registerComponent('Tour2018', () => drawernav);
