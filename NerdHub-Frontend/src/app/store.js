import { configureStore } from '@reduxjs/toolkit';
import userAuthentication from '../slices/userSlices/userAuthenticationSlice';
import userRegister from '../slices/userSlices/userRegisterSlice';
import userConfirmation from '../slices/userSlices/userConfirmationSlice';
import userDetails from '../slices/userSlices/userDetailsSlice';
import userUpdateSlice from '../slices/userSlices/userUpdateSlice';
import eventsGetSlice from '../slices/eventSlices/eventsGetSlice';
import eventsCategoriesGetSlice from '../slices/eventSlices/eventsCategoriesGetSlice';
import eventsVenuesGetSlice from '../slices/eventSlices/eventsVenuesGetSlice';
import eventDeleteSlice from '../slices/eventSlices/eventDeleteSlice';
import eventGetSlice from '../slices/eventSlices/eventGetSlice';
import eventUpdateSlice from '../slices/eventSlices/eventUpdateSlice';
import eventCreateSlice from '../slices/eventSlices/eventCreateSlice';
import homePageContentGetSlice from '../slices/pageSlices/homePageContentSlices/homePageContentGetSlice';
import homePageContentUpdateSlice from '../slices/pageSlices/homePageContentSlices/homePageContentUpdateSlice';
import aboutPageContentGetSlice from '../slices/pageSlices/aboutPageContentSlices/aboutPageContentGetSlice';
import aboutPageContentUpdateSlice from '../slices/pageSlices/aboutPageContentSlices/aboutPageContentUpdateSlice';
import contactPageContentGetSlice from '../slices/pageSlices/contactPageContentSlices/contactPageContentGetSlice';
import contactPageContentUpdateSlice from '../slices/pageSlices/contactPageContentSlices/contactPageContentUpdateSlice';
import cartPageContentGetSlice from '../slices/pageSlices/cartPageContentSlices/cartPageContentGetSlice';
import cartPageContentUpdateSlice from '../slices/pageSlices/cartPageContentSlices/cartPageContentUpdateSlice';
import imageUploadeSliceCreater from '../slices/assetSlices/imageUploadSlice';
import multipleImagesUploadSlice from '../slices/assetSlices/multipleImageUploadSlice';
import galleryGetSlice from '../slices/gallerySlices/galleryGetSlice';
import productsGetSlice from '../slices/productSlices/productsGetSlice';
import productGetSlice from '../slices/productSlices/productGetSlice';
import productCreateSlice from '../slices/productSlices/productCreateSlice';
import productDeleteSlice from '../slices/productSlices/productDeleteSlice';
import productUpdateSlice from '../slices/productSlices/productUpdateSlice';
import productsCategoriesGetSlice from '../slices/productSlices/productsCategoriesGetSlice';
import productsBrandsGetSlice from '../slices/productSlices/productsBrandsGetSlice';
import cartSlice from '../slices/shopSlices/cartSlice';
import galleryTagsGetSlice from '../slices/gallerySlices/galleryTagsGetSlice';
import galleryItemDeleteSlice from '../slices/gallerySlices/galleryItemDeleteSlice';
import galleryPageContentGetSlice from '../slices/pageSlices/galleryPageContentSlices/galleryPageContentGetSlice';
import galleryPageContentUpdateSlice from '../slices/pageSlices/galleryPageContentSlices/galleryPageContentUpdateSlice';
import membershipPageContentGetSlice from '../slices/pageSlices/membershipPageContentSlices/membershipPageContentGetSlice';
import membershipPageContentUpdateSlice from '../slices/pageSlices/membershipPageContentSlices/membershipPageContentUpdateSlice';
import footerContentGetSlice from '../slices/pageSlices/footerContentSlices/footerContentGetSlice';
import footerContentUpdateSlice from '../slices/pageSlices/footerContentSlices/footerContentUpdateSlice';
import comicsGetSlice from '../slices/comicSlices/comicsGetSlice';
import comicsCategoriesGetSlice from '../slices/comicSlices/comicsCategoriesGetSlice';
import comicDeleteSlice from '../slices/comicSlices/comicDeleteSlice';
import comicGetSlice from '../slices/comicSlices/comicGetSlice';
import comicUpdateSlice from '../slices/comicSlices/comicUpdateSlice';
import comicCreateSlice from '../slices/comicSlices/comicCreateSlice';
import shopPageContentGetSlice from '../slices/pageSlices/shopPageContentSlices/shopPageContentGetSlice';
import shopPageContentUpdateSlice from '../slices/pageSlices/shopPageContentSlices/shopPageContentUpdateSlice';
import productPageContentGetSlice from '../slices/pageSlices/productPageContentSlices/productPageContentGetSlice';
import productPageContentUpdateSlice from '../slices/pageSlices/productPageContentSlices/productPageContentUpdateSlice';
import orderPageContentGetSlice from '../slices/pageSlices/orderPageContentSlices/orderPageContentGetSlice';
import orderPageContentUpdateSlice from '../slices/pageSlices/orderPageContentSlices/orderPageContentUpdateSlice';
import comicPageContentGetSlice from '../slices/pageSlices/comicPageContentSlices/comicPageContentGetSlice';
import comicPageContentUpdateSlice from '../slices/pageSlices/comicPageContentSlices/comicPageContentUpdateSlice';
import eventPageContentGetSlice from '../slices/pageSlices/eventPageContentSlices/eventPageContentGetSlice';
import eventPageContentUpdateSlice from '../slices/pageSlices/eventPageContentSlices/eventPageContentUpdateSlice';
import galleryItemUpdateSlice from '../slices/gallerySlices/galleryItemUpdateSlice';
import galleryItemGetSlice from '../slices/gallerySlices/galleryItemGetSlice';
import orderCreateSlice from '../slices/shopSlices/orderCreateSlice';
import loginPageContentGetSlice from '../slices/pageSlices/loginPageContentSlices/loginPageContentGetSlice';
import loginPageContentUpdateSlice from '../slices/pageSlices/loginPageContentSlices/loginPageContentUpdateSlice';
import registerPageContentGetSlice from '../slices/pageSlices/registerPageContentSlices/registerPageContentGetSlice';
import registerPageContentUpdateSlice from '../slices/pageSlices/registerPageContentSlices/registerPageContentUpdateSlice';
import landingPageContentGetSlice from '../slices/pageSlices/landingPageContentSlices/landingPageContentGetSlice';
import landingPageContentUpdateSlice from '../slices/pageSlices/landingPageContentSlices/landingPageContentUpdateSlice';
import socialMediaContentGetSlice from '../slices/pageSlices/socialMediaContentSlices/socialMediaContentGetSlice';
import socialMediaContentUpdateSlice from '../slices/pageSlices/socialMediaContentSlices/socialMediaContentUpdateSlice';

export const store = configureStore({
  preloadedState: {
    userAuthentication: {
      user: localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : null
    },
    cartSlice: {
      cart: localStorage.getItem('cart')
        ? JSON.parse(localStorage.getItem('cart'))
        : [],
      shippingAddress: localStorage.getItem('shippingAddress')
        ? JSON.parse(localStorage.getItem('shippingAddress'))
        : null
    }
  },
  reducer: {
    userAuthentication: userAuthentication,
    userRegister: userRegister,
    userConfirmation: userConfirmation,
    userDetails: userDetails,
    userUpdateSlice: userUpdateSlice,
    eventsGetSlice: eventsGetSlice,
    eventsCategoriesGetSlice: eventsCategoriesGetSlice,
    eventsVenuesGetSlice: eventsVenuesGetSlice,
    eventDeleteSlice: eventDeleteSlice,
    eventGetSlice: eventGetSlice,
    eventUpdateSlice: eventUpdateSlice,
    eventCreateSlice: eventCreateSlice,
    comicsGetSlice: comicsGetSlice,
    comicsCategoriesGetSlice: comicsCategoriesGetSlice,
    comicDeleteSlice: comicDeleteSlice,
    comicGetSlice: comicGetSlice,
    comicUpdateSlice: comicUpdateSlice,
    comicCreateSlice: comicCreateSlice,
    homePageContentGetSlice: homePageContentGetSlice,
    homePageContentUpdateSlice: homePageContentUpdateSlice,
    loginPageContentGetSlice: loginPageContentGetSlice,
    loginPageContentUpdateSlice: loginPageContentUpdateSlice,
    landingPageContentGetSlice: landingPageContentGetSlice,
    landingPageContentUpdateSlice: landingPageContentUpdateSlice,
    registerPageContentGetSlice: registerPageContentGetSlice,
    registerPageContentUpdateSlice: registerPageContentUpdateSlice,
    aboutPageContentGetSlice: aboutPageContentGetSlice,
    aboutPageContentUpdateSlice: aboutPageContentUpdateSlice,
    shopPageContentGetSlice: shopPageContentGetSlice,
    shopPageContentUpdateSlice: shopPageContentUpdateSlice,
    comicPageContentGetSlice: comicPageContentGetSlice,
    comicPageContentUpdateSlice: comicPageContentUpdateSlice,
    eventPageContentGetSlice: eventPageContentGetSlice,
    eventPageContentUpdateSlice: eventPageContentUpdateSlice,
    productPageContentGetSlice: productPageContentGetSlice,
    productPageContentUpdateSlice: productPageContentUpdateSlice,
    contactPageContentGetSlice: contactPageContentGetSlice,
    contactPageContentUpdateSlice: contactPageContentUpdateSlice,
    cartPageContentGetSlice: cartPageContentGetSlice,
    cartPageContentUpdateSlice: cartPageContentUpdateSlice,
    orderPageContentGetSlice: orderPageContentGetSlice,
    orderPageContentUpdateSlice: orderPageContentUpdateSlice,
    galleryPageContentGetSlice: galleryPageContentGetSlice,
    galleryPageContentUpdateSlice: galleryPageContentUpdateSlice,
    membershipPageContentGetSlice: membershipPageContentGetSlice,
    membershipPageContentUpdateSlice: membershipPageContentUpdateSlice,
    footerContentGetSlice: footerContentGetSlice,
    footerContentUpdateSlice: footerContentUpdateSlice,
    socialMediaContentGetSlice: socialMediaContentGetSlice,
    socialMediaContentUpdateSlice: socialMediaContentUpdateSlice,
    imageUploadSliceA: imageUploadeSliceCreater('imageUploadSliceA'),
    imageUploadSliceB: imageUploadeSliceCreater('imageUploadSliceB'),
    imageUploadSliceC: imageUploadeSliceCreater('imageUploadSliceC'),
    imageUploadSliceD: imageUploadeSliceCreater('imageUploadSliceD'),
    imageUploadSliceE: imageUploadeSliceCreater('imageUploadSliceE'),
    imageUploadSliceF: imageUploadeSliceCreater('imageUploadSliceF'),
    multipleImagesUploadSlice: multipleImagesUploadSlice,
    galleryGetSlice: galleryGetSlice,
    galleryTagsGetSlice: galleryTagsGetSlice,
    galleryItemDeleteSlice: galleryItemDeleteSlice,
    galleryItemGetSlice: galleryItemGetSlice,
    galleryItemUpdateSlice: galleryItemUpdateSlice,
    productsGetSlice: productsGetSlice,
    productGetSlice: productGetSlice,
    productCreateSlice: productCreateSlice,
    productDeleteSlice: productDeleteSlice,
    productUpdateSlice: productUpdateSlice,
    productsCategoriesGetSlice: productsCategoriesGetSlice,
    productsBrandsGetSlice: productsBrandsGetSlice,
    cartSlice: cartSlice,
    orderCreateSlice: orderCreateSlice
  }
});
