import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, Switch, Platform } from "react-native";
import HeaderButton from '../components/HeaderButton';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import { setFilters } from "../store/actions/meals";

const FilterSwitch = (props) => {
    return (
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''} trackColor={{ true: Colors.primaryColor }} value={props.value} onValueChange={props.onChange} />
        </View>
    );
}

function FiltersScreen(props)  {
    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: 'Filter Meals',
            headerLeft: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Menu" iconName="ios-menu" onPress={() => {props.navigation.toggleDrawer()}} />
            </HeaderButtons>),
            headerRight: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Save" iconName="ios-save" onPress={() =>
                    {
                        dispatch(setFilters({
                            glutenFree: isGlutenFree,
                            lactoseFree: isLactoseFree,
                            vegan: isVegan,
                            vegetarian: isVegetarian,
                        }))
                }} />
            </HeaderButtons>)
        });
    }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian]);
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restrictions</Text>
            <FilterSwitch label="Gluten-Free" value={isGlutenFree} onChange={newvalue => setIsGlutenFree(newvalue)} />
            <FilterSwitch label="Lactose-Free" value={isLactoseFree} onChange={newvalue => setIsLactoseFree(newvalue)} />
            <FilterSwitch label="Vegan" value={isVegan} onChange={newvalue => setIsVegan(newvalue)} />
            <FilterSwitch label="Vegetarian" value={isVegetarian} onChange={newvalue => setIsVegetarian(newvalue)} />
        </View>
    );
};


const styles = StyleSheet.create({
    screen: {
        flex:1,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 15
    }
});

export default FiltersScreen;

