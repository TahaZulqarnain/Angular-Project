import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProductList, IProducts } from 'src/app/core/interfaces/products/products';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product!: IProducts;
  @Output() editProduct = new EventEmitter<IProducts>();
  @Output() deleteProduct = new EventEmitter<IProducts>();

  onEdit() {
    this.editProduct.emit(this.product);
  }

  onDelete() {
    this.deleteProduct.emit(this.product);
  }
}
