import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, TextInput, ImageBackground, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { Overlay } from 'react-native-elements';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

const EditProfileScreen = ({ navigation }) => {

    const { t, i18n } = useTranslation();

    function tr(key) {
        return t(`editProfileScreen:${key}`)
    }

    const isRtl = i18n.dir() == 'rtl';

    const [state, setState] = useState({
        name: 'Shriya',
        email: 'Shriyapatel@gmail.com',
        phoneNo: '+91 ( 1234567891)',
        fitnessGoal: 'Weight loss ',
        showBottomSheet: false,
    })

    const { name, phoneNo, email, fitnessGoal, showBottomSheet } = state;

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {profilePicWithChangeOption()}
                    {nameInfo()}
                    {emailInfo()}
                    {phoneNumberInfo()}
                    {fitnessGoalInfo()}
                    {updateButton()}
                </ScrollView>
            </View>
            {changeProfilePicOptionsSheet()}
        </SafeAreaView>
    )

    function changeProfilePicOptionsSheet() {
        return (
            <Overlay
                isVisible={showBottomSheet}
                overlayStyle={styles.bottomSheetStyle}
                onBackdropPress={() => updateState({ showBottomSheet: false })}
            >
                <TouchableOpacity
                    activeOpacity={0.99}
                    onPress={() => updateState({ showBottomSheet: false })}
                >
                    <Text style={{ textAlign: 'center', ...Fonts.blackColor18Bold }}>
                        {tr('sheetTitle')}
                    </Text>
                    <View style={{ marginTop: Sizes.fixPadding * 2.0, }}>
                        {profilePicOptionShort({ title: tr('cameraOption'), onPress: () => { } })}
                        {profilePicOptionShort({ title: tr('galleryOption'), onPress: () => { } })}
                        {profilePicOptionShort({ title: tr('remove'), onPress: () => { } })}
                    </View>
                </TouchableOpacity>
            </Overlay>
        )
    }

    function profilePicOptionShort({ title, onPress }) {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={onPress}
                style={{ flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center', marginBottom: Sizes.fixPadding + 5.0 }}
            >
                <Text>
                    •
                </Text>
                <Text style={{ marginLeft: isRtl ? 0.0 : Sizes.fixPadding, marginRight: isRtl ? Sizes.fixPadding : 0.0, ...Fonts.blackColor16Regular }}>
                    {title}
                </Text>
            </TouchableOpacity>
        )
    }

    function updateButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() => navigation.pop()}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    {tr('update')}
                </Text>
            </TouchableOpacity>
        )
    }

    function fitnessGoalInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding * 2.0 }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor16Regular }}>
                    {tr('goal')}
                </Text>
                <TextInput
                    value={fitnessGoal}
                    onChangeText={(text) => updateState({ fitnessGoal: text })}
                    style={styles.textFieldStyle}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        )
    }

    function phoneNumberInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding * 2.0 }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor16Regular }}>
                    {tr('phoneNo')}
                </Text>
                <TextInput
                    value={phoneNo}
                    onChangeText={(text) => updateState({ phoneNo: text })}
                    style={styles.textFieldStyle}
                    selectionColor={Colors.primaryColor}
                    keyboardType="phone-pad"
                />
            </View>
        )
    }

    function emailInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding * 2.0 }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor16Regular }}>
                    {tr('email')}
                </Text>
                <TextInput
                    value={email}
                    onChangeText={(text) => updateState({ email: text })}
                    style={styles.textFieldStyle}
                    selectionColor={Colors.primaryColor}
                    keyboardType="email-address"
                />
            </View>
        )
    }

    function nameInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding * 2.0 }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor16Regular }}>
                    {tr('name')}
                </Text>
                <TextInput
                    value={name}
                    onChangeText={(text) => updateState({ name: text })}
                    style={styles.textFieldStyle}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        )
    }

    function profilePicWithChangeOption() {
        return (
            <ImageBackground
                source={require('../../assets/images/user/user1.png')}
                style={styles.profilePicStyle}
                borderRadius={(width / 3.3) / 2.0}
            >
                <TouchableOpacity
                    activeOpacity={0.99}
                    onPress={() => updateState({ showBottomSheet: true })}
                    style={styles.addIconWrapStyle}
                >
                    <MaterialIcons name="add" size={15} color={Colors.whiteColor} />
                </TouchableOpacity>
            </ImageBackground>
        )
    }

    function header() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                <MaterialIcons
                    name={isRtl ? "arrow-forward" : "arrow-back"}
                    size={24}
                    color={Colors.blackColor}
                    onPress={() => navigation.pop()}
                />
                <Text style={{ marginHorizontal: Sizes.fixPadding, ...Fonts.blackColor18SemiBold }}>
                    {tr('header')}
                </Text>
            </View>
        )
    }
}

export default EditProfileScreen;

const styles = StyleSheet.create({
    addIconWrapStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        width: 22.0,
        height: 22.0,
        borderRadius: 11.0,
        borderColor: Colors.whiteColor,
        borderWidth: 1.5,
        position: 'absolute',
        right: 10.0,
        bottom: 0.0,
    },
    profilePicStyle: {
        width: width / 3.3,
        height: width / 3.3,
        alignSelf: 'center',
        marginBottom: Sizes.fixPadding * 2.5,
    },
    textFieldStyle: {
        ...Fonts.blackColor14Medium,
        elevation: 1.3,
        borderRadius: Sizes.fixPadding - 2.0,
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
    },
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        margin: Sizes.fixPadding * 2.0
    },
    bottomSheetStyle: {
        width: '100%',
        position: 'absolute',
        bottom: 0.0,
        borderTopLeftRadius: Sizes.fixPadding - 2.0,
        borderTopRightRadius: Sizes.fixPadding - 2.0,
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
    },
})