import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '@sevenseven/products';
import { Subject } from 'rxjs';

@Component({
    selector: 'brightly-home-page',
    templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit, OnDestroy {

  endsubs$: Subject<any> = new Subject();
    constructor(private prodService: ProductsService) {



    }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
      window.location.reload();
      this.endsubs$.next(this.endsubs$);
      this.endsubs$.complete();
  }
}
