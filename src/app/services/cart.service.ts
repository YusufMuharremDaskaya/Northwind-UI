import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { CartItems } from '../models/cartItems';
import { CartItem } from '../models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addToCart(product:Product) {
    let item = CartItems.find(c => c.product.productId == product.productId);

    if(item){
      item.quantity +=1
    }else{
      let cartItem = {product:product, quantity:1}
      CartItems.push(cartItem)
    }
  }

  list():CartItem[]{
    return CartItems
  }

  removeFromCart(product:Product):void {
    let item = CartItems.find(c => c.product.productId == product.productId);
    CartItems.splice(CartItems.indexOf(item), 1)
  }
}
