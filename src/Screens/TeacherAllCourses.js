import React, {useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import AppText from '../Components/AppText';
import AppButton from '../Components/AppButton';
import ButtonTecher from '../Components/ButtonTecher';
import Modal from '../Components/Modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const TeacherAllCourses = ({navigation}) => {
  const route = useRoute();
  const {data} = route.params;
  const [dataList, setDataList] = useState(data.data);
  console.log(data);
  return (
    <View style={styles.container}>
      {data.reason ? (
        <Modal title={data.reason} onPress={() => navigation.goBack()} />
      ) : (
        <>
          <AppText style={styles.textHeading}>
            <AppText style={[styles.textHeading, styles.textSingle]}>C</AppText>
            OURSE{' '}
            <AppText style={[styles.textHeading, styles.textSingle]}>L</AppText>
            IST
          </AppText>
          <View style={styles.subContainer}>
            <ScrollView
              contentContainerStyle={styles.scrollAre}
              showsVerticalScrollIndicator={false}>
              {/* <ButtonTecher name={"Cse-101"} />
               <ButtonTecher name={"Cse-101"} />
               <ButtonTecher name={"Cse-101"} /> */}
              {dataList.map((item, key) => {
                {
                  console.log(item);
                }
                return (
                  <ButtonTecher
                    key={key}
                    style={styles.buttonTeacher}
                    name={item.course_code}
                    onPress={() =>
                      navigation.navigate('StudentListForTexcher', {
                        course_id: item.course_id,
                      })
                    }
                  />
                );
              })}
            </ScrollView>
          </View>
          <AppButton
            style={styles.button}
            name={'Home'}
            onPress={() => navigation.goBack()}
          />
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
  },
  button: {
    position: 'absolute',
    bottom: hp(2),
  },
  textSingle: {
    fontSize: RFValue(40),
    color: 'rgba(255,20,106,.8)',
  },
  textHeading: {
    color: '#607D8B',
    fontSize: RFValue(30),
    marginVertical: hp(2),
    fontWeight: 'bold',
    // fontFamily: "GillSansUltraBold",
  },
  subContainer: {
    height: hp(75),
    width: wp(100),
  },
  scrollAre: {
    flexGrow: 1,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    height: hp(100),
    width: wp(100),
  },
  buttonTeacher: {
    borderColor: '#00E676',
    borderWidth: 1,
    elevation: 6,
  },
});
export default TeacherAllCourses;
