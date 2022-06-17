import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
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

export default function MainButton({navigation}) {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '174475319121-5bu917p6t1nniepo652cmg3vskd9v89b.apps.googleusercontent.com',
      // offlineAccess: false,
    });
  }, []);

  // const isSignedIn = async () => {
  //   console.log('isSignedIn');
  //   const isSignedIn = await GoogleSignin.isSignedIn();
  //   if (!!isSignedIn) {
  //     getCurrentuserInfo();
  //   } else {
  //     console.log('Login First');
  //   }
  // };

  const getCurrentuserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently().then(data => {
        console.log('data', data);
        navigation.navigate('Logout', {userInfo: data.user});
      });
      // console.log('hello', userInfo.user);
      // setuser({userInfo});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('sign first');
        console.log('sign First');
      } else {
        alert(' some other error');
        console.log('some other error');
      }
    }
  };

  const Facebookauto = () => {
    Profile.getCurrentProfile().then(function (currentProfile) {
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

          navigation.navigate('LogoutF', {
            currentProfile: currentProfile,
            email: result.email,
          });
        }
      }
    });
  };

  const GoogleAuto = async () => {
    console.log('isSignedIn');
    const isSignedIn = await GoogleSignin.isSignedIn();

    if (!!isSignedIn) {
      getCurrentuserInfo();
    } else {
      AccessToken.getCurrentAccessToken().then(data => {
        console.log('data', data);
        if (data != null) {
          Facebookauto();
        } else {
          navigation.navigate('Main');
        }
      });
    }
  };
  return (
    <View>
      <TouchableOpacity style={styles.btn} onPress={GoogleAuto}>
        <Text style={styles.btntext}>Google SignIn</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('GoogleAds')}>
        <Text style={styles.btntext}>Google Ads</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#007ACC',
    width: '95%',
    margin: 10,
    borderRadius: 10,
  },
  btntext: {
    textAlign: 'center',
    padding: 15,
    color: 'white',
  },
});
