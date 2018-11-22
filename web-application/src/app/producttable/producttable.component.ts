import {Component, OnInit} from '@angular/core';
import {Product, PRODUCTS} from "../products";

@Component({
  selector: 'app-producttable',
  templateUrl: './producttable.component.html',
  styleUrls: ['./producttable.component.css']
})
export class ProducttableComponent implements OnInit {
  products = PRODUCTS;
  addName;
  addCount;

  plusOne(product: Product): void {
    this.products[this.products.findIndex(i => i.id === product.id)].count++;
  }

  minusOne(product: Product): void {
    let index = this.products.findIndex(i => i.id === product.id);

    if (this.products[index].count != 0) {
      this.products[index].count--;
    }
  }

  deleteProduct(product: Product): void {
    this.products.splice(this.products.findIndex(i => i.id === product.id), 1)
  }

  addProduct(): void {
    if ((this.addName != '') && !isNaN(parseInt(this.addCount))) {
      let index = this.products.findIndex(i => i.name.toUpperCase() === this.addName.toUpperCase());

      if (index === -1) {
        this.products.push({id: this.products.length + 1, name: this.addName, count: parseInt(this.addCount)});
      } else {
        this.products[index].count += parseInt(this.addCount);
      }
    }
  }


  constructor() {
  }

  ngOnInit() {
  }

}
