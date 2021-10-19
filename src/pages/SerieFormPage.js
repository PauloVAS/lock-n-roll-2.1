import React from 'react';
import { StyleSheet, View, TextInput, Text, Button, ScrollView, ActivityIndicator, Alert, Image} from "react-native";
import {Picker} from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

import { KeyboardAvoidingView } from 'react-native';

import FormRow from '../components/FormRow';
import { connect } from 'react-redux';

import { setField } from '../actions';
import { saveSerie } from '../actions';
import { setTodaSerie } from '../actions';
import { limparFormulario } from '../actions';

//import * as Permissions from "expo-permissions";
import * as ImagePicker from 'expo-image-picker';



// 1- colocar piece of state, pedacinho de estado, criando um novo reduncer
// 2 - criar o reducer e criar algo pra alterar esse estado, mandar algo pra que o recuder trabalhe, a action faz isso
// 3 - criar a Action - por fim, conectar o compromente serie form page. Agora ele é um funcional component, sem necessidade
//de estado dentro dele
// 4 - conectar o serieFormPage

//colocar o state, constructor recebe o propos e temos que chamar o props pelo super
// e o this.state vai ser o loading.

class SerieFormPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,

        }
    }

    componentDidMount() {           //codigo onde vou carregar os dados da série a ser editada no formulário
        const { navigation, setTodaSerie, limparFormulario } = this.props;
        const { params} = navigation.state;
        if (params && params.serieToEdit) {         //se tiver o params e o params.serie.toedit é que será feito um SET_TODA_SETIE
            setTodaSerie(params.serieToEdit);

        } else {
            limparFormulario()
        }
    }

    //aqui poderia criar a função renderButton -> 
    // renderButton() {  codigo  }
    // como está fora do render, não exite ainda o saveSerie, serieForm e navigation, então precisa fazer o destruct ->
    // dentro do try colocar: const {saveSerie, serieForm, navigation} = this.props;

    async pickImage() {         //ImagePicker.requestMediaLibraryPermissionsAsync()     //permissão para galeria
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync()  //ImagePicker.requestCameraPermissionsAsync()      //permissão para camera          
        if (status !== 'granted') {
            Alert.alert ('Você precisa permitir o acesso a sua Biblotera de fotos! :)')
            return;
        }
        //const result = await ImagePicker.launchCameraAsync({          //camera
        const result = await ImagePicker.launchImageLibraryAsync({      //galeria
            quality: 0.2,
            base64: true,
            allowsEditing: true,
            //aspect: [1,1]
        });

        if (!result.cancelled) {
            this.props.setField('img64', result.base64)            
        }

    }

    //ImagePicker.getCameraPermissionsAsync() 
    // ImagePicker.requestCameraPermissionsAsync() 

    render () {
        const { serieForm, setField, saveSerie, navigation } = this.props;

        return (

            <KeyboardAvoidingView behavior = 'padding' enabled keyboardVerticalOffset = {10}  >
                <ScrollView keyboardShouldPersistTaps='handled'>
                        <FormRow first>   
                                <TextInput style = {styles.input}    //first = config de padding
                                    placeholder = 'Título'
                                    value = {serieForm.title}
                                    onChangeText = {value => setField('title', value) }   //funçao de callback
                                    // keyboardType = 'email-address'
                                    // autoCapitalize = 'none'
                                /> 
                        </FormRow>
        
                        <FormRow> 
                                {/* <TextInput style = {styles.input} 
                                    placeholder = 'URL da Imagem'
                                    value = {serieForm.img}
                                    onChangeText = {value => setField('img', value) }   //funçao de callback
                                
                                />  */}
                                
                                {serieForm.img64
                                    ? <Image
                                        source = {{
                                            uri: `data:image/jpeg;base64,${serieForm.img64}`
                                        }}
                                        style={styles.img}/>
                                    : null
                                }

                                <Button
                                    title = "Selecione uma imagem"
                                    onPress = {() => this.pickImage()}


                                />


                        </FormRow>
        
                        <FormRow>
                            <Picker                    
                                    selectedValue={serieForm.gender}
                                    onValueChange={(itemValue) => setField('gender', itemValue) }>
        
                                    <Picker.Item label="Policial" value="Policial" />
                                    <Picker.Item label="Comédia" value="Comédia" />
                                    <Picker.Item label="Terror" value="Terror" />
                            </Picker>
        
                        </FormRow>
        
        
                        <FormRow>
                            <View style = {styles.sameRow}>
                                <Text>Nota:</Text>
                                <Text>{serieForm.rate}</Text>
                            </View>
                            <Slider
                                onValueChange = {value => setField('rate', value)}
                                value = {serieForm.rate}
                                minimumValue = {0}
                                maximumValue = {100}
                                step={5}
                            />                
                        </FormRow>
        
                        <FormRow>
                            <TextInput style = {styles.input} 
                                placeholder = 'Descrição'
                                value = {serieForm.description}
                                onChangeText = {value => setField('description', value) }   //funçao de callback
                                numberOfLines = {5}
                                multiline = {true}
                            /> 
        
                        </FormRow>

                        {/* para transformar esse código numa função
                        chamada da função ->  { this.renderButton () }  -> nome da função renderButton e não passa nada
                        agora cria a função depois do contructor e antes do render() */}
        
                       { 
                            this.state.isLoading ? <ActivityIndicator size= 'large' color ='black' />
                            :
                            <Button
                                title = 'Salvar'                    //ao implementar o return na função de saveSerie, posso usar o método .then
                                onPress = {async() => {
                                    this.setState({ isLoading: true});
                                    try {
                                        await saveSerie(serieForm);     //removi o .then depois do saveSerie e inseri o await
                                        navigation.navigate('Main');           //é como se dissesse ao java "espera o saveSerie pra só depois"
                                                                    //fazer o navigation
                                    } catch (error) {
                                        Alert.alert('Erro!', error.message);

                                    } finally {             //aqui será executado dando erro ou não
                                        this.setState({ isLoading: false});
                                    }                                                                                                     
                                }}
                            />
                        }
        
                </ScrollView>
            </KeyboardAvoidingView>
        
        
        );
    }
}







const styles = StyleSheet.create ({
    container: {
        paddingLeft: 10,
        paddingRight: 10,

    },

    sameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,

    },


    input: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,        

    },
    button: {
        marginTop: 5,

    },
    error: {
        color: 'red',
        alignSelf: 'center',
        fontSize: 15,
        paddingTop: 50,
    },

    pass: {
        color: 'green',

    },
    img: {
        aspectRatio: 1,
        width: '100%'

    }
        

});

//funcao que vai receber o state e quem vai chamar ela é a lib do react redux.
//Cada chave desse objeto vai ser injetado no compoente serieFormPage
//mapStateToProps - tudo que preciso de valor do meu state e eu tenho que injetar de props eu faco aqui
function mapStateToProps (state) {
    return {
        serieForm: state.serieForm
    }
}

const mapDispatchToProps = {
    setField,
    saveSerie,
    setTodaSerie,
    limparFormulario

}


//mapDispatchToProps -  ele pode ser apenas um objeto e vou passar uma action creator pra ele, essa action creator ela
//vai envolver com o metodo dispatch e vai entregar outra função. Assim é apenas chamar a action creator passando
//os paramentos que quiser

//cary - uma função que retorna outra função
export default connect(mapStateToProps, mapDispatchToProps) (SerieFormPage);