import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

const ClassBreakfast = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [restaurantData, setRestaurantData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('https://pantira111.github.io/FeedmeApi/restaurant.json')
      .then(response => response.json())
      .then(data => {
        const breakfastRestaurants = data[0].filter(restaurant => restaurant.type === 'อาหารเช้า');
        setRestaurantData(breakfastRestaurants);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setLoading(false);
      });
  }, []);

  const handleCreateParty = (restaurantName, restaurantImages,restaurantType,restaurantStar,restaurantDistance,img1,img2,img3,img4,img5,img6,img7,img8,img9,img10) => {
    console.log('Create Party');
    navigation.navigate('CreateParty', { restaurantName, restaurantImages,restaurantType,restaurantStar,restaurantDistance,img1,img2,img3,img4,img5,img6,img7,img8,img9,img10 });
  };
  const handleGoBack = () => {
    navigation.goBack();
  };

  const renderItem = ({ item, index }) => {
    const truncatedName = item.name.length > 50 ? item.name.slice(0, 50) + '...' : item.name;

    return (
      <View style={styles.card} key={index}>
        <Text style={[styles.textTypo]}>{truncatedName}</Text>
        <Image style={styles.starIcon} resizeMode="cover" source={require("../assets/star-1.png")} />
        <Text style={styles.text1}>{item.star} คะแนน | {item.type}</Text>
        <Text style={styles.text2}>{item.distance}</Text>
        <FlatList
          horizontal
          data={[item.image2, item.image3, item.image4, item.image5, item.image6]}
          keyExtractor={(imageUri, index) => index.toString()}
          renderItem={({ item }) => (
            <FastImage source={{ uri: item }} style={styles.image} resizeMode={FastImage.resizeMode.cover} />
          )}
        />

<TouchableOpacity style={styles.createpartyBT} onPress={() => handleCreateParty(item.name, [item.image2, item.image3, item.image4, item.image5, item.image6,item.image7,item.image8,item.image9,item.image10],item.type,item.star,item.distance,item.image,item.image2,item.image3,item.image4,item.image5,item.image6,item.image7,item.image8,item.image9,item.image10)}>
  <Text style={styles.txtcreatepartyBT}>สร้างปาร์ตี้</Text>
</TouchableOpacity>
      </View>
    );
  };

  const renderEmpty = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#FF8259" />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );

  const getFilteredRestaurants = () => {
    return restaurantData.filter(restaurant =>
      restaurant.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  };

  const filteredRestaurants = getFilteredRestaurants();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack}>
        <Image
          style={styles.iconBack}
          source={require("../assets/epback.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => console.log('Go to Profile')}>
        <Image
          style={styles.iconLayout}
          source={require("../assets/ellipse-46.png")}
        />
      </TouchableOpacity>

      <View style={styles.Search}>
        <Icon name="search" size={20} color="#FE502A" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          onChangeText={setSearchKeyword}
          value={searchKeyword}
          placeholder="ค้นหาร้านอาหาร..."
        />
      </View>

      <View style={styles.titleclass}>
        <Text style={styles.txtclass}>อาหารเช้า</Text>
      </View>

      {loading ? (
        renderEmpty()
      ) : (
        <FlatList
          data={filteredRestaurants}
          keyExtractor={(item, id) => id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={renderEmpty}
        />
      )}
    </View>
  );
}

export default ClassBreakfast;

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

  input: {
    flex: 1,
    fontFamily: 'Kanit-Light',
    fontSize: 15,
  },

  searchIcon: {
    marginRight: 10,
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
    marginBottom: 10,
  },

  txtclass: {
    color: '#FF6C3A',
    fontFamily: 'Kanit-Light',
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
    height: 250,
    left: 20,
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
    fontFamily: 'Kanit-Light'
  },

  textTypo: {
    position: 'absolute',
    top: 9,
    left: 15,
    color: 'black',
    textAlign: "left",
    fontFamily: 'Kanit-Light',
    fontSize: 16,
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
    fontFamily: 'Kanit-Light',
    fontSize: 12,
    color: 'Black'
  },

  text2: {
    position: 'absolute',
    top: 48,
    left: 15,
    color: 'black',
    textAlign: "left",
    fontFamily: 'Kanit-Light',
    fontSize: 12,
    color: 'Black'
  },

  image: {
    width: 110,
    height: 110,
    borderRadius: 5,
    margin: 5,
    marginTop: 15,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 10,
    fontFamily: 'Kanit-Light',
    fontSize: 16,
  },
});
