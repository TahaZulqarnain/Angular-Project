import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProductList, IProducts } from '../../interfaces/products/products';

@Injectable({
    providedIn: 'root',
})
export class SharedService {
    // Initialize an empty product list as an observable
    private productsSource = new BehaviorSubject<any[]>([]);
    products$ = this.productsSource.asObservable();

    private editingProductSubject = new BehaviorSubject<any[]>([]);
    editingProduct$ = this.editingProductSubject.asObservable();

    private updateProductSource = new BehaviorSubject<any[]>([]);
    updtedProduct$ = this.updateProductSource.asObservable();

    constructor() { }

    // Add product to the list
    addNewProduct(product: any) {
        const currentProducts = this.productsSource.value;
        this.productsSource.next([...currentProducts, product]);
    }

    editProduct(updateProduct: any) {
        this.editingProductSubject.next(updateProduct);
    }

    editProductValue(updateProduct: any) {
        this.updateProductSource.next(updateProduct);
    }
}
