import React, { FunctionComponent, useRef, useState, createRef } from "react";
import { FlatList, View, TouchableWithoutFeedback, TouchableOpacityBase, TouchableOpacity } from "react-native";
import { Screen, Timer, Button, Text, Icon } from '@/components'
import * as styles from './styles'
import { ITimerRefs } from '@/components'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { timeConverter } from '@/helper/time'
type IStatus = 'RUNNING' | "PAUSING"
const StopWatch: FunctionComponent = () => {
    const insets = useSafeAreaInsets()
    const timerRef = createRef<ITimerRefs>()
    const [timeList, setTimeList] = useState<number[]>([])
    const [status, setStatus] = useState<IStatus>('PAUSING')
    const onPressReset = () => {
        setStatus('PAUSING')
        timerRef?.current?.reset()
    }
    const flatRef = useRef<FlatList>(null)
    const onPressControl = () => {
        switch (status) {
            case 'PAUSING':
                onPressStart()
                break;
            case 'RUNNING':
                onPressTick()
                break;
            default:
                break;
        }
    }

    const onPressStart = () => {
        setStatus('RUNNING')
        setTimeList([])
        timerRef?.current?.start()
    }

    const onPressTick = () => {
        const newTime = timerRef?.current?.getTime() || 0
        setTimeList([...timeList, newTime])
        flatRef.current?.scrollToEnd()
    }

    const onPressDelete = (item: number) => {
        setTimeList(timeList => timeList.filter(ele => ele !== item))
    }

    interface ItemProps {
        item: number,
        index: number
    }
    const renderItem = (props: ItemProps) => {
        const { item, index } = props
        return (
            <View style={styles.itemView}>
                <TouchableWithoutFeedback onPress={() => onPressDelete(item)}>
                    <View style={styles.delIcon}>
                        <Icon name='RedDelete' />
                    </View>
                </TouchableWithoutFeedback>
                <Text fontWeight='bold' fontSize={16} paddingBottom={20} >LAP {index + 1}</Text>
                <Text isClockFont fontSize={20} fontWeight='bold' >{timeConverter(item)}</Text>
            </View>
        )
    };

    return (
        <Screen>
            <Timer ref={timerRef} time={0} ></Timer>
            <View style={styles.flatView}>
                <FlatList
                    ref={flatRef}
                    alwaysBounceVertical={true}
                    directionalLockEnabled={true}
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={true}
                    numColumns={2}
                    data={timeList}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.toString()}
                />
            </View>
            <View style={[styles.controlView, { bottom: insets.bottom + 20 }]}>
                <Button onPress={onPressControl} status='ACTIVE'>{status === 'PAUSING' ? 'Start' : 'Tick'}</Button>
                <Button onPress={onPressReset} status='DEACTIVE'>Reset</Button>
            </View>

        </Screen>
    )
}

export default StopWatch