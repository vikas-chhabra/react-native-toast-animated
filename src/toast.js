import React, { Component } from 'react';
import { Text, Animated, Platform } from 'react-native';
import { color } from './colors';
import styles from './styles';

export default class Toast extends Component {
    constructor(props) {
        super(props);
        let tempHeight = Platform.OS === 'ios' ? (props.height ? (props.height + 20) : (120)) : (props.height ? (props.height) : (100))
        this.state = {
            topValue: new Animated.Value(-Math.abs(tempHeight)),
            msg: '',
            type: 'success',
            height: tempHeight
        }
    }
    componentWillUnmount() {
        clearTimeout(this.showToast);
    }
    render() {
        let { topValue, type, height, msg } = this.state;
        return (
            <Animated.View
                style={[styles.toastContainer, {
                    top: topValue,
                    backgroundColor: color[type],
                    height: height
                }]}>
                <Text style={[styles.textContent]}>{msg}</Text>
            </Animated.View>
        )
    }
    showToast = (params) => {
        let { topValue, height } = this.state;
        this.setState({
            msg: params.msg,
            type: params.type
        }, () => {
            Animated.spring(topValue,
                {
                    toValue: 0,
                    friction: 1.2,
                    tension: 0.8
                }
            ).start();

            setTimeout(_ = () => {

                //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
                Animated.spring(topValue,
                    {
                        toValue: -Math.abs(height),
                        friction: 5,
                        tension: 0.7
                    }
                ).start();

            }, params.time);
        })
    }
}