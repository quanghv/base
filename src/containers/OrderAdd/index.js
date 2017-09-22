import React from "react";
import { View } from "react-native";
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Button,
  Item,
  Input,
  Text
} from "native-base";
import { SimpleLineIcons } from "@expo/vector-icons";
import AppComponent from "../../components/AppComponent";
import AppHeader from "../../components/AppHeader";
import config from "../../config";
import { getFromServer } from "../../actions";
import api from "../../config/api";
import { parseJsonFromApi } from "../../helpers/apiHelper";

import Products from "./Products";

export default class OrderAdd extends AppComponent {
  state = {
    productsVisible: false,
    products: []
  };
  async componentWillMount() {
    await getFromServer(api.urlProductsList).then(value => {
      const object = parseJsonFromApi(value);
      if (object.status === 1) {
        this.setState({ products: object.data });
      }
      //   console.log(object);
    });
  }
  _closeProducts = () => {
    this.setState({ productsVisible: false });
  };
  render() {
    console.log(this.state.products);
    return (
      <Container>
        <AppHeader title="Thêm đơn hàng" {...this.props} />
        <Content padder>
          <Card>
            <CardItem header>
              <Text>Thông tin khách hàng</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Item regular style={styles.itemInput}>
                  <SimpleLineIcons
                    size={config.settings.iconSize}
                    name="user"
                  />
                  <Input placeholder="Tên khách hàng" />
                </Item>
                <Item regular style={styles.itemInput}>
                  <SimpleLineIcons
                    size={config.settings.iconSize}
                    name="phone"
                  />
                  <Input placeholder="Điện thoại" />
                </Item>
                <Item regular style={[styles.itemInput, { minHeight: 80 }]}>
                  <SimpleLineIcons
                    size={config.settings.iconSize}
                    name="location-pin"
                  />
                  <Input placeholder="Địa chỉ" multiline />
                </Item>
                <Item regular style={[{ minHeight: 80 }, styles.itemInput]}>
                  <SimpleLineIcons
                    size={config.settings.iconSize}
                    name="note"
                  />
                  <Input placeholder="Ghi chú" multiline />
                </Item>
              </Body>
            </CardItem>
          </Card>
          {this.state.products !== undefined && (
            <Card>
              <CardItem header>
                <Text>Sản phẩm</Text>
              </CardItem>
              <CardItem>
                <Button
                  onPress={() => this.setState({ productsVisible: true })}
                >
                  <Text>Thêm sản phẩm</Text>
                </Button>
              </CardItem>
            </Card>
          )}
          <Products
            visible={this.state.productsVisible}
            data={this.state.products}
            onClose={this._closeProducts}
          />
        </Content>
      </Container>
    );
  }
}

const styles = {
  itemInput: {
    marginTop: 5,
    paddingLeft: 15
  }
};
