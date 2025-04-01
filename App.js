import { Pressable, Text, View } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import { IconButton } from './components/ui/IconButton';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <Pressable onPress={authCtx.logout}>
              <View>
                <Text style={{ color: tintColor }} >Logout</Text>
              </View>
            </Pressable>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
      <NavigationContainer>
        {!authCtx.isAuthenticated && <AuthStack /> }
        {authCtx.isAuthenticated && <AuthenticatedStack />}
      </NavigationContainer>
  );
}

export default function App() {

function Root() {
  // This component is responsible for loading the token from AsyncStorage
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
     // Load the token from AsyncStorage when the component mounts
     const loadToken = async () => {
       const storedToken = await AsyncStorage.getItem("token");

       // If a token is found, authenticate the user
       // This will set the token in the context and update the UI
       if (storedToken) {
          authCtx.authenticate(storedToken);
       }

       setIsLoading(false);
     };

     loadToken();
   }, []);

   if (isLoading) {
     // While loading, you can show a splash screen or a loading indicator
     return <AppLoading />;
   }

   return <Navigation />;
  }

  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
         <Root />
      </AuthContextProvider>
    </>
  );
}
