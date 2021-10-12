import { Button, Icon, Screen, Text } from '@/components'
import { LIGHT_THEME } from '@/constants/color'
import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { FlatList, Switch, View, TextInput, Pressable, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as styles from './styles'
import Modal from "react-native-modalbox";
import * as mainStyle from '@/constants/style'
import DatePicker from 'react-native-date-picker'
import moment from 'moment'


interface IAlarm {
    id: number,
    name: string,
    time: Date,
    duration: IPickDate[],
    isEnabled: boolean
}

interface IItemProps {
    item: IAlarm
}

const DATE_OF_WEEK = ['Mo', 'To', 'We', 'Th', 'Fr', 'Sa', 'Su']

interface IPickDate {
    name: string
    isActive: boolean
}

const Alarm: FunctionComponent = () => {
    const [alarmList, setAlarmList] = useState<IAlarm[]>([])
    const [modalVisible, setModalVisible] = useState(false);
    const [date, setDate] = useState(new Date())
    const [pickDates, setPickDate] = useState<IPickDate[]>([])
    const [alarmName, setAlarmName] = useState('');
    const [status, setStatus] = useState('Add')
    const [editId, setEditId] = useState<number>()
    const flatRef = useRef<FlatList>(null)
    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        resetPickDate()
    }, [])

    const resetPickDate = () => {
        const dates = DATE_OF_WEEK.map(date => {
            return {
                name: date,
                isActive: true
            }
        })
        setPickDate(dates)
    }

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('ALARM')
            if (jsonValue !== null) {
                setAlarmList(JSON.parse(jsonValue))
            }
        } catch (e) {
            setAlarmList([])
        }
    }

    const setData = async (newAlarmList: IAlarm[]) => {
        await AsyncStorage.setItem('ALARM', JSON.stringify(newAlarmList))
    }

    const onPressDelete = (id: number) => {
        Alert.alert('Alert', 'Do you want to delete this alarm ?',
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "OK", onPress: () => deleteAlarm(id) }
            ])
    }

    const deleteAlarm = async (id: number) => {
        const newAlarmList = alarmList.filter(element => element.id !== id)
        setAlarmList(newAlarmList)
        setData(newAlarmList)
    }

    const onPressAlarm = (item: IAlarm) => {
        setStatus('Edit')
        setModalVisible(true)
        setAlarmName(item.name)
        setPickDate(item.duration)
        setDate(new Date(item.time))
        setEditId(item.id)
    }


    const renderItem = (props: IItemProps) => {
        const { name, time, duration, isEnabled, id } = props.item
        return (
            <Pressable style={styles.itemView} onPress={() => onPressAlarm(props.item)}>
                <Text color={LIGHT_THEME.GRAY_BLUR_COLOR} fontSize={12} paddingBottom={10}>{name}</Text>
                <Text isClockFont fontSize={30} paddingBottom={15}>{moment(time).format('LT')}</Text>
                <View style={[styles.dateListView, { marginLeft: 0 }]}>
                    {duration.filter(date => date.isActive).length < 7 ? duration.map((item =>
                        <View style={[styles.dateItem, {borderColor: renderColor(item.name)}, item.isActive && { borderWidth: 1 }]} key={item.name}>
                            <Text color={renderColor(item.name)} fontSize={10} fontWeight='400'>{item.name}</Text>
                        </View>))
                : <Text fontWeight='400'>Everyday</Text>    
            }
                </View>
                <Pressable style={styles.deleteView} onPress={() => onPressDelete(id)}>
                    <Icon name='RedDelete' />
                </Pressable>
                <Switch
                    style={styles.itemSwichView}
                    trackColor={{ false: "#dfe4f4", true: "#378805" }}
                    ios_backgroundColor="#fff"
                    onValueChange={() => onValueChange(props.item)}
                    value={isEnabled}
                />
            </Pressable>
        )
    }

    const onValueChange = async (item: IAlarm) => {
        const newAlarmList = alarmList.map(element => {
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
        await setData(newAlarmList)
        setAlarmList(newAlarmList)
    }

    const onPressAdd = () => {
        setStatus('Add')
        setDate(new Date())
        resetPickDate()
        setModalVisible(true)
    }

    const onPressRightBtn = async (status: string) => {
        setModalVisible(false)

        let newAlarmList: IAlarm[] = []
        if (status === 'Add') {
            const newAlarm = {
                id: new Date().getTime(),
                name: alarmName || `Alarm ${(alarmList.length + 1).toString()}`,
                time: date,
                duration: pickDates,
                isEnabled: true
            }
            newAlarmList = [...alarmList, newAlarm]
        }
        else if (status === 'Edit') {
            newAlarmList = alarmList.map(alarm => {
                if (alarm.id === editId) {
                    return {
                        ...alarm,
                        name: alarmName || `Alarm ${(alarmList.length + 1).toString()}`,
                        time: date,
                        duration: pickDates,
                    }
                }
                else return alarm
            })
        }
        setAlarmList(newAlarmList)
        setTimeout(() => {
            flatRef.current?.scrollToEnd()
        }, 0)
        setAlarmName('')
        await setData(newAlarmList)

    }

    const onClosed = () => {
        setModalVisible(false)
    }

    const onPressDate = (date: string) => {
        const newPickDates = pickDates.map(item => {
            if (item.name === date) {
                return {
                    ...item,
                    isActive: !item.isActive
                }
            }
            else return item
        })
        setPickDate(newPickDates)
    }

    const renderColor = (date: string) => {
        switch (date) {
            case 'Su':
                return 'red'
            case 'Sa':
                return 'green'
            default:
                return '#0b0b0c'
        }
    }
    return (
        <Screen>
            <FlatList
                ref={flatRef}
                showsVerticalScrollIndicator={false}
                data={alarmList}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
            />
            <View style={styles.buttonView}>
                <Button onPress={onPressAdd}>Add</Button>
            </View>
            <Modal
                isOpen={modalVisible} position={"bottom"} entry={"bottom"} backdropOpacity={0} swipeToClose={true}
                coverScreen={true}
                style={styles.modalView}
                onClosed={() => onClosed()}
            >
                <View style={[mainStyle.alignItemsCenter, mainStyle.fullHeight]}>
                    <View style={styles.line} />
                    <View style={styles.dateTitle}>
                        <TextInput placeholder='Alarm name' value={alarmName} onChangeText={setAlarmName}
                        />
                    </View>
                    <View style={styles.dateListView}>
                        {pickDates.map((item =>
                            <Pressable style={[styles.dateItem, item.isActive && { borderWidth: 1 }]} key={item.name} onPress={() => onPressDate(item.name)}>
                                <Text fontSize={10} fontWeight='200'>{item.name}</Text>
                            </Pressable>))}
                    </View>

                    <DatePicker androidVariant='iosClone' is24hourSource='device' mode='time' date={date} onDateChange={setDate} />
                    <View style={styles.optionView}>
                        <Pressable onPress={() => setModalVisible(false)}>
                            <Text fontWeight='400' color={LIGHT_THEME.GRAY_BLUR_COLOR}>Cancel</Text>
                        </Pressable>
                        <Text fontWeight='400'>|</Text>
                        <Pressable onPress={() => onPressRightBtn(status)}>
                            <Text fontWeight='400'>{status}</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </Screen>
    )
}

export default Alarm