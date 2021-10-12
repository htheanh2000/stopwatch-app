import { ViewStyle } from "react-native";
import { LIGHT_THEME } from "@/constants/color";

export const buttonView: ViewStyle = {
    paddingTop: 20,
    justifyContent:'center',
    alignItems:'center'
}

export const itemView: ViewStyle = {
    width: '100%',
    borderRadius: 30,
    backgroundColor: LIGHT_THEME.ALARM_CARD_BACKGROUND_COLOR,
    padding: 20,
    paddingVertical: 20,
    marginBottom: 20
}

export const itemSwichView: ViewStyle = {
    position: 'absolute',
    top: 40,
    right: 20,
    transform: [{ scaleX: .6 }, { scaleY: .6 }]
}
