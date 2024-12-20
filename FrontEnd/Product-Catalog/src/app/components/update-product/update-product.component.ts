import { Component,  OnInit  } from '@angular/core';
import { Product } from '../../model/product-entity';
import { ProductDataService } from '../../services/product-data.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-product',
  imports: [ RouterOutlet , CommonModule , ReactiveFormsModule , FormsModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent implements OnInit {

  
  public InventoryStatus = ['In Stock' , 'Out Of Stock'];
   
  ProductForm! : FormGroup ; 

 
  get ProductName(){
    return this.ProductForm.get('ProductName');
   }
   get ProductPrice(){
       return this.ProductForm.get('ProductPrice');
   }
   
   public productid : number = 0 ;
   public product? : Product;

  constructor(private fb: FormBuilder, private productService: ProductDataService , private route : ActivatedRoute ,private router :Router 
    ) {
    
   
  }
  ngOnInit(): void {
    
    this.ProductForm =this.fb.group({
      ProductName :['' , [Validators.required ,Validators.minLength(3)]],
      ProductPrice :['' , [Validators.required , Validators.min(1)]],
      ProductDescription :[''],
      ProductStatus :['']
    })
   
    let id = parseInt(this.route.snapshot.paramMap.get('id')!);
    console.log(id);
  
    this.productService.getDatabyId(id).subscribe({
      next: (data) => {
        this.product = data;
        console.log(this.product);
  
        this.ProductForm.patchValue({
          ProductName: this.product.productName,
          ProductPrice: this.product.productPrice,
          ProductDescription: this.product.productDescription,
          ProductStatus: this.product.productStatus,
        });
      },
      error: (err) => {
        console.error('Error fetching product data:', err);
      },
    });
  
    this.productid = id;
  }

  
  
  updateProduct(): void {
    var Productvalues : Product = this.ProductForm.value
    console.log(Productvalues);
   
    this.productService.updateData(Productvalues, this.productid).subscribe({
      next: (data) => {
        console.log('Product updated successfully:', data);
      },
      error: (err) => {
        console.error('Error updating product:', err);
      },
    });
    this.router.navigate(['/home']);
  }
  
}




