import React from "react";
import { StyleSheet, View, Alert, Image, ScrollView, Button } from "react-native";
import Line from "../components/Line";
import LongText from  "../components/LongText";


import { connect} from 'react-redux';
import { deletarSerie } from '../actions';


class SerieDetailPage extends React.Component {
    render () {
        const { serie } = this.props.navigation.state.params;


        return (
            <ScrollView>
                {
                    serie.img64
                    ?<Image
                        style={styles.image}
                        source = {{
                            uri: `data:image/jpeg;base64,${serie.img64}`
                        }}
                    />

                    : null
    }
                
                {/* <Text>{this.props.navigation.state.params.serie.title}</Text> */}
                <Line label = 'Título' content = {this.props.navigation.state.params.serie.title} />
                <Line label = 'Gênero' content = {this.props.navigation.state.params.serie.gender} />
                <Line label = 'Nota' content = {this.props.navigation.state.params.serie.rate} />
                <LongText label = 'Descrição' content = {this.props.navigation.state.params.serie.description} />

                <View style = {styles.button}>
                    <Button title = "Editar"
                        onPress={() => {
                            this.props.navigation.navigate('SerieForm', { serieToEdit: serie })
                        }}                  
                    />
                </View>

                <View style = {styles.button}>
                    <Button title = "Deletar"
                        color = '#FF0004FF'
                        onPress={ async () => {
                            const hasDeleted = await this.props.deletarSerie(serie)
                            if (hasDeleted) {
                                this.props.navigation.goBack();
                            }
                        }}                  
                    />
                </View>


            </ScrollView>
        )
    }
}

const styles = StyleSheet.create ({
    image: {
        aspectRatio: 1

    },

    button: {
        margin: 10

    }


});

export default connect (null, {deletarSerie}) (SerieDetailPage);
            
   