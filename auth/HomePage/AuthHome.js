import React from "react";
import { useWindowDimensions, View} from 'react-native';
import Styles from './components/style';
import Currency from './components/currency.jsx';

import Exchange_button from './components/exchange_button.jsx';
import Navigation_menu from './components/navigation_menu.jsx';
import Number_pad from './components/number_pad.jsx';
import InputArea from "./components/inputArea";

const Landing_page = () => {
  const [State, setState] = React.useState("69420.00")
  const window = useWindowDimensions();
    return (
      <View style = {Styles.container}>

 
        <InputArea state={State}/>
        <View>
          <Exchange_button />
        </View>

      
        <View>
          <Number_pad setState={setState}/>
        </View>

       

      </View>
    );
};                  

export default Landing_page;