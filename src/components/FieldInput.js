import React from "react";
import { Item, Input, Icon, Text } from "native-base";
import styles from "../config/styles";

export default class FieldInput extends React.Component {
  render() {
    const {
      input,
      icon,
      secureTextEntry,
      keyboardType,
      returnKeyType,
      onEnter,
      label,
      style,
      meta: { touched, error }
    } = this.props;
    const hasError = error !== undefined;
    return (
      <Item
        error={touched && hasError}
        style={{ left: 0, paddingLeft: 0, marginLeft: 0 }}
      >
        {icon ? <Icon active name={icon} primary /> : null}
        <Input
          autoCapitalize="none"
          placeholderTextColor="#999999"
          {...input}
          ref={this.props.refF}
          focus={this.focus}
          placeholder={label}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          onSubmitEditing={onEnter}
          style={style}
        />
        {touched && hasError
          ? <Text style={styles.textError}>
              {error}
            </Text>
          : null}
      </Item>
    );
  }
}
