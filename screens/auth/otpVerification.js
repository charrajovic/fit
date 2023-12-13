import { StyleSheet, Text, View, SafeAreaView, StatusBar, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { createRef, useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';

const OtpVerificationScreen = ({ navigation, route }) => {

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`otpVerificationScreen:${key}`)
    }

    const from = route.params.from;

    const [state, setState] = useState({
        firstDigit: '',
        secondDigit: '',
        thirdDigit: '',
        forthDigit: '',
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { firstDigit, secondDigit, thirdDigit, forthDigit } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.lightPrimaryColor} />
            <View style={{ flex: 1, }}>
                {backArrow()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {header()}
                    {description()}
                    {codeInfo()}
                    {verifyButton()}
                    {resendText()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function resendText() {
        return (
            <Text style={{ textAlign: 'center', ...Fonts.primaryColor16SemiBold }}>
                {tr('resend')}
            </Text>
        )
    }

    function codeInfo() {
        const secondTextInput = createRef();
        const thirdTextInput = createRef();
        const forthTextInput = createRef();
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginVertical: Sizes.fixPadding }}>
                <View style={styles.codeInfoWrapStyle}>
                    <View style={styles.textFieldWrapStyle}>
                        <TextInput
                            selectionColor={Colors.lightPrimaryColor}
                            value={firstDigit}
                            style={{ paddingLeft: Sizes.fixPadding, ...Fonts.primaryColor18SemiBold, }}
                            onChangeText={(text) => {
                                updateState({ firstDigit: text })
                                secondTextInput.current.focus();
                            }}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.textFieldWrapStyle}>
                        <TextInput
                            selectionColor={Colors.lightPrimaryColor}
                            value={secondDigit}
                            style={{ paddingLeft: Sizes.fixPadding, ...Fonts.primaryColor18SemiBold, }}
                            ref={secondTextInput}
                            keyboardType="numeric"
                            onChangeText={(text) => {
                                updateState({ secondDigit: text })
                                thirdTextInput.current.focus();
                            }}
                        />
                    </View>

                    <View style={styles.textFieldWrapStyle}>
                        <TextInput
                            selectionColor={Colors.lightPrimaryColor}
                            style={{ paddingLeft: Sizes.fixPadding, ...Fonts.primaryColor18SemiBold, }}
                            keyboardType="numeric"
                            value={thirdDigit}
                            ref={thirdTextInput}
                            onChangeText={(text) => {
                                updateState({ thirdDigit: text })
                                forthTextInput.current.focus();
                            }}
                        />
                    </View>

                    <View style={styles.textFieldWrapStyle}>
                        <TextInput
                            selectionColor={Colors.lightPrimaryColor}
                            style={{ paddingLeft: Sizes.fixPadding, ...Fonts.primaryColor18SemiBold, }}
                            keyboardType="numeric"
                            value={forthDigit}
                            ref={forthTextInput}
                            onChangeText={(text) => {
                                updateState({ forthDigit: text, })
                                if (from == 'forgotPassword') {
                                    navigation.push('NewPassword')
                                }
                                else {
                                    navigation.push('GenderSelection')
                                }
                            }}
                        />
                    </View>
                </View>
            </View>
        )
    }

    function verifyButton() {
        
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() => { from == 'forgotPassword' ? navigation.push('NewPassword') : navigation.push('GenderSelection') }}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    {tr('verify')}
                </Text>
            </TouchableOpacity>
        )
    }

    function description() {
        return (
            <Text style={styles.descriptionTextStyle}>
                {from == 'forgotPassword'
                    ?
                    tr('description1')
                    :
                    `${tr('description2')} +9188******10`
                }
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

export default OtpVerificationScreen;

const styles = StyleSheet.create({
    textFieldWrapStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: Sizes.fixPadding - 2.0,
        elevation: 2.0,
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.lightGrayColor,
        borderWidth: 1.0,
        borderBottomWidth: 0.50,
        marginHorizontal: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonStyle: {
        backgroundColor: Colors.lightPrimaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    descriptionTextStyle: {
        marginTop: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 4.0,
        textAlign: 'center',
        ...Fonts.grayColor14Regular
    },
    codeInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding * 3.0,
    }
})