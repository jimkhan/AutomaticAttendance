import React, {useState, useEffect} from 'react';
import {StyleSheet, Alert, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
// import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import {Formik} from 'formik';
import * as yup from 'yup';

import TeacherBack from '../Components/TeacherBack';
import AppButton from '../Components/AppButton';
import AppText from '../Components/AppText';

import {useRoute} from '@react-navigation/native';

import BaseUrl from '../API/BaseUrl';
import axios from 'axios';
import Modal from '../Components/Modal';

const validationSchema = yup.object().shape({
  cCode: yup.string().required().min(3).label('Course Code'),
});

const CrateClass = ({navigation}) => {
  const route = useRoute();
  const {data, userId} = route.params;
  const userData = data.data;
  console.log(data.data);

  var Data = [];

  if (userData) {
    for (var i of data.data) {
      console.log(i);

      Data.push({label: i.course_code, value: i.course_code, key: i.course_id});
    }
  }

  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(null);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(Data);

  const tokenCall = async () => {
    try {
      const item = await AsyncStorage.getItem('userToken');
      console.log(item + 'All');
      setToken(item);

      return item;
    } catch (e) {
      // read error
      console.log(e);
      setIsLoading(!isLoading);
    }
  };

  const creacteCourse = async values => {
    axios({
      method: 'post',
      url: BaseUrl + 'create-class/',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        teacher_id: userId,
        course_code: values.cCode,
        expiry: '2021-08-11 12:00',
      },
    })
      .then(function (response) {
        const userValue = response.data;
        console.log(userValue);
        console.log('from class');
        const message = response.data.message;

        let link = userValue.data.qr_code;
        console.log(link);

        Alert.alert('Congratulation!', `${message}`, [
          {
            text: 'Get QR code',
            onPress: () =>
              navigation.navigate('QRcodeForClass', {
                link,
                data: userValue.data,
              }),
            style: 'Ok',
          },
        ]);
      })
      .catch(detail => {
        alert('Someting went wrong! Please try again!');
      });
  };

  useEffect(() => {
    tokenCall();
  }, [isLoading]);
  return (
    <>
      {!userData ? (
        <Modal
        onPress={()=> navigation.goBack()}
          title={
            'You have not create any course yet! Please create a course before creating a class!'
          }
        />
      ) : (
        <>
          <TeacherBack scrollEnabled={false} horizontal>
            <View style={styles.container}>
              <Formik
                initialValues={{cCode: ''}}
                onSubmit={values => creacteCourse(values)}
                validationSchema={validationSchema}
                validator={() => ({})}>
                {({
                  handleChange,
                  handleSubmit,
                  values,
                  errors,
                  setFieldTouched,
                  touched,
                }) => (
                  <>
                    
                    <View style={styles.checkBox}>
                      <DropDownPicker
                        placeholder={'Course code'}
                        open={open}
                        value={value}
                        items={items}
                        onClose={() => setFieldTouched('cCode')}
                        onChangeValue={handleChange('cCode')}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                      />

                      {touched.cCode && errors.cCode && (
                        <AppText style={styles.errorText}>
                          {errors.cCode}
                        </AppText>
                      )}
                    </View>

                    <AppButton
                      style={styles.button}
                      name={'Create'}
                      onPress={handleSubmit}
                    />
                  </>
                )}
              </Formik>
            </View>
          </TeacherBack>
        </>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBox: {
    width: wp(80),
    alignItems: 'center',
    marginBottom: hp(1),
    marginTop: hp(1.5),
  },
  button: {
    marginTop: hp(3),
    width: wp(79),
    marginBottom: hp('4%'),
  },
  bottomtext: {
    fontWeight: 'bold',
    fontSize: RFValue(20),
  },
  errorText: {
    fontWeight: 'bold',
    color: '#F8D714',
    alignSelf: 'flex-start',
    paddingLeft: wp('10%'),
  },
});

export default CrateClass;
