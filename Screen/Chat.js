import * as React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, TextInput,FlatList,useState ,useEffect,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import Chatinner from './Chatinner';

function Chat() {
  const [inputText, setInputText] = React.useState('');
  const navigation = useNavigation(); // Using useNavigation hook to get navigation object
  const [partiesData, setPartiesData] = React.useState([]);
  
  
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://feedme-createparty-default-rtdb.asia-southeast1.firebasedatabase.app/user.json');
        if (!response.ok) {
          console.error('Failed to fetch data');
          return;
        }
        const data = await response.json();
        const filteredData = Object.values(data); // Convert object to array
        setPartiesData(filteredData);
        console.log('Parties Data:', filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
     
    };

    fetchData();
  }, []);

  const handletoJoingroup = (img1,img2,img3,img4,img5,img6,img7,img8,img9,restaurantName,restaurantType,restaurantStar,restaurantDistance,partyName,partyDetail,partyMember,partyDate,partyTime,party_id,partyMem,nameMem,imageMem,host ) => {
    console.log('Chat');
    navigation.navigate('Chatinner', {img1,img2,img3,img4,img5,img6,img7,img8,img9,restaurantName,restaurantType,restaurantStar,restaurantDistance,partyName,partyDetail,partyMember,partyDate,partyTime,party_id,partyMem,nameMem,imageMem,host });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handletoJoingroup(  item.img1, item.img2, item.img3, item.img4,item.img5,item.img6,item.img7,item.img8,item.img9,item.position,
      item.type,item.star,item.distance,item.nameParty,item.partyDetail,item.people,item.date,item.time,item.party_id,item.partyMem,item.nameMem,item.imageMem,item.host)}>
      <View style={styles.con}>
        <Image
          style={styles.image}
          contentFit="cover"
          source={{uri: item.img1}}
        />
        <View style={{ width: 263, height: 50, left: 10, top: 3 }}>
          <View style={{ width: 200, height: 30 }}>
            <Text style={styles.text}>{item.nameParty}</Text>
            <Text style={styles.textt}>Hello</Text>
          </View>
          <View style={{ width: 40, height: 20, alignSelf: 'flex-end', position: 'absolute', top: 20 }}>
            <Text>00.00</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <View>
        <TouchableOpacity onPress={() => console.log('Go to Profile')}>
          <Image
            style={styles.iconLayout}
            contentFit="cover"
            source={require("../assets/ellipse-46.png")}
          />
        </TouchableOpacity>
      </View>

      <Text style={{ color: '#FF4B10', fontSize: 32, fontFamily: 'Kanit-Regular', alignSelf: 'center', top: 45 }}>
        แชท
      </Text>
      <View style={styles.Search}>

        <Icon name="search" size={20} color="#FE502A" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          onChangeText={setInputText}
          value={inputText}
          placeholder="ค้นหาบทสนทนา"

        />
      </View>
      <ScrollView>
        <View style={styles.container}>
          <FlatList
            data={partiesData}
            renderItem={renderItem}
            keyExtractor={item => item.party_id}
          />
        </View>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  textt: {
    fontFamily: 'Kanit-Regular'
  },
  text: {
    fontSize: 17, color: 'black',
    fontFamily: 'Kanit-Regular'
  },
  con: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 340,
    marginTop: 20,
    alignSelf:'center',
    left:10
  },
  image: {
    width: 50,
    height: 50,
    borderRadius:100

  },
  iconLayout: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
  Search: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FE502A',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 45,
    width: '85%',
    height: 50,
    left: 32
  },
  input: {
    flex: 1,
    fontFamily: 'Kanit-Regular',
    // marginTop:-1,
    alignItems: 'center',
    // backgroundColor:'pink',
    textAlignVertical: 'center',
    alignContent: 'center',


  },

  searchIcon: {
    marginRight: 10,
  },
})

export default Chat;
