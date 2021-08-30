import React, {useState, useEffect } from 'react'
import { StyleSheet, Alert, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as yup from 'yup';

import TeacherBack from '../Components/TeacherBack';
import AppButton from '../Components/AppButton';
import AppTextInput from '../Components/AppTextInput'
import AppText from '../Components/AppText';


import BaseUrl from '../API/BaseUrl'
import axios from 'axios';



const validationSchema = yup.object().shape({      
    cName: yup.string().required().label("Course Name"),
    cCode: yup.string().required().min(3).label("Course Code"),
});

const CreateCourses = ({navigation}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState(null)

    const tokenCall = async () => {
        try {
          const item = await AsyncStorage.getItem('userToken');
          console.log(item + "All");
          setToken(item);
    
          return item;
        } catch (e) {
          // read error
          console.log(e)
          setIsLoading(!isLoading)
        }
      };

    const creacteCourse = async (values) => {


        axios({
            method: 'post',
            url: BaseUrl + 'create-course/',
            headers: {
                'Authorization': `Bearer ${token}`
            }, 
            data: {
                course_name: values.cName,
                course_code: values.cCode
            }
          })

            .then(function (response) {

                const userValue = response.data.message;
                
                Alert.alert(
                    "Congratulation!",
                    `${userValue}`,
                    [
                      {
                        text: "Ok",
                        onPress: () => navigation.navigate("TeacherHome"),
                        style: "Ok"
                      }
                    ]
                  );
                

            })
            .catch((detail)=> {
                alert("Someting went wrong! Please try again!")
            });
        
    }

    useEffect(()=>{
        tokenCall()

    },[isLoading])
    return (
        <TeacherBack>
            <Formik 
                initialValues={{ cName: '', cCode: '' }}
                onSubmit={(values) => creacteCourse(values) }
                validationSchema={validationSchema}
                validator={() => ({})}
            >
                {({ handleChange, handleSubmit, values, errors, setFieldTouched , touched}) => (
                    <>

                        <AppTextInput
                            placeholder={"Course Name"} 
                            icon={"mail"}
                            onBlur={()=> setFieldTouched("cName")}
                            value={values.cName}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={handleChange("cName")}
                            keyboardType={"email-address"}
                            textContentType={"emailAddress"}
                         />
                        {  touched.cName && errors.cName &&   <AppText style={styles.errorText} >{errors.cName}</AppText>}
                        <AppTextInput 
                            placeholder={"Course Code"} 
                            icon={"ios-lock-closed"}
                            value={values.cCode}
                            onBlur={()=> setFieldTouched("cCode")}
                            autoCapitalize="none"
                            autoCorrect= {false}
                            onChangeText={handleChange("cCode")}
                            keyboardType={"email-address"}
                            textContentType={"emailAddress"}
                            // secureTextEntry
                            // textContentType={"password"}
                        />
                        { touched.cCode && errors.cCode &&  <AppText style={styles.errorText} >{errors.cCode}</AppText>}
                        <AppButton style={styles.button} name={"Create"} onPress={ handleSubmit} />
                        

                    </>
                )}
            </Formik>


        </TeacherBack>
    )
}
const styles = StyleSheet.create({
    signupView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginTop: hp('8%'),
        marginBottom: hp('4%'),
    },
    errorText:{
        fontWeight: 'bold',
        color: '#F8D714',
        alignSelf: 'flex-start', 
        paddingLeft: wp("10%"),
    },

})


export default CreateCourses;
