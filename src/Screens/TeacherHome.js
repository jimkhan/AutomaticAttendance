import React, {useContext, useState, useEffect} from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import TeacherBack from '../Components/TeacherBack'
import ButtonTecher from '../Components/ButtonTecher'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'



import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../Context/context'
import BaseUrl from '../API/BaseUrl'
import axios from 'axios';

const TeacherHome = ({ navigation }) => {
    
    const { loginState, signOut  } = useContext(AuthContext);
    // context.authContext.signIn("JIM", "KHAN");
    // console.log(loginState)
    const [courselist, setCourselist] = useState()
    const [token, setToken] = useState(null)
    const [userId, setuserId] = useState(loginState.userId)

    const [isLoading, setIsLoading] = useState(true)
    const [callMissed, setCallMissed] = useState(true)
    const [data, setData] = useState('')

    // console.log(loginState.userToken)

    
    const tokenCall = async () => {
        try {
          const item = await AsyncStorage.getItem('userToken');
          const userid = await AsyncStorage.getItem('userId');
          setToken(item);
          setuserId(userid);
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
                console.log(userValue)
                setIsLoading(false)
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
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )
      }


    return (
        <TeacherBack scrollEnabled={false}>
            <View style={styles.buttonArea} >
                <ButtonTecher name={"All course"} onPress={() => navigation.navigate("TeacherAllCourses", {data})} />
                <ButtonTecher name={"Create course"} onPress={() => navigation.navigate("CreateCourses", {data})} />
                <ButtonTecher name={"Create a Class"} onPress={()=> navigation.navigate("CrateClass", {data, userId})} />
                <ButtonTecher name={"Refresh Page"} onPress={()=> (setCallMissed(!callMissed), setIsLoading(true))} />
                <ButtonTecher name={"LogOut"} onPress={()=> signOut()} />


            </View>
    
        </TeacherBack>
    )
}

const styles = StyleSheet.create({
    buttonArea: {
        position: 'absolute',
        bottom: hp(12),
    },
    loader:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#000000aa"
    }
})

export default TeacherHome
