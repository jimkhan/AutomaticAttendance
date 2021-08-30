import React, {useEffect, useContext, useState} from 'react';
import {ActivityIndicator, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LogInScreen from './src/Screens/LogInScreen';
import RegistrationHomePage from './src/Screens/RegistrationHomePage';
import TeacherAllCourses from './src/Screens/TeacherAllCourses';
import StudentHome from './src/Screens//StudentHome';
import AllCoursesStudent from './src/Screens/AllCoursesStudent';
import StudentCourseDetails from './src/Screens/StudentCourseDetails';
import SuccessReg from './src/Screens/SuccessReg';
import TeacherHome from './src/Screens/TeacherHome';
import QRcodeScan from './src/Screens/QRcodeScan';
import QRcamera from './src/Screens/QRcamera';
import PreHome from './src/Screens/PreHome';
import CreateCourses from './src/Screens/CreateCourses';
import CrateClass from './src/Screens/CrateClass';
import QRcodeForClass from './src/Screens/QRcodeForClass';
import StudentListForTexcher from './src/Screens/StudentListForTexcher';
import Routine from './src/Screens/Routine';

import GlobalState from './src/Context/GlobalState';
import {AuthContext} from './src/Context/context';

const Stack = createStackNavigator();

const AuthStack = ()=>{

  return(
    <Stack.Navigator
    screenOptions={{
            headerShown: false,
          
          }}
    >
    <Stack.Screen name="LogInScreen" component={LogInScreen} />
    <Stack.Screen name="RegistrationHomePage" component={RegistrationHomePage} />
    <Stack.Screen name="SuccessReg" component={SuccessReg} />
  </Stack.Navigator>

  )
  
}

const AppStack = () =>{
  const {loginState} = useContext(AuthContext)
  const routeName = loginState.userType === "teacher" ? TeacherHome : StudentHome;
  return(
    <Stack.Navigator
          initialRouteName={routeName}
          screenOptions={{
            headerShown: false,
          
          }}>
          
          <Stack.Screen name="PreHome" component={PreHome} />
          <Stack.Screen name="TeacherHome" component={TeacherHome} />
          <Stack.Screen name="CrateClass" component={CrateClass} />
          <Stack.Screen name="QRcodeForClass" component={QRcodeForClass} />
          <Stack.Screen name="StudentListForTexcher" component={StudentListForTexcher} />
          <Stack.Screen name="Routine" component={Routine} />
          <Stack.Screen
            name="StudentHome"
            component={StudentHome}
          />
          
          <Stack.Screen
            name="TeacherAllCourses"
            component={TeacherAllCourses}
          />
          <Stack.Screen
            name="CreateCourses"
            component={CreateCourses}
          />
          <Stack.Screen
            name="AllCoursesStudent"
            component={AllCoursesStudent}
          />
          <Stack.Screen
            name="StudentCourseDetails"
            component={StudentCourseDetails}
          />
          
          <Stack.Screen name="QRcodeScan" component={QRcodeScan} />
          <Stack.Screen name="QRcamera" component={QRcamera} />
          
        </Stack.Navigator>

  )
  
}



const App = () => {
  // const jim = useContext(AuthContext);
  // const {loginState} = React.useContext(AuthContext);

  const [val, setVal] = useState(null);
  const [token, setToken] = useState(null);
  const [userType, setuserType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // console.log(AuthContext);



  const checkToken = async () => {
    try {
      const item = await AsyncStorage.getItem('userType');
      console.log(item + "from app");
      setToken(item);

      return item;
    } catch (e) {
      // read error
    }
  };
  //////
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null); 

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const initialLoginState = {
    isLoading: true,
    userId: null,
    userName: null,
    userToken: null,
    userType: null,
  };



  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          userName: action.name,
          userType: action.user,
          isLoading: false,
        };
        case 'LOGIN':
          console.log("Called login")
          // console.log(action.userValue)
          // let Id = String(userValue.id);
          return {
              ...prevState,
              
              userId: action.userValue.id,
              userName: action.userValue.name,
              userEmail: action.userValue.email,
              userToken: action.userValue.access,
              userType: action.userValue.user_type,
              refreshToken: action.userValue.refresh,
              isLoading: false,
          };
      case 'LOGOUT': 
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async (userValue) => {
      // console.log("sign in"+ userValue)
      
      try {
        // console.log(userValue.id);
          await AsyncStorage.setItem('userId', userValue.id.toString());
          await AsyncStorage.setItem('userName', userValue.name);
          await AsyncStorage.setItem('userEmail', userValue.email);
          await AsyncStorage.setItem('userToken', userValue.access);
          await AsyncStorage.setItem('userType', userValue.user_type);
          await AsyncStorage.setItem('refreshToken', userValue.refresh);
          // shopContext.setToken(userToken);
      } catch (e) {
          console.log(e);
      }

      dispatch({ type: 'LOGIN',  userValue });
  },
    signOut: async() => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('userToken');
        
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      // setUserToken('fgkj');
      // setIsLoading(false);
    },
    toggleTheme: () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    },
    loginState,

  }), []);

  useEffect(() => {
    setTimeout(async() => {
      // setIsLoading(false);
      let userToken;
      let userType;
      let userName;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
        userType = await AsyncStorage.getItem('userType');
        userName = await AsyncStorage.getItem('userName');
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken , user: userType, name: userName});
    }, 1000);
  }, []);

  


  //////
  // useEffect(()=>{
    
  //   checkToken();
  //   setTimeout(() => {
  //     setIsLoading(false)
  //     console.log(token + "effect")
  //     token === null ? setVal('LogInScreen'):  setVal('StudentHome') ;
      
  //   }, 1000);


  // },[])

  if(loginState.isLoading){
    return(
      <View style={styles.loader} >
        <ActivityIndicator size="large" color="rgba(255,20,106,.8)" />
      </View>
    )
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
      {
        loginState.userToken !== null ?
        <AppStack/>
        :
        <AuthStack/>
      }
        
      </NavigationContainer>
      </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  loader:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#000000aa'
  }
});

export default App;
