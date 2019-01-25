/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MapView from 'react-native-maps';
import { GiftedChat } from 'react-native-gifted-chat';
import FCM from "react-native-fcm";

export default class App extends Component<{}> {
  componentDidMount() {
    FCM.subscribeToTopic('/topics/test');
  }

  render() {
    return (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 43.0617319,
          longitude: 141.3473636,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
