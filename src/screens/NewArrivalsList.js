import React, { useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AppHeader from '../components/AppHeader';
import CategoryRoundedCardList from '../components/CategoryRoundedCardList';
import SubcategoryList from '../components/SubcategoryList';
import VerticalProductCard from '../components/VerticalProductCard';
import {
    getVerticalByCategory,
    getCategoryBySubCategory,
    getProductBySubCategory,
    getProductByCategoryAndStore
} from '../apihelper/Api.js';
import RPLoader from '../components/RPLoader';
import * as Colors from '../constants/ColorDefs';
const cart_icon = require('../../assets/cart_icon.png');
const search_icon = require('../../assets/search_icon.png');
import SearchProductModel from '../components/SearchProductModel';
import NoData from '../components/NoData';
import * as RPCartManager from '../helpers/RPCartManager';

const NewArrivalsList = props => {
    const navigation = useNavigation();
    const storeID = global.storeInfo.id;
    const [isLoading, setIsLoading] = useState(false);
    const companyID = global.storeInfo.company_id;
    const isFocused = useIsFocused();
    const [cartCount, setCartCount] = useState(0);

    const details = props?.route?.params;

    const products = [{
        "category_id": 108,
        "deal_price": "",
        "deal_type": "",
        "deal_type_id": "",
        "image": "https://rewardsplus.in/uploads/app/public/company/product/8361.webp",
        "is_deal": 0,
        "mrp": "42.00",
        "name": "Brinjal Green Long 500g",
        "no_of_q_a": 5,
        "no_of_quantity_allowed": 5,
        "product_id": 168489,
        "q_number": "500",
        "selling_price": "39.00",
        "stock": 105,
        "subcategory_id": 393,
        "uname": "g"
    },
    {
        "category_id": 108,
        "deal_price": "",
        "deal_type": "",
        "deal_type_id": "",
        "image": "https://rewardsplus.in/uploads/app/public/company/product/8361.webp",
        "is_deal": 0,
        "mrp": "42.00",
        "name": "Brinjal Green Long 500g",
        "no_of_q_a": 5,
        "no_of_quantity_allowed": 5,
        "product_id": 168489,
        "q_number": "500",
        "selling_price": "39.00",
        "stock": 105,
        "subcategory_id": 393,
        "uname": "g"
    },
    {
        "category_id": 108,
        "deal_price": "",
        "deal_type": "",
        "deal_type_id": "",
        "image": "https://rewardsplus.in/uploads/app/public/company/product/8361.webp",
        "is_deal": 0,
        "mrp": "42.00",
        "name": "Brinjal Green Long 500g",
        "no_of_q_a": 5,
        "no_of_quantity_allowed": 5,
        "product_id": 168489,
        "q_number": "500",
        "selling_price": "39.00",
        "stock": 105,
        "subcategory_id": 393,
        "uname": "g"
    },
    {
        "category_id": 108,
        "deal_price": "",
        "deal_type": "",
        "deal_type_id": "",
        "image": "https://rewardsplus.in/uploads/app/public/company/product/8361.webp",
        "is_deal": 0,
        "mrp": "42.00",
        "name": "Brinjal Green Long 500g",
        "no_of_q_a": 5,
        "no_of_quantity_allowed": 5,
        "product_id": 168489,
        "q_number": "500",
        "selling_price": "39.00",
        "stock": 105,
        "subcategory_id": 393,
        "uname": "g"
    },
    {
        "category_id": 108,
        "deal_price": "",
        "deal_type": "",
        "deal_type_id": "",
        "image": "https://rewardsplus.in/uploads/app/public/company/product/8361.webp",
        "is_deal": 0,
        "mrp": "42.00",
        "name": "Brinjal Green Long 500g",
        "no_of_q_a": 5,
        "no_of_quantity_allowed": 5,
        "product_id": 168489,
        "q_number": "500",
        "selling_price": "39.00",
        "stock": 105,
        "subcategory_id": 393,
        "uname": "g"
    }]

    const updateCart = () => {
        RPCartManager.decideAndGetCartData(cartItems => {
            const count = cartItems && cartItems.length ? cartItems.length : 0;
            setCartCount(count);
            global.badgeCount = count;
        });
    };

    useEffect(() => {
        if (isFocused) {
            updateCart();
        }
    }, [isFocused]);



    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'flex-start',
            }}>
            <AppHeader
                isLeftIconEnabeld={true}
                title={"New Arrivals"}
                onLeftPress={() => {
                    navigation.goBack();
                }}
                rightIcons={[
                    {
                        iconSource: cart_icon,
                        color: Colors.CLR_5F259F,
                        badgeCount: cartCount,
                        onPress: () => {
                            navigation.navigate('Cart');
                        },
                        iconBg: Colors.GREEN,
                    }
                ]}
            />
            {isLoading && <RPLoader />}
            {products?.length > 0 && (
                <FlatList
                    style={{ width: '100%', marginTop: 12, backgroundColor: Colors.WHITE }}
                    horizontal={false}
                    keyExtractor={(item, index) => 'key_' + index}
                    ItemSeparatorComponent={() => (
                        <View style={{ height: 10, width: '100%' }} />
                    )}
                    data={products}
                    renderItem={({ item }) => (
                        <VerticalProductCard
                            item={item}
                            onUpdation={() => {
                                updateCart();
                            }}
                            onProductSelected={() => {
                                navigation.navigate('ProductDetailsContainer', {
                                    store_id: storeID,
                                    product_id: item.product_id,
                                    company_id: companyID,
                                });
                            }}
                            onLoaderStateChanged={(isLoading) => {
                                setIsLoading(isLoading)
                            }}
                        />
                    )}
                    ListFooterComponent={() => {
                        return <View style={{ height: 30, width: '100%' }} />;
                    }}
                />
            )}
        </View>
    );
};

export default NewArrivalsList;
