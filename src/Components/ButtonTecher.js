import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from "react-native-responsive-fontsize";

const ButtonTecher = ({ name, style, textStyle, onPress, icon, size, color }) => {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Text style={[styles.buttontxt, textStyle]}>{name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: wp('80%'),
        height: hp('6.4%'),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,.8)',
        borderTopStartRadius: hp(6),
        borderBottomEndRadius: hp(6),
        margin: hp("1%"),
    },
    buttontxt: {
        color: "#546E7A",
        fontSize: RFValue(20),

    }
})
export default ButtonTecher;
