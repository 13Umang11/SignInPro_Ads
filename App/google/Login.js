import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {login, userPic, lock} from './assets/index';
import {
  LoginManager, //custom button
  LoginButton, // default button
  AccessToken,
  Settings, // this is for mutltipul User Id's
  Profile,
  GraphRequest,
  GraphRequestManager,
  UserData,
} from 'react-native-fbsdk-next';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation, route}) => {
  const [username, onusername] = useState();
  const [Password, onpassword] = useState();
  const [user, setuser] = useState({});
  const [loginf, setloginf] = useState(true);
  const [name, setname] = useState();
  const [pic, setpic] = useState();
  const [Id, setId] = useState();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '174475319121-5bu917p6t1nniepo652cmg3vskd9v89b.apps.googleusercontent.com',
      // offlineAccess: false,
    });
  }, []);

  const signin = async () => {
    try {
      console.log('check');
      const check = await GoogleSignin.hasPlayServices();
      console.log(check);
      const userInfo = await GoogleSignin.signIn().then(data => {
        navigation.replace('Logout', {userInfo: data.user});
      });
      console.log(userInfo);
    } catch (error) {
      alert(e);
      // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      //   console.log('user cancelled the login flow', error);
      //   //
      // } else if (error.code === statusCodes.IN_PROGRESS) {
      //   console.log('operation (e.g. sign in) is in progress already', error);
      //   //
      // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      //   //
      //   console.log('play services not available or outdated', error);
      // } else {
      //   console.log('some other error happened', error);
      // }
    }
  };

  const storeData = async (currentProfile, result) => {
    console.log(currentProfile.userID);
    console.log(result);
    try {
      await AsyncStorage.setItem('userID', currentProfile.userID);
      await AsyncStorage.setItem('imageURL', currentProfile.imageURL);
      await AsyncStorage.setItem('name', currentProfile.name);
      await AsyncStorage.setItem('email', result.email).then(() => {
        navigation.replace('LogoutF');
      });
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  const LoginUser = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.grantedPermissions) {
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
          const currentProfile = Profile.getCurrentProfile().then(function (
            currentProfile,
          ) {
            AccessToken.getCurrentAccessToken().then(data => {
              const Info = new GraphRequest(
                '/me',
                {
                  parameters: {
                    fields: {
                      string: 'email',
                    },
                  },
                },
                responseInfoCallback,
              );
              new GraphRequestManager().addRequest(Info).start();
              console.log('data', data);
            });

            function responseInfoCallback(error, result) {
              if (error) {
                console.log('Error fetching data: ' + JSON.stringify(error));
              } else {
                console.log('Success fetching data: ' + result.email);
                if (currentProfile != null && result != null) {
                  storeData(currentProfile, result);
                  // navigation.navigate('LogoutF');
                } else if (result != null) {
                  navigation.replace('LogoutF');
                }
              }
            }
          });
          console.log('currentProfile', currentProfile);
        } else {
          console.log('Login cancelled');
        }
      },

      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  return (
    <ScrollView style={{flexGrow: 1}} keyboardShouldPersistTaps="always">
      <View style={{flex: 1}}>
        <Image
          style={{height: 220, width: 220, alignSelf: 'center', margin: 12}}
          source={login}
        />
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.text}>Log into your existant account</Text>
        <View>
          <Image
            style={[styles.image, {position: 'absolute', left: 20, top: 43}]}
            source={userPic}
          />
          <TextInput
            style={[styles.textinput, {marginVertical: 30}]}
            placeholder="Username"
            keyboardType="email-address"
            onChangeText={onusername}
            value={username}></TextInput>
        </View>
        <View>
          <Image
            style={[styles.image, {position: 'absolute', left: 20, top: 23}]}
            source={lock}
          />
          <TextInput
            style={[styles.textinput, {marginVertical: 10}]}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={onpassword}
            value={Password}></TextInput>
        </View>
        <Pressable onPress={null}>
          <Text style={styles.forgot}>Forgot Password</Text>
        </Pressable>
        <TouchableOpacity style={[styles.btn]}>
          <Text style={styles.btntext}>LOG IN</Text>
        </TouchableOpacity>
        <Text style={{textAlign: 'center', marginTop: 30}}>
          Or connect using
        </Text>
        <View style={{flexDirection: 'row', marginLeft: 40}}>
          <TouchableOpacity
            onPress={signin}
            style={[styles.btn, {backgroundColor: '#FF7F7F'}]}>
            <Text style={styles.btntext}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={LoginUser}
            style={[styles.btn, {backgroundColor: '#6849ab'}]}>
            <Text style={styles.btntext}>FaceBook</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
export default Login;

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 23,
    color: 'black',
    fontStyle: 'italic',
    margin: 10,
  },
  text: {
    textAlign: 'center',
  },
  textinput: {
    width: 340,
    borderWidth: 1,
    margin: 10,

    borderRadius: 50,
    paddingLeft: 40,
  },
  image: {
    height: 24,
    width: 24,
  },
  forgot: {
    textAlign: 'right',
    margin: 10,
    color: 'blue',
  },
  btntext: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  btn: {
    margin: 10,
    backgroundColor: '#3248a1',
    width: 120,
    alignSelf: 'center',
    borderRadius: 20,
  },
});
