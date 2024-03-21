import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function WhatAloca({navigation}:any){
    return (
        <View style={styles.content}>
            <TouchableOpacity onPress={()=> navigation.goBack()}>
                <Ionicons name="arrow-back-circle-outline" size={30} color="black" />
            </TouchableOpacity>
        <Text style={styles.title}>Aloca là gì</Text>
        <Text style={styles.text}>
            Aloca là ứng dụng du lịch độc đáo,
            ứng dụng có thể giúp người dùng  lên
            kế hoạch chuyến dễ dàng đi như chơi
            game từ đó người dùng có thể ước lượng
            được các chi phí mình có thể đi. Người
            dùng có thể chat với  trí tuệ nhân tạo,
            và nhận được gợi ý thông minh với những
            nghiệm lịch trình được tối ưu hóa hơn.
            Aloca mang lại trải nghiệm du lịch độc
            đáo và thuận lợi.
        </Text>
     </View>
    )
}

const styles = StyleSheet.create({
    title:{
        color:'#000000',
        alignSelf:'center',
        fontSize:35,
        fontWeight:'bold',
    },
    content:{
        marginHorizontal:12,
        paddingTop:20,
    },
    text:{
        color:'#000000',
        margin:10,
    },
    icon:{
        
    }
})