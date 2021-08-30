import React from 'react'
import { TouchableOpacity, StyleSheet, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import BackGround from '../Components/Background';

import { useRoute } from '@react-navigation/native';

const QRcodeScan = ({ navigation }) => {
    const route = useRoute();
    const { userId, token } = route.params;
    return (
        <BackGround source={require('../img/back.png')}>

            <TouchableOpacity style={styles.container} onPress={()=> navigation.navigate("QRcamera",{userId, token})}   >
                <Image source={require("../img/qrbutton.png")}  style={styles.img} />
            </TouchableOpacity>

        </BackGround>
   
    )
}
const styles = StyleSheet.create({
    main:{
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
    },
    img:{
        width: hp(20),
        height: hp(20.5),
    },
    container:{

    }
    
})

export default QRcodeScan
