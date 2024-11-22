import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

export default function Editar({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/150' }} // URL de exemplo para a foto
                    style={styles.profileImage}
                />
            <Text style={styles.profileName}>Nome</Text>
            </View>

            <Text style={styles.textTitle}>Nome *</Text>
            <TextInput style={styles.formInput}
                placeholder='Value'
                autoCapitalize='none'
            />
            <Text style={styles.textTitle}>Email</Text>
            <TextInput style={styles.formInput}
                placeholder='Value'
                autoCapitalize='none'
            />
            <Text style={styles.textTitle}>CPF</Text>
            <TextInput style={styles.formInput}
                placeholder='Value'
                autoCapitalize='none'
            />
            <Text style={styles.textTitle}>Senha</Text>
            <TextInput style={styles.formInput}
                placeholder='Value'
                autoCapitalize='none'
            />
            <Text style={styles.textTitle}>Telefone</Text>
            <TextInput style={styles.formInput}
                placeholder='Value'
                autoCapitalize='none'
            />
            <Button
                title='Salvar'
                onPress={() => navigation.navigate('')} // Navega para a tela Home
            />
        </View>
    );
}
