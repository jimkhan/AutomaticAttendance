import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppButton from './AppButton';
import { useNavigation } from '@react-navigation/native';
const Modal = ({title, onPress, buttonTitle = "Ok"}) => {

    const navigation  = useNavigation()
    return (
        <View style={styles.container}>
            <View style={styles.sub} >
            <View style={styles.subText} >
                <Text style={styles.text} >{title}</Text>

            </View>
            <AppButton name={buttonTitle}  style={{ width: wp(70) }} onPress={onPress} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        height: hp(100),
        width: wp(100),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#000000aa",
    },
    sub:{
        width: wp(85),
        padding: wp(3),
        // paddingTop:hp(8),
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: hp(25),
        backgroundColor: "#fff",
        borderRadius: wp(5)
    },
    subText:{
        width: wp(80),
        minHeight:hp(18),
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        fontSize: RFValue(20),
        color: "#648E7A",
        fontWeight: '600',
        textAlign: 'center',
    }
});
export default Modal
