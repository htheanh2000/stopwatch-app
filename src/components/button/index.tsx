import React, { FunctionComponent } from 'react'
import { Touchable, TouchableHighlight, TouchableHighlightBase, TouchableNativeFeedback, TouchableWithoutFeedback, View } from 'react-native'
import { LIGHT_THEME } from "@/constants/color";
import Text from '../text'
import * as styles from './styles'
interface IProps {
    status?: 'ACTIVE' | 'DEACTIVE'
    onPress?: () => void
}

const Button: FunctionComponent<IProps> = (props) => {
    const { children, onPress, status } = props
    const getTheme = () => {
        switch (status) {
            case 'ACTIVE':
                return {
                    buttonColor: LIGHT_THEME.BUTTON_ACTIVE_COLOR,
                    textStatus: 'ACTIVE'
                }
            case 'DEACTIVE':
                return {
                    buttonColor: LIGHT_THEME.BUTTON_NORMAL_COLOR,
                    textStatus: 'DEACTIVE'
                }
            default:
                return {
                    buttonColor: LIGHT_THEME.BUTTON_ACTIVE_COLOR,
                    textStatus: 'DEACTIVE'
                }
        }
    }
    const theme = getTheme()


    return (
            <TouchableWithoutFeedback style={[styles.buttonView]} onPress={onPress} >
                <View style={[styles.buttonView, { backgroundColor: theme.buttonColor }]}>
                     <Text status={theme.textStatus}>{children}</Text>
                </View>
            </TouchableWithoutFeedback>
    )
}

Button.defaultProps = {
    status: 'ACTIVE'
}

export default Button