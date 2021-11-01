import React from "react";
import { View,FlatList, StyleSheet } from "react-native";
import MealItem from "./MealItem";

const MealList = (props) => {
    const renderMealItem = (itemData) => {
        return (
            <MealItem 
                title={itemData.item.title}
                duration={itemData.item.duration}
                affordability={itemData.item.affordability} 
                complexity={itemData.item.complexity} 
                imageUrl={itemData.item.imageUrl} 
                onSelectMeal={() => {
                    props.navigation.navigate('Meal Detail', {
                        mealId: itemData.item.id,
                    })
                }} />
        );
    }
    return(
        <View style={styles.list}>
            <FlatList data={props.listData} keyExtractor={(item, index) => item.id} renderItem={renderMealItem} style={{ width:'100%' }} />
        </View>
    );
};

export default MealList;

const styles = StyleSheet.create({
    list: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});