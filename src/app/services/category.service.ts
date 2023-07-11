import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { Category } from '../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url:string = 'https://localhost:7197/api/categories/getall'
  constructor(private httpClient: HttpClient) { }

  getCategories() : Observable<ListResponseModel<Category>> {
    return this.httpClient.get<ListResponseModel<Category>>(this.url)
  }
  
}
