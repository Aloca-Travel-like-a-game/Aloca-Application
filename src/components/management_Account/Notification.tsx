import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {useQuery} from '@tanstack/react-query';
import { Image } from 'react-native-animatable';
export default function Notification({navigation}: any) {
  const {data} = useQuery({
    queryKey: ['getData'],
    queryFn: async () => {
      const ShowNotification = await axios.get(
        'https://645e542e8d08100293fcd90e.mockapi.io/sinhvien',
      );
      return ShowNotification.data;
    },
  });

  const renderItem = ({item}: any)=>{
    return (
        <View style={styles.container}>
            <View style={styles.containerContent}>
                <Image source={require('../../Images/Genz.png')} style={styles.image}/>
                <View>
                    <Text style={styles.textItem}>{item.name}</Text>
                    <Text style={styles.textItemDes}>{item.description}</Text>
                </View>
            </View>
        </View>
    );
  };

  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.contenContainer}>
      <View style={styles.containerHeader}>
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons
            style={styles.iconNotificataion}
            name="arrow-back-outline"
            size={24}
            color="#FFFFFF"
          />
        </TouchableOpacity>
        <Text style={styles.textNotification}> Thông báo của bạn </Text>
      </View>
      <View style={styles.containerFlatList}>
        <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenContainer:{
    flex:1,
    backgroundColor: '#D9D9D9',
  },
  containerHeader: {
    flexDirection: 'row',
    height: 73,
    backgroundColor: '#2AB6AD',
    alignItems: 'center',
    paddingLeft:10,
  },
  textNotification: {
    fontSize: 25,
    color: '#FFFFFF',
  },
  iconNotificataion: {
    marginRight: '15%',
  },
  containerContent:{
    marginHorizontal:45,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    gap:80,
    marginBottom:15,
  },
  container:{
    marginTop:20,
  },
  textItem:{
    color:'#000000',
    fontSize:19,
    fontWeight:'bold',
  },
  textItemDes:{
    color:'#000000',
    fontSize:15,
  },
  containerFlatList:{
    backgroundColor:'#D9D9D9',
  },
  image:{
    borderRadius:50,
  },
  textTitile:{
    color:'#000000',
    fontSize:20,
  },
  contentfavourite:{
    flex:0.3,
    marginHorizontal:22,
  },
});
