import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// implemented in class because componentDidCatch is not available in hooks yet

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorName: null };
    }

    static getDerivedStateFromError(error) {
        // this for ui fallback error.
        return { hasError: true };
    }

    componentDidCatch(error, errorDetail) {
        //   this is for displaying error 
        this.setState({
            hasError: true,
            error: errorDetail.componentStack,
            errorName: error.toString()
        });
    }

    render() {
        if (this.state.hasError) {
            return (
                <View style={styles.container}>
                    <Text style={styles.errorTxt}>
                        Error:- {
                            this.state.error
                        }
                    </Text>
                    <Text style={styles.errorTxt}>
                        Error Name:- {
                            this.state.errorName
                        }
                    </Text>
                    <Text style={styles.errorTxt}>
                        Error In:- {
                            this.state.errorDetail
                        }
                    </Text>
                </View>
            );
        }

        return this.props.children;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorTxt: {
        color: '#f00',
        padding: 10,
        margin: 5,
    }
});