import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {  RFValue } from "react-native-responsive-fontsize";
import * as Progress from 'react-native-progress';
import AppText from '../Components/AppText';

const StudentInfo = ({
  name = 'Walid Khan jim',
  email = 'walidkhanjim@gmail.com',
  totalClass ,
  attendIn ,
}) => {
  const [val, setval] = React.useState(0);

  const ratio = (attendIn/totalClass);
  console.log(ratio + "     rati")

  useEffect(() => {
    setTimeout(() => {
      setval(ratio);
    }, 1000);
  }, []);
  return (
    <View style={styles.conatiner}>
   
      <View style={styles.sub}>
        <View>
          <AppText style={styles.text}>Name: {name}</AppText>
        </View>
        <View>
          <AppText style={styles.text}>Email: {email}</AppText>
        </View>
        <View>
          <AppText style={styles.text}>Total Class: {totalClass}</AppText>
        </View>
        <View>
          <AppText style={styles.text}>Total Attend: {attendIn}</AppText>
        </View>
      </View>
      <View style={styles.percent}>
        <Progress.Circle
          size={wp(18)}
          progress={val}
          showsText={true}
          allowFontScaling
          color={'#FF4081'}
          //   borderColor={"#2ECC71"}
          thickness={6}
          //   fill={'#1ABC9C'}
        />
        <AppText style={styles.textSm}>Ratio</AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    minHeight: hp(18),
    width: wp(95),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: wp(3),
    marginBottom: hp(2),
    borderWidth: 1,
    borderColor: "#00E676",
    borderRadius: hp(1),
    elevation: 5,
  },
  sub: {
    width: wp(70),
    alignItems: 'flex-start',
    elevation: 5,
  },
  percent: {
    // flex: 2,
    margin: 1,
    // backgroundColor: "green",
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
      color: '#546E7A',
       fontSize: RFValue(17)
    },
    textSm: {
      color: '#546E7A',
       fontSize: 18,
       marginTop: 2,
    },
});

export default StudentInfo;
