import react from 'React';
import { ImageBackground} from 'react-native';
import Styles from './components/style.jsx';
import tree from './assets/tree.png';

const BgPic = (props) =>  {
    return(
        <View>
            <ImageBackground source={tree} style = {Styles.container}>
            </ImageBackground>
        </View>
    )
}

export default BgPic;