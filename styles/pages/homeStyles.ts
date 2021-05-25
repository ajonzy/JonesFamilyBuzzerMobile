import { StyleSheet, Dimensions } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

const { height, width } = Dimensions.get("window")

export default StyleSheet.create({
    homeWrapper: {
        minHeight: height - 24,
        textAlign: "center",
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: "lightgreen",
        borderWidth: 5,
        borderColor: "green",
    },
    h2: {
        fontSize: RFValue(24, 680),
        marginTop: 20
    },
    h3: {
        fontSize: RFValue(19, 680),
        marginTop: 19,
        marginBottom: 19,
        textAlign: "center"
    },
    h6: {
        fontSize: RFValue(11, 680),
        margin: 20
    },
    img: {
        height: 66,
        width: 50,
        marginBottom: 5
    },
    sectionWrapper: {
        alignItems: "center",
        width: "100%"
    },
    input: {
        // width: "80%",
        width: width * .8,
        textAlign: "center",
        borderRadius: 3,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5
    },
    button: {
        width: width * .8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "green",
        backgroundColor: "white",
        height: 30,
        textAlign: "center",
        paddingTop: 5
    }
})