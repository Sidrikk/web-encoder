import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Image, TouchableOpacity, ScrollView, Dimensions  } from 'react-native';
import styled from 'styled-components/native'
import { Picker } from '@react-native-picker/picker'
import React, { useState } from 'react';

const Container = styled.View`
  /* padding: 20px; */
  align-items: center;
  margin: 0 auto;
  width: 100%;
  background-color: #fff;
  height: 100%;
  overflow-y: scroll;
`;

const Input = styled.TextInput`
  background-color: #D9D9D9;
  border-radius: 13px;
  margin-bottom: 20px;
  height: 50px;
  width: 300px;
  padding: 5px 20px 10px 20px;
  font-size: 20px;
  border: 2px solid #000;
`;

const Encode = styled.View`
  margin-top: 30px;
  margin-bottom: 30px;
  max-width: 500px;
  min-width: 350px;
  height: 450px;
  border: 1px solid #707070;
  border-radius: 30px;
  align-items: center;
`;

const Decode = styled.View`
  max-width: 500px;
  min-width: 350px;
  height: 450px;
  border: 1px solid #707070;
  border-radius: 30px;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const ResultText = styled.Text`
  background-color: #d8d8d8;
  border-radius: 15px;
  margin-bottom: 20px;
  margin-top: 20px;
  /* overflow-y:hidden;
  position:relative; */
  height: 100px; 
  width: 300px;
  padding: 5px 20px 10px 20px;
  font-size: 20px;
  border: 2px solid #000;
`;

const TitleText = styled.Text`
  font-size: 24px;
  text-align: center;
  color: #000;
  margin-bottom: 30px;
  margin-top: 30px;
  font-weight: 700;
`;

const Header = styled.View`
  background-color: #EAEAEA;
  height: 200px;
  width: 100%;
  justify-content: center;
  align-items: center;
  /* box-shadow: 0px 10px 4px rgba(0, 0, 0, 0.15); */
`;

const HeaderLogo = styled.Image`
  height: 159px;
  width: 127px;
`;

const FooterText = styled.Text`
  font-size: 26px;
  padding: 10px;
  padding-bottom: 30px;
`;


export default function App() {

  const [selectedEncodeValue, setSelectedEncodeValue] = useState('default');
  const [selectedDecodeValue, setSelectedDecodeValue] = useState('default');

  const [inputText, setInputText] = useState('');

  const [displayText, setDisplayText] = useState('Результат');

  const [decodeText, setDecodeText] = useState('');

  const [displayDecodeText, setDisplayDecodeText] = useState('Результат');

  const handleEncodeButtonPress = async () => {
    try {
      const response = await fetch('https://e56e-185-140-161-190.ngrok-free.app/api/submit_text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputText, selectedEncodeValue }),
      });
    
      const result = await response.json();
      setDisplayText(result.result);
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error)
    }
  }

  const handleDecodeButtonPress = async () => {
    try {
      const response = await fetch('https://e56e-185-140-161-190.ngrok-free.app/api/submit_text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ decodeText, selectedDecodeValue }),
      });
    
      const result = await response.json();
      setDisplayDecodeText(result.result);
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error)
    }
  }

  return (
    <ScrollView
      contentContainerStyle={Dimensions.get('window').width > 1000 ? {alignItems: 'center', justifyContent: 'space-between', height: '100%'} : {alignItems: 'center',}}
    >
      {/* <ScrollView> */}
        <Header
          style={Dimensions.get('window').width > 1000 ? styles.shadow : {}}
        >
          <HeaderLogo
            source={require('./assets/digital-resistance-3.png')}
          ></HeaderLogo>
        </Header>
        <View
          style={Dimensions.get('window').width > 1000 ? styles.desktopView : styles.mobileView}
        >
          <Encode
            style={Dimensions.get('window').width > 1000 ? styles.desktop : styles.mobile}
          >
            <TitleText>Кодирование</TitleText>
            <Picker 
              selectedValue={selectedEncodeValue}
              onValueChange={(itemValue, itemIndex) => setSelectedEncodeValue(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Выберите метод" value="default" />
              <Picker.Item label="Метод Шенона-Фано" value="fano" />
              <Picker.Item label="Шифр Цезаря" value="cesar" />
              <Picker.Item label="Метод Лемпеля-Зива-Велча" value="lzw" />
              <Picker.Item label="Алгоритм RSA" value="rsa" />
              <Picker.Item label="Алгоритм AES" value="aes" />
              <Picker.Item label="Алгоритм DES" value="des" />
            </Picker>
            <Input
              placeholder="Введите текст..."
              placeholderTextColor="gray"
              onChangeText={(text) => setInputText(text)}
              value={inputText}
              // style={styles.inputShadow}
            ></Input>
            {/* <Button 
              // title="Отправить" 
              onPress={handleEncodeButtonPress}
            >
              <Image source={require('./btn.svg')}></Image>
            </Button> */}
            <TouchableOpacity onPress={handleEncodeButtonPress}>
              <Image 
                source={require('./assets/btn.png')}
              ></Image>
            </TouchableOpacity>
    
            <ResultText
              // style={styles.inputShadow}
            >
              {displayText}
            </ResultText>
    
            
          </Encode>
          
    
    
          <Decode
            style={Dimensions.get('window').width > 1000 ? styles.desktop : styles.mobile}
          >
    
            <TitleText>Декодирование</TitleText>
    
            <Picker 
              selectedValue={selectedDecodeValue}
              onValueChange={(itemValue, itemIndex) => setSelectedDecodeValue(itemValue)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item label="Выберите метод" value="default" />
              <Picker.Item label="Шифр Цезаря" value="decode_cesar" />
              <Picker.Item label="Алгоритм RSA" value="decode_rsa" />
              <Picker.Item label="Алгоритм AES" value="decode_aes" />
              <Picker.Item label="Алгоритм DES" value="decode_des" />
            </Picker>
    
            <Input
              placeholder="Введите текст..."
              placeholderTextColor="gray"
              onChangeText={(text) => setDecodeText(text)}
              value={decodeText}
              // style={styles.inputShadow}
            ></Input>
    
            {/* <Button 
              title="Отправить" 
              onPress={handleDecodeButtonPress}>
    
            </Button> */}
    
            <TouchableOpacity onPress={handleDecodeButtonPress}>
              <Image source={require('./assets/btn.png')}></Image>
            </TouchableOpacity>
    
            <ResultText>{displayDecodeText}</ResultText>
    
          </Decode>
        </View>

        <View
          style={Dimensions.get('window').width > 1000 ? {width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#EAEAEA'} : {width: Dimensions.get('window').width, backgroundColor: '#EAEAEA'}}
        >
          <FooterText>ТГТУ — Институт автоматики и информационных технологий — Кафедра ИСиЗИ © 2024</FooterText>
        </View>
  
        <StatusBar style="auto" />
      {/* </ScrollView> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  picker: {
    width: 250,
    height: '40px',
    backgroundColor: '#d8d8d8',
    borderRadius: 7,
    borderStyle: 'solid',
    borderColor: '#000',
    textAlign: 'left',
    fontSize: 16,
    marginBottom: 20
  },
  shadow: {
    shadowColor:"#000000",
    shadowOffset: {
      width: 9,
      height: 12,
   },
   
   shadowOpacity: 1,
   shadowRadius: 5,
   elevation: 24,
   shadowOpacity: 0.15
  },
  inputShadow: {
    shadowColor:"#000000",
    shadowOffset: {
      width: 3,
      height: 6,
   },
   shadowRadius: 5,
   elevation: 24,
   shadowOpacity: 0.25
  },
  desktop: {
    width: '500px',
    shadowColor:"#000000",
    shadowOffset: {
      width: 9,
      height: 12,
    },
   
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 24,
    shadowOpacity: 0.15
  },
  mobile: {
    width: '600px'
  },
  desktopView: {
    width: 1100,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})