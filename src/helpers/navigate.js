import { useNavigation } from '@react-navigation/native';

export default function navigation (props) {
  const navigation = useNavigation()
  
  return <Dashboard {...props} navigation={navigation} />;

  }