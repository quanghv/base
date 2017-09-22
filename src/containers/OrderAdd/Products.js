import React from "react";
import PropTypes from "prop-types";
import { View, FlatList, Modal } from "react-native";
import { Text, ListItem, Body, Left, Thumbnail } from "native-base";
import config from "../../config";

export default class Products extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      showStoryDesc: false,
      storyDesc: null
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ visible: nextProps.visible });
  }

  _choosenThis = () => {};
  _renderItem = ({ item }) => {
    const images = JSON.parse(item.image);
    const imgSource =
      images.length > 0
        ? { uri: `${config.settings.hostImgUrl}${images[0]}` }
        : config.images.storyDefault;
    return (
      <ListItem
        avatar
        style={config.styles.listItem}
        button
        onPress={this._choosenThis}
      >
        <Left>
          <Thumbnail square source={imgSource} />
        </Left>
        <Body>
          <View style={{ flexDirection: "row", paddingRight: 60 }}>
            <Text button onPress={() => this._storyOnPress(item)}>
              {item.name}
            </Text>
          </View>
          <Text note>{item.author}</Text>
        </Body>
      </ListItem>
    );
  };
  _renderEmptyList = () => (
    <ListItem style={config.styles.listItem}>
      <Text>Không có dữ liệu</Text>
    </ListItem>
  );
  _storyOnPress = item => {
    this.setState({ showStoryDesc: true, storyDesc: item.description });
  };
  render() {
    return (
      <Modal
        visible={this.state.visible}
        transparent
        onRequestClose={() => this.props.onClose()}
      >
        <FlatList
          data={this.props.data}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index}
          ListEmptyComponent={this._renderEmptyList}
        />
      </Modal>
    );
  }
}
