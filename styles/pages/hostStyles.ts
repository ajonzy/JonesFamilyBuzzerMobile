import { StyleSheet, Dimensions } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

const { width } = Dimensions.get("window")

export default StyleSheet.create({
    hostWrapper: {
        minHeight: "100%",
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: "lightskyblue",
        borderWidth: 5,
        borderColor: "blue",
    },
    h2: {
        fontSize: RFValue(24, 680),
        marginTop: 20,
        textAlign: "center"
    },
    h3: {
        fontSize: RFValue(19, 680),
        marginTop: 19,
        marginBottom: 19,
        textAlign: "center"
    },
    h5: {
        fontSize: RFValue(13.5, 680),
        marginTop: 22,
        textAlign: "center"
    },
    button: {
        width: width * .8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "green",
        backgroundColor: "white",
        height: 30,
        alignItems: "center",
        paddingTop: 5
    }
})