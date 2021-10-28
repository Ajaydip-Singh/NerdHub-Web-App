import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/video-react/dist/video-react.css'; // import css

import PrivateRoute from './components/PrivateRoute';
import MemberRoute from './components/MemberRoute';
import AdminRoute from './components/AdminRoute';
import AdminPanelScreen from './screens/AdminScreens/AdminPanelScreen/AdminPanelScreen';
import EventEditScreen from './screens/AdminScreens/EventEditScreen/EventEditScreen';
import EventsPageScreen from './screens/AdminScreens/EventsPageScreen/EventsPageScreen';
import ProductsListScreen from './screens/AdminScreens/ProductsListScreen/ProductsListScreen';
import AboutScreen from './screens/PublicScreens/AboutScreen/AboutScreen';
import ContactScreen from './screens/PublicScreens/ContactScreen/ContactScreen';
import HomeScreen from './screens/PublicScreens/HomeScreen/HomeScreen';
import GalleryScreen from './screens/PublicScreens/GalleryScreen/GalleryScreen';
import LoginScreen from './screens/PublicScreens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/PublicScreens/RegisterScreen/RegisterScreen';
import ProfileScreen from './screens/PublicScreens/ProfileScreen/ProfileScreen';
import EventsScreen from './screens/PublicScreens/EventsScreen/EventsScreen';
import HomePageScreen from './screens/AdminScreens/HomePageScreen/HomePageScreen';
import AboutPageScreen from './screens/AdminScreens/AboutPageScreen/AboutPageScreen';
import ContactPageScreen from './screens/AdminScreens/ContactPageScreen/ContactPageScreen';
import MembershipScreen from './screens/PublicScreens/MembershipScreen/MembershipScreen';
import ShopScreen from './screens/PublicScreens/ShopScreen/ShopScreen';
import ProductEditScreen from './screens/AdminScreens/ProductEditScreen/ProductEditScreen';
import ProductScreen from './screens/PublicScreens/ProductScreen/ProductScreen';
import CartScreen from './screens/PublicScreens/CartScreen/CartScreen';
import CartPageScreen from './screens/AdminScreens/CartPageScreen/CartPageScreen';
import ShippingScreen from './screens/PublicScreens/ShippingScreen/ShippingScreen';
import OrderScreen from './screens/PublicScreens/OrderScreen/OrderScreen';
import GalleryListScreen from './screens/AdminScreens/GalleryListScreen/GalleryListScreen';
import GalleryPageScreen from './screens/AdminScreens/GalleryPageScreen /GalleryPageScreen';
import MembershipPageScreen from './screens/AdminScreens/MembershipPageScreen/MembershipPageScreen';
import FooterPageScreen from './screens/AdminScreens/FooterPageScreen/FooterPageScreen';
import ComicsListScreen from './screens/AdminScreens/ComicsListScreen/ComicsListScreen';
import ComicEditScreen from './screens/AdminScreens/ComicEditScreen/ComicEditScreen';
import ComicsScreen from './screens/PublicScreens/ComicsScreen/ComicsScreen';
import PostPaymentScreen from './screens/PublicScreens/PostPaymentScreen/PostPaymentScreen';
import ShopPageScreen from './screens/AdminScreens/ShopPageScreen/ShopPageScreen';
import ProductPageScreen from './screens/AdminScreens/ProductPageScreen/ProductPageScreen';
import OrderPageScreen from './screens/AdminScreens/OrderPageScreen/OrderPageScreen';
import LandingScreen from './screens/PublicScreens/LandingScreen/LandingScreen';
import ComicPageScreen from './screens/AdminScreens/ComicPageScreen/ComicPageScreen';
import EventPageScreen from './screens/AdminScreens/EventPageScreen/EventPageScreen';
import GalleryEditScreen from './screens/AdminScreens/GalleryEditScreen/GalleryEditScreen';
import LoginPageScreen from './screens/AdminScreens/LoginPageScreen/LoginPageScreen';
import RegisterPageScreen from './screens/AdminScreens/RegisterPageScreen/RegisterPageScreen';
import LandingPageScreen from './screens/AdminScreens/LandingPageScreen/LandingPageScreen';
import SocialMediaPageScreen from './screens/AdminScreens/SocialMediaPageScreen/SocialMediaPageScreen';
import OrdersListScreen from './screens/AdminScreens/OrdersListScreen/OrdersListScreen';
import OrderDetailsScreen from './screens/PublicScreens/OrderDetailsScreen/OrderDetailsScreen';
import EventOrdersListScreen from './screens/AdminScreens/EventOrdersListScreen/EventOrdersListScreen';
import MembershipOrdersListScreen from './screens/AdminScreens/MembershipOrdersListScreen/MembershipOrdersListScreen';
import OrderHistoryPageScreen from './screens/AdminScreens/OrderHistoryPageScreen/OrderHistoryPageScreen';
import OrdersHistoryScreen from './screens/PublicScreens/OrdersHistoryScreen/OrdersHistoryScreen';

function App() {
  return (
    <Router>
      <Route path="/" exact component={LandingScreen}></Route>
      <Route path="/home" component={HomeScreen}></Route>
      <Route path="/events/:eventId" exact component={EventsScreen}></Route>
      <Route
        path="/events/:name/:category/:venue/:pageNumber"
        exact
        component={EventsScreen}
      ></Route>
      <Route path="/events" exact component={EventsScreen}></Route>
      <Route
        path="/gallery/:tag/:pageNumber"
        component={GalleryScreen}
        exact
      ></Route>
      <Route path="/gallery" component={GalleryScreen} exact></Route>
      <Route path="/about" component={AboutScreen}></Route>
      <Route path="/contact" component={ContactScreen}></Route>
      <Route path="/membership" component={MembershipScreen}></Route>
      <Route path="/shop/products/:id" exact component={ProductScreen}></Route>
      <Route
        path="/shop/orders/:id"
        exact
        component={OrderDetailsScreen}
      ></Route>
      <Route path="/shop/cart" exact component={CartScreen}></Route>
      <Route
        path="/shop/:name/:category/:brand/:pageNumber"
        exact
        component={ShopScreen}
      ></Route>
      <Route path="/shop/" exact component={ShopScreen}></Route>
      <Route
        path="/login/:userId/:confirmationCode"
        component={LoginScreen}
        exact
      ></Route>
      <Route path="/login" component={LoginScreen} exact></Route>
      <Route path="/register" component={RegisterScreen}></Route>
      <MemberRoute
        exact
        path="/comics/:name/:category/:pageNumber"
        component={ComicsScreen}
      ></MemberRoute>
      <MemberRoute path="/comics" exact component={ComicsScreen}></MemberRoute>
      <PrivateRoute
        path="/my-orders"
        exact
        component={OrdersHistoryScreen}
      ></PrivateRoute>
      <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
      <PrivateRoute
        path="/shop/postpayment"
        component={PostPaymentScreen}
      ></PrivateRoute>
      <PrivateRoute
        path="/shop/shipping"
        component={ShippingScreen}
      ></PrivateRoute>
      <PrivateRoute path="/shop/order" component={OrderScreen}></PrivateRoute>

      <AdminRoute path="/adminpanel" component={AdminPanelScreen}></AdminRoute>
      <AdminRoute
        path="/footer-admin"
        component={FooterPageScreen}
        exact
      ></AdminRoute>
      <AdminRoute
        path="/socialMedia-admin"
        component={SocialMediaPageScreen}
        exact
      ></AdminRoute>
      <AdminRoute
        path="/gallery-admin/:pageNumber"
        component={GalleryListScreen}
        exact
      ></AdminRoute>
      <AdminRoute
        path="/gallery-admin"
        component={GalleryListScreen}
        exact
      ></AdminRoute>
      <AdminRoute
        path="/gallery-admin/:id/edit"
        component={GalleryEditScreen}
        exact
      ></AdminRoute>
      <AdminRoute
        path="/products-admin"
        component={ProductsListScreen}
        exact
      ></AdminRoute>
      <AdminRoute
        path="/products-admin/:pageNumber"
        component={ProductsListScreen}
        exact
      ></AdminRoute>
      <AdminRoute
        path="/products-admin/:id/edit"
        component={ProductEditScreen}
        exact
      ></AdminRoute>
      <AdminRoute
        path="/orders-admin"
        component={OrdersListScreen}
        exact
      ></AdminRoute>
      <AdminRoute
        path="/orders-admin/:pageNumber"
        component={OrdersListScreen}
        exact
      ></AdminRoute>
      <AdminRoute
        path="/event-orders-admin"
        component={EventOrdersListScreen}
        exact
      ></AdminRoute>
      <AdminRoute
        path="/event-orders-admin/:pageNumber"
        component={EventOrdersListScreen}
        exact
      ></AdminRoute>
      <AdminRoute
        path="/membership-orders-admin"
        component={MembershipOrdersListScreen}
        exact
      ></AdminRoute>
      <AdminRoute
        path="/membership-orders-admin/:pageNumber"
        component={MembershipOrdersListScreen}
        exact
      ></AdminRoute>

      <AdminRoute
        path="/events-admin/:pageNumber"
        component={EventsPageScreen}
        exact
      ></AdminRoute>
      <AdminRoute
        path="/events-admin"
        component={EventsPageScreen}
        exact
      ></AdminRoute>
      <AdminRoute
        path="/events-admin/:id/edit"
        component={EventEditScreen}
        exact
      ></AdminRoute>
      <AdminRoute
        path="/comics-admin"
        component={ComicsListScreen}
        exact
      ></AdminRoute>
      <AdminRoute
        path="/comics-admin/:pageNumber"
        component={ComicsListScreen}
        exact
      ></AdminRoute>
      <AdminRoute
        path="/comics-admin/:id/edit"
        component={ComicEditScreen}
        exact
      ></AdminRoute>
      <AdminRoute
        path="/home-page-content-admin"
        component={HomePageScreen}
        exact
      ></AdminRoute>
      <AdminRoute
        path="/about-page-content-admin"
        component={AboutPageScreen}
        exact
      ></AdminRoute>
      <AdminRoute
        path="/membership-page-content-admin"
        component={MembershipPageScreen}
        exact
      ></AdminRoute>
      <AdminRoute
        path="/contact-page-content-admin"
        component={ContactPageScreen}
        exact
      ></AdminRoute>
      <AdminRoute
        path="/shop-page-content-admin"
        component={ShopPageScreen}
        exact
      ></AdminRoute>
      <AdminRoute
        path="/comic-page-content-admin"
        component={ComicPageScreen}
        exact
      ></AdminRoute>
      <AdminRoute
        path="/event-page-content-admin"
        component={EventPageScreen}
        exact
      ></AdminRoute>
      <AdminRoute
        path="/product-page-content-admin"
        component={ProductPageScreen}
        exact
      ></AdminRoute>
      <AdminRoute
        path="/cart-page-content-admin"
        component={CartPageScreen}
        exact
      ></AdminRoute>
      <AdminRoute
        path="/order-page-content-admin"
        component={OrderPageScreen}
        exact
      ></AdminRoute>
      <AdminRoute
        path="/gallery-page-content-admin"
        component={GalleryPageScreen}
        exact
      ></AdminRoute>
      <AdminRoute
        path="/login-page-content-admin"
        component={LoginPageScreen}
        exact
      ></AdminRoute>
      <AdminRoute
        path="/orderHistory-page-content-admin"
        component={OrderHistoryPageScreen}
        exact
      ></AdminRoute>
      <AdminRoute
        path="/register-page-content-admin"
        component={RegisterPageScreen}
        exact
      ></AdminRoute>
      <AdminRoute
        path="/landing-page-content-admin"
        component={LandingPageScreen}
        exact
      ></AdminRoute>
    </Router>
  );
}

export default App;
