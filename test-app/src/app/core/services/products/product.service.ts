import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { BaseAPIService } from '../bolierPlate/baseApiService';
import { IProducts } from '../../interfaces/products/products';
import { CommonService } from '../../services/common/common.service';

@Injectable({
    providedIn: 'root'
})

export abstract class ProductService extends BaseAPIService {
    public _endPoint = "";
    // Initialize an empty product list as an observable
    private productsSource = new BehaviorSubject<any[]>([]);
    products$ = this.productsSource.asObservable();

    constructor(protected override http: HttpClient, private commonService: CommonService) {
        super(http);
    }

    addProduct(request: IProducts): Observable<any> {
        this._endPoint = "products/add";
        this.API_URL = this._endPoint;
        return this.create(request);
    }

    editProduct(request: IProducts, id: number): Observable<any> {
        this._endPoint = "products";
        this.API_URL = this._endPoint;
        return this.update(id, request);
    }
    getAllProducts(filterObject?: any, searchVal: string = '') {
        this._endPoint = 'products';
        this.API_URL = this._endPoint;

        if (Object.keys(filterObject).length > 0 && searchVal == '') {
            this.API_URL = this.API_URL + "?" + this.commonService.serialize(filterObject);
        }
        else if (Object.keys(filterObject).length > 0 && searchVal != '') {
            this.API_URL = this.API_URL + "/search?" + this.commonService.serialize(filterObject);
        }
        return this.getAll(filterObject);

    }

    getAllCategories() {
        this.API_URL = 'products/categories';
        return this.getAll(this.API_URL);
    }
    // Delete product by id
    deleteProduct(id: number): Observable<any> {
        this._endPoint = 'products';
        this.API_URL = this._endPoint;
        return this.delete(id);
    }

    getSingleProduct(id: number){
    this._endPoint = "products";
    this.API_URL = this._endPoint;
    return this.getById(id);
    }

}
