import React, { FunctionComponent } from 'react'
import { Text } from 'react-native'
import { LIGHT_THEME } from '@/constants/color'
interface IProps {
    status?: 'NORMAL' | 'DEACTIVE' | string
    color?: string
    fontSize?: number
    paddingHorizontal?: number
    paddingBottom?: number
    fontWeight?: '100' | '200' | '300'| '400'| '500'| '600'| '700' | '800' | 'bold' | 'normal'
}

const CustomText: FunctionComponent<IProps> = (props) => {
    const { status, children, color, fontSize, paddingHorizontal,paddingBottom,fontWeight } = props

    const getColor = () => {
        if (color) return color
        switch (status) {
            case 'NORMAL':
                return LIGHT_THEME.TEXT_NORMAL_COLOR
            case 'ACTIVE':
                return LIGHT_THEME.TEXT_ACTIVE_COLOR
            case 'DEACTIVE':
                return LIGHT_THEME.TEXT_DEACTIVE_COLOR
            default:
                return LIGHT_THEME.TEXT_DEACTIVE_COLOR
        }
    }
    return (
        <Text style={{ color: getColor(), fontWeight: fontWeight, fontSize, paddingHorizontal,paddingBottom }}>{children}</Text>
    )
}

CustomText.defaultProps = {
    status: 'NORMAL',
    fontSize: 16,
    paddingHorizontal: 0,
    paddingBottom: 0,
    fontWeight: '600'
}

export default CustomText