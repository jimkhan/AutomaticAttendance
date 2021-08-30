import React, {useContext, useState, useEffect} from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {  RFValue } from "react-native-responsive-fontsize";
import AppButton from '../Components/AppButton'
import AsyncStorage from '@react-native-async-storage/async-storage';


const PreHome = ({navigation}) => {


    const [userType, setuserType] = useState(null)
    const [name, setName] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [callMissed, setCallMissed] = useState(true)


    const tokenCall = async () => {
        try {
          const item = await AsyncStorage.getItem('userName');
          const usertype = await AsyncStorage.getItem('userType');
          
        //   console.log(item + "TCCCC" + usertype)
          setName(item)
          setuserType(usertype)
          return item;
        } catch (e) {
          // read error
          console.log(e)
          setCallMissed(!callMissed)
        }
      };


      useEffect(()=>{
        tokenCall();
  
        setTimeout(() => {
            setIsLoading(false)
        }, 1000);
        // callForList()
    },[])

    useEffect(()=>{
        const data = tokenCall();

    },[callMissed])


    if(isLoading){
        return(
          <View style={styles.loader} >
            <ActivityIndicator size="large" color="rgba(255,20,106,.8)" />
          </View>
        )
      }

    return (
        <View style={styles.conatainer} >
            <View style={styles.subConatainer} >
                <Text style={styles.textSuccess} >Hello</Text>
                { name && <Text style={styles.textSuccess} >{ name }</Text>}
            </View>
            <AppButton name={"Home"} style={styles.button} onPress={()=> navigation.navigate(userType === "student" ? "StudentHome":"TeacherHome")} />
            
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
        position: "absolute",
        bottom: hp(4)
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
        fontSize: RFValue(38),
        color: "green",
        alignSelf: 'center',
        fontFamily: 'Righteous-Regular',
        textAlign: 'center',
    },
    loader:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default PreHome;
