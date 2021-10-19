import React from "react";
import { StyleSheet, View, Text, FlatList, Dimensions, Image, TouchableOpacity } from "react-native";
import SerieCard from "./SerieCard";


const MenuCard = ({ serie, isFirstColumn, onNavigate }) => (
    
 
    <TouchableOpacity
        onPress={onNavigate}       
        style = {[
            styles.container,
            isFirstColumn ? styles.firstColumn: styles.lastColumn
        ]}>

        <View style = {styles.card}>       
          
            {     
                serie.id == '1'
                ?   <Image 
                        source={require('../../resources/foco.png')}
                        style={styles.image}
                    />
                :   serie.id == '2'
                    ?   <Image
                            source={require('../../resources/foco.png')}
                            style={styles.image}
                        /> 
                    
                    
                    :   serie.id == '3'
                        ?   <Image
                                source={require('../../resources/dino.png')}
                                style={styles.image}
                                />
                
                        :   <Image
                                source={require('../../resources/foco.png')}
                                style={styles.image}
                            />            
            }
                                 
            <View style = {styles.cardTitleWrapper}>
                <Text style = {styles.cardTitle}>{serie.title}</Text>                 
            </View>            
        

        </View>
    </TouchableOpacity>
);


const styles = StyleSheet.create ({
    container: {
      
        flex: 1,  
		padding: 20,        
        height: Dimensions.get('window').width / 2,
		
    },
    card: {
        flex: 1,
        borderWidth: 1,
    },
    cardTitleWrapper: {
        backgroundColor: 'black',
        height: 40,
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
        paddingLeft: 25,

    }, 
    lastColumn: {
        paddingRight: 25,

    },
    image: {
		width: '100%',
		height: '100%',
		//alignSelf: 'center',
		justifyContent: 'center',
		aspectRatio: 1,
    }


});

export default MenuCard;