import { ViewStyle } from "react-native";
import { LIGHT_THEME } from "@/constants/color";
import { S_WIDTH } from "@/constants/space";

export const buttonView: ViewStyle = {
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1
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
    top: 20,
    right: 20,
    transform: [{ scaleX: .6 }, { scaleY: .6 }]
}

export const deleteView: ViewStyle = {
    position:'absolute', 
    right: 30, 
    bottom: 22
}

export const modalView: ViewStyle = {
    borderRadius: 40,
    height: 400,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
}

export const line: ViewStyle = {
    width: 50,
    height: 5,
    borderRadius: 40,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: LIGHT_THEME.GRAY_COLOR
}


export const optionView: ViewStyle = {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    position: 'absolute',
    bottom: 30
}

export const dateListView: ViewStyle = {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width:'100%',
    marginLeft: '20%'
}

export const dateItem: ViewStyle = {
    width: 25,
    height: 25,
    borderRadius: 30,
    marginRight: 10,
    borderWidth: 0,
    borderColor: LIGHT_THEME.GRAY_BLUR_COLOR,
    justifyContent: 'center',
    alignItems:'center'
}

export const dateTitle: ViewStyle = {
    justifyContent:'flex-start', 
    width:'100%', 
    marginLeft: '20%', 
    marginBottom: 10
}