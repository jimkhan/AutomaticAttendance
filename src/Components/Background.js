import React from 'react'
import { View, ImageBackground, StyleSheet, ScrollView } from 'react-native'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Background = ({ children, ...othersProps}) => {
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../img/back2.png')} {...othersProps} style={styles.imgback}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', width: wp(100) }} >
                {children}
                </ScrollView>

            </ImageBackground>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imgback: {
        flex: 1,
        height: hp('100%'),
        width: wp('100%'),
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Background;
