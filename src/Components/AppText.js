import React from 'react'
import { Text, StyleSheet, } from 'react-native'

import colors from '../config/colors'
import { RFValue } from "react-native-responsive-fontsize";

const AppText = ({ children, style }) => {
    return (

        <Text selectable style={[styles.textcommon, style]} >{children}</Text>
    )
}
const styles = StyleSheet.create({
    textcommon: {
        fontSize: RFValue(12),
        alignSelf: 'center',
        color: colors.white,
        fontFamily: 'Poppins_Medium',
    }
})

export default AppText;
