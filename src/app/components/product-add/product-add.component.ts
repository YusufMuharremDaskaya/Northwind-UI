import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productAddForm : FormGroup;
  categories : Category[] = []

  constructor(private formBuilder:FormBuilder, private toastr:ToastrService,
     private categoryService:CategoryService, private productService:ProductService) { }

  ngOnInit(): void {
    this.createProductAddForm()
    this.getCategories()
  }

  createProductAddForm() {
    this.productAddForm = this.formBuilder.group({
      productName:["", Validators.required],
      unitPrice:[0, Validators.required],
      unitsInStock:[0, Validators.required],
      categoryId:[0, Validators.required]
    })
  }

  add() {
    if(!this.productAddForm.valid){
      this.toastr.error("Formunuz Geçersiz", "Hata")
      return
    }
    let product:Product = Object.assign(this.productAddForm.value, {categoryId:parseInt(this.productAddForm.value.categoryId)})
    console.log(product)
    this.productService.add(product).subscribe({
      next: (result) =>
      {
        if(result.success == false){
          this.toastr.error(result.message, "Hata")
          return
        }
        this.toastr.success(result.message, "Ürün eklendi")
      }})
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(
      result => this.categories = result.data
    )
  }
}
