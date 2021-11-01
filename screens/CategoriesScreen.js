import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import CategoryGridTile from '../components/CategoryGridTile';
import HeaderButton from '../components/HeaderButton';
import { HeaderButtons, Item } from "react-navigation-header-buttons";


function CategoriesScreen(props)  {
    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: 'Meal Categories',
            headerLeft: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Menu" iconName="ios-menu" onPress={() => {props.navigation.toggleDrawer()}} />
            </HeaderButtons>)
        });
    }, []);
    const renderGridItem = (itemData) => {
        return (
            <CategoryGridTile title={itemData.item.title} 
            onSelect={() => {
                props.navigation.navigate('Category Meal', {
                    categoryId: itemData.item.id
                })
            }}
            color={itemData.item.color} />
        );
    }
    return (
        <FlatList data={CATEGORIES} renderItem={renderGridItem} numColumns={2}></FlatList>
    );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
    screen: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});



