import React from "react";
import { Item, Input, Icon, Text } from "native-base";

export default class FieldInput extends React.Component {
  state = { isFocused: false };

  render() {
    const {
      input,
      icon,
      isSecureText,
      keyboardType,
      returnKeyType,
      onEnter,
      label,
      meta: { touched, error }
    } = this.props;
    const hasError = error !== undefined;
    return (
      <Item error={touched && hasError}>
        {icon ? <Icon active name={icon} primary /> : null}
        <Input
          autoCapitalize="none"
          placeholderTextColor="#999999"
          {...input}
          ref={this.props.refF}
          focus={this.focus}
          placeholder={label}
          secureTextEntry={isSecureText}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          onSubmitEditing={onEnter}
        />
        {touched && hasError
          ? <Text>
              {error}
            </Text>
          : null}
      </Item>
    );
  }
}
