import React, {useState} from 'react'

import AllCoursesCommon from '../Components/AllCoursesCommon'
import Background from '../Components/Background';

const AllCoursesStudent = ({ navigation }) => {

    return (
        <Background source={require('../img/back.png')} >
            <AllCoursesCommon />
        </Background>
    )
}

export default AllCoursesStudent
