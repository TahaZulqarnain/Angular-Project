import { Component } from '@angular/core';
import { ProductService } from '../../../../core/services/products/product.service';
import { SharedService } from '../../../../core/services/common/shared.service';
import { IProductList, IProducts } from '../../../../core/interfaces/products/products';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css'],
})
export class ListProductComponent {
  products: IProductList[] = [];
  page: number = 1;
  totalProducts: number = 0;
  searchTerm: string = '';
  filteredProducts: IProductList[] = [];
  productinfo: any;


  constructor(private productService: ProductService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getAllProducts();
    // Subscribe to the products observable to get the product list
    this.sharedService.products$.subscribe((products: IProductList[]) => {
      if (products && products.length > 0) {
        this.products.unshift(products[0]);
        this.totalProducts++;
      }
    });

    this.sharedService.updtedProduct$.subscribe((updateproducts: any) => {

      if (updateproducts) {
        const index = this.products.findIndex(p => p.id === updateproducts.id);
        if (index !== -1) {
          this.products[index] = updateproducts; // Update the existing product in the list
        }
      }
    });

  }

  getAllProducts(searchVal?: string): void {
    const _queryParamObj: any = {};
    // If a search value is provided, add it to the query parameters
    if (searchVal && searchVal.trim() !== '') {
      _queryParamObj.q = searchVal;
    }
    else {
      _queryParamObj.sortBy = 'title',
        _queryParamObj.order = 'asc'
    }
    this.productService.getAllProducts(_queryParamObj, searchVal).subscribe((data: any) => {
      this.products = data.products;
      this.totalProducts = data.total;
    });
  }
  // Delete product
  deleteProduct(productinfo: any): void {
    //if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productinfo.id).subscribe(
        (response: any) => {
          this.products = this.products.filter(product => product.id !== productinfo.id);  // Update the UI
          this.totalProducts--;
        },
        (error: any) => {
          console.error('Error deleting product', error);
        }
      );
    //}
  }

  editProduct(productinfo: any): void {
    // Add edit logic
    this.productService.getSingleProduct(productinfo.id).subscribe(
      (response: any) => {
        //this.productinfo = response;
        this.sharedService.editProduct(response);
      },
      (error: any) => {
        console.error('Error deleting product', error);
      }
    );
  }

}
