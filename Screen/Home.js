import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CheckBox, Stack } from '@rneui/themed';
import FrameComponent from "./FrameComponent";
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Home = () => {

  const [inputText, setInputText] = useState('');
  const navigation = useNavigation();
  const [partiesData, setPartiesData] = useState([]);
  const [filteredParties, setFilteredParties] = useState([]);

  // checkbox
  const [selectedIndex, setIndex] = React.useState(0);

  const handletoClassthai = () => {
    console.log('Classthai');
    navigation.navigate('ClassThai'); 
  };

  const handletoClassNation = () => {
    console.log('ClassNation');
    navigation.navigate('ClassNation'); 
  };

  const handletoClassCafe = () => {
    console.log('ClassCafe');
    navigation.navigate('ClassCafe'); 
  };

  const handletoClassBreakfast = () => {
    console.log('ClassBreakfast');
    navigation.navigate('ClassBreakfast'); 
  };
  

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
        console.log('Parties Data:', filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
     
    };

    fetchData();
  }, []);

  useEffect(() => {
    // เมื่อ partiesData หรือ inputText เปลี่ยนแปลง
    const filteredParties = partiesData.filter(item =>
      item.nameParty && item.nameParty.toLowerCase().includes(inputText.toLowerCase())
    );
    setFilteredParties(filteredParties);
  }, [partiesData, inputText]);


  const handletoJoingroup = (img1,img2,img3,img4,img5,img6,img7,img8,img9,restaurantName,restaurantType,restaurantStar,restaurantDistance,partyName,partyDetail,partyMember,partyDate,partyTime,party_id,partyMem,nameMem,imageMem ) => {
    console.log('JoinGroup');
    navigation.navigate('JoinGroup', {img1,img2,img3,img4,img5,img6,img7,img8,img9,restaurantName,restaurantType,restaurantStar,restaurantDistance,partyName,partyDetail,partyMember,partyDate,partyTime,party_id,partyMem,nameMem,imageMem });
  };
  const renderPartyItem = ({ item }) => {
    
    const truncatedName = item.position && item.position.length > 16 ? item.position.slice(0, 16) + '...' : item.position;
   
    const isThreeOrMorePeople = selectedIndex === 1 && item.people >= 3;
    const isTwoPeople = selectedIndex === 0 && item.people == 2;
  
    if ((selectedIndex === 0 && !isTwoPeople) || (selectedIndex === 1 && !isThreeOrMorePeople)) {
      return null; // Skip rendering if the checkbox is selected but the condition doesn't match
    }
  
    return(
    <View style={styles.card1}>

    <View style={{ flexDirection: 'row', justifyContent: 'space-around', flex: 1, }}>
      <View style={{ alignItems: 'flex-start' }}>
        <Image style={{ width: 170, height: 137, borderRadius: 10 }}
          resizeMode="cover"
          source={{ uri: item.img1 }}
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap', flex: 0.18, paddingLeft: 2 }}>
        <Image
          // style={[styles.mdifireIcon2, styles.mdifireIconLayout]}

          resizeMode="cover"
          source={require("../assets/mdifire.png")}
          // source={{ uri: Array.isArray(item.img1) && item.img1.length > 0 ? item.img1[0] : '' }}

        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap', flex: 1, }}>
        <Text style={styles.partyName}>{item.nameParty}</Text>
        <Text style={styles.restaurantName}>{truncatedName}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
          <Image style={{ marginTop: 5 }}
            contentFit="cover"
            source={require("../assets/star-1.png")} />
          <Text style={styles.detailStar} >{item.star} คะแนน | {item.type}</Text>
        </View>
        <Text style={styles.detail}>{item.distance}</Text>

        {/* <Text style={styles.detail}>“รักปลารักเขาไม่รักเราเหรอ”</Text> */}
        <Text style={styles.memberDetail}>สมาชิกปาร์ตี้ ( 1/{item.people} คน )</Text>
        <TouchableOpacity onPress={() => handletoJoingroup(  item.img1, item.img2, item.img3, item.img4,item.img5,item.img6,item.img7,item.img8,item.img9,item.position,
                  item.type,item.star,item.distance,item.nameParty,item.partyDetail,item.people,item.date,item.time,item.party_id,item.partyMem,item.nameMem,item.imageMem)} style={styles.parent}>

                <Text style={styles.joinButton} >เข้าร่วม</Text>
       </TouchableOpacity>
      </View>
    </View>
  </View>

  
  );
};
  


  return (
    <ScrollView style={styles.container}>
      <View>
        <View>
          <TouchableOpacity onPress={() => console.log('Go to Profile')}>
            <Image
              style={styles.iconLayout}
              contentFit="cover"
              source={require("../assets/ellipse-46.png")}
            />
          </TouchableOpacity>
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


        <View style={styles.titleclass}>
          <Text style={styles.txtclass}>ร้านอาหารใกล้ฉัน</Text>
        </View>

        {/* checkbox */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 17 }}>
          
          <CheckBox
            title="ทาน 2 คน"
            checked={selectedIndex === 0}
            onPress={() => setIndex(0)}
            checkedIcon="circle"
            uncheckedColor="#FFE5DC"
            uncheckedIcon="circle"
            checkedColor="#FF6C3A"
            size={20}
            textStyle={{ color: '#FF6C3A', fontWeight: 'normal', fontFamily: 'Kanit-Regular', }}
          />
          <CheckBox
            title="ปาร์ตี้ 3 คนขึ้นไป"
            checked={selectedIndex === 1}
            onPress={() => setIndex(1)}
            checkedIcon="circle"
            uncheckedColor="#FFE5DC"
            uncheckedIcon="circle"
            checkedColor="#FF6C3A"
            size={20}
            textStyle={{ color: '#FF6C3A', fontWeight: 'normal', fontFamily: 'Kanit-Regular', }}
          />
        </View>

        <View style={styles.categoryCard}>
          <Text style={[styles.text, styles.textTypo]}>หมวดหมู่</Text>

          <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-around', flex: 1, flexWrap: 'wrap', marginTop: 25 }}>
            {/* row1 */}
            <TouchableOpacity onPress={handletoClassthai}>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <Image
                  resizeMode="cover"
                  source={require("../assets/ellipse-14.png")}
                />
              <Text style={styles.categoryText} >อาหารไทย</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handletoClassNation}>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <Image
                resizeMode="cover"
                source={require("../assets/ellipse-15.png")}
              />
              <Text style={styles.categoryText}>อาหารนานาชาติ</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handletoClassBreakfast}>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <Image
                resizeMode="cover"
                source={require("../assets/ellipse-16.png")}
              />
              <Text style={styles.categoryText}>อาหารเช้า</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handletoClassCafe}>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <Image
                resizeMode="cover"
                source={require("../assets/ellipse-17.png")}
              />
              <Text style={styles.categoryText}>คาเฟ่และขนมหวาน</Text>
            </View>
            </TouchableOpacity>

            {/* row2 */}
            <View style={{ flexDirection: 'column', alignItems: 'center', }}>
              <Image
                resizeMode="cover"
                source={require("../assets/ellipse-183.png")}
              />
              <Text style={styles.categoryText} >อาหารบุฟเฟต์</Text>
            </View>

            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <Image
                resizeMode="cover"
                source={require("../assets/ellipse-194.png")}
              />
              <Text style={styles.categoryText}>อาหารแบนด์ดัง</Text>
            </View>

            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <Image
                resizeMode="cover"
                source={require("../assets/ellipse-201.png")}
              />
              <Text style={styles.categoryText}>อาหารทะเล</Text>
            </View>

            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <Image
                resizeMode="cover"
                source={require("../assets/ellipse-21.png")}
              />
              <Text style={styles.categoryText}>อาหารเพื่อสุขภาพ</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>

          <Text style={[styles.text, styles.textTypo]}>การเชิญชวนแนะนำ</Text>
          <FlatList
         data={filteredParties}
        renderItem={renderPartyItem}
        keyExtractor={(item) => item.
          party_id} // Assuming id is unique
      />

        </View>

      </View>
    </ScrollView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
    
  },
  

  Search: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FE502A',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 60,
    width: '80%',
    height: 50,
    left: 45
  },
  starIcon: {
    height: 11,
    width: 11,
    left: 100,
  },
  text35Position: {
    top: 46,
    left: -1,
    position: "absolute",
  },

  input: {
    flex: 1,
    fontFamily: 'Kanit-Regular',
    // marginTop:-1,
    alignItems:'center',
    // backgroundColor:'pink',
    textAlignVertical:'center',
    alignContent:'center',


  },

  searchIcon: {
    marginRight: 10,
  },
  partyName: {
    fontSize: 16,
    marginTop: -1,
    color: 'black',
    fontFamily: 'Kanit-Regular',
  },
  restaurantName: {
    fontSize: 14,
    margin: 1,
    color: 'black',
    fontFamily: 'Kanit-Regular',
  },
  detail: {
    fontSize: 10,
    margin: 2,
    marginBottom: 2,
    color: 'black',
    fontFamily: 'Kanit-Regular',
  },
  detailStar: {
    fontSize: 10,
    margin: 2,
    marginBottom: 2,
    color: 'black',
    fontFamily: 'Kanit-Regular',
    paddingLeft: 2,

  },
  memberDetail: {
    fontSize: 10,
    margin: 2,
    marginBottom: 7,
    color: '#FF4B10',
    fontFamily: 'Kanit-Regular',

  },
  joinButton: {
    fontSize: 13,
    color: '#FF6C3A',
    fontFamily: 'Kanit-Regular',
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
    fontFamily: 'Kanit-Regular',

  },

  txtclass: {
    color: '#FF6C3A',
    fontFamily: 'Kanit-Regular',
  },
  categoryText: {
    fontSize: 12,
    marginBottom: 10,
    marginTop: 5,
    color: '#FF6C3A',
    fontFamily: 'Kanit-Regular',
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
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FEF1EE',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 0,
    width: '90%',
    height: 270,
    left: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FEF1EE',
    borderRadius: 5,
    paddingTop:22,
    paddingHorizontal: 10,
    marginTop: 10,
    width: '90%',
    height: 'auto',
    left: 20,
    // backgroundColor:'red'
  },

  card1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 16,
    paddingTop:10,
    height: 'auto',

    // backgroundColor:'red'
  },


  textTypo: {
    position: 'absolute',
    top: 10,
    left: 15,
    color: '#FF6C3A',
    textAlign: "left",
    fontFamily: 'Kanit-Regular',
  },

  starIcon: {
    position: 'absolute',
    top: 33,
    left: 15,
  },
  text: {
    fontFamily: 'Kanit-Regular',
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