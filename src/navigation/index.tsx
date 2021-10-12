import React from 'react';
import { createMaterialTopTabNavigator, MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import * as Screens from '@/screens';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableHighlight, TouchableOpacity, TouchableOpacityBase, TouchableWithoutFeedback, TouchableWithoutFeedbackComponent, View } from 'react-native';
import { LIGHT_THEME } from '@/constants/color';
import * as styles from './styles'
import { Text } from '@/components';
const Tab = createMaterialTopTabNavigator();

function MyTabBar({ state, descriptors, navigation, position }: MaterialTopTabBarProps) {
    return (
        <View style={styles.tabContainerView}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate({ name: route.name, key: '', merge: true });
                    }
                };
                return (
                    <TouchableWithoutFeedback key={index}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}

                    >
                        <View style={[styles.tabView, isFocused && styles.tabViewFocus]}>
                            <Text color={!isFocused ? LIGHT_THEME.GRAY_BLUR_COLOR : LIGHT_THEME.TEXT_NORMAL_COLOR}>
                                {label}
                            </Text>
                        </View>

                    </TouchableWithoutFeedback>
                );
            })}
        </View>
    );
}



const TabContainer = () => {
    const insets = useSafeAreaInsets()
    return (
        <>
            <View style={{ height: insets.top, backgroundColor: LIGHT_THEME.BACKGROUND_COLOR }}></View>
            <Tab.Navigator
                tabBar={props => <MyTabBar {...props} />}
            >
                <Tab.Screen name="Stopwatch" component={Screens.Stopwatch} />
                <Tab.Screen name="Alarm" component={Screens.Alarm} />
                <Tab.Screen name="Timer" component={Screens.Countdown} />
            </Tab.Navigator>
        </>
    );
}

export default TabContainer