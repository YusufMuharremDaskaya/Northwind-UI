import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories : Category[] = []
  currentCategory: Category = {categoryId: -1, categoryName:""};

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories()
  }

  setCurrentCategory(category: Category) {
    this.currentCategory = category
  }

  getCurrentCategory(category: Category) {
    if(this.currentCategory == category){
      return "list-group-item active"
    }else{ 
      return "list-group-item"
    }
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      response => {
        this.categories = response.data
      }
    )
    
  }
}
