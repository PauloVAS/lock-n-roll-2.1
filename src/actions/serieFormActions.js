import firebase from 'firebase';
//import firebase from "@firebase/app";
import "@firebase/database";
import { Alert, RecyclerViewBackedScrollViewBase } from 'react-native';

//obs. dois reducers podem reagir a uma mesma action type

export const SET_FIELD = 'SET_FIELD';   ///action type (tipo de acão)
export const setField = (field, value) => {
    return {
        type: SET_FIELD,
        field,
        value,
    }
}

export const SET_TODA_SERIE = 'SET_TODA_SERIE';
export const setTodaSerie = serieToEdit => ({
    type: SET_TODA_SERIE,
    serieToEdit

});

export const LIMPAR_FORMULARIO = 'LIMPAR_FORMULARIO';
export const limparFormulario = () => ({
    type: LIMPAR_FORMULARIO

});


export const SERIE_SAVED_SUCCESS = 'SERIE_SAVED_SUCCESS';   //toda ection precisa de um type que será o nome da constante
const serieSaveSuccess = () => ({
    type: SERIE_SAVED_SUCCESS

});

export const saveSerie = serie => {

    const {currentUser} = firebase.auth();
    return async dispatch => {             // o await do firebase precisa de uma função assincrona pra funcionar      
        //throw new Error('Meu Erro!');   //forçar erro para testar o try catch
        const db = firebase.database();

        if (serie.id) {
            await db.ref(`/user/${currentUser.uid}/series/${serie.id}`)
            .set(serie)
        } else {
            await db.ref(`/user/${currentUser.uid}/series`) //colocando o return aqui eu estou devolvendo uma primise (rejected ou resolved) 
            .push(serie)                     //dessa forma quem chamou a função saveSerie (botão da serieFormPage) tem o método .then
                                              //pra voltar ao initial state do formulário, mando a action serieSaveSuccess
                                            // e no reducer (serieFormReducer), coloco mais um case com essa action e chamo
        }
        dispatch(serieSaveSuccess())            
    }   

}


const delay = ms => new Promise ((resolve, reject) => {
    setTimeout(() => resolve(), ms)

})

