import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { HttpClient } from '@angular/common/http'
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  
  products:Product[] = []
  dataLoaded:boolean = false;
  filterText:string =""

  constructor(private productService:ProductService,
     private activatedRoute:ActivatedRoute, private toastrService: ToastrService, private cartService:CartService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params=> {
        if(params["categoryId"]){
          this.getProductsByCategory(params["categoryId"]);
        }else{
          this.getProducts()
        }
      }

    )
  }

  getProducts() {
    this.productService.getProdcuts().subscribe(
      result => {
      this.products = result.data 
      this.dataLoaded = true
    }
    );
  }

  getProductsByCategory(categoryId:number) {
    this.productService.getProdcutsByCategoryId(categoryId).subscribe(
      result => {
      this.products = result.data 
      this.dataLoaded = true
    }
    );
  }

  addToCart(product:Product) {
    this.cartService.addToCart(product);
    this.toastrService.success("Sepete Eklendi", product.productName)
  }

}
