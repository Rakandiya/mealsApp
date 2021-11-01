import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealScreen from '../screens/CategoryMealScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
 


let Tab;
let screenOptions;
if(Platform.OS === 'android') {
  Tab = createMaterialBottomTabNavigator();
  screenOptions = (props) => ({ 
            headerStyle: {
              backgroundColor:  Colors.primaryColor
            },
            headerTintColor: 'white',
            activeColor: 'red' });
}else{
  Tab = createBottomTabNavigator();
  screenOptions = (props) => ({ 
            headerStyle: {
              backgroundColor:  Colors.primaryColor
            },
            headerTintColor: 'white',
           tabBarActiveTintColor: Colors.accentColor });
}

function MealsTabNavigator() {
  return(
      <Tab.Navigator shifting={true} screenOptions={screenOptions}>
        <Tab.Screen name="Categories" component={CategoriesScreen} options={{ tabBarIcon: (tabInfo) => {
          return (<Ionicons name="ios-restaurant" size={25} color={tabInfo.color} />);
        }  }} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} options={{ tabBarIcon: (tabInfo) => {
          return (<Ionicons name="ios-star" size={25} color={tabInfo.color} />);
        } }} />
      </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function MealsNavigator() {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions ={ (props) => ({
  
          headerStyle: {
            backgroundColor:  Colors.primaryColor
          },
          headerTintColor: 'white',
        })}>
            <Stack.Screen name="Home" component={MealsTabNavigator} />
            <Stack.Screen name="Category Meal" component={CategoryMealScreen} />
            <Stack.Screen name="Meal Detail" component={MealDetailScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
export default MealsNavigator;
