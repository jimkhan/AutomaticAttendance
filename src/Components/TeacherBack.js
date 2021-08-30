import React from 'react'
import { View, StyleSheet, ImageBackground,ScrollView } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const TeacherBack = ({ children, scrollEnabled = true, horizontal = false }) => {
    return (
        <View style={styles.container}>
            <ImageBackground blurRadius={.7} source={require('../img/teacherBack.png')} style={styles.imgback}>
            <ScrollView scrollEnabled={scrollEnabled} horizontal={horizontal} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: "center", height: hp(100), width: wp(100) }}>
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
        resizeMode: 'center',
        height: hp('100%'),
        width: wp('100%'),
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default TeacherBack
