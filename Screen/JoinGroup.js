import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { database } from '@react-native-firebase/database';
import { useNavigationState } from '@react-navigation/native';
// import CardComponent from '../Component/Card'
import userData from '../User.json'
import { push, ref, set, get, update } from "firebase/database";
import { db } from '../comp/config'
import FastImage from 'react-native-fast-image';
import Map from './Map';

const JoinGroup = ({ route, navigation }) => {

  // const [name, setName] = useState('code with Nilz');
  const [inputText, setInputText] = useState('');
  // const navigation = useNavigation();
  const [partiesData, setPartiesData] = useState([]);
  var user = Object.values(userData);
  const [nid, setnId] = React.useState(0);
  const [nid1, setnId1] = React.useState(1);
  const {
    img1, img2, img3, img4, img5, img6, img7, img8, img9,
    restaurantName,
    restaurantType,
    restaurantStar,
    restaurantDistance,
    partyName,
    partyDetail,
    partyMember,
    partyDate,
    partyTime,
    party_id,
    partyMem
  } = route.params;
  const [selectedImage, setSelectedImage] = useState(null);
  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];
  const [members, setMembers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://feedme-createparty-default-rtdb.asia-southeast1.firebasedatabase.app/Member.json');
        if (!response.ok) {
          console.error('Failed to fetch data');
          return;
        }
        const data = await response.json();
        const filteredMembers = Object.values(data).filter(member => member.party_id === party_id);
        setMembers(filteredMembers);
        console.log('Filtered Members:', filteredMembers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [party_id]);

  const renderMemberItem = ({ item }) => (
    <View style={styles.card2}>
      <Image style={{ height: 100, width: 100, borderRadius: 100, borderColor: '#FF6C3A', borderWidth: 1 }} source={{ uri: item.imageMem }} />
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 7 }}>
        <Text style={styles.memberName}>{item.nameMem} ({item.role})</Text>
      </View>
    </View>
  );
  const handleCreateParty = () => {
    console.log('Create Party');
  };

  const handleGoBack = () => {
    navigation.goBack();
  };
  const datajson = require('../User.json');
  React.useEffect(() => {
    const countItems = async () => {
      const dbRef = ref(db, 'Member');
      try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const count = Object.keys(data).length;
          const countmem = partyMem;
          setnId1(countmem);
          setnId(count);
          console.log('Total number of Member:', count);
        } else {
          console.log('No data available');
          setnId(0);
        }
      } catch (error) {
        console.error('Error getting data:', error);
        setnId(-1);
      }
    };

    countItems();
  }, ); // ใส่ [] เพื่อให้ useEffect ทำงานเพียงครั้งเดียวตอนเริ่มต้นแอพพลิเคชัน



  console.log('nid1:', nid);

  function createmem() {
    // const newKey = push(child(ref(database),'users')).key;
    const newwId = nid + 1;
    set(ref(db, 'Member/' + 'Id' + newwId), {
      nameMem: datajson.name,
      imageMem: datajson.image,
      party_id: party_id,
      role: "Member"

    }).then(() => {
      setnId(newwId);

    })
      .catch((error) => {
        Alert(error);

      });
  }

  function creatememparty() {
    // const newKey = push(child(ref(database),'users')).key;

    const newwId = party_id;
    const eiei = nid1 + 1;
    update(ref(db, 'user/' + 'Id' + newwId), {
      partyMem: eiei

    }).then(() => {
      setnId1(eiei);

    })
      .catch((error) => {
        Alert(error);

      });
  }

  const sendLocation = () => { // Corrected function name
    console.log('Location');
    navigation.navigate('Map');
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <View>
          <TouchableOpacity onPress={handleGoBack}>
            <Image
              style={styles.iconBack}
              contentFit="cover"
              source={require("../assets/epback.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => console.log('Go to Profile')}>
            <Image
              style={styles.iconLayout}
              contentFit="cover"
              source={require("../assets/ellipse-46.png")}
            />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, }}>
          {/* ภาพร้านอาหาร */}
          <View style={{ width: 393 }}>
            <View style={{ flexDirection: 'row', marginTop: 65, height: 174, }}>
              <Image
                style={[styles.item, styles.itemLayout]}
                resizeMode="cover"
                source={{ uri: selectedImage || img1 }}
              />
            </View>
            <FlatList
              data={images}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => setSelectedImage(item)}>
                  <View style={{ flexDirection: 'row', alignItems: 'center',height: 55 , marginRight: 4}}>
                    <FastImage
                      style={[styles.inner]}
                      resizeMode={FastImage.resizeMode.cover}
                      source={{ uri: item }}
                    />
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
              horizontal={true}
              contentContainerStyle={{
                paddingHorizontal: 26,
                paddingVertical: 6,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', flex: 1, marginTop: 20, paddingHorizontal: 24, marginLeft: 5, margin: 5 }}>
          <View style={{ flexDirection: 'column', alignItems: 'flex-start', flexWrap: 'wrap', flex: 1, }}>

            <Text style={styles.restaurantName}>{restaurantName} </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
              <Image style={{ marginTop: 3 }}
                contentFit="cover"
                source={require("../assets/star-1.png")} />
              <Text style={styles.detailStar} >{restaurantStar} คะแนน | {restaurantType}</Text>
            </View>
            <Text style={styles.detail}>{restaurantDistance}</Text>

            <Text style={styles.showReview}>Show review</Text>


          </View>
          <View style={{ justifyContent: 'center', }}>
            <TouchableOpacity onPress={sendLocation}>
              <Image
                style={[styles.rectangleIcon1]}
                resizeMode="cover"
                source={require("../assets/rectangle.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={sendLocation}>
              <Text style={styles.showMap}>Show map</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <View style={{ flexDirection: 'column', alignItems: 'flex-start', flexWrap: 'wrap', flex: 1, }}>

            <Text style={styles.partyName}>{partyName}</Text>
            <Text style={styles.caption}>{partyDetail}</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
              <Image
                style={{ marginTop: 3 }}
                resizeMode="cover"
                source={require("../assets/linemdaccount.png")}
              />
              <Text style={styles.memberDetail} >สมาชิกปาร์ตี้ ( {partyMem}/{partyMember} คน )</Text>
            </View>
            <Text style={styles.timeTopic}>ช่วงเวลานัดหมาย</Text>

            <Text style={styles.timeDetail}>วันที่ {partyDate}</Text>
            <Text style={styles.timeDetail}>เวลา {partyTime} น.</Text>
          </View>
          <View style={{ justifyContent: 'center', }}>
            <TouchableOpacity style={styles.parent}
              onPress={() => {
                console.log({ party_id });
                createmem({ party_id });
                creatememparty();
                navigation.navigate('Post');
              }}
            >
              <Text style={styles.joinButton} >เข้าร่วม</Text>

            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1, justifyContent: 'flex-start', marginHorizontal: 24, marginTop: 15, marginBottom: 10 }}>
            <Text style={styles.membertopic}>รายชื่อสมาชิก</Text>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-around',marginLeft:21,}}>    
          <FlatList
            data={members}
            renderItem={renderMemberItem}
            keyExtractor={(item) => item.party_id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          //inverted
          />

          {/* console.log('name: ', userData.name);
      console.log('img: ', userData.image); */}

          {/* <CardComponent name={userData.name} image={userData.image}/> */}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default JoinGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
  },
  membertopic: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Mitr-Regular',
  },
  memberName: {
    fontSize: 13,
    color: 'black',
    fontFamily: 'Mitr-Regular',
  },
  partyName: {
    fontSize: 32,
    marginTop: -5,
    color: 'black',
    fontFamily: 'Mitr-Regular',
  },
  joinButton: {
    fontSize: 13,
    color: '#FFFFFF',
    fontFamily: 'Mitr-Regular',
  },
  parent: {
    borderRadius: 15,
    backgroundColor: '#FF8259',
    width: 99,
    height: 29,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 11,
    paddingVertical: 4,
  },

  restaurantName: {
    fontSize: 16,
    margin: 1,
    color: 'black',
    fontFamily: 'Mitr-Regular',
  },
  detail: {
    fontSize: 10,
    margin: 2,
    marginBottom: 1,
    color: 'black',
    fontFamily: 'Mitr-Regular',
  },
  timeTopic: {
    fontSize: 13,
    margin: 2,
    marginBottom: 2,
    color: 'black',
    fontFamily: 'Mitr-Regular',
  },
  showMap: {
    fontSize: 10,
    margin: 2,
    marginBottom: 2,
    color: '#F24E1E',
    fontFamily: 'Mitr-Regular',
    textAlign: 'right'
  },
  showReview: {
    fontSize: 10,
    margin: 2,
    marginBottom: 2,
    color: '#F24E1E',
    fontFamily: 'Mitr-Regular',
  },
  timeDetail: {
    fontSize: 13,
    margin: 2,
    marginBottom: 2,
    color: '#5E5E5E',
    fontFamily: 'Mitr-Regular',
  },
  caption: {
    fontSize: 15,
    margin: 2,
    marginBottom: 2,
    color: '#5E5E5E',
    fontFamily: 'Mitr-Regular',
  },
  detailStar: {
    fontSize: 10,
    marginBottom: 1,
    color: 'black',
    fontFamily: 'Mitr-Regular',
    paddingLeft: 2,

  },
  memberDetail: {
    fontSize: 10,
    margin: 2,
    marginBottom: 7,
    color: '#FF4B10',
    fontFamily: 'Mitr-Regular',

  },
  rectangleIcon1: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 206,
    height: 60,
    borderRadius: 6,
  },

  Search: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FE502A',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 60,
    width: '80%',
    height: 40,
    left: 45
  },
  inner2: {


    width: 20,
    height: 49,
  },
  input: {
    flex: 1,
  },


  item: {
    // top: 75,
    width: 363,
    height: 174,
    left: 30,
    borderRadius: 6
  },

  titleclass: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFE5DC',
    borderRadius: 50,
    paddingHorizontal: 10,
    marginTop: 20,
    width: '80%',
    height: 40,
    left: 45,
    backgroundColor: '#FFE5DC',


  },
  childLayout1: {
    height: 49,
    top: 256,
    borderRadius: 6,
    position: "absolute",
  },

  txtclass: {
    color: '#FF6C3A',
    fontFamily: 'Mitr-Regular',
  },

  iconLayout: {
    position: 'absolute',
    top: 10,
    right: 20,
  },

  iconBack: {
    position: 'absolute',
    top: 10,
    left: 20,
  },

  card: {
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FEF1EE',
    borderRadius: 21,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
    height: 195,
    width: '90%',
    left: 20,
  },

  card2: {
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FEF1EE',
    borderRadius: 21,
    paddingTop: 10,
    marginTop: 10,
    height: 152,
    width: 162,


  },

  createpartyBT: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFE5DC',
    borderRadius: 50,
    paddingHorizontal: 10,
    marginTop: 20,
    width: '40%',
    height: 40,
    backgroundColor: '#FFE5DC'
  },

  txtcreatepartyBT: {
    color: '#FF6C3A',
    fontFamily: 'Inter'
  },

  textTypo: {
    position: 'absolute',
    top: 10,
    left: 15,
    color: 'black',
    textAlign: "left",
    fontFamily: 'interRegular',
  },
  inner: {
    width: 53,
    height: 49,
    borderRadius: 6
    // top: 80,
    // left: 38,
  },

  starIcon: {
    position: 'absolute',
    top: 33,
    left: 15,
  },

  text1: {
    position: 'absolute',
    top: 30,
    left: 30,
    color: 'black',
    textAlign: "left",
    fontFamily: 'interRegular',
    fontSize: 12,
    color: 'Black'
  },

  text2: {
    position: 'absolute',
    top: 48,
    left: 15,
    color: 'black',
    textAlign: "left",
    fontFamily: 'interRegular',
    fontSize: 12,
    color: 'Black'
  },

  frameItem: {
    position: 'absolute',
    top: 70,
    left: 15,
  },

  frameItem2: {
    position: 'absolute',
    top: 70,
    left: 150,
  },

  frameItem3: {
    position: 'absolute',
    top: 70,
    left: 285,
    height: 175,
    width: 364,
    borderRadius: 5
  },

});