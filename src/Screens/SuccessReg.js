import React from 'react'
import { View, Text, ImageBackground, StyleSheet, ScrollView } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import AppButton from '../Components/AppButton'

const SuccessReg = ({navigation}) => {
    return (
        <View style={styles.conatainer} >
            <View style={styles.subConatainer} >
                <Text style={styles.textSuccess} >Successful</Text>
            </View>
            <AppButton name={"LogIn"} style={styles.button} onPress={()=> navigation.navigate("LogInScreen")} />
            
        </View>
    )
}
const styles = StyleSheet.create({
    conatainer:{
        flex: 1,
        
        alignItems: 'center',
        justifyContent: 'center',
    },
    button:{
        marginTop: hp(3),
    },
    subConatainer:{
        width: hp(35),
        height: hp(35),
        borderRadius: hp(18),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fcfcfc"
    },
    textSuccess:{
        fontSize: 40,
        color: "green",
        alignSelf: 'center',
        // fontWeight: "bold",
        // fontFamily: 'Pacifico-Regular',
        // fontFamily: 'GillSansUltraBold',
        fontFamily: 'Righteous-Regular',
    }
})

export default SuccessReg;
