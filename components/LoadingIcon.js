import React from 'react';
import { ActivityIndicator } from 'react-native';

const LoadingIcon = ({ animating }) => (
  <ActivityIndicator style={{ alignItems: 'center' }} animating={animating} color="#22a7f0" size={70} />
);

export default LoadingIcon;
