import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import List_Prod from './components/Products/List_Prod';
import Add_Prod from './components/Products/Add_Prod';
import Update_Prod from './components/Products/Update_Prod';

const StackDemo = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <StackDemo.Navigator initialRouteName='List_Prod'>
        <StackDemo.Screen name='List_Prod' component={List_Prod} options={{headerShown:false}}/>
        <StackDemo.Screen name='Add_Prod' component={Add_Prod} options={{headerShown:false}}/>
        <StackDemo.Screen name='Update_Prod' component={Update_Prod} options={{headerShown:false}}/>
      </StackDemo.Navigator>
    </NavigationContainer>
  );
}
