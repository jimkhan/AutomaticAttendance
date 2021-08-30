import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Routine = () => {
  return (
    <View style={styles.container}>
      <ImageZoom
        cropWidth={wp(100)}
        cropHeight={hp(100)}
        imageWidth={wp(100)}
        imageHeight={wp(100)}
        >
        <Image
          style={{width: wp(100), height: wp(80)}}
          resizeMode={"center"}
          source={require('../img/routine.jpg')}
        />
      </ImageZoom>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderStartColor: "#000000aa",
  },
});

export default Routine;
