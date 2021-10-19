import React from "react";
import { StyleSheet, View, Text, FlatList, Dimensions, Image, TouchableOpacity } from "react-native";


const SerieCard = ({ serie, isFirstColumn, onNavigate }) => (
    <TouchableOpacity
        onPress={onNavigate}
        style = {[
            styles.container,
            isFirstColumn ? styles.firstColumn: styles.lastColumn
        ]}>
        <View style = {styles.card}>

            {
                serie.img64
                ?   <Image 
                    source = {{
                        uri: `data:image/jpeg;base64,${serie.img64}`
                    }}
                    aspectRatio = {1}  //obrigatorio quando o react native trabalha com imagem
                    resizeMode = 'cover'    //outras opcoes conforme necessidade
                    />
                :   <Image
				    source={require('../../resources/dino.png')}
				    style={styles.image}
			        />
            }
                        {/* <Text>{`${serie.id} - ${serie.title}`}</Text>  como concatenar */}
            <View style = {styles.cardTitleWrapper}>
                <Text style = {styles.cardTitle}>{serie.title}</Text>                 
            </View>            
        

        </View>
    </TouchableOpacity>
);


const styles = StyleSheet.create ({
    container: {
      
        flex: 1,  
		padding: 5,        
        //height: Dimensions.get('window').width / 2,
		
    },
    card: {
        flex: 1,
        borderWidth: 1,
    },
    cardTitleWrapper: {
        backgroundColor: 'black',
        height: 50,
        position: 'absolute',
        bottom: 0,
        opacity: .6,
        width: '100%',

        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft:  5,
        paddingRight:  5,

        alignItems: 'center',
        
    },
    cardTitle: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',

    },
    firstColumn: {
        paddingLeft: 10,

    }, 
    lastColumn: {
        paddingRight: 10,

    },
    image: {
		width: '100%',
		height: '100%',
		//alignSelf: 'center',
		justifyContent: 'center',
		aspectRatio: 1,
    }


});

export default SerieCard;