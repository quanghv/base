import React from "react";
import { Item, Input, Icon, Text } from "native-base";

export default class FieldInput extends React.Component {
  state = { isFocused: false };
  focus = () => {
    console.log(this.textInputRef, "onFocus");
    // this.textInputRef.focus();
    this.textInputRef.props.focus();
  };
  render() {
    const {
      input,
      icon,
      isSecureText,
      keyboardType,
      returnKeyType,
      onSubmitEditing,
      label,
      meta: { touched, error }
    } = this.props;
    const hasError = error !== undefined;
    return (
      <Item error={touched && hasError}>
        {icon ? <Icon active name={icon} primary /> : null}
        <Input
          {...input}
          ref={ref => (this.textInputRef = ref)}
          focus={this.focus}
          placeholder={label}
          secureTextEntry={isSecureText}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          onFocus={() => this.setState({ isFocused: true })}
          onSubmitEditing={onSubmitEditing}
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
