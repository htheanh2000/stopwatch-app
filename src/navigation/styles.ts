import {TextStyle, ViewStyle} from 'react-native'
import { LIGHT_THEME } from '@/constants/color'
export const tabView: ViewStyle = {
    width: 110,
    height: 50,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: LIGHT_THEME.BACKGROUND_COLOR,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: LIGHT_THEME.BACKGROUND_COLOR
}

export const tabViewFocus: ViewStyle = {
    borderColor: LIGHT_THEME.GRAY_COLOR,
    backgroundColor: LIGHT_THEME.GRAY_COLOR
}

export const tabContainerView: ViewStyle = {
    flexDirection: 'row',
    justifyContent:'space-evenly',
    backgroundColor :LIGHT_THEME.BACKGROUND_COLOR
}

export const textTabFocus: TextStyle = {
    color: LIGHT_THEME.GRAY_BLUR_COLOR
}
