import React from 'react';
import { Platform, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealScreen from '../screens/CategoryMealScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer'; 

const defaultStackNavOptions = { 
  headerStyle: {
    backgroundColor:  Colors.primaryColor
  },
  headerTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: 'white',
 };
 
const Stack =  Platform.OS === 'android' ? createStackNavigator() : createNativeStackNavigator();

function MealsNavigator() {
  return (
        <Stack.Navigator screenOptions ={defaultStackNavOptions}>
            <Stack.Screen name="Categories" component={CategoriesScreen}  />
            <Stack.Screen name="Category Meal" component={CategoryMealScreen} />
            <Stack.Screen name="Meal Detail" component={MealDetailScreen} />
        </Stack.Navigator>
  );
}

const FavoritesStack =  Platform.OS === 'android' ? createStackNavigator() : createNativeStackNavigator();
function FavoritesNavigator() {
  return (
        <FavoritesStack.Navigator screenOptions ={defaultStackNavOptions}>
            <FavoritesStack.Screen name="Favorites" component={FavoritesScreen}  />
            <FavoritesStack.Screen name="Meal Detail" component={MealDetailScreen} />
        </FavoritesStack.Navigator>
  );
}

let Tab;
let screenOptions;
if(Platform.OS === 'android') {
  Tab = createMaterialBottomTabNavigator();
  screenOptions = () =>  ({  tabBarColor: Colors.primaryColor });
}else{
  Tab = createBottomTabNavigator();
  screenOptions = () =>  ({  tabBarActiveTintColor: Colors.accentColor });
}

function MealsTabNavigator() {
  return(
      <Tab.Navigator shifting={true} screenOptions={screenOptions}>
        <Tab.Screen name="Home" component={MealsNavigator} options={{ tabBarIcon: (tabInfo) => {
          return (<Ionicons name="ios-restaurant" size={25} color={tabInfo.color} />);
        }, tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontFamily:'open-sans-bold' }}>Meals</Text> : 'Meals' }} />
        <Tab.Screen name="FavoritesNav" component={FavoritesNavigator} options={{ tabBarIcon: (tabInfo) => {
          return (<Ionicons name="ios-star" size={25} color={tabInfo.color} />);
        }, tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontFamily:'open-sans-bold' }}>Favorites</Text> : 'Favorites' }} />
      </Tab.Navigator>
  );
}

const FilterStack = Platform.OS === 'android' ? createStackNavigator() : createNativeStackNavigator();
function filterNavigator() {
  return (
    <FilterStack.Navigator screenOptions={defaultStackNavOptions}>
      <FilterStack.Screen name="filters" component={FiltersScreen} />
    </FilterStack.Navigator>
  );
}

const MainNav = createDrawerNavigator();
function MainTabNavigator() {
  return(
    <NavigationContainer>
      <MainNav.Navigator screenOptions={{ drawerActiveTintColor: Colors.accentColor, drawerLabelStyle: {fontFamily: 'open-sans-bold'} }}>
        <MainNav.Screen name="Meals" component={MealsTabNavigator} options={{ headerShown:false }} />
        <MainNav.Screen name="Filters" component={filterNavigator} options={{ headerShown:false }} />
      </MainNav.Navigator>
    </NavigationContainer>
  );
}

export default MainTabNavigator;
