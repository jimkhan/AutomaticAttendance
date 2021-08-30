import React, {useState, } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from "react-native-responsive-fontsize";

import { Formik } from 'formik';
import * as yup from 'yup';

import BackGround from '../Components/Background';
import AppButton from '../Components/AppButton';
import AppTextInput from '../Components/AppTextInput'
import AppText from '../Components/AppText';

import { AuthContext } from '../Context/context';

import BaseUrl from '../API/BaseUrl'
import axios from 'axios';


const validationSchema = yup.object().shape({      
    email: yup.string().required().email().label("Email"),
    password: yup.string().required().label("Password"),
});

const LogInScreen = ({navigation}) => {
    const { signIn } = React.useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);

    const checkLoginInfo = async (values) => {

        axios({
            method: 'post',
            url: BaseUrl + 'token/',
            headers: {}, 
            data: {
                email: values.email,
                password: values.password
            }
          })

            .then(function (response) {
                const userValue = response.data;
                signIn(userValue);
                console.log(userValue );
                console.log("From login")
            })
            .catch((detail)=> {
                alert("No active account found with the given credentials")
            });
        
    }
    return (
        <BackGround>
            <Formik initialValues={{ email: '', password: '' }}
                onSubmit={(values) => checkLoginInfo(values) }
                validationSchema={validationSchema}
                validator={() => ({})}
            >
                {({ handleChange, handleSubmit, values, errors, setFieldTouched , touched}) => (
                    <>
                        <AppText style={styles.heading}>WELCOME</AppText>
                        <AppTextInput
                            placeholder={"Email"} 
                            icon={"mail"}
                            onBlur={()=> setFieldTouched("email")}
                            value={values.email}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={handleChange("email")}
                            keyboardType={"email-address"}
                            textContentType={"emailAddress"}
                         />
                        {  touched.email && errors.email &&   <AppText style={styles.errorText} >{errors.email}</AppText>}
                        <AppTextInput 
                            placeholder={"Password"} 
                            icon={"ios-lock-closed"}
                            value={values.password}
                            onBlur={()=> setFieldTouched("password")}
                            autoCapitalize="none"
                            autoCorrect= {false}
                            onChangeText={handleChange("password")}
                            secureTextEntry
                            textContentType={"password"}
                        />
                        { touched.password && errors.password &&  <AppText style={styles.errorText} >{errors.password}</AppText>}
                        <AppButton style={styles.button} name={"Log in"} onPress={ handleSubmit} />
                        <AppText style={styles.bottomtext}>Not a member?
            {<TouchableOpacity style={styles.signupView} onPress={() => navigation.navigate('RegistrationHomePage')}><AppText style={styles.signup}>SignUp</AppText></TouchableOpacity>}here</AppText>


                    </>
                )}
            </Formik>


        </BackGround>
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
    bottomtext: {
        fontWeight: 'bold',
        fontSize: RFValue(18),
    },
    errorText:{
        fontWeight: 'bold',
        color: '#F8D714',
        alignSelf: 'flex-start', 
        paddingLeft: wp("10%"),
    },
    text: {
        color: '#fff',
        fontSize: RFValue(40),
        alignSelf: 'center',
    },
    signup: {

        color: 'yellow',
        fontWeight: 'bold',
        fontSize: RFValue(18),
    },
    heading: {
        fontSize: RFValue(45),
        fontFamily: 'GillSansUltraBold',
        top: -40,

    },

})


export default LogInScreen;
