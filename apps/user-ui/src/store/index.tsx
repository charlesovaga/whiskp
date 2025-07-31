import {create} from 'zustand';
import {persist} from 'zustand/middleware';


type SelectedOptions = {
    // color?: string;
    // size?: string;
    unit?: string;
    // [key: string]: any; // optional for future extensibility
  }
  
 
  

type Product = {
    id: string;
    title: string;
    price: number;
    image: string;
    quantity?: number;
    unit?: string;
    shopId: string;
    selectedOptions?: SelectedOptions; 
}

type Store = {
    cart: Product[];
    wishlist: Product[];
    addToCart: (
        product: Product,
        existingUser: any,
        location: string,
        deviceInfo: string,
    ) => void
    removeFromCart: (
        id: string,
        existingUser: any,
        location: string,
        deviceInfo: string, 
    ) => void
    addToWishlist: (
        product: Product,
        existingUser: any,
        location: string,
        deviceInfo: string,
    ) => void
    removeFromWishlist: (
        id: string,
        existingUser: any,
        location: string,
        deviceInfo: string, 
    ) => void
}

export const useStore = create<Store>()(
    persist(
        (set, get) => ({
            cart: [],
            wishlist: [],
            addToCart: (product, existingUser, location, deviceInfo) => {
                set((state) => {
                  const existing = state.cart?.find((item) => item.id === product.id);
                  if (existing) {
                    return {
                      cart: state.cart.map((item) =>
                        item.id === product.id
                          ? { ...item, quantity: (item.quantity ?? 1) + 1 }
                          : item
                      ),
                    };
                  }
              
                  return {
                    cart: [
                      ...state.cart, 
                      { 
                        ...product, 
                        quantity: 1, 
                        selectedOptions: { unit: product.unit || "" }  // map unit here
                      }
                    ],
                  };
                });
              },
              
              
            removeFromCart: (id, existingUser, location, deviceInfo) => {
                // find the product before calling set
                const removeProduct = get().cart.find((item) => item.id === id)
                set((state) => ({
                    cart: state.cart?.filter(item => item.id !== id)
                })
                );
            },
            addToWishlist: (product, existingUser, location, deviceInfo) => {
                set((state) => {
                    if(state.wishlist.some(item => item.id === product.id)) // check if product already exists
                    return state;
                   return { wishlist: [...state.wishlist, { ...product, quantity: 1 }] }

                })
            },
            removeFromWishlist: (id, existingUser, location, deviceInfo) => {
                const removeProduct = get().wishlist.find((item) => item.id === id)
                set((state) => ({
                    wishlist: state.wishlist?.filter(item => item.id !== id)
                })
                );
            }
        }),
        {
            name: "store-storage", // unique name for the storage
        }
    )
);