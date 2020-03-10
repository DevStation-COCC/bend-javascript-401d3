import React, {useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, Button, Linking } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Contacts from 'expo-contacts';



export default function App() {


  const [contacts, setContacts] = useState([]);
  const [permissions, setPermissions] = useState(false);


  const getPermissions = async  () => {

    const { status } = await Permissions.askAsync(Permissions.CONTACTS);
    setPermissions(true);

  }

  const showContacts = async () => {
    const contactList = await Contacts.getContactsAsync();
    const contactsValid = contactList.data.filter( (item) => typeof item.name ==='string')
    console.log(contactsValid);
    // setContacts(contactList.data);
    setContacts(contactsValid);
  }

  const call = contact => {
    let phoneNumber = contact.phoneNumber[0].number.replace(/[\(\)\-\s+]/g, '');
    let link = `tel:${phoneNumber}`;
    Linking.canOpenURL(link)
    .then((supported) => Linking.openURL(link))
    .catch(console.err);
  }


  useEffect( () => {
    getPermissions();
  }, []);

  return (
    <View style={styles.container}>
      <Text>My Cool Contact Page</Text>
      <Button onPress={showContacts} title="Show Contacts" />
    

    <View style={styles.container}>
      <Text>Flat List ...</Text>

      <FlatList 
        data= { contacts }
        keyExtractor = { (item) => item.id}
        renderItem = { ({item}) => <Button title={item.name} style={styles.person} onPress ={() => call(item)} />}
      />
    </View>
    </View>

  );
}

const styles = StyleSheet.create({

  person: {
    marginTop: '1em',
  },



  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    
  },
});
