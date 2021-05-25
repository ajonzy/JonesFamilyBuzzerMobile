import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, YellowBox } from "react-native"
import { useFonts, ChelseaMarket_400Regular } from '@expo-google-fonts/chelsea-market'
// @ts-ignore
import io from 'socket.io-client';
// import SocketIOClient from 'socket.io-client'

import homeStyles from "../../styles/pages/hostStyles"
const { hostWrapper, h2, h3, h5, button } = homeStyles

interface IHostScreenProps {
    navigation: {
        navigate: (screen: string) => void,
        state: {
            params: {
                name: string
            }
        }
    }
}

export default function host(props: IHostScreenProps) {
    const [socket, updateSocket]: any = useState()
    const [name] = useState(props.navigation.state.params.name)
    const [session, updateSession] = useState("")
    const [buzzerList, updateBuzzerList] = useState([])
    
    let [fontsLoaded] = useFonts({
        ChelseaMarket_400Regular,
    })
    
    useEffect(() => {
        YellowBox.ignoreWarnings(["Setting a timer"])

        const socket = io('http://jonesfamilybuzzerapi.herokuapp.com/', {
            transports: ['websocket'], secure: true
          })
        updateSocket(socket)
        let sess: string
        socket.connect()

        socket.on("session_created", (data: any) => {
            updateSession(data.session)
            sess = data.session
        })
    
        socket.on("new_buzz", (data: any) => {
            if (data.session === sess) {
                updateBuzzerList(data.buzz_list)
            }
        })
        
        socket.emit('host_user', { host: name })

        return () => {
            socket.disconnect()
        }
    }, [])

    
    const renderBuzzers = () => {
        const buzzers = []
        
        for (let user of buzzerList) {
            buzzers.push(
                <Text key={user} style={[h3, fontStyle]}>{user}</Text>
                )
            }
            
        return buzzers
    }
        
    const clearBuzzers = () => {
        socket.emit("clear_buzzers", { session: session })
        updateBuzzerList([])
    }
        
    const fontStyle = { fontFamily: fontsLoaded ? "ChelseaMarket_400Regular" : "normal" }
    
    const renderContent = () => {
        if (session) {
            return <View>
                <Text style={[h5, fontStyle]}>Your session name:{"\n"}{session}</Text>
                <Text style={[h2, fontStyle]}>{buzzerList.length > 0 ? "Player Buzzed!" : "Waiting for a Buzz..."}</Text>
                {renderBuzzers()}
                {buzzerList.length > 0 ? <TouchableOpacity style={button} onPress={clearBuzzers}><Text style={fontStyle}>Next Question!</Text></TouchableOpacity> : null}
            </View>
        }
        else {
            return <View>
                <Text style={[h3, fontStyle]}>Building new session...</Text>
            </View>
        }
    }

   return (
        <View style={hostWrapper}>
            {renderContent()}
        </View>
   )
}