import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const CustomButton = ({ buttonStyles, textStyles, _disabled, _onPress, text }) => (
    <TouchableOpacity
        disabled={_disabled}
        style={buttonStyles}
        onPress={_onPress}>
        <Text style={textStyles}>{text}</Text>
    </TouchableOpacity>
);

export default CustomButton;