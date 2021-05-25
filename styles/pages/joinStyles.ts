import { StyleSheet, Dimensions } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

const { height, width } = Dimensions.get("window")

export default StyleSheet.create({
    joinWrapper: {
        minHeight: "100%",
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: "lightskyblue",
        borderWidth: 5,
        borderColor: "blue",
        paddingTop: 22
    },
    h3: {
        fontSize: RFValue(19, 680),
        marginTop: 19,
        marginBottom: 19,
        textAlign: "center"
    },
    h5: {
        fontSize: RFValue(13.5, 680),
        marginBottom: 5,
        textAlign: "center"
    },
    button: {
        width: width * .75,
        height: width * .75,
        borderRadius: (width * .75) / 2,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        marginTop: 17
    },
    buttonText: {
        fontSize: RFValue(45, 680)
    },
    errorButton: {
        width: width * .8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "red",
        backgroundColor: "white",
        height: 30,
        alignItems: "center",
        paddingTop: 5
    }
})