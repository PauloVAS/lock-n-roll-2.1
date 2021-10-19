import { createAppContainer } from 'react-navigation'; 
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './pages/LoginScreen';
import mainMenu from './pages/mainMenu';
import SerieDetailPage from './pages/SerieDetailPage';
import SerieFormPage from './pages/SerieFormPage';
import MenuPrincipal from './pages/MenuPrincipal';
import PaginaAtividades from './pages/Atividades';
import PaginaAplicativos from './pages/Aplicativos';
import PaginaControleFoco from './pages/ControleFoco';
import PaginaGestaoDependentes from './pages/GestaoDependentes';


const AppNavigator = createStackNavigator ({
  'Login' : {                                
    screen: LoginScreen,
    navigationOptions: {              
        title: 'Let´s Rock!',

    }
  },
  
  'LocknRoll': {
    screen: MenuPrincipal,
    navigationOptions: {
        title: 'Choose you destiny!',
        headerTitleStyle: {
          textAlign: 'center'
        }
    }
  },
     

  'Atividades' : {                                 
    screen: PaginaAtividades,
    navigationOptions: {            
        title: 'Gestão de Atividades',
        headerTitleStyle: {
          
        }
    }
  },

  'Aplicativos' : {                                 
    screen: PaginaAplicativos,
    navigationOptions: {            
        title: 'Gestão de Aplicativos',
        headerTitleStyle: {
          
        }
    }
  },

  'ControleFoco' : {                                 
    screen: PaginaControleFoco,
    navigationOptions: {            
        title: 'Controle de Foco',
        headerTitleStyle: {
          
        }
    }
  },

  'GestaoDependentes' : {                                 
    screen: PaginaGestaoDependentes,
    navigationOptions: {            
        title: 'Gestão de Dependentes',
        headerTitleStyle: {
          
        }
    }
  },
    
  
  'Main': {
      screen: mainMenu,
      navigationOptions: {
          title: 'Gerenciar Atividades',
          headerTitleStyle: {

          }
      }
  },
  
  'DetailPage' : {
      screen: SerieDetailPage,
      navigationOptions: ({ navigation }) => {
          const {serie} = navigation.state.params;
          return {
              title: serie.title,
              headerTitleStyle: {

              }
          }       
      }
  
  },
  
  'SerieForm': {
    screen: SerieFormPage,
    navigationOptions: ({ navigation }) => {
        if (navigation.state.params && navigation.state.params.serieToEdit) {
          return {
            title: navigation.state.params.serieToEdit.title,
          }
        }
          return {
            title: 'CADASTRO',
            headerTitleStyle: {}
          };
       }      
    }           //sobrescreve o nome default da tela do defaultNavigatorOptions
  
  
   
}, {                                    //SEGUNDO OBJETO ONDE PASSO AS CONFIGURAÇÕES
  defaultNavigationOptions: {          //Vale para todos os headers das telas criadas 
    title: 'Series!',   //ficará em todas a telas
    headerTintColor: 'white',
    headerStyle: {                      //se refere ao componente inteiro de header
      backgroundColor: '#6ca2f7',
      borderBottomWidth: 1,
      borderBottomColor: '#C5C5C5',
      //headerTintColor: 'white',


    },
    headerTitleStyle: {           //apenas ao texto
      color: 'white',
      fontSize: 30,
      alignSelf: 'center',
      flexGrow: 1,
      textAlign: 'center',

    }


  }                        


});

const AppContainer = createAppContainer (AppNavigator);

export default AppContainer;