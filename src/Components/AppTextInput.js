import React from 'react'
import { TextInput, StyleSheet, View } from 'react-native'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from "react-native-responsive-fontsize";

import colors from '../config/colors'

const AppTextInput = ({ styletext, icon, style, ...otherProps }) => {
    return (
        <View style={[styles.conatiner, style]}>

            <TextInput
                style={[styles.inputtext, styletext]}
                placeholderTextColor="#B8B2B2"

                {...otherProps}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    conatiner: {
        alignItems: 'center',
        flexDirection: 'row',
        width: wp('85%'),
        height: hp('7%'),
        marginVertical: 10,
        borderBottomWidth: 2,
        borderColor: colors.white,
    },
    inputtext: {
        width: wp('75%'),
        height: hp('6%'),
        fontSize: RFValue(18),
        fontFamily: 'Poppins-Medium',
        color: colors.white,
    },
})

export default AppTextInput;
