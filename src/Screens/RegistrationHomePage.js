import React, { useState, } from 'react'
import { ScrollView, StyleSheet,  View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { StackActions } from '@react-navigation/native';
import { Formik } from 'formik';
import * as yup from 'yup';

import BackGround from '../Components/Background';
import AppButton from '../Components/AppButton';
import AppTextInput from '../Components/AppTextInput'
import AppText from '../Components/AppText';

import DropDownPicker from 'react-native-dropdown-picker';

import BaseUrl from '../API/BaseUrl'
import axios from 'axios';

const validationSchema = yup.object().shape({
    name: yup.string().required().label("Name"),
    email: yup.string().required().email().label("Email"),
    accountType: yup.string().required().min(5).label("Account Type"),
    password: yup.string().required().min(6).label("Password"),
    confirmPassword: yup.string().required().label("Confirm Password")
        .test("Password-match", "Password not matches", function (value) {
            return this.parent.password === value;
        }),

});



const RegistrationHomePage = ({ navigation }) => {
    // const navigation = useNavigation();

    const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Teacher', value: 'teacher', },
    { label: 'Student', value: 'student', },

]);

    const checkLoginInfo = async(values) => {

        console.log(values)
        axios({
            method: 'post',
            url: BaseUrl + 'sign-up/',
            headers: {}, 
            data: {
                name: values.name,
                email: values.email,
                user_type: values.accountType,
                password: values.password,
            }
          })

            .then(function (response) {

                const userValue = JSON.stringify(response.data)

                navigation.dispatch(
                    StackActions.replace('SuccessReg')
                  );
    
    
            })
            .catch(function (error) {
                // console.log(error);
                alert(error)
            });
    }
    return (
        <BackGround>
            <Formik initialValues={{
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                accountType: ''

            }}
                onSubmit={(values) => checkLoginInfo(values)}
                validationSchema={validationSchema}
                validator={() => ({})}
                // navigation.navigate("SuccessReg", { value: values })
            // enableReinitialize
            >
                {({ handleChange, handleSubmit, errors, setFieldTouched, values, touched }) => (
                    <>

                        <AppText style={[styles.heading, styles.heading2]}>Resistration</AppText>
                        <AppTextInput
                            placeholder={"Full Name"}
                            value={values.name}
                            icon={"person-sharp"}
                            autoCapitalize="none"
                            onBlur={()=> setFieldTouched('name')}
                            autoCorrect={false}
                            onChangeText={handleChange("name")}
                            keyboardType={"email-address"}
                            textContentType={"emailAddress"}
                        />
                        {/* {console.log(values)} */}
                        {touched.name && errors.name && <AppText style={styles.errorText} >{errors.name}</AppText>}
                        <AppTextInput
                            placeholder={"Email"}
                            icon={"mail"}
                            value={values.email}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onBlur={()=> setFieldTouched('email')}
                            onChangeText={handleChange("email")}
                            keyboardType={"email-address"}
                            textContentType={"emailAddress"}
                        />
                        {touched.email && errors.email && <AppText style={styles.errorText} >{errors.email}</AppText>}
                        {/* <AppTextInput
                            placeholder={"Mobile Number"}
                            icon={"md-call"}
                            value={values.mobileNumber}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onBlur={()=> setFieldTouched('mobileNumber')}
                            onChangeText={handleChange("mobileNumber")}
                            keyboardType={"phone-pad"}
                            textContentType={"emailAddress"}
                        />
                        {touched.mobileNumber && errors.mobileNumber && <AppText style={styles.errorText} >{errors.mobileNumber}</AppText>} */}
                        <AppTextInput
                            placeholder={"Password"}
                            icon={"ios-lock-closed"}
                            value={values.password}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onBlur={()=> setFieldTouched('password')}
                            onChangeText={handleChange("password")}
                            // keyboardType={"email-address"}
                            secureTextEntry
                            textContentType={"password"}
                        />
                        {touched.password && errors.password && <AppText style={styles.errorText} >{errors.password}</AppText>}
                        <AppTextInput
                            placeholder={"Confirm Password"}
                            icon={"ios-lock-closed"}
                            value={values.confirmPassword}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onBlur={()=> setFieldTouched('confirmPassword')}
                            onChangeText={handleChange("confirmPassword")}
                            // keyboardType={"email-address"}
                            secureTextEntry
                            textContentType={"password"}
                        />
                        {touched.confirmPassword && errors.confirmPassword && <AppText style={styles.errorText} >{errors.confirmPassword}</AppText>}
                        

                        <ScrollView nestedScrollEnabled={true} horizontal style={{  }} >
                        <View style={styles.checkBox} >

                        

                        <DropDownPicker
                            placeholder={"Account type"}
                            open={open}
                            style={{ marginTop: hp(2) }}
                            value={value}
                            items={items}
                            onClose={()=> setFieldTouched('accountType')}
                            onChangeValue={handleChange('accountType')}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            />
                            

                        {touched.accountType && errors.accountType && <AppText style={styles.errorText} >{errors.accountType}</AppText>}
                        </View>
                        </ScrollView>



                        <AppButton
                            style={styles.button}
                            name={"Sign Up"}
                            onPress={handleSubmit}
                        />

                    </>
                )}
            </Formik>

        </BackGround>
    )
}

// ()=> { ( handleSubmit === false ||errors.name || errors.email || errors.mobileNumber || errors.password || errors.confirmPassword || value === "" ) ? alert("Fill every field correctly"): navigation.navigate("StudentHome")}
const styles = StyleSheet.create({

    button: {

        marginBottom: hp(5)
    },
    checkBox: {
        width: wp(85),
        alignItems: 'center',
        marginBottom: hp(1),
        marginTop: hp(1.5),
    },
    errorText: {
        fontWeight: '300',
        color: '#F8D714',
        alignSelf: 'flex-start',
        paddingLeft: wp("10%"),
    },
    text: {
        color: '#fff',
        fontSize: 40,
        alignSelf: 'center',
    },
    signup: {
        color: 'yellow',
        fontSize: 22,
    },
    heading: {
        marginTop: hp(5),
        fontSize: RFValue(40),
        fontFamily: 'GillSansUltraBold',
    },

})


export default RegistrationHomePage;
