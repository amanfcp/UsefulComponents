import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'

import colors from '../../colors/colors';
import BottomSheet from 'reanimated-bottom-sheet'
import Animated from 'react-native-reanimated'

export default class App extends React.Component {
    renderInner = () => (
        <View style={styles.panel}>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Products')}
                style={styles.panelButton}
            >
                <Text style={styles.panelButtonTitle}>Products</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Orders')}
                style={styles.panelButton}>
                <Text style={styles.panelButtonTitle}>Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('AddProducts')}
                style={styles.panelButton}>
                <Text style={styles.panelButtonTitle}>Add Products</Text>
            </TouchableOpacity>
        </View>
    )

    renderHeader = () => <View style={styles.header} />

    fall = new Animated.Value(1)

    render() {
        return (
            <View style={styles.container}>
                <BottomSheet
                    snapPoints={[380, 50]}
                    renderContent={this.renderInner}
                    renderHeader={this.renderHeader}
                    initialSnap={1}
                    callbackNode={this.fall}
                    enabledInnerScrolling={false}
                    enabledContentTapInteraction={false}
                />
                <Animated.View
                    style={{
                        alignItems: 'center',
                        opacity: Animated.add(0.1, Animated.multiply(this.fall, 0.9)),
                    }}
                >
                    <View
                        style={styles.main}
                    >
                        <Text>Hey There!</Text>
                    </View >
                </Animated.View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    panelContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    panel: {
        height: 600,
        padding: 20,
        backgroundColor: '#2c2c2fAA',
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        shadowOpacity: 0.4,
    },
    header: {
        width: '100%',
        height: 100,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#292929',
        backgroundColor: '#fff',
        alignItems: 'center',
        marginVertical: 10,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#000',
    },
});