import { StyleSheet, Text, View, SafeAreaView, StatusBar, Image, TouchableOpacity, Dimensions, FlatList, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Fonts, Colors, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width, height } = Dimensions.get('window');



const DietScreen = ({ navigation }) => {

    const { t, i18n } = useTranslation();

    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
      async function getUserInfo() {
        try {
          const data = await fetchUserInfo();
          console.log(userInfo)
        } catch (error) {
          // Handle error
        }
      }
  
      getUserInfo();
    }, []);
  
  
  async function fetchUserInfo() {
    try {
        console.log('here')
      AsyncStorage.getItem('token').then(async (storedValue) => {
        if (storedValue) {
      const response = await axios.get('https://xxtreme-fitness.com/api/auth/exercices', {
        headers: {
          Authorization: `Bearer ${storedValue}`,
        },
      }).then(async (result) => { 
        console.log(result.data)
        const data = await result.data.userDiet;
        setUserInfo(data);
      return data;
      });
      
        }})
    } catch (error) {
      console.error('Error fetching user information:', error);
      throw error;
    }
}

console.log(userInfo)

    function tr(key) {
        return t(`dietScreen:${key}`)
    }


    const [showSnackBar, setShowSnackBar] = useState(false);
    const [snackBarMsg, setSnackBarMsg] = useState("");

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <FlatList
                    ListHeaderComponent={
                        <>
                            {todaysDietPlanInfo()}
                        </>
                    }
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            {snackBar()}
        </SafeAreaView>
    )

    function snackBar() {
        return (
            <Snackbar
                visible={showSnackBar}
                onDismiss={() => setShowSnackBar(false)}
                style={styles.sanckBarStyle}
            >
                <Text style={{ ...Fonts.whiteColor14Medium }}>
                    {snackBarMsg}
                </Text>
            </Snackbar>
        )
    }


    function todaysDietPlanInfo() {
        const renderItem = ({ item }) => {
            console.log(item)
            const path = "http://api2v.xxtreme-fitness.com/"+item.diet.image;
            return (
                <TouchableOpacity
                    activeOpacity={0.99}
                    onPress={() => navigation.push('MealCategoryVideo')}
                    style={{ alignItems: 'center', marginRight: Sizes.fixPadding * 2.0 }}
                >
                    <Image
                        source={path}
                        style={styles.foodImageStyle}
                    />
                    <View style={styles.mealsCategoryWrapStyle}>
                        <Text style={{ ...Fonts.blackColor16SemiBold }}>
                            {item.diet.name}
                        </Text>
                        <Text style={{ ...Fonts.blackColor14Regular }}>
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        }
        console.log(userInfo)
        return (
            <View>
                <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16SemiBold }}>
                    {tr('todayPlanTitle')}
                </Text>
                <View style={{ marginTop: Sizes.fixPadding }}>
                    <FlatList
                        data={userInfo ? userInfo : ''}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={renderItem}
                        horizontal
                        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 4.0, paddingLeft: Sizes.fixPadding * 2.0 }}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>
        )
    }

    function header() {
        return (
            <Text style={{ margin: Sizes.fixPadding * 2.0, textAlign: 'center', ...Fonts.blackColor18SemiBold }}>
                {tr('header')}
            </Text>
        )
    }
}

export default DietScreen

const styles = StyleSheet.create({
    mealsCategoryWrapStyle: {
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        position: 'absolute',
        bottom: -30.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding - 2.0
    },
    foodImageStyle: {
        width: width,
        height: width,
        resizeMode: 'stretch',
        borderRadius: Sizes.fixPadding - 2.0
    },
    dietCategoriesInfoWrapStyle: {
        flex: 1,
        borderRadius: Sizes.fixPadding - 2.0,
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        marginHorizontal: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    favoriteDietImageStyle: {
        width: width / 2.4,
        height: height / 3.8,
        borderRadius: Sizes.fixPadding - 2.0,
        marginRight: Sizes.fixPadding * 2.0,
    },
    sanckBarStyle: {
        position: 'absolute',
        left: -10.0,
        right: -10.0,
        bottom: -10.0,
        backgroundColor: Colors.lightBlackColor,
        elevation: 0.0,
    },
    dietCategoriesHeaderWrapStyle: {
        marginBottom: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})