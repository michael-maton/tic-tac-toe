import React, { ReactElement, forwardRef } from 'react';
import { TextInput as NativeTextInput, TextInputProps as NativeTextInputProps } from 'react-native';
import styles from './text-input.styles';

const TextInput = forwardRef<NativeTextInput, NativeTextInputProps>(
  ({ style, ...props }: NativeTextInputProps, ref): ReactElement => {
    return <NativeTextInput ref={ref} {...props} placeholderTextColor='#788A9E' style={[styles.input, style]} />;
  }
);

TextInput.displayName = 'TextInput';

export default TextInput;
