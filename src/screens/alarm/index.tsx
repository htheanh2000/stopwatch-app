import { Button, Screen, Text } from '@/components'
import { LIGHT_THEME } from '@/constants/color'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { FlatList, Switch, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as styles from './styles'
const MOCK_DATA = [{
    id: '1',
    name: 'Bao thuc 1',
    time: '07:40 AM',
    duration: 'Every day',
    isEnabled: true
},
{
    id: '2',
    name: 'Bao thuc 2',
    time: '11:00 AM',
    duration: 'Every day',
    isEnabled: true

},
{
    id: '3',
    name: 'Bao thuc 3',
    time: '13:00 AM',
    duration: 'Every day',
    isEnabled: true

},
{
    id: '4',
    name: 'Bao thuc 4',
    time: '20:40 AM',
    duration: 'Every day',
    isEnabled: true

},
{
    id: '5',
    name: 'Them 1 cai ',
    time: '13:00 AM',
    duration: 'Every day',
    isEnabled: true

},
{
    id: '6',
    name: 'Cai cuoi',
    time: '20:40 AM',
    duration: 'Every day',
    isEnabled: true

}]

interface IAlarm {
    id: string,
    name: string,
    time: string,
    duration: string,
    isEnabled: boolean

}

interface IItemProps {
    item: IAlarm
}

const Alarm: FunctionComponent = () => {
    const [AlarmList, setAlarmList] = useState<IAlarm[]>(MOCK_DATA)

    useEffect(() => {
     
        // getData()
    }, [])

    //    const getData = async () => {
    //         try {
    //             const jsonValue = await AsyncStorage.getItem('ALARM')
    //             if (jsonValue !== null) {
    //                 setAlarmList(JSON.parse(jsonValue))
    //             }
    //         } catch (e) {
    //             // setAlarmList([])
    //         }
    //     }


    const renderItem = (props: IItemProps) => {
        const { name, time, duration, isEnabled } = props.item
        return (
            <View style={styles.itemView}>
                <Text color={LIGHT_THEME.GRAY_BLUR_COLOR} fontSize={12} paddingBottom={10}>{name}</Text>
                <Text isClockFont fontSize={30} paddingBottom={5}>{time}</Text>
                <Text color={LIGHT_THEME.ALARM_DURATION_COLOR}>{duration}</Text>

                <Switch
                    style={styles.itemSwichView}
                    trackColor={{ false: "#dfe4f4", true: "#dfe4f4" }}
                    thumbColor={!isEnabled ? "#fff" : "#fff"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => onValueChange(props.item)}
                    value={!isEnabled}
                />
            </View>
        )
    }

    const onValueChange = (item: IAlarm) => {
        const newAlarmList = AlarmList.map(element => {
            if (element.id === item.id) {
                return {
                    ...item,
                    isEnabled: !item.isEnabled
                }
            }
            else {
                return element
            }
        })
        setAlarmList(newAlarmList)
    }

    return (
        <Screen>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={AlarmList}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
            <View style={styles.buttonView}>
                <Button>Add</Button>
            </View>
        </Screen>
    )
}

export default Alarm