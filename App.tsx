import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { createAppContainer } from "react-navigation"

import router from "./utils/router"

// @ts-ignore
const AppContainer = createAppContainer(router)

export default function App() {
  return (
    <View style={{height: "100%"}}>
      <StatusBar barStyle="light-content" />
      <AppContainer />
    </View>
  );
}
