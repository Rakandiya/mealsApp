import React, { useEffect } from "react";
import { View } from "react-native";
import { useSelector } from 'react-redux';
import { CATEGORIES } from "../data/dummy-data";
import MealList from "../components/MealList";
import DefaultText from "../components/DefaultText";
import { StyleSheet } from "react-native";

function CategoryMealScreen(props)  {
    const categoryId = props.route.params.categoryId;
    const selectedCategory = CATEGORIES.find(category => category.id === categoryId);
    const availableMeals = useSelector(state => state.meals.filteredMeals);
    const displayedMeals = availableMeals.filter((meal) => 
        meal.categoryIds.indexOf(categoryId) >= 0);
    if(displayedMeals.length === 0) {
        return <View style={styles.content}>
            <DefaultText>No meals found, maybe check your filters?</DefaultText>
        </View>;
    }

    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: selectedCategory.title,
        });
    }, []);
    return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

const styles = StyleSheet.create({
    content: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default CategoryMealScreen;

