import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProductList, IProducts } from '../../../../core/interfaces/products/products';
import { ProductService } from '../../../../core/services/products/product.service';
import { ICategories } from '../../../../core/interfaces/categories/categories';
import { SharedService } from '../../../../core/services/common/shared.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  productForm: FormGroup;
  categories: ICategories[] = [];
  isEditMode = false;
  products: IProducts[] = [];
  productlist: IProductList[] = [];
  editProductId: number = 0;
  categoryVal!: string;
  constructor(private fb: FormBuilder, private productService: ProductService, private sharedService: SharedService) {
    // Initialize the form group with controls
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      price: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getAllCategories();
    this.sharedService.editingProduct$.subscribe((getproducts: any) => {
      if (getproducts.length == 0) {
        this.isEditMode = false;
      }
      else {
        this.isEditMode = true;
        this.products = getproducts;
        this.editProductId = getproducts.id;
        this.prepopulateForm(getproducts);
      }
    })
  }

  onSubmit() {
    if (this.productForm.valid) {
      // Create a product object from the form values
      const newProduct: IProducts = {
        title: this.productForm.value.productName,
        category: this.productForm.value.category,
        price: this.productForm.value.price,
        stock: this.productForm.value.quantity,
      };

      if (this.isEditMode) {
        // Call the service to add the product
        this.productService.editProduct(newProduct, this.editProductId).subscribe({
          next: (response: any) => {
            this.sharedService.editProductValue(response);
            this.productForm.reset();  // Reset the form after successful submission
          },
          error: (error: any) => {
            console.error('Error Editing product', error);
            alert('Error Editing product!');
          }
        });
      }
      else {
        // Call the service to add the product
        this.productService.addProduct(newProduct).subscribe({
          next: (response: any) => {
            this.sharedService.addNewProduct(response);
            this.productForm.reset();  // Reset the form after successful submission
          },
          error: (error: any) => {
            console.error('Error adding product', error);
            alert('Error adding product!');
          }
        });
      }
    }
  }


  getAllCategories() {
    this.productService.getAllCategories().subscribe({
      next: (response: any) => {
        this.categories = response;
      },
      error: (error: any) => {
        console.error('Error adding product', error);
        alert('Error adding product!');
      }
    });
  }
  prepopulateForm(product: IProducts) {
    if (product) {
      this.productForm.patchValue({
        productName: product.title,
        price: product.price,
        quantity: product.stock,
        category: product.category,
      });

    }
  }
}
