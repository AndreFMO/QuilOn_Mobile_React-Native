import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, TextInput, Image, KeyboardAvoidingView, Platform, Alert, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next'; // Importando a função useTranslation para lidar com traduções
import DotIndicator from '../../../assets/components/DotIndicator'; // Caminho para o componente de indicador de progresso

export function Address({ route }) {
  const { t } = useTranslation(); // Hook de tradução
  const navigation = useNavigation();
  const [userType, setUserType] = useState(t('address_user')); // Usando tradução para "Endereço do Usuário"
  const [address, setAddress] = useState({
    street: '',
    neighborhood: '',
    number: '',
    city: '',
    state: '',
    complement: '',
  });
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);

  const { personalData } = route.params || {};

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardIsVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardIsVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleNextPress = () => {
    if (!address.street || !address.neighborhood || !address.number || !address.city || !address.state) {
      Alert.alert(t('error'), t('error_fill_required')); // Mensagem de erro traduzida
      return;
    }

    navigation.navigate('Account', { personalData: personalData, addressData: address });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('./../../../assets/return.png')} style={styles.returnButton} />
        </TouchableOpacity>
        <View style={styles.containerLogo}>
          <Image source={require('./../../../assets/quilon.png')} style={styles.backgroundText} />
        </View>

        <Text style={styles.userType}>{userType}</Text>

        <Text style={styles.subTitle}>{t('address')}<Text style={styles.required}>*</Text></Text>
        <View style={styles.orangeBorder}>
          <TextInput 
            style={styles.input} 
            value={address.street}
            onChangeText={text => setAddress({...address, street: text})}
          />
        </View>

        <View style={styles.horizontalArea}>
          <View style={styles.leftField}>
            <Text style={styles.subTitle}>{t('neighborhood')}<Text style={styles.required}>*</Text></Text>
            <View style={styles.orangeBorder}>
              <TextInput 
                style={styles.input} 
                value={address.neighborhood}
                onChangeText={text => setAddress({...address, neighborhood: text})}
              />
            </View>
          </View>
          <View style={styles.rightField}>
            <Text style={styles.subTitle}>{t('number')}<Text style={styles.required}>*</Text></Text>
            <View style={styles.orangeBorder}>
            <TextInput 
              style={styles.input} 
              value={address.number}
              onChangeText={text => setAddress({...address, number: text})}
              keyboardType="numeric" 
            />
            </View>
          </View>
        </View>

        <View style={styles.horizontalArea}>
          <View style={styles.leftField}>
            <Text style={styles.subTitle}>{t('city')}<Text style={styles.required}>*</Text></Text>
            <View style={styles.orangeBorder}>
              <TextInput 
                style={styles.input} 
                value={address.city}
                onChangeText={text => setAddress({...address, city: text})}
              />
            </View>
          </View>
          <View style={styles.rightField}>
            <Text style={styles.subTitle}>{t('state')}<Text style={styles.required}>*</Text></Text>
            <View style={styles.orangeBorder}>
              <TextInput 
                style={styles.input} 
                value={address.state}
                onChangeText={text => setAddress({...address, state: text})}
              />
            </View>
          </View>
        </View>

        <Text style={styles.subTitle}>{t('complement')}</Text>
        <View style={styles.orangeBorder}>
          <TextInput 
            style={styles.input} 
            value={address.complement}
            onChangeText={text => setAddress({...address, complement: text})}
          />
        </View>
      </ScrollView>

      {!keyboardIsVisible && (
        <View style={styles.bottomContainer}>
          <DotIndicator totalSteps={3} currentStep={1} />
          <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
            <Text style={styles.ButtonText}>{t('next')}</Text>
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}



// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: "#FFF",
  },
  contentContainer: {
    paddingHorizontal: "5%",
    paddingBottom: 10,
  },
  returnButton: {
    height: 25,
    width: 30,
  },
  containerLogo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundText: {
    marginTop: 20,
    width: 230,
    height: 50,
  },
  userType: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: "grey",
    marginTop: 40,
  },
  subTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    marginTop: 15,
  },
  orangeBorder: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: '#BF8B6E',
  },
  horizontalArea: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftField: {
    width: "72%",
  },
  rightField: {
    width: "24%",
  },
  input: {
    height: 45,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    marginTop: -6,
    marginBottom: -8,
  },
  bottomContainer: {
    paddingHorizontal: "5%",
    paddingTop: 20,
    paddingBottom: 30,
  },
  nextButton: {
    backgroundColor: "#D86626",
    height: 50,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#6666",
    elevation: 5,
  },
  ButtonText: {
    color: "#FFF",
    fontWeight: 'bold',
  },
  required: {
    color: 'red',
    fontSize: 16,
  },  
});

export default Address;
