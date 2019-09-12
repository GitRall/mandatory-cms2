import Home from './components/Home.vue';
import Product from './components/Product.vue';
import Cart from './components/Cart.vue';
import Checkout from './components/Checkout.vue';

export const routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/product/:id', component: Product, name: 'product' },
  { path: '/cart', component: Cart, name: 'cart'},
  { path: '/cart/checkout', component: Checkout, name: 'checkout'}
]
