import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';

class HeaderTitleLogo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../img/logo.png')} style={styles.logo} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  logo: {
    width: 50,
    height: 50,
  },
  title: {
    marginTop: 28,
    fontSize: 24,
  },
  headerTitle: {
    flexDirection: 'row'
  },
});

export default HeaderTitleLogo;
