import React, { useState} from 'react'
import { View,  } from 'react-native'

import AppButton from './AppButton'
import Modal from '../Components/Modal'

import { useRoute } from '@react-navigation/native';

import { useNavigation } from '@react-navigation/native';


const AllCoursesCommon = ({  }) => {
    const navigation = useNavigation();
    const route = useRoute();
    const { data, userId} = route.params;
    const [dataList, setDataList] = useState(data.data)


    return (
        <View  >

            {
                data.reason ? <Modal title={data.reason} onPress={()=> navigation.goBack()} />
                
                :
                
             <>

               {
                dataList.map(( item, key) =>{
                    {console.log(item)}
                    return(
                        

                        <AppButton key={key} name={item.course_code} onPress={()=> navigation.navigate("StudentCourseDetails",{data: item, userId})} />
                         
                    )
                })
               }
             </>
            
            }
            
        </View>
    )
}


export default AllCoursesCommon
