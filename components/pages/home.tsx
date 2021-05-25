import React, { useState, useEffect } from 'react'
import { ScrollView, View, Text, Image, TextInput, TouchableOpacity, Keyboard, Dimensions, Platform } from "react-native"
import { useFonts, ChelseaMarket_400Regular } from '@expo-google-fonts/chelsea-market'
// @ts-ignore
import DownArrow from "../../assets/down_arrow.png"

import homeStyles from "../../styles/pages/homeStyles"
const { homeWrapper, img, sectionWrapper, input, button, h2, h3, h6 } = homeStyles

const { height } = Dimensions.get("window")

interface IHomeScreenProps {
    navigation: {
        navigate: (screen: string, data: any) => void
    }
}

export default function home(props: IHomeScreenProps) {
    const [name, updateName] = useState("")
    const [session, updateSession] = useState("")
    const [nameError, updateNameError] = useState(false)
    const [sessionError, updateSessionError] = useState(false)
    const [keyboardHeight, updateKeyboardHeight] = useState(0)
    
    let [fontsLoaded] = useFonts({
        ChelseaMarket_400Regular,
    })

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", keyboardDidShow )
        Keyboard.addListener("keyboardDidHide", () => updateKeyboardHeight(0))

        return () => {
            Keyboard.removeListener("keyboardDidShow", keyboardDidShow)
            Keyboard.removeListener("keyboardDidHide", () => updateKeyboardHeight(0))
        }
    }, [])

    const keyboardDidShow = (event: any) => {
        updateKeyboardHeight(event.endCoordinates.height - 6)
    }

    const handleHost = () => {
        updateNameError(false)

        if (!name) {
            updateNameError(true)
        } else {
            props.navigation.navigate("Host", {
                name
            })
        }
    }

    const handleJoin = () => {
        updateNameError(false)
        updateSessionError(false)

        if (!name) {
            updateNameError(true)
        } else if (!session) {
            updateSessionError(true)
        } else {
            props.navigation.navigate("Join", {
                name,
                session
            })
        }
    }

    const fontStyle = { fontFamily: fontsLoaded ? "ChelseaMarket_400Regular" : "normal" }
    const nameErrorStyle = { color: "red", opacity: nameError ? 100 : 0 }
    const sessionErrorStyle = { color: "red", opacity: sessionError ? 100 : 0 }

   return (
        <View style={homeWrapper}>
            <View style={{height: height - 35 - keyboardHeight}}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={sectionWrapper}>
                <Text style={[h2, fontStyle]}>Start Here</Text>
                <Image style={img} source={DownArrow} />
                <TextInput 
                    style={[input, fontStyle]} 
                    placeholder="Your Name"
                    value={name}
                    onKeyPress={event => updateName(name + event.nativeEvent.key.toUpperCase())}
                    autoCompleteType="off"
                    autoCorrect={false}
                    autoCapitalize="characters"
                />
                <Text style={[nameErrorStyle, fontStyle]}>Please enter your name</Text>
                <Text style={[h3, fontStyle]}>Then either start a new session, or enter the name of an existing one to join!</Text>
            </View>

            <View style={[sectionWrapper, { marginTop: 50 }]}>
                <TouchableOpacity onPress={handleHost}><Text style={[button, fontStyle]}>Host Session</Text></TouchableOpacity>
                <Text style={[h6, fontStyle]}>-or-</Text>
                <TextInput 
                    style={[input, fontStyle]} 
                    placeholder="Session Name" 
                    value={session}
                    onKeyPress={event => updateSession(session + event.nativeEvent.key.toUpperCase())}
                    autoCompleteType="off"
                    autoCorrect={false}
                />
                <Text style={[sessionErrorStyle, fontStyle]}>Please enter a session name</Text>
                <TouchableOpacity onPress={handleJoin}><Text style={[button, fontStyle, {marginBottom: 10}]}>Join Session</Text></TouchableOpacity>
            </View>
            </ScrollView>
            </View>
        </View>
   )
}