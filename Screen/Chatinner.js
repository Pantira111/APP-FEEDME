import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, TextInput, ScrollView, KeyboardAvoidingView, Modal, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Map from './Map';

const Chatinner = () => {

    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false); // เพิ่มสถานะ modalVisible เพื่อเปิดและปิด Modal

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleConfirmation = () => {
        // Handle confirmation logic here
    };

    const handleCancel = () => {
        // Handle cancel logic here
    };

    const [chatHistory, setChatHistory] = useState([]); // เก็บประวัติการแชท

    const [inputText, setInputText] = useState('');

    const handleSend = () => {
        if (inputText.trim() === '') return;
        const newMessage = { id: chatHistory.length, text: inputText }; // สร้างข้อความใหม่
        setChatHistory([...chatHistory, newMessage]); // เพิ่มข้อความใหม่เข้าไปในประวัติการแชท
        setInputText('');
    };

    const renderMessageItem = ({ item }) => (
        <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{item.text}</Text>
        </View>
    );

    const sendLocation = () => { // Corrected function name
        console.log('Location');
        navigation.navigate('Map');
      };

    return (
        <KeyboardAvoidingView style={{ backgroundColor: '#FFFFFF', flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <LinearGradient
                colors={['#FF7336', '#FFFFFF']}
                style={{ flex: 0.8 }}
            />
            <TouchableOpacity onPress={handleGoBack}>
                <Image
                    style={styles.iconBack}
                    resizeMode="cover"
                    source={require("../assets/makiarrow.png")}
                />
            </TouchableOpacity>

            <Image
                style={styles.ellipseIcon}
                resizeMode="cover"
                source={require("../assets/ellipse-184.png")} />
            <Text style={styles.text4}>ตี๋น้อยปาร์ตี้</Text>
            <Text style={styles.text5}>กำลังใช้งาน</Text>
            <Text style={styles.textFlexBox}>สุกี้ตี๋น้อย เกษตร-นวมินทร์</Text>
            <Image
                style={styles.starIcon}
                resizeMode="cover"
                source={require("../assets/star-11.png")} />
            <Text style={styles.textstar}>5.0 (500) | อาหารไทย</Text>

            <Text style={styles.km}>500 km (40 นาที)</Text>
            <Text style={styles.textmember}>จำนวนสมาชิก 3 (คน)</Text>
            <Text style={styles.texthost}>น้องแทไม่ชอบคนทางซ้าย (Host)</Text>
            <Image
                style={styles.hostIcon}
                resizeMode="cover"
                source={require("../assets/bxscrown.png")} />

            <Text style={styles.hosttime}>วันที่นัดหมาย : 11/03/2024 เวลา : 15:00 น.</Text>
            <Text style={styles.textconfirm}>ยืนยันการนัดพบ</Text>

            <TouchableOpacity onPress={handleConfirmation} style={styles.buttonConfirm}>
                <Text style={styles.buttonText}>ยืนยัน</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCancel} style={styles.buttonCancel}>
                <Text style={styles.buttonText}>ยกเลิก</Text>
            </TouchableOpacity>

            <View style={styles.container}>
                <FlatList
                    data={chatHistory} // ใช้ chatHistory แทน messages
                    renderItem={renderMessageItem}
                    keyExtractor={(item) => item.id.toString()}
                    style={styles.messagesList}
                    inverted={false}
                />
                <View style={styles.inputContainer}>

                    <View>
                        <TouchableOpacity style={styles.iconButton} onPress={handleOpenModal}>
                            <Icon name="plus" size={20} color='#FF872E' />
                        </TouchableOpacity>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={handleCloseModal}
                        >
                            <TouchableOpacity style={styles.modalOverlay} onPress={handleCloseModal}>
                                <View style={styles.modalContainer}>
                                    <View style={styles.modalContent}>
                                        <TouchableOpacity style={[styles.modalButton, styles.locationButton]} onPress={sendLocation}>
                                            <Icon name="location-arrow" size={20} color='#FFFFFF' marginRight={9} />
                                            <Text style={styles.locationText}>สถานที่</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Modal>
                    </View>

                    <TouchableOpacity style={styles.iconButton}>
                        <Icon name="camera" size={20} color='#FF872E' />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.textInput}
                        placeholder="พิมพ์..."
                        placeholderTextColor="#FF872E"
                        value={inputText}
                        onChangeText={(text) => setInputText(text)}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                        <Icon name="send" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Chatinner;

const styles = StyleSheet.create({
    iconBack: {
        position: 'absolute',
        top: -290,
        left: 20,
        width: 30,
        height: 30,
    },
    ellipseIcon: {
        position: 'absolute',
        top: 40,
        left: 70,
        width: 50,
        height: 50,
    },
    text4: {
        position: 'absolute',
        marginTop: 40,
        marginLeft: 130,
        fontSize: 20,
        fontFamily: 'Kanit-Bold',
        color: 'white'
    },
    text5: {
        position: 'absolute',
        marginTop: 65,
        marginLeft: 130,
        fontSize: 14,
        fontFamily: 'Kanit-Light',
        color: 'green'
    },
    textFlexBox: {
        position: 'absolute',
        marginTop: 100,
        marginLeft: 70,
        fontSize: 14,
        fontFamily: 'Kanit-Regular',
        color: 'black'
    },
    starIcon: {
        position: 'absolute',
        marginTop: 123,
        marginLeft: 70,
        width: 12,
        height: 12,
    },
    textstar: {
        position: 'absolute',
        marginTop: 120,
        marginLeft: 85,
        fontSize: 12,
        fontFamily: 'Kanit-Light',
    },
    km: {
        position: 'absolute',
        marginTop: 135,
        marginLeft: 70,
        fontSize: 12,
        fontFamily: 'Kanit-Light',
    },
    textmember: {
        position: 'absolute',
        marginTop: 150,
        marginLeft: 70,
        fontSize: 12,
        fontFamily: 'Kanit-Light',
    },
    texthost: {
        position: 'absolute',
        marginTop: 180,
        marginLeft: 85,
        fontSize: 14,
        fontFamily: 'Kanit-Regular',
        color: '#FF6C3A',
    },
    hostIcon: {
        position: 'absolute',
        marginTop: 185,
        marginLeft: 70,
        width: 12,
        height: 12,
    },
    hosttime: {
        position: 'absolute',
        marginTop: 200,
        marginLeft: 70,
        fontSize: 14,
        fontFamily: 'Kanit-Regular',
        color: '#FF3A52',
    },
    textconfirm: {
        position: 'absolute',
        marginTop: 230,
        marginLeft: 70,
        fontSize: 16,
        fontFamily: 'Kanit-Light',
        color: 'black'
    },
    buttonConfirm: {
        position: 'absolute',
        width: 100,
        height: 30,
        borderRadius: 20,
        backgroundColor: '#FF6C3A',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 70,
        marginTop: 260,
    },
    buttonCancel: {
        position: 'absolute',
        width: 100,
        height: 30,
        borderRadius: 20,
        backgroundColor: '#FF3A52',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 180,
        marginTop: 260,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Kanit-Light',
    },

    container: {
        marginTop: 50,
        margin: 10,
        flex: 1,
    },
    messagesList: {
        flex: 1,
    },
    messageContainer: {
        padding: 10,
        borderWidth: 2,
        borderColor: '#FF984C',
        marginBottom: 10,
        borderRadius: 50,
        alignSelf: 'flex-end',
    },
    messageText: {
        color: '#FF872E',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    textInput: {
        flex: 1,
        borderWidth: 2,
        borderColor: '#FF872E',
        borderRadius: 20,
        paddingHorizontal: 15,
        marginRight: 10,
        width: 200,
        height: 40,
        color: '#FF872E',
    },
    iconButton: {
        padding: 10,
        marginRight: 5
    },
    sendButton: {
        backgroundColor: '#FF872E',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    modalContainer: {
        backgroundColor: '#FF872E',
        borderRadius: 8,
        position: 'absolute',
        left: 25,
        bottom: 67,
        borderColor: '#FF872E'
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        padding: 4,
    },
    modalButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FF872E',
        paddingVertical: 5,
        paddingHorizontal: 7,
    },
    locationText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontFamily: 'Kanit-Light',
    },
});


