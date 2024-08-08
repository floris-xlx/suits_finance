import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'


interface Cart {
    inCart?: boolean;
    itemAmount?: number;
    isCartEmpty?: boolean;
    title?: string;
    total?: number;
    isInCartCheckout?: boolean;
    loading?: boolean;
}


interface CartStore {
    cart?: Cart;


    // cart presence actions
    setInCart: () => void;
    setNotInCart: () => void;

    // cart item amount actions
    setItemAmount: (amount: number) => void;

    // cart empty actions
    clearItemAmount: () => void;

    // cart empty actions
    setCartEmpty: () => void;
    setCartNotEmpty: () => void;

    // cart metadata actions
    setCartTitle: (title: string) => void;

    // cart total actions
    setCartTotal: (total: number) => void;

    // cart checkout actions
    setIsInCartCheckout: () => void;
    setIsNotInCartCheckout: () => void;

    // cart loading actions
    setIsLoading: () => void;
    setIsNotLoading: () => void;
}


export const useCartStore = create<CartStore>()(
    persist(
        (set) => ({
            cart: {
                inCart: false,
                itemAmount: 0,
                isCartEmpty: true,
                title: 'Shopping cart',
                total: 0,
                isInCartCheckout: false,
                loading: true
            },

            // cart presence actions
            setInCart: () => set((state) => ({
                cart: {
                    inCart: true,
                    itemAmount: state.cart?.itemAmount,
                    isCartEmpty: state.cart?.isCartEmpty,
                    title: state.cart?.title,
                    total: state.cart?.total,
                    isInCartCheckout: state.cart?.isInCartCheckout,
                    loading: state.cart?.loading
                }
            })),
            setNotInCart: () => set((state) => ({
                cart: {
                    inCart: false,
                    itemAmount: state.cart?.itemAmount,
                    isCartEmpty: state.cart?.isCartEmpty,
                    title: state.cart?.title,
                    total: state.cart?.total,
                    isInCartCheckout: state.cart?.isInCartCheckout,
                    loading: state.cart?.loading
                }
            })),

            // cart item amount actions
            setItemAmount: (amount) => set((state) => ({
                cart: {
                    inCart: state.cart?.inCart,
                    itemAmount: amount,
                    isCartEmpty: state.cart?.isCartEmpty,
                    title: state.cart?.title,
                    total: state.cart?.total,
                    isInCartCheckout: state.cart?.isInCartCheckout,
                    loading: state.cart?.loading
                }
            })),

            clearItemAmount: () => set((state) => ({
                cart: {
                    inCart: state.cart?.inCart,
                    itemAmount: 0,
                    isCartEmpty: true,
                    title: state.cart?.title,
                    total: state.cart?.total,
                    isInCartCheckout: state.cart?.isInCartCheckout,
                    loading: state.cart?.loading
                }
            })),

            // cart empty actions
            setCartEmpty: () => set((state) => ({
                cart: {
                    inCart: state.cart?.inCart,
                    itemAmount: state.cart?.itemAmount,
                    isCartEmpty: true,
                    title: state.cart?.title,
                    total: state.cart?.total,
                    isInCartCheckout: state.cart?.isInCartCheckout,
                    loading: state.cart?.loading
                }
            })),

            setCartNotEmpty: () => set((state) => ({
                cart: {
                    inCart: state.cart?.inCart,
                    itemAmount: state.cart?.itemAmount,
                    isCartEmpty: false,
                    title: state.cart?.title,
                    total: state.cart?.total,
                    isInCartCheckout: state.cart?.isInCartCheckout,
                    loading: state.cart?.loading
                }
            })),

            // cart metadata actions
            setCartTitle: (title) => set((state) => ({
                cart: {
                    inCart: state.cart?.inCart,
                    itemAmount: state.cart?.itemAmount,
                    isCartEmpty: state.cart?.isCartEmpty,
                    title: title,
                    total: state.cart?.total,
                    isInCartCheckout: state.cart?.isInCartCheckout,
                    loading: state.cart?.loading
                }
            })),

            // cart total actions
            setCartTotal: (total) => set((state) => ({
                cart: {
                    inCart: state.cart?.inCart,
                    itemAmount: state.cart?.itemAmount,
                    isCartEmpty: state.cart?.isCartEmpty,
                    title: state.cart?.title,
                    total: total,
                    isInCartCheckout: state.cart?.isInCartCheckout,
                    loading: state.cart?.loading
                }
            })),

            // cart checkout actions
            setIsInCartCheckout: () => set((state) => ({
                cart: {
                    inCart: state.cart?.inCart,
                    itemAmount: state.cart?.itemAmount,
                    isCartEmpty: state.cart?.isCartEmpty,
                    title: state.cart?.title,
                    total: state.cart?.total,
                    isInCartCheckout: true,
                    loading: state.cart?.loading
                }
            })),

            setIsNotInCartCheckout: () => set((state) => ({
                cart: {
                    inCart: state.cart?.inCart,
                    itemAmount: state.cart?.itemAmount,
                    isCartEmpty: state.cart?.isCartEmpty,
                    title: state.cart?.title,
                    total: state.cart?.total,
                    isInCartCheckout: false,
                    loading: state.cart?.loading
                }
            })),

            // cart loading actions
            setIsLoading: () => set((state) => ({
                cart: {
                    inCart: state.cart?.inCart,
                    itemAmount: state.cart?.itemAmount,
                    isCartEmpty: state.cart?.isCartEmpty,
                    title: state.cart?.title,
                    total: state.cart?.total,
                    isInCartCheckout: state.cart?.isInCartCheckout,
                    loading: true
                }
            })),

            setIsNotLoading: () => set((state) => ({
                cart: {
                    inCart: state.cart?.inCart,
                    itemAmount: state.cart?.itemAmount,
                    isCartEmpty: state.cart?.isCartEmpty,
                    title: state.cart?.title,
                    total: state.cart?.total,
                    isInCartCheckout: state.cart?.isInCartCheckout,
                    loading: false
                }
            })),


        }),

        {
            name: 'xlx-cart-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
