import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
    selector: 'products-products-list',
    templateUrl: './products-list.component.html',
    styles: []
})
export class ProductsListComponent implements OnInit {
    products: Product[] = [];
    filteredProducts: Product[] = [];
    categories: Category[] = [];
    isCategoryPage: boolean | undefined;
    rangeValues: number[] = [0, 1000000];

    constructor(private prodService: ProductsService, private catService: CategoriesService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            params['categoryid'] ? this._getProducts([params['categoryid']]) : this._getProducts();
            params['categoryid'] ? (this.isCategoryPage = true) : (this.isCategoryPage = false);
        });
        this._getCategories();
    }

    private _getProducts(categoriesFilter?: string[]) {
        this.prodService.getProducts(categoriesFilter).subscribe((resProducts) => {
            this.products = resProducts;
        });
    }

    private _getProductsPrice(categoriesPriceFilter?: any[]) {
      this.prodService.getProducts(categoriesPriceFilter).subscribe((resProducts) => {
          this.products = resProducts;
      });
  }

    private _getCategories() {
        this.catService.getCategories().subscribe((resCats) => {
            this.categories = resCats;
        });
    }

    categoryFilter() {
        const selectedCategories: any = this.categories.filter((category) => category.checked).map((category) => category.id);
        this._getProducts(selectedCategories);
    }

    // priceFilter() {
    //     //
    //     // const selectedPrice : any = this.categories.filter((price)=> price.name).map((price) => price.id);
    //     // this._getProducts(selectedPrice);
    //     const selectedPrice: any = this.filteredProducts
    //         .filter((itemPrice: any) => {
    //             return itemPrice?.price >= this.rangeValues[0] && itemPrice?.price <= this.rangeValues[1];
    //         })
    //         .map((category) => category.id);
    //     this._getProductsPrice(selectedPrice);
    // }
}
