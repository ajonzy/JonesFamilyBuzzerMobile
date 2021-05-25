import React from "react"
import { createAppContainer, createSwitchNavigator } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"

import HomeScreen from "../components/pages/home"
import HostScreen from "../components/pages/host"
import JoinScreen from "../components/pages/join"

const AppStack = createStackNavigator(
    {
        Home: HomeScreen,
        Host: HostScreen,
        Join: JoinScreen
    },
    {
        initialRouteName: "Home",
        defaultNavigationOptions: {
            headerShown: false
        }
    }
)

export default createAppContainer(
    createSwitchNavigator({
        App: AppStack
    },
    {
        initialRouteName: "App"
    })
)