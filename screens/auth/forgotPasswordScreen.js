import { StyleSheet, Text, View, SafeAreaView, StatusBar, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const ForgotPasswordScreen = ({ navigation }) => {

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`forgotPassword:${key}`)
    }

    const [email, setEmail] = useState('');

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.lightPrimaryColor} />
            <View style={{ flex: 1, }}>
                {backArrow()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {header()}
                    {description()}
                    {emailTextField()}
                    {continueButton()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() => navigation.push('OtpVerification', { from: 'forgotPassword' })}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    {tr('continue')}
                </Text>
            </TouchableOpacity>
        )
    }

    function emailTextField() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <TextInput
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    placeholder={tr('email')}
                    style={{ ...Fonts.blackColor14Regular }}
                    selectionColor={Colors.lightPrimaryColor}
                    keyboardType="email-address"
                    placeholderTextColor={'#8D8D8D'}
                />
            </View>
        )
    }

    function description() {
        return (
            <Text style={styles.descriptionTextStyle}>
                {tr('description')}
            </Text>
        )
    }

    function header() {
        return (
            <Text style={{ textAlign: 'center', ...Fonts.blackColor24SemiBold }}>
                {tr('header')}
            </Text>
        )
    }

    function backArrow() {
        return (
            <MaterialIcons
                name={isRtl ? "arrow-forward" : "arrow-back"}
                size={24}
                color={Colors.blackColor}
                onPress={() => navigation.pop()}
                style={{ margin: Sizes.fixPadding * 2.0, alignSelf: isRtl ? 'flex-end' : 'flex-start' }}
            />
        )
    }
}

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
    textFieldWrapStyle: {
        borderColor: Colors.grayColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 2.0,
        padding: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 4.0,
    },
    buttonStyle: {
        backgroundColor: Colors.lightPrimaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 4.0,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    descriptionTextStyle: {
        marginTop: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 4.0,
        textAlign: 'center',
        ...Fonts.grayColor14Regular
    }
})