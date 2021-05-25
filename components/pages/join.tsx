import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, YellowBox } from "react-native"
import { useFonts, ChelseaMarket_400Regular } from '@expo-google-fonts/chelsea-market'
// @ts-ignore
import io from 'socket.io-client';

import joinStyles from "../../styles/pages/joinStyles"
const { joinWrapper, h3, h5, button, buttonText, errorButton } = joinStyles

interface IJoinScreenProps {
    navigation: {
        navigate: (screen: string) => void,
        state: {
            params: {
                name: string,
                session: string
            }
        }
    }
}

export default function join(props: IJoinScreenProps) {
    const [socket, updateSocket]: any = useState()
    const [name] = useState(props.navigation.state.params.name)
    const [session] = useState(props.navigation.state.params.session)
    const [host, updateHost] = useState("")
    const [buzzed, updateBuzzed] = useState(false)
    const [buzzerList, updateBuzzerList] = useState([])
    const [sessionError, updateSessionError] = useState(false)
    const [hostDisconnected, updateHostDisconnected] = useState(false)
    const [nameTaken, updateNameTaken] = useState(false)
    
    let [fontsLoaded] = useFonts({
        ChelseaMarket_400Regular,
    })

    useEffect(() => {
        YellowBox.ignoreWarnings(["Setting a timer"])

        const socket = io('http://jonesfamilybuzzerapi.herokuapp.com/', {
            transports: ['websocket'], secure: true
          })
        updateSocket(socket)
        socket.connect()
        
        socket.on("session_data", (data: any) => {
            if (data.session_data !== -1) {
                if (data.session_data.buzz_list.findIndex((value: any) => value == name) != -1) {
                    updateBuzzerList(data.session_data.buzz_list)
                    updateBuzzed(true)
                }
                updateHost(data.session_data.host)
            }
            else {
                updateSessionError(true)
            }
        })

        socket.on("name_taken", () => updateNameTaken(true))
        
        socket.on("buzz_added", (data: any) => {
            console.log("Buzz")
            if (data.session === session) {
                updateBuzzerList(data.buzz_list)
                updateBuzzed(true)
            }
        })
        
        socket.on("buzzers_cleared", (data: any) => {
            if (data.session === session) {
                updateBuzzerList([])
                updateBuzzed(false)
            }
        })

        socket.on("host_disconnect", (data: any) => {
            if (data.session === session) {
                updateHostDisconnected(true)
            }
        })

        socket.emit("join_session", { session: session, name: name })

        return () => {
            socket.disconnect()
        }
    }, [])
    
    const handleBuzz = () => {
        if (!buzzed) {
            socket.emit("buzz", { session: session, name: name })
        }
    }

    const renderBuzzedText = () => {
        if (!buzzed || buzzerList.length == 0) {
            return "BUZZ"
        } else {
            return buzzerList.findIndex(value => value == name) + 1
        }
    }   

    const fontStyle = { fontFamily: fontsLoaded ? "ChelseaMarket_400Regular" : "normal" }
    const buttonColorStyles = {
        backgroundColor: buzzed ? "limegreen" : "red", 
        borderColor: buzzed ? "green" : "darkred" 
    }

    const renderContent = () => {
        if (sessionError) {
            return <View>
                <Text style={[h3, fontStyle]}>Session not found...</Text>
                <TouchableOpacity style={errorButton} onPress={() => props.navigation.navigate("Home")}><Text style={fontStyle}>Back</Text></TouchableOpacity>
            </View>
        }
        else if (nameTaken) {
            return <View>
                <Text style={[h3, fontStyle]}>Name Taken{"\n"}Please Try Another One...</Text>
                <TouchableOpacity style={errorButton} onPress={() => props.navigation.navigate("Home")}><Text style={fontStyle}>Return Home</Text></TouchableOpacity>
            </View>
        }
        else if (!session || !host) {
            return <View>
                <Text style={[h3, fontStyle]}>Joining Session...</Text>
            </View>
        }
        else if (hostDisconnected) {
            return <View>
                <Text style={[h3, fontStyle]}>Host Disconnected...</Text>
                <TouchableOpacity style={errorButton} onPress={() => props.navigation.navigate("Home")}><Text style={fontStyle}>Return Home</Text></TouchableOpacity>
            </View>
        }
        else {
            return <View>
                <Text style={[h5, fontStyle]}>Your session name:{"\n"}{session}</Text>
                <Text style={[h5, fontStyle]}>Session Host:{"\n"}{host}</Text>
                <TouchableOpacity style={[button, buttonColorStyles]} onPress={handleBuzz}><Text style={[fontStyle, buttonText]}>{renderBuzzedText()}</Text></TouchableOpacity>
            </View> 
        }
    }

   return (
    //    <div className='join-wrapper'>
    //         {!sessionError ? !nameTaken ? session && host ? !hostDisconnected ? <div className="join-wrapper-with-session">
    //             <h5>Your session name:<br/>{session}</h5>
    //             <h5>Session Host:<br/>{host}</h5>
    //             <button onClick={handleBuzz} style={{backgroundColor: buzzed ? "limegreen" : "red", borderColor: buzzed ? "green" : "darkred"}}>{renderBuzzedText()}</button>
    //         </div>
    //         : <div className="join-wrapper-with-error">
    //             <h3>Host Disconnected...</h3>
    //             <button onClick={() => props.history.push("/")}>Return Home</button>
    //         </div>
    //         : <div className="join-wrapper-without-session">
    //             <h3>Joining Session...</h3>
    //         </div>
    //         : <div className="join-wrapper-with-error">
    //             <h3>Name Taken<br/>Please Try Another One...</h3>
    //             <button onClick={() => props.history.push("/")}>Return Home</button>
    //         </div>
    //         : <div className="join-wrapper-with-error">
    //             <h3>Session not found...</h3>
    //             <button onClick={() => props.history.push("/")}>Back</button>
    //         </div>}
    //    </div>
        <View style={joinWrapper}>
            {renderContent()}
        </View>
   )
}