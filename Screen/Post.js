import React, { useState ,useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Image, ScrollView, TouchableOpacity,Pressable,FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const Post = () => {
  const [inputText, setInputText] = useState('');
  const navigation = useNavigation();
  const [partiesData, setPartiesData] = useState([]);
  
  useEffect(() => {
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
        //console.log('Parties Data:', filteredData);
      } catch (error) {
        //console.error('Error fetching data:', error);
      }
    };

    fetchData();
}, []);
useEffect(() => {
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
      //console.log('Parties Data:', filteredData);
    } catch (error) {
      //console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, );

  
  const handletoJoingroup = (img1,img2,img3,img4,img5,img6,img7,img8,img9,restaurantName,restaurantType,restaurantStar,restaurantDistance,partyName,partyDetail,partyMember,partyDate,partyTime,party_id,partyMem,nameMem,imageMem ) => {
    console.log('JoinGroup');
    navigation.navigate('JoinGroup', {img1,img2,img3,img4,img5,img6,img7,img8,img9,restaurantName,restaurantType,restaurantStar,restaurantDistance,partyName,partyDetail,partyMember,partyDate,partyTime,party_id,partyMem,nameMem,imageMem });
  };

  const renderPartyItem = ({ item }) => {
    const truncatedName = item.position && item.position.length > 16 ? item.position.slice(0, 16) + '...' : item.position;

    if (item.partyMem >= item.people) {
      return null; 
    }
    return (
      <View style={styles.card}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', flex: 1 }}>
          <View style={{ alignItems: 'flex-start' }}>
            <Image style={{ width: 170, height: 137, borderRadius: 10 }}
              resizeMode="cover"
              source={{ uri: item.img1 }}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap', flex: 0.18, paddingLeft: 2 }}>
            {/* <Image
              // style={[styles.mdifireIcon2, styles.mdifireIconLayout]}
              resizeMode="cover"
              source={require("../assets/mdifire.png")}
              // source={{ uri: Array.isArray(item.img1) && item.img1.length > 0 ? item.img1[0] : '' }}
            /> */}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap', flex: 1 }}>
            <Text style={styles.partyName}>{item.nameParty}</Text>
            <Text style={styles.restaurantName}>{truncatedName}</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <Image style={{ marginTop: 5 }}
                contentFit="cover"
                source={require("../assets/star-1.png")} />
              <Text style={styles.detailStar}>{item.star} คะแนน | {item.type}</Text>
            </View>
            <Text style={styles.detail}>{item.distance}</Text>
            <Text style={styles.memberDetail}>สมาชิกปาร์ตี้ ( {item.partyMem}/{item.people} คน )</Text>
            <TouchableOpacity onPress={() => handletoJoingroup(  item.img1, item.img2, item.img3, item.img4,item.img5,item.img6,item.img7,item.img8,item.img9,item.position,
                  item.type,item.star,item.distance,item.nameParty,item.des,item.people,item.date,item.time,item.party_id,item.partyMem,item.nameMem,item.imageMem)} style={styles.parent}>
              <Text style={styles.joinButton}>เข้าร่วม</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };


  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={
        <>
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

          <View style={styles.Search2}>
            <Text style={[styles.textTopic, styles.textPosition2]}>ปาร์ตี้</Text>
          </View>

          <View style={styles.Search}>
            <Icon name="search" size={20} color="#FE502A" style={styles.searchIcon} />
            <TextInput
              style={styles.input}
              onChangeText={setInputText}
              value={inputText}
              placeholder="ค้นหาชื่อปาร์ตี้"
            />
          </View>
        </>
      }
      data={partiesData}
      renderItem={renderPartyItem}
      keyExtractor={(item) => item.party_id}
    />
  );
}

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
  },
  textPosition2: {
    left: "50%",
    position: "absolute",
  },
  textTopic: {
    marginLeft: -37,
    // top: 55,
    fontSize: 32,
    color: '#ff4b10',
    textAlign: "left",
    fontFamily: 'Mitr-Regular',
  },
  Search: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FE502A',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    width: '80%',
    height: 50,
    left: 45,
   
  },
  input: {
    flex: 1,
    fontFamily:'Mitr-Regular',
    // marginTop:-1,
    alignItems:'center',
    // backgroundColor:'pink',
    textAlignVertical:'center',
    alignContent:'center',
  },
  Search2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: 50,
    width: '80%',
    height: 40,
    left: 45
  },
  searchIcon: {
    marginRight: 10,
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
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FEF1EE',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 20,
    width: '90%',
    height: 170,
    left: 20,
  },
  textTypo: {
    position: 'absolute',
    top: 10,
    left: 15,
    color: 'black',
    textAlign: "left",
    fontFamily: 'interRegular',
  },
  starIcon: {
    position: 'absolute',
    top: 33,
    left: 15,
  },
  partyName: {
    fontSize: 16,
    marginTop: -1,
    color: 'black',
    fontFamily: 'Mitr-Regular',
  },
  restaurantName: {
    fontSize: 14,
    margin: 1,
    marginTop:2,
    color: 'black',
    fontFamily: 'Mitr-Regular',
  },
  detail: {
    fontSize: 10,
    margin: 2,
    marginBottom: 2,
    color: 'black',
    fontFamily: 'Mitr-Regular',
  },
  detailStar: {
    fontSize: 10,
    margin: 2,
    marginBottom: 2,
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
  joinButton: {
    fontSize: 13,
    color: '#FF6C3A',
    fontFamily: 'Mitr-Regular',
  },
  parent: {
    borderRadius: 15,
    backgroundColor: '#ffe5dc',
    width: 87,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 11,
    paddingVertical: 4,
  },
});