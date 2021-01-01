import React, { Component, PropTypes } from 'react';
import {
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

class PostContainer extends Component {
  static propTypes = {
    post: PropTypes.object,
    onPress: PropTypes.func,
  };

  static defaultProps = {
    onPress: emptyFn,
  };

  onPressImage = (event) => {
    const { onPress, post } = this.props;
    this.refs.main.measure((fx, fy, width, height, pageX, pageY) => {
      onPress(post, {
        width,
        height,
        pageX,
        pageY,
      });
    });
  }

  render() {
    const { post: { image, title } } = this.props;

    return (
      <View style={styles.main} ref="main">
        <TouchableOpacity onPress={this.onPressImage} activeOpacity={0.9}>
          <Image source={{uri: image}} style={styles.image} resizeMode="cover" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }
}

function emptyFn() {}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    marginBottom: 30,
    paddingBottom: 10,
  },
  content: {
    flex: 1,
  },
  image: {
    width,
    height: 300,
  },
  title: {
    margin: 10,
    color: '#ccc',
  }
});

export default PostContainer;
