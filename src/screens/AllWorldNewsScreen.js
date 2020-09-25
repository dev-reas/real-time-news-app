import React from 'react';
import { StyleSheet, FlatList, RefreshControl } from 'react-native';
import { UserContext } from '../Context/UserContext';
import axios from 'axios';
import { Header } from '../components/Header';
import { ProductHead } from '../components/ProductHead';
import { BASE_URL } from '../config';
import { SimpleAnimation } from 'react-native-simple-animations';
import { MyActionButton } from '../components/MyActionButton';
import {
    responsiveScreenWidth
} from 'react-native-responsive-dimensions';

export function AllWorldNewsScreen(props) {
    const { token } = React.useContext(UserContext);
    const [loading, setLoading] = React.useState(true);
    const [head, setHead] = React.useState();

    const OpenMenu = () => {
        props.navigation.pop();
    }

    const HeadNews = async () => {
        await axios.get(`${BASE_URL}/api/all-headnews`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(({ data }) => {
            setHead(data);
            setLoading(false);
        })
    }

    React.useEffect(() => {
        HeadNews()
    }, [token])

    function renderHead({ item: productHead }) {
        return (
            <SimpleAnimation delay={500} useNativeDriver={true} fade
                duration={500} staticType={'zoom'}>
                <ProductHead
                    productHead={productHead}
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
                data={head}
                renderItem={renderHead}
                keyExtractor={item => { item.id }}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={() => HeadNews()} />}
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