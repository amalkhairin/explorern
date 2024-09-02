import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesome6 } from '@expo/vector-icons';
import Images from '../../assets/images';

const HeaderLeftSide = () => (
    <Text style={{
        fontSize: 30,
        fontFamily: "StyleScript-Regular",
        textAlign: "center",
        paddingTop: 10
    }}>Instagram</Text>
)

const HeaderRightSide = () => (
    <View style={{ flexDirection: "row", gap: 9*2, alignItems: "center" }}>
        <TouchableOpacity activeOpacity={0.2}>
            <FontAwesome6 name="square-plus" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.2}>
            <FontAwesome6 name="heart" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.2}>
            <Image source={Images.facebookMessenger} style={{ width: 24, height: 24, marginLeft: -2.5 }}/>
        </TouchableOpacity>
    </View>
)

function Header() {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10, backgroundColor: "yellow" }}>
        <HeaderLeftSide />
        <HeaderRightSide />
    </View>
  )
}

export default Header