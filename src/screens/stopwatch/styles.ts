import { ViewStyle } from "react-native";
import { SCREEN_PADDING } from "@/constants/space";
export const controlView: ViewStyle = {
    flexDirection: 'row',
    justifyContent:'space-between',
    position: 'absolute' ,
    width: '100%',
    left: SCREEN_PADDING
}

export const itemView: ViewStyle = {
    width: 150,
    height:  120,
    borderRadius:25,
    justifyContent:'center',
    padding: 20,
    margin:10,
    backgroundColor: '#fff'
}

export const flatView: ViewStyle = {
    width: '100%',
    flex: 1,
    alignItems:'center',
    paddingBottom: 80
}