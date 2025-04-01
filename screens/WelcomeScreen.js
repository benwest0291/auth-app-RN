import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../store/auth-context';

function WelcomeScreen() {
  const [fetchedMessage, setFetchedMessage] = useState('');

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  useEffect(() => {
    axios.get(
      "https://rn-authapp-1503e-default-rtdb.europe-west1.firebasedatabase.app/message.json?auth=" + token
      ).then((response) => {
        setFetchedMessage(response.data);
      }).catch((error) => {
        console.log(error);
      });
  }, [token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text style={styles.fetchedMessage}>{fetchedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  fetchedMessage: {
    fontSize: 16,
    color: 'gray',
    marginTop: 8,
  },
});
