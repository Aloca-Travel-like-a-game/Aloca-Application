import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import { Image } from 'react-native-animatable';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function RankingScreen( {navigation}: any) {
    const {data} = useQuery({
        queryKey: ['ranking'],
        queryFn: async ()=>{
            const RankingData = await axios.get('https://645e542e8d08100293fcd90e.mockapi.io/webxedap');
            return RankingData.data;
        },
    });
  return (
    <View style={styles.containerContent}>
      <View>
        <Image source={require('../Images/imageRanking.png')} style={styles.backgroundRanking}/>
        <Text style={styles.text}> Chào mừng bạn đến với cuộc {'\n'} đua tuần này</Text>
      </View>
      <View style={styles.contentRanking}>
        <FlatList
        data={data}
        renderItem={({item})=>{
            return (
                <View style={styles.ShowdataRanking}>
                  <Image  source={{uri:item.image}} style={styles.imageStyle}/>
                  <View style={styles.textContainer}>
    <Text style={styles.textColor}>{item.name}</Text>
    <Text style={styles.textColor}>{item.point}</Text>
  </View>
                </View>
            );
        }}
        />
      </View>
      <TouchableOpacity style={styles.textContent} onPress={()=> navigation.navigate('Trợ lý')}>
        <Text style={styles.textcontinue}>TIẾP TỤC </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  containerContent: {
    flex: 1,
    backgroundColor:'#455A64',
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  textTitle: {
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: 100,
    height: 40,
  },
  text: {
    color: '#2AB6AD',
    fontSize: 20,
    fontWeight:'bold',
    justifyContent:'center',
   textAlign:'center',
  },
  selectedText: {
    color: '#FFFFFF', // Màu văn bản khi mục được chọn
  },
  selectedBackground: {
    backgroundColor: '#2AB6AD',
  },
  backgroundRanking:{
    alignSelf:'center',
  },
  contentRanking:{
    marginHorizontal:15,
    borderWidth:1,
    borderColor:'#2AB6AD',
    flex:0.90,
    borderRadius:10,
    marginTop:10,
    backgroundColor:'#455A64',
  },
  textContent:{
    borderWidth:1,
    borderColor:'#2AB6AD',
    backgroundColor: '#2AB6AD',
    width:350,
    height:45,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
    marginTop:20,
    borderRadius:10,
  },
  textcontinue:{
    fontSize:20,
    color:'#FFFFFF',
    fontWeight:'800',
  },
  textColor:{
    color:'#FFFFFF',
    fontSize:14,
  },
  imageStyle:{
    width:50,
    height:50,
    backgroundColor:'#2AB6AD',
    borderRadius:50,
    margin:10,
  },
  ShowdataRanking:{
    flexDirection:'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 10,

  },
  textContainer: {
    flex: 1,
    flexDirection:'row',
    justifyContent:'space-around',
  },
});
