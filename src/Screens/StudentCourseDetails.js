import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import {useNavigation} from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

import AppButton from '../Components/AppButton';
import Circle from '../Components/Circle';
import * as Progress from 'react-native-progress';
import AppText from '../Components/AppText';

import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseUrl from '../API/BaseUrl'
import axios from 'axios';

const StudentCourseDetails = ({}) => {
  // const navigation = useNavigation();
  const navigation = useNavigation();
  const route = useRoute();
  const { data, userId } = route.params;
  const [dataList, setDataList] = useState(data)
  // console.log(data + "data")
  // console.log(userId + "  id")
  const [val, setval] = React.useState(0);


  // ///////


  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [callMissed, setCallMissed] = useState(true)
  const [message, setMessage] = useState(null)
  const [info, setInfo] = useState(null)


  
  const tokenCall = async () => {
      try {
        const item = await AsyncStorage.getItem('userToken');
        setToken(item);
  
        return item;
      } catch (e) {
        // read error
        console.log(e)
      }
    };


  const callForStudentList = async()=>{
      axios({
          method: 'post',
          url: BaseUrl + 'count-attendance/' + userId + "/",
          headers: {
              'Authorization': `Bearer ${token}`
          }, 
          data: {
            course_code: data.course_code
          }
        })

          .then(function (response) {

              const userValue = response.data;
              setInfo(userValue.data)
              const {total_class, attendance} = userValue.data;
              setMessage(userValue.message)
              setIsLoading(false)
              setTimeout(() => {
                setval( attendance / total_class )
              }, 500);

          })
          .catch(function (error) {
              console.log(error);
              setCallMissed(!callMissed);

          });

      }


  useEffect(()=>{
      tokenCall();
      callForStudentList()
  },[])
  useEffect(()=>{
      tokenCall();
      callForStudentList()
      
  },[callMissed])
  useEffect(()=>{
      
      
  },[val])

  if(isLoading){
      return(
        <View style={styles.loader} >
          <ActivityIndicator size="large" color="orange" />
        </View>
      )
    }


  // /////

  return (
    <View style={styles.conatiner}>
      <View style={styles.percent}>
        <Progress.Circle
          size={200}
          progress={val}
          showsText={true}
          allowFontScaling
          color={'#FE2B78'}
          thickness={12}
          //   fill={'#1ABC9C'}
        />
      </View>
      <View style={styles.sub}>
        <View>
          <Circle size={hp(15)} color={'#25D366'} number={info.total_class} />
          <AppText style={{color: '#000', fontSize: 20, marginTop: hp(1),}}>Total Class</AppText>
        </View>
        <View>
          <Circle size={hp(15)} color={'#25D366'} number={info.attendance} />
          <AppText style={{color: '#000', fontSize: 20, fontWeight: '100', marginTop: hp(1),}}>
            Appearance
          </AppText>
        </View>
      </View>
      <View style={styles.textContainer} >
        <AppText style={styles.textCourse} >{dataList.course_name}</AppText>
      </View>
      <AppButton
        name={'Back'}
        style={{marginBottom: hp(8), backgroundColor: 'rgba(255,20,106,.9)'}}
        onPress={()=> navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: "#000000dd"
  },
  textCourse:{ 
    // color: "#2C3E50",
    fontSize: RFValue(22),
    fontWeight: '700',
  },
  sub: {
    flex: .9,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer:{
    height: hp(8),
    width: "80%",
    justifyContent: 'center',
    backgroundColor: '#25D366',
    borderRadius: hp(1),
    marginBottom: hp(2),
    // backgroundColor: "red",
  },
  percent: {
    flex: 2,
    // backgroundColor: "black",
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff"
}
});

export default StudentCourseDetails;
