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
            height: tempHeight,
            background: '',
            text: ''
        }
    }
    componentWillUnmount() {
        clearTimeout(this.showToast);
    }
    render() {
        let { topValue, type, height, msg, text } = this.state;
        return (
            <Animated.View
                style={[styles.toastContainer, {
                    top: topValue,
                    backgroundColor: type!==''?(color[type]):(background),
                    height: height
                }]}>
                <Text style={[styles.textContent, {color: text}]}>{msg}</Text>
            </Animated.View>
        )
    }
    showToast = (params) => {

        // let params = {
        //     msg: 'message', required, string
        //     type: 'danger', optional, enum || danger || warn || success || info
        //     backgroundColor: '#abc', optinal , string 
        //     textColor: '#abc', optionoal , string,
        //     friction: 21, optional, number,
        //     tension: 12, optional , number,
        //     time: 10202, optional , number
        // }

        let { topValue, height } = this.state;
        this.setState({
            msg: params.msg,
            type: params.type?(params.type):(''),
            background: params.backgroundColor?(params.backgroundColor):(color.success),
            text: params.textColor?(params.textColor):('#fff')
        }, () => {
            Animated.spring(topValue,
                {
                    toValue: 0,
                    friction: params.friction?(params.friction):(1.2),
                    tension: params.tension?(params.tension):(0.8)
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

            }, params.time?(params.time):(2000));
        })
    }
}