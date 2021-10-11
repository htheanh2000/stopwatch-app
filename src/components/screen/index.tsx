import React, {FunctionComponent} from "react";
import { SafeAreaView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as styles from './styles'
import {SCREEN_PADDING} from '@/constants/space'
interface IProps {
    paddingHorizontal?: number
}

const Screen: FunctionComponent<IProps> = (props) => {
    const {children,paddingHorizontal} = props
    const insets = useSafeAreaInsets()
    return (
        <View style={[styles.mainView, {paddingHorizontal, paddingTop: insets.top, paddingBottom: insets.bottom}]}>
            {children}
        </View>
    )   
}

Screen.defaultProps = {
    paddingHorizontal: SCREEN_PADDING
}

export default Screen