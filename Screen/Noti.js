import * as React from 'react';
import { Text, View } from 'react-native';

function Noti({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text onPress={() => navigation.navigate('Home')}>Noti Hi!</Text>
    </View>
  );
}

export default Noti;
