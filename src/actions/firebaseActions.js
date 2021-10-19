import firebase from 'firebase';
import { Alert } from 'react-native';
//import firebase from "@firebase/app";
import "@firebase/database";

export const LOAD_FIREBASE = 'LOAD_FIREBASE';
const loadFirebase = series => ({
    type: LOAD_FIREBASE,
    series,
});

export const watchSeries = () => {
    const {currentUser} = firebase.auth();
    return dispatch => {
        firebase
            .database()
            .ref(`/user/${currentUser.uid}/series`) 
            .on('value', Snapshot => {       //registrar um callback sempre que um evento acontecer no firebase
                //console.log(Snapshot.val());           //once executa apenas uma vez o callback uma unica vez e o on sempre que o value vier
                const series = Snapshot.val();

                if (!series) {
					return dispatch(loadFirebase({}))
				}

                const action = loadFirebase(series);
                dispatch(action)
            });  
    }
}

export const deletarSerie = serieToDelete => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            Alert.alert('Deletar',
            `Deseja deletar a série ${serieToDelete.title}`,
            [{
                text: 'Não',
                onPress: () => {
                    resolve(false);
                },
                style: 'cancel'

            },{
                text: 'Sim',
                onPress: async() => {
                    const {currentUser} = firebase.auth();
                    try {
                        await firebase
                        .database()
                        .ref(`/user/${currentUser.uid}/series/${serieToDelete.id}`)
                        .remove();
                        resolve(true);
                    } catch (error) {
                        reject(error);
                        console.log(error)
                    }                    
                },

            }],
            {cancelable: false}              
            )
        })
    }
}




// const {currentUser} = firebase.auth();
// return async dispatch => {             // o await do firebase precisa de uma função assincrona pra funcionar      
//     //throw new Error('Meu Erro!');   //forçar erro para testar o try catch
//     await firebase              //colocando o return aqui eu estou devolvendo uma primise (rejected ou resolved) 
//         .database()                     //dessa forma quem chamou a função saveSerie (botão da serieFormPage) tem o método .then
//         .ref(`/user/${currentUser.uid}/series`)
//         .push(serie)
//     dispatch(serieSaveSuccess())       //pra voltar ao initial state do formulário, mando a action serieSaveSuccess
//     console.log(serie)                     // e no reducer (serieFormReducer), coloco mais um case com essa action e chamo

        
// }   
