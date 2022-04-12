import React from 'react';
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import FeaturedSimilarProductCard from './FeaturedSimilarProductCard';
import * as Colors from '../constants/ColorDefs';
const NewArrivalsBlock = (props) => {
    const { data, onProductSelected = () => { }, viewAllSelected = () => { },onLoaderStateChanged = () =>{}, onUpdation = () =>{} } = props
    return (
        <View
            style={{
                marginTop: 10,
                alignItems: 'center',
                backgroundColor: Colors.WHITE,
                paddingVertical: 13,
                paddingHorizontal: 32,
                shadowColor: Colors.GRAY,
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowRadius: 2,
                shadowOpacity: 0.5,
                marginBottom: 10,
                elevation: 2,
            }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16 }}>
                <Text
                    style={{
                        fontSize: 16,
                        textAlign: 'left',
                        textAlignVertical: 'center',
                        color: Colors.CLR_1D2A39,
                        fontWeight: 'bold',
                        width: '100%'
                    }}>
                    New Arrivals
                </Text>
                <TouchableOpacity
                    onPress={() => viewAllSelected()}
                    style={{
                        fontSize: 12,
                        textAlign: 'left',
                        textAlignVertical: 'center',
                        fontWeight: 'bold',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                    }}>
                    <Text
                        style={{
                            fontSize: 15,
                            color: Colors.CLR_0065FF
                        }}>
                        View All
                    </Text>
                </TouchableOpacity>
            </View>
            <FlatList
                style={{ width: '100%', marginTop: 14, paddingVertical: 5, paddingHorizontal: 3 }}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => (
                    <View style={{ height: 14 }} />
                )}
                numColumns={2}
                keyExtractor={(item, index) => 'key_' + index}
                data={data.slice(0, 4)}
                renderItem={({ item, index }) => {
                    return (
                        <FeaturedSimilarProductCard
                            item={item}
                            isNewArrival={true}
                            index={index + 1}
                            onLoaderStateChanged={(isLoading) => {
                                onLoaderStateChanged(isLoading)
                            }}
                            onPlusMinusPressed={() => {
                                onPlusMinusPressed()
                            }}
                            onUpdation={() => {
                                onUpdation()
                            }}
                            onPress={() => {
                                onProductSelected(item);
                            }}
                        />
                    )
                }}
            />
        </View>
    );
};

export default NewArrivalsBlock;
