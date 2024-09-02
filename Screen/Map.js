import { StyleSheet, View} from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import MapView, { Marker } from 'react-native-maps'

const Map = () => {
  const [items, setItems] = useState([])
  const mapRef = useRef(null)

  useEffect(() => {
    fetch('https://pantira111.github.io/FeedmeApi/restaurant.json')
      .then(res => res.json())
      .then((result) => {
        setItems(result);
        if (mapRef.current && result.length > 0) {
          mapRef.current.animateToRegion({
            latitude: result[0].latitude,
            longitude: result[0].longitude,
            latitudeDelta: 0.000922,
            longitudeDelta: 0.000421,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={styles.map}
        // Set initialRegion to center of Bangkok as a fallback
        initialRegion={{
          latitude: 13.742467,
          longitude: 100.522484,
          latitudeDelta: 0.000922,
          longitudeDelta: 0.000421,
        }}
      >
        <Marker
          coordinate={{
            latitude: 13.742467, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
            longitude: 100.522484, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
          }}
        />
        <Marker
          coordinate={{
            latitude: 13.721646, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
            longitude: 100.546074, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
          }}
        />
        <Marker
          coordinate={{
            latitude: 13.865158, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
            longitude: 100.617824, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
          }}
        />
        <Marker
          coordinate={{
            latitude: 13.864792, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
            longitude: 100.643831, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
          }}
        />
        <Marker
          coordinate={{
            latitude: 13.862816, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
            longitude: 100.614658, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
          }}
        />
        <Marker
          coordinate={{
            latitude: 13.849094, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
            longitude: 100.638039, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
          }}
        />
        <Marker
          coordinate={{
            latitude: 13.857417, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
            longitude: 100.641152, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
          }}
        />
        <Marker
          coordinate={{
            latitude: 13.880902, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
            longitude: 100.59963, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
          }}
        />
        <Marker
          coordinate={{
            latitude: 13.877466, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
            longitude: 100.620154, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
          }}
        />
        <Marker
          coordinate={{
            latitude: 13.723826, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
            longitude: 100.587993, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
          }}
        />
        <Marker
          coordinate={{
            latitude: 13.723826, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
            longitude: 100.587993, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
          }}
        />
        <Marker
          coordinate={{
            latitude: 13.868374, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
            longitude: 100.619047, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
          }}
        />
        <Marker
          coordinate={{
            latitude: 13.857836, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
            longitude: 100.644851, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
          }}
        />
        <Marker
          coordinate={{
            latitude: 13.874433, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
            longitude: 100.579716, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
          }}
        />
        <Marker
          coordinate={{
            latitude: 13.748384, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
            longitude: 100.583907, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
          }}
        />
        <Marker
          coordinate={{
            latitude: 13.870548, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
            longitude: 100.605528, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
          }}
        />
        <Marker
          coordinate={{
            latitude: 13.867853, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
            longitude: 100.653687, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
          }}
        />
        <Marker
          coordinate={{
            latitude: 13.86273, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
            longitude: 100.643234, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
          }}
        />
        <Marker
          coordinate={{
            latitude: 13.878269, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
            longitude: 100.632368, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
          }}
        />
        <Marker
          coordinate={{
            latitude: 13.810554, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
            longitude: 100.537195, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
          }}
        />
        <Marker
          coordinate={{
            latitude: 13.811231, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
            longitude: 100.663739, // ใช้ค่าเริ่มต้นหากข้อมูลไม่ถูกต้อง
          }}
        />
      </MapView>
    </View>
  )
}

export default Map

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  listView: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 10,
  },
});