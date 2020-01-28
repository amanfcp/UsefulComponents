import React from 'react';
import {
    View,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Easing,
} from 'react-native';
import {
    Text,
    Button
} from 'native-base';
import {
    Input,
    Icon
} from 'react-native-elements'
import colors from '../../colors/colors';
import NestedListView, { NestedRow } from 'react-native-nested-listview';
import Axios from 'axios';
import {
    Portal,
    Dialog,
    Provider,
    RadioButton,
} from 'react-native-paper'
import {
    BarIndicator
} from 'react-native-indicators'

import { Apis, header } from '../../Apis/api';



export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            finalNode: false,
            category: [],
            selectedCategory: '',
        }
    }
    getChildrenName = node => {
        if (node.hasSubCategory) {
            return 'subCategory'
        }
        else {
            return null
        }
    }
    componentDidMount() {
        Axios.get(Apis.GetCategories, { headers: header }).then(res => {
            this.setState({
                category: [res.data.children_data[0]],
                loading: false
            })
        }).catch(err => {
            console.warn(err.message);
            this.setState({
                loading: false,
            })
        })
    }
    render() {
        const {
            category, selectedCategory, finalNode,
        } = this.state

        return (
            <ScrollView
                style={styles.main}
            >
                <NestedListView
                    data={category}
                    getChildrenName={(node) => 'children_data'}
                    onNodePressed={(node) => node.children_data.length > 0 ? null : this.setState({ finalNode: true, selectedCategory: node.name }, console.log(node))}

                    renderNode={(node, level) => (
                        <NestedRow
                            children={node.children_data}
                            paddingLeftIncrement={level * 2.5}
                            level={level}
                        >
                            <View
                                style={finalNode && level == 1 ? styles.categoryFinal : styles.categoryItem}
                            >
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <Text>{level == 1 ? 'Category' : node.name}</Text>
                                    <Text>{level == 1 ? selectedCategory : null}</Text>
                                </View>
                                {
                                    node.children_data.length > 0 ?
                                        <Icon
                                            name='right'
                                            type='antdesign'
                                            size={15}
                                            iconStyle={{
                                                marginLeft: 10,
                                            }}
                                        /> : null
                                }
                            </View>
                        </NestedRow>
                    )}
                />
            </ScrollView>
        );
    }
};

const styles = StyleSheet.create({
    main: {
        flexGrow: 1,
    },
    iconContainer: {
        paddingRight: 10,
        paddingBottom: 30
    },
    rightIconContainer: {
        paddingRight: 10,
        paddingBottom: 15,
    },
    categoryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        height: 50,
        marginTop: 1.5,
        marginHorizontal: 10,
        backgroundColor: colors.tabGray,
        borderBottomWidth: 0.5,
        borderColor: colors.white,
    },
    categoryFinal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        height: 50,
        marginTop: 1.5,
        marginHorizontal: 10,
        backgroundColor: colors.green + '80',
        borderBottomWidth: 0.5,
        borderColor: colors.white,
    },
});