export const initialState = {
    basket: [],
    user: null,
    productDetailId: null,
    allProducts: [],
    productDetail: {
        id: null,
        title: null,
        img: null,
        price: null,
        rating: null,
        category: null,
        subCategory: null,
    },
}

//selector
export const getBasketTotal = (basket) => {
    let sum = 0;
    basket?.map((elm) => (sum += Number(elm.price * elm.qnt)));
    return sum;
}

export const maxProductIds = 10000;

export const productID = [];

// capitalizeFirstLetter
export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const reducer = (state, action) => {
    switch (action.type) {

        case 'ADD_TO_BASKET':
            if (state.basket.find(item => item.id === action.item.id)) {
                let index2 = state.basket.findIndex(
                    (basketItem) => basketItem.id === action.item.id
                );
                let num = action.item.qnt / 2;
                // let num = action.item.qnt;
                state.basket[index2].qnt = state.basket[index2].qnt + num;
                console.log(state.basket[index2].qnt);
                return {
                    ...state,
                    basket: state.basket
                }
            } else {
                return {
                    ...state,
                    basket: [...state.basket, action.item]
                };
            }

        case 'UPDATE_BASKET':
            const index1 = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );
            let newBasket1 = [...state.basket];
            newBasket1[index1].qnt = action.qnt;
            return {
                ...state,
                basket: newBasket1
            }

        case 'REMOVE_FROM_BASKET':
            console.log(state.basket);
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id && basketItem.qnt === action.qnt
            );
            console.log(index, " ", action.qnt);
            let newBasket = [...state.basket];
            if (index >= 0) {
                newBasket.splice(index, 1);
            } else {
                console.warn(`cant remove product (id: ${action.id}) as its not in basket !`)
            }
            return {
                ...state,
                basket: newBasket
            }

        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: []
            }

        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }

        case 'SET_ALL_PRODUCTS':
            return {
                ...state,
                allProducts: action.allProducts
            }

        case 'SET_PRODUCT_DETAIL_ID':
            return {
                ...state,
                productDetailId: action.productDetailId
            }

        case 'SET_PRODUCT_DETAILS':
            return {
                ...state,
                productDetail: action.productDetail
            }

        default:
            return state;
    }
}

export default reducer;
