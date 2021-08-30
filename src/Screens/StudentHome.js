import React, { useContext, useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import BackGround from '../Components/Background';
import AppButton from '../Components/AppButton';

import { AuthContext } from '../Context/context'
import BaseUrl from '../API/BaseUrl'
import axios from 'axios';


const StudentHome = ({navigation}) => {
    // const navigation = useNavigation();
    // const route = useRoute();
    // const { userId } = route.params;

    const { loginState, signOut  } = useContext(AuthContext);
    // context.authContext.signIn("JIM", "KHAN");
    // console.log(signIn)
    const [courselist, setCourselist] = useState()
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [callMissed, setCallMissed] = useState(true)
    const [data, setData] = useState('')

    // console.log(loginState.userToken)

    
    const tokenCall = async () => {
        try {
          const item = await AsyncStorage.getItem('userToken');
          const id = await AsyncStorage.getItem('userId');
          console.log(item + "token");
          console.log(id + "userId");
          setToken(item);
            setUserId(id);
          return item;
        } catch (e) {
          // read error
          console.log(e)
        }
      };


    const callForList = async()=>{
        axios({
            method: 'get',
            url: BaseUrl + 'course-list/',
            headers: {
                'Authorization': `Bearer ${token}`
            }, 
            data: {}
          })

            .then(function (response) {
                const userValue = response.data;
                setData(userValue)
                setIsLoading(false)
                console.log(userValue)
                // alert(JSON.stringify(userValue.reason))

            })
            .catch(function (error) {
                console.log(error);
                setCallMissed(!callMissed);

            });

        }

    useEffect(()=>{
        tokenCall();
        callForList()
        // callForList()
    },[])

    useEffect(()=>{
        callForList()
    },[callMissed])

    if(isLoading){
        return(
          <View style={styles.loader} >
            <ActivityIndicator size="large" color="rgba(255,20,106,.8)" />
          </View>
        )
      }
    return (
        <BackGround source={require('../img/back.png')}>

            <AppButton name={"All Courses"} onPress={()=> navigation.navigate("AllCoursesStudent",{data, userId})} />
            <AppButton name={"Genarate Attendance"} onPress={()=> navigation.navigate("QRcodeScan",{userId,token})} />
            <AppButton name={"Routine"} onPress={()=> navigation.navigate("Routine")} />
            <AppButton name={"Refresh"} onPress={()=> (setCallMissed(!callMissed),setIsLoading(true))} />
            <AppButton name={"LogOut"} onPress={()=> console.log(signOut())} />
        </BackGround>
    )
}
const styles = StyleSheet.create({

    loader:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default StudentHome;
