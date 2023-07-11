import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ListResponseModel } from '../models/listResponseModel'
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = "https://localhost:7197/api/"
  
  constructor(private httpClient:HttpClient) { }

  getProdcuts(): Observable<ListResponseModel<Product>>{
    let newPath = this.apiUrl + 'products/getall'
    return this.httpClient.get<ListResponseModel<Product>>(newPath)
  }

  getProdcutsByCategoryId(categoryId:number): Observable<ListResponseModel<Product>>{
    let newPath = this.apiUrl + 'products/getbycategory?id=' + categoryId
    return this.httpClient.get<ListResponseModel<Product>>(newPath)
  }
}
