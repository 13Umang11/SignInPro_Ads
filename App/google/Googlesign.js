import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const App = () => {
  const [user, setuser] = useState({});
  const [email, setemail] = useState();
  const [name, setname] = useState();
  const [pic, setpic] = useState();
  const [Id, setId] = useState();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '174475319121-5bu917p6t1nniepo652cmg3vskd9v89b.apps.googleusercontent.com',
      // offlineAccess: false,
    });
    isSignedIn();
  }, []);
  const signin = async () => {
    try {
      console.log('check');
      const check = await GoogleSignin.hasPlayServices();
      console.log(check);
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      setuser({userInfo});
      console.log(userInfo.user.email);
      setemail(userInfo.user.email);
      console.log(userInfo.user.name);
      setname(userInfo.user.name);
      console.log(userInfo.user.photo);
      setpic(userInfo.user.photo);
      console.log(userInfo.user.id);
      setId(userInfo.user.id);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('user cancelled the login flow', error);
        //
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('operation (e.g. sign in) is in progress already', error);
        //
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        //
        console.log('play services not available or outdated', error);
      } else {
        console.log('some other error happened', error);
      }
    }
  };

  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (!!isSignedIn) {
      getCurrentuserInfo();
    } else {
      console.log('Login First');
    }
  };

  const getCurrentuserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      console.log('hello', user);
      setuser({userInfo});
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

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setuser({user: null});
      console.log('log out complete'); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text style={styles.title}> Google Login</Text>
      <View style={{marginVertical: 20}}>
        <Text style={{fontSize: 13, textAlign: 'center', color: '#000000'}}>
          Welcome To Google Login
        </Text>
      </View>
      <View>
        <Image
          style={{
            height: 80,
            width: 80,
            alignSelf: 'center',
            borderRadius: 100,
          }}
          source={{uri: pic}}
        />
      </View>
      <TextInput
        style={styles.textInput}
        placeholder="ID"
        placeholderTextColor={'#3A3B3C'}
        editable={false}>
        {Id}
      </TextInput>
      <TextInput
        style={styles.textInput}
        placeholder="Name"
        placeholderTextColor={'#3A3B3C'}
        editable={false}>
        {name}
      </TextInput>
      <TextInput
        style={styles.textInput}
        placeholder="Email Id"
        placeholderTextColor={'#3A3B3C'}
        editable={false}>
        {email}
      </TextInput>

      <View style={{marginVertical: 40}}>
        <TouchableOpacity
          onPress={signin}
          style={styles.button}
          pressRetentionOffset={{bottom: 30, left: 20, right: 20, top: 20}}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={{marginVertical: 40}}>
        <TouchableOpacity
          onPress={signOut}
          onPressOut={() => alert('Logout Successfull')}
          style={styles.button1}>
          <Text style={styles.buttonText1}>SignOut</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default App;

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 80,
  },

  textInput: {
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    margin: 10,
    borderRadius: 50,
    padding: 10,
    color: 'black',
  },
  button: {
    backgroundColor: '#FF7F7F',
    textAlign: 'center',
    padding: 15,
    margin: 10,
    borderRadius: 50,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  button1: {
    backgroundColor: '#3B5997',
    textAlign: 'center',
    padding: 15,
    margin: 10,
    borderRadius: 50,
  },
  buttonText1: {
    color: 'white',
    textAlign: 'center',
  },
});
