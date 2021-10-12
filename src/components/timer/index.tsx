import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { View } from 'react-native'
import * as styles from './styles'
import Text from '../text'
import {timeConverter} from '@/helper/time'
import Icon from '../icon'
interface IProps {
    time: number,
}

export interface ITimerRefs {
    reset:() => void;
    start:() => void;
    getTime: () => number
}

const Timer = forwardRef<ITimerRefs, IProps>((props, ref) => {
    const { time } = props
    const [timeStart, setTime] = useState<number>(time)
    const [isRunning, setRunning] = useState<boolean>(false)
    useEffect(() => {
        if(!isRunning)  {
            return () => clearInterval(timer)
        }
        const timer = setInterval(() => {
            setTime(timeStart => timeStart + 100)
        }, 100)
        return () => clearInterval(timer)
    }, [time,isRunning])

    const reset = () => {
        setRunning(false)
        setTime(0)
    };

    const start = () => {
        setRunning(true)
    };

    const getTime = () => {
        return timeStart
    }

    useImperativeHandle(ref, () => ({ reset, start, getTime }));

    return (
        <View style={styles.timerView}>
            <Text isClockFont fontSize={56}>{timeConverter(timeStart)}</Text>
        </View>
    )
})

Timer.defaultProps = {
    time: 0
}

export default Timer