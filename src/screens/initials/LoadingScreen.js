import React from "react";
import {StyleSheet, View} from "react-native";
import {Subheading, Text, useTheme, withTheme} from "react-native-paper";
import {DefaultView} from "../../components/containers";
import Constellation from "../../svgs/Constellation";
import SolarSystem from "../../svgs/SolarSystem";
import Rotation from "../../components/animations/Rotation";
import Leo from "../../svgs/Leo";
import i18n from "i18n-js";

/**
 * @param navigation
 * @returns {*}
 * @constructor
 */
function LoadingScreen({navigation}) {
    const {colors} = useTheme();
    const [phrase, setPhrase] = React.useState(0);
    const [number, setNumber] = React.useState(1);
    const phrases = [
        i18n.t('Analyzing name'),
        i18n.t('Analyzing birth date'),
        i18n.t('Analyzing gender'),
        i18n.t('Analyzing relationship status'),
        i18n.t('Analyzing favourite number'),
        i18n.t('Concluding analysis'),
    ];

    React.useEffect(() => {
        const intervalNumber = setInterval(() => {
            if (number < 100) {
                setNumber(number => number + 1);
            } else {
                clearInterval(intervalNumber);
            }
            if (number % 15 === 0 && phrase < 5) {
                setPhrase(phrase + 1);
            }
        }, 350)
        return () => clearInterval(intervalNumber);
    })

    React.useEffect(() => {
        number === 100 && false;
    }, [number])

    return (
        <DefaultView>
            <Leo width={80} height={80} style={styles.leo}/>
            <Constellation height={250} width={250} style={styles.constellation}/>
            <View style={{flex: 1}}/>
            <View style={styles.loadingContainer}>
                <Rotation style={{opacity: .7}} rotate={true}>
                    <SolarSystem/>
                </Rotation>
            </View>
            <View style={{flex: 3}}>
                <Text style={styles.textText}>{number}%</Text>
                <Subheading style={[styles.textSubheading, {color: colors.primary}]}>{phrases[phrase]}</Subheading>
            </View>
        </DefaultView>
    );
}

const styles = StyleSheet.create({
    constellation: {
        zIndex: 0, position: 'absolute', bottom: 20, left: 20, opacity: 0.1
    },
    leo: {
        zIndex: 0, position: 'absolute', top: 20, right: 20, opacity: 0.2
    },
    counterContainer: {
        position: 'absolute', top: 20, left: 20
    },
    loadingContainer: {
        flex: 1, alignSelf: 'center', paddingTop: 40, zIndex: 1
    },
    textText: {
        textAlign: 'center', marginTop: 20
    },
    textSubheading: {
        textAlign: 'center'
    },
})


export default withTheme(LoadingScreen);