import React from 'react'
import { StyleSheet,Image,View,} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { useRoute } from '@react-navigation/native';
import AppButton from '../Components/AppButton';

const QRcodeForClass = ({navigation}) => {
    const route = useRoute();
    const { link, data } = route.params;

    console.log(data)
    const BaseUrl = "https://thesisbackend.herokuapp.com"+link
    console.log(`${BaseUrl}${link}`)
    return (
        <View style={styles.conatiner} >
            <Image source={{ uri: BaseUrl }} style={{ width: wp(80), height: wp(80) }} />
            <AppButton name={"Home"} onPress={()=> navigation.navigate("TeacherHome")}  style={styles.button} />
        </View>
    )
}

const styles = StyleSheet.create({

    conatiner:{
        flex:1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#fff",
    },
    button:{

        marginTop: hp(10),
    },

    
});

export default QRcodeForClass
