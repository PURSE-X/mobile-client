import React from "react";
import { useWindowDimensions, View} from 'react-native';
import Styles from './components/style';
import Currency from './components/currency.jsx';

import Exchange_button from './components/exchange_button.jsx';
import Navigation_menu from './components/navigation_menu.jsx';
import Number_pad from './components/number_pad.jsx';
import Exchange from "./components/exchange";
import InputArea from "./components/inputArea";

const Landing_page = () => {
  const [State, setState] = React.useState("69420.00")
  const [open, setOpen] = React.useState(false);
  const window = useWindowDimensions();
    return (
      <View style = {Styles.container}>

      <Exchange setOpen={setOpen} amount={State} open={open}/>
        <InputArea state={State}/>
        <View>
          <Exchange_button onPress={()=>{
              setOpen(true);
          }} />

        </View>

      
        <View>
          <Number_pad state={State} setState={setState}/>
        </View>

       

      </View>
    );
};                  

export default Landing_page;