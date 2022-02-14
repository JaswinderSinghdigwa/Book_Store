/* eslint-disable prettier/prettier */
import express from 'express';
import * as cartController from '../controllers/cart.controller';
import { auth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to add cart
router.put('/addtocart', auth, cartController.addtocart);

// route to removeFromCart
router.put('/removefromcart/:bookId', auth, cartController.removefromcart);

// route to veiw his Cart by the user
router.get('/viewcart', auth, cartController.viewcart);

// route to place order
router.put('/placeorder', auth, cartController.placeorder);

export default router;