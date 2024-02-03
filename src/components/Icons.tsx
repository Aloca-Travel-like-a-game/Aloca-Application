import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const iconType = ['Ionicons', 'AntDesign'];

export const Icon = ({type, name, color}:any) => {
  if (type === iconType[0]) {
    return <Ionicons name={name} color={color} size={20}/>;
  }
  if (type === iconType[1]) {
    return <AntDesign name={name} color={color} size={20}/>;
  }
};
