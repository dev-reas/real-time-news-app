import React from 'react';
import { StyleSheet, FlatList, RefreshControl } from 'react-native';
import { UserContext } from '../Context/UserContext';
import axios from 'axios';
import { Header } from '../components/Header';
import { Product } from '../components/Product';
import { BASE_URL } from '../config';
import { SimpleAnimation } from 'react-native-simple-animations';
import { MyActionButton } from '../components/MyActionButton';
import {
    responsiveScreenWidth
} from 'react-native-responsive-dimensions';

export function AllPHNewsScreen(props) {
    const { token } = React.useContext(UserContext);
    const [loading, setLoading] = React.useState(true);
    const [products, setProducts] = React.useState();

    const OpenMenu = () => {
        props.navigation.pop();
    }

    const PHNews = async () => {
        await axios.get(`${BASE_URL}/api/all-news`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(({ data }) => {
            setProducts(data);
            setLoading(false);
        })
    }

    React.useEffect(() => {
        PHNews()
    }, [token])

    function renderProduct({ item: product }) {
        return (
            <SimpleAnimation delay={500} useNativeDriver={true} fade
                duration={500} staticType={'zoom'}>
                <Product
                    product={product}
                />
            </SimpleAnimation>
        );
    }

    return (
        <>
            <Header name={'close-box'} onPress={OpenMenu} />
            <FlatList
                contentContainerStyle={styles.productsListContainer1}
                windowSize={5}
                maxToRenderPerBatch={4}
                data={products}
                renderItem={renderProduct}
                keyExtractor={item => { item.id }}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={() => PHNews()} />}
            />
            <MyActionButton
                AboutPressHandler={() => { props.navigation.push('About'); }}
                ProfilePressHandler={() => { props.navigation.push('Profile'); }}
                PostPressHandler={() => { props.navigation.push('Post'); }} />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    productsListContainer: {
        width: responsiveScreenWidth(100),
    },
});