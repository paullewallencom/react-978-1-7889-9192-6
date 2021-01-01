import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ListView,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';

class UserList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      dataSource: ds.cloneWithRows(props.contacts),
    };
  }

  capitalize(value) {
    return value[0].toUpperCase() + value.substring(1);
  }

  renderContact = (contact) => {
    return (
      <TouchableOpacity style={styles.row}>
        <Image
          source={{uri: `${contact.picture.large}?key=TRR8-JACP-VN4J-HVEJ`}}
          style={styles.img}
        />
        <View style={styles.info}>
          <Text style={styles.name}>
            {this.capitalize(contact.name.first)} {this.capitalize(contact.name.last)}
          </Text>
          <Text style={styles.phone}>{contact.phone}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.toolbar}>My contacts!</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderContact}
          style={styles.main}
        />
      </View>
    );
  }
}

export default UserList;
