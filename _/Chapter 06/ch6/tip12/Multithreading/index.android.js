/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NativeModules,
  DeviceEventEmitter
} from 'react-native';

import Button from 'react-native-button';
const BackgroundTaskManager = NativeModules.BackgroundTaskManager;

class Multithreading extends Component {
  componentWillMount() {
    var me = this;
    me.setState({
      backgroundTaskStatus : "Not Started",
      doNothingCount : 0
    });

    DeviceEventEmitter.addListener('backgroundProgress', (e) => {
      const backgroundTaskStatus = e.status;

      me.setState({backgroundTaskStatus});
    });

  }

  onButtonPress() {
    BackgroundTaskManager.loadInBackground();
  }

  onDoNothingPress = () => {
    this.setState({
      doNothingCount : this.state.doNothingCount+1
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          containerStyle={styles.buttonContainer}
          style={styles.buttonStyle}
          onPress={this.onButtonPress}>
            Run Task
        </Button>
        <Text style={styles.instructions}>
          Background Task Status:
        </Text>
        <Text style={styles.welcome}>
          {this.state.backgroundTaskStatus}
        </Text>

        <Text style={styles.instructions}>
          Pressing "Do Nothing" shows that the task is not blocking the main thread
        </Text>
        <Button
          containerStyle={[styles.buttonContainer, styles.altButtonContainer]}
          style={styles.buttonStyle}
          onPress={this.onDoNothingPress}>
            Do Nothing
        </Button>

        <Text style={styles.instructions}>
          Times "Do Nothing" Pressed:
        </Text>
        <Text style={styles.welcome}>
          {this.state.doNothingCount}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20
  },

  buttonContainer: {
    width: 150,
    padding: 10,
    margin: 5,
    height: 40,
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: '#FF5722'
  },
  altButtonContainer : {
    backgroundColor : '#CDDC39',
    marginTop : 30
  },
  buttonStyle: {
    fontSize: 16,
    color: 'white'
  }
});

AppRegistry.registerComponent('Multithreading', () => Multithreading);
