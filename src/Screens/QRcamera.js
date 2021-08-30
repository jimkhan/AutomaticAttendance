import React, {useState, useEffect} from 'react'
import { View, Text } from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import QRcode from '../Components/QRcode'
import Modal from '../Components/Modal'
import { useRoute } from '@react-navigation/native';


import { AuthContext } from '../Context/context'
import BaseUrl from '../API/BaseUrl'
import axios from 'axios';


const QRcamera = ({ navigation }) => {

    const route = useRoute();
    const { userId, token } = route.params;
    console.log(userId)
    const [isLoading, setIsLoading] = useState(true)
    const [callMissed, setCallMissed] = useState(true)
    const [data, setData] = useState('null');
    const [scanData, setScanData] = useState('');
    const [modal, setModal] = useState(false);
    const [modalDone, setModalDone] = useState(false);
    
    const submitAttendance = (responce)=> {
        var res = responce.data.substring(9, 11)
        typeof(res)

        setModal(true)
        var check = ""
        for(var i in res){
            console.log(res[i])
            check+= res[i]
        }
        setScanData(check)


    }
    const callForAttend = async()=>{

        axios({
            method: 'post',
            url: BaseUrl + 'attendance/',
            headers: {
                'Authorization': `Bearer ${token}`
            }, 
            data: {
                student_id: userId,
                class_id: scanData,
            }
          })

            .then(function (response) {
                const userValue = response.data;
                setData(userValue)
                console.log(userValue)
                console.log("attendance")
                setModal(false)
                setModalDone(true)

            })
            .catch(function (error) {
                console.log(error);
            });

        }

    useEffect(() => {


    }, [modal])
    useEffect(() => {


    }, [modalDone])

    if(modal){
        return(
            <Modal title={"Scan Successful!"} buttonTitle={"Submit"} onPress={callForAttend}  />
        )
    }
    if(modalDone){
        return(
            <Modal title={data.message} buttonTitle={"Home"} onPress={()=> navigation.navigate("StudentHome")} />
        )
    }
    return (
        <QRcode onRead={submitAttendance} />
    )
}

export default QRcamera
