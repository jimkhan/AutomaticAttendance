import React, {useContext, useState, useEffect} from 'react'
import { View, StyleSheet,Text, ActivityIndicator, FlatList } from 'react-native'
import Modal from '../Components/Modal'
import StudentInfo from '../Components/StudentInfo'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'


import { useRoute } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseUrl from '../API/BaseUrl'
import axios from 'axios';
import AppButton from '../Components/AppButton'

const StudentListForTexcher = ({ navigation }) => {

    const route = useRoute();
    const { course_id } = route.params;

    const [token, setToken] = useState(null)

    const [isLoading, setIsLoading] = useState(true)
    const [callMissed, setCallMissed] = useState(true)
    const [studentList, setStudentList] = useState(null)
    const [totalclass, setTotalClass] = useState(0)

    console.log(course_id)
    console.log("course ID")

    
    const tokenCall = async () => {
        try {
          const item = await AsyncStorage.getItem('userToken');
          const userid = await AsyncStorage.getItem('userId');
          console.log(item + "All");
          setToken(item);
          setuserId(userid);
    
          return item;
        } catch (e) {
          // read error
          console.log(e)
        }
      };


    const callForStudentList = async()=>{
        axios({
            method: 'get',
            url: BaseUrl + 'count-attendance-list/' + course_id + "/",
            headers: {
                'Authorization': `Bearer ${token}`
            }, 
            data: {}
          })

            .then(function (response) {

                const userValue = response.data;
                setStudentList(userValue.data)
                setTotalClass(userValue.total_number_of_class)
                setIsLoading(false)

            })
            .catch(function (error) {
                console.log(error);
                setCallMissed(!callMissed);

            });

        }


    useEffect(()=>{
        tokenCall();
        callForStudentList()
    },[callMissed])

    if(isLoading){
        return(
          <View style={styles.loader} >
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )
      }

    return (
        <View style={styles.container}>
{
        studentList.length < 1 ? <Modal title={"No student list found!"} onPress={()=> navigation.goBack()} />
        :
        (<View style={styles.list}>
             <FlatList
        
            data={studentList}
            keyExtractor={(item)=> item.student_id.toString()}
            renderItem={({item,key})=>{
                return(
                    <>
                    <StudentInfo name={item.student_name} email={item.student_email} totalClass={totalclass} attendIn={item.attendance_count} />
                    
                    </>
                )
            }}
         />
         </View>
        )
        
        }
        {/* name={item.student_name} email={item.student_email} totalClass={totalclass} attendIn={item.attendance_count} */}
        <AppButton name={"Back"} onPress={()=> navigation.goBack()} style={styles.button} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#EEEEEE',
        paddingTop: hp(1),
    },
    button:{
        position: "absolute",
        bottom: hp(2),
        // backgroundColor: "#000000aa"
    },
    list:{
        height: hp(85)
    },
    loader:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#000000aa"
    }
});

export default StudentListForTexcher
