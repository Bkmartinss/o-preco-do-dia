import React, { useState, useEffect } from 'react';//estado e efeitos
import { Pressable, Text, TextInput, View } from 'react-native';
import { styles } from './styles';
import { Picker } from '@react-native-picker/picker';//seletor de opções
import AsyncStorage from '@react-native-async-storage/async-storage';//armazenamento assíncrono para recuperar o token

export default function Produtos({ navigation }) {
  const [message, setMessage] = useState(''); //mensagem do sistema
  const [selectedLocation, setSelectedLocation] = useState(''); //local
  const [selectedCategory, setSelectedCategory] = useState(''); //categoria
  const [locations, setLocations] = useState([]); //local list
  const [categories, setCategories] = useState([]); //categoria list
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [observacao, setObservacao] = useState('');
  // const [user, setUser] = useState(''); // Add state for user
 
  useEffect(() => {
    fetchLocations(); //lista local
    fetchCategories(); //lista categoria
  }, []);

  const fetchLocations = async () => { //requisição GET p API - locais
    try {
      const response = await fetch('http://127.0.0.1:3000/locations');
      const data = await response.json();
      setLocations(data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const fetchCategories = async () => { //requisição GET p API - categoria
    try {
      const response = await fetch('http://127.0.0.1:3000/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSave = async () => {  //dados do formulário para a API
    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('preco', preco);
    formData.append('descricao', observacao);
    formData.append('CategoryId', selectedCategory);
    formData.append('LocationId', selectedLocation);
    formData.append('image', "imagemGenerica");
  
    try {
      const token = await AsyncStorage.getItem('token'); //Recupera o token do usuário com AsyncStorage
  
      if (!token) {
        throw new Error('No token found');
      }
  
      await fetch('http://127.0.0.1:3000/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        if (data && data.statusCode == 201) {
          navigation.navigate('Home');
          setMessage('Produto criado com sucesso!'); 
        } else {
          console.log("Erro");
          setMessage('Erro ao crir um novo produto!'); 
        }
      })
      .catch(error => console.error('Error:', error));
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
  };
  

  
  return(
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.textTitle}>Local *</Text>

        <View style={styles.pickerContainer}>
          <Picker //dropdown 
            selectedValue={selectedLocation}
            onValueChange={(itemValue) => setSelectedLocation(itemValue)}
            style={styles.picker}
          >
            {locations.map((location) => (
              <Picker.Item key={location.id} label={location.nome} value={location.id} />
            ))}
          </Picker>
        </View>

        <View style={styles.subContainerLocal}>
          <Text style={styles.textLink}
            onPress={() => {navigation.navigate('LocalTab')}}
          >Sugerir local</Text>
        </View>
        
        <Text style={styles.textTitle}>Nome *</Text>
        <TextInput style={styles.formInput}
          placeholder='Value'
          autoCapitalize='none'
          onChangeText={setNome} 
        />

        <Text style={styles.textTitle}>Preço *</Text>
        <TextInput style={styles.formInput}
          placeholder='Value'
          autoCapitalize='none'
          onChangeText={setPreco}
        />

        <Text style={styles.textTitle}>Categoria *</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            style={styles.picker}
          >
            {categories.map((category) => (
              <Picker.Item key={category.id} label={category.nome} value={category.id} />
            ))}
          </Picker>
        </View>

        <Text style={styles.textTitle}>Observação</Text>
            <TextInput style={styles.formInputObs}
              placeholder='Value'
              autoCapitalize='none'
              onChangeText={setObservacao}
        />

        <Text style={styles.textTitle}>Foto *</Text>
        
        <View style={styles.subContainerImage}>
        </View>

        <Pressable style={styles.formButton} onPress={handleSave}>
          <Text style={styles.textButton}>Salvar</Text>
        </Pressable>
        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>

    </View>
  );
}
