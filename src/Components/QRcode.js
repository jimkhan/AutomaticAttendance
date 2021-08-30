import React from 'react'
import { View, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import QRCodeScanner from 'react-native-qrcode-scanner';
const QRcode = ({ onRead }) => {

    return (
        <View style={styles.main}>

            <QRCodeScanner
                onRead={onRead}
                cameraStyle={styles.qr}
                containerStyle={styles.container}
            />
            
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    main: {
        flex: 1,
    },
    footer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    qr: {
        width: wp("100%"),
        height: hp("95%"),
        overflow: 'hidden',
        // zIndex: 0,
    },

});

export default QRcode
