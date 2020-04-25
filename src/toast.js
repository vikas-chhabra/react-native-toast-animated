import React, { Component } from 'react';
import { Text, Animated, Platform, Dimensions } from 'react-native';
import { color } from './colors';
import styles from './styles';

const HEIGHT = Dimensions.get('window').height;
export default class Toast extends Component {
    constructor(props) {
        super(props);
        let tempHeight = Platform.OS === 'ios' ? (props.height ? (props.height + 20) : (120)) : (props.height ? (props.height) : (100))
        this.state = {
            topValue: new Animated.Value(-Math.abs(tempHeight)),
            msg: '',
            type: 'success',
            height: tempHeight,
            background: '',
            text: '#fff',
            paddingTop: props.paddingTop ? props.paddingTop : 30,
            borderRadius: props.borderRadius ? props.borderRadius : 0,
            borderTopRightRadius: props.borderTopRightRadius ? props.borderTopRightRadius : 20,
            borderTopLeftRadius: props.borderTopLeftRadius ? props.borderTopLeftRadius : 20,
        }
    }
    componentWillUnmount() {
        clearTimeout(this.showToast);
    }
    render() {
        let { topValue, type, height, msg, text, background, paddingTop, borderRadius, borderTopRightRadius, borderTopLeftRadius } = this.state;
        if (this.props.bottom) {
            topValue = HEIGHT - topValue;
        }
        return (
            <Animated.View
                style={[styles.toastContainer, {
                    backgroundColor: type !== '' ? (color[type]) : (background),
                    height: height,
                },
                this.props.bottom ? (
                    {
                        transform: [
                            { translateY: topValue }
                        ],
                        // bottom: topValue,
                        justifyContent: 'flex-start',
                        paddingTop,
                        borderRadius,
                        borderTopRightRadius,
                        borderTopLeftRadius,
                    }
                ) : (
                        {
                            transform: [
                                { translateY: topValue }
                            ],
                            // top: topValue,
                        }
                    )
                ]}>
                <Text style={[styles.textContent, { color: text }]}>{msg}</Text>
            </Animated.View>
        )
    }
    showToast = (params, callback) => {
        let { topValue, height } = this.state;
        this.setState({
            msg: params.msg,
            type: params.type ? (params.type) : (''),
            background: params.backgroundColor ? (params.backgroundColor) : (color.success),
            text: params.textColor ? (params.textColor) : ('#fff')
        }, () => {
            Animated.spring(topValue,
                {
                    toValue: 0,
                    friction: params.friction ? (params.friction) : (1.2),
                    tension: params.tension ? (params.tension) : (0.8),
                    useNativeDriver: true
                }
            ).start();

            setTimeout(_ = () => {
                if (callback) {
                    callback()
                }
                //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
                Animated.spring(topValue,
                    {
                        toValue: -Math.abs(height),
                        friction: 5,
                        tension: 0.7,
                        useNativeDriver: true
                    }
                ).start();

            }, params.time ? (params.time) : (2000));
        })
    }
}