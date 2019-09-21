import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import Product from './Product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  products: Product[];
  notEmptyProduct = true;
  notscrolly = true;

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.loadInitPost();
  }

  loadInitPost() {
    const url = 'https://localhost:44376/api/product/limitedproduct';
    if (this.products === undefined) {
      this.products = [];
    }
    const data = {offset: this.products.length };
    console.log(data);
    this.http.post(`${url}`, data).subscribe((res: Product[]) => {
      this.products = res;
    });
    console.log(this.products);
  }

  onScroll() {
    if (this.notscrolly && this.notEmptyProduct) {
      this.spinner.show();
      this.notscrolly = false;
      this.loadNextProducts();
    }
  }

  loadNextProducts(){
    const url = 'https://localhost:44376/api/product/limitedproduct';
    this.http.post(`${url}`, {offset: this.products.length})
    .subscribe((data: any) => {
      const newProducts = data[0];
      this.spinner.hide();

      if (newProducts.length === 0) {
        this.notEmptyProduct = false;
      }
      this.products = this.products.concat(newProducts);
      this.notscrolly = true;
    });
  }
}
