import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function Benefit({navigation}:any){
    return (
        <View style={styles.content}>
             <TouchableOpacity onPress={()=> navigation.goBack()}>
                <Ionicons name="arrow-back-circle-outline" size={30} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}> Lợi ích </Text>
            <Text style={styles.text}>
            Lập kế hoạch chuyến đi dễ dàng:
            Aloca App cung cấp các tính năng giúp
            người dùng lập kế hoạch cho chuyến đi
            của họ một cách thuận tiện. Từ việc
            tìm kiếm điểm đến, xác định thời gian
            và ngân sách,
            Tùy chỉnh lịch trình:
            Ứng dụng này cho phép người dùng
            tùy chỉnh lịch trình của họ dựa
            trên sở thích và nhu cầu cá nhân.
            Thông tin và gợi ý du lịch: Aloca
            App cung cấp thông tin chi tiết về
            các điểm đến, bao gồm thông tin về
            các địa điểm tham quan, nhà hàng,
            hoạt động giải trí, và nhiều hơn nữa.
            Điều này giúp người dùng có cái nhìn tổng
            quan về điểm đến của mình và có thể lựa
            chọn những hoạt động phù hợp với sở thích của họ.
            </Text>
        </View>
    );
}
const styles = StyleSheet.create({
    title:{
        color:'#000000',
        alignSelf:'center',
        fontSize:35,
        fontWeight:'bold',
    },
    text:{
        color:'#000000',
        fontSize:14,
        margin:10,
    },
    content:{
        marginHorizontal:12,
        paddingTop:20,
    },
});
