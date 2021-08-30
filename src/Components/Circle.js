import React from 'react'
import { View } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';
import AppText from './AppText';


const Circle = ({ color="green", size=30, number, children }) => {
    return (
        <View style={{ backgroundColor: color, height: size, width: size, borderRadius: size/2, justifyContent: 'center', alignItems: 'center', }} >
            <AppText style={{ fontSize: RFValue(size/2.3),  fontWeight: "bold" }} >{number}</AppText>
            {children}
        </View>
    )
}


export default Circle
