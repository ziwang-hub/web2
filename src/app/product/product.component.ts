import { Component, OnInit } from '@angular/core';

import { TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Product } from './Product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productForm: FormGroup;
  modalRef: BsModalRef;
  products$: Observable<Product>;
  baseUrl = 'http://172.20.10.4:4000/';

  currentProduct: Product;
  id: AbstractControl;
  ProductName: AbstractControl;
  ProductKey: AbstractControl;
  Description: AbstractControl;

  constructor(private fb: FormBuilder, private httpclient: HttpClient, private modalService: BsModalService) {
    this.productForm = this.fb.group({
      'id': [''],
      'ProductName': [''],
      'ProductKey': [''],
      'Description': [''],
    });

    this.id = this.productForm.controls['id'];
    this.ProductName = this.productForm.controls['ProductName'];
    this.ProductKey = this.productForm.controls['ProductKey'];
    this.Description = this.productForm.controls['Description'];
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
    this.products$ = <Observable<Product>>this.httpclient.get(this.baseUrl + 'searchAllProduct');
  }

  select(product: Product) {
    this.currentProduct = product;
    console.log(this.currentProduct);
    this.productForm.setValue(this.currentProduct);
  }

  searchall() {
    this.products$ = <Observable<Product>>this.httpclient.get(this.baseUrl + 'searchAllProduct');
  }

  add() {
    this.httpclient.post(this.baseUrl + 'addProduct', this.productForm.value).subscribe(
      (val: any) => {
        if (val.succ) { // val是服务器返回的值
          alert('添加成功!');
          this.searchall();
        }
        else{
          alert('添加失败!');
          this.searchall();
        }
      }
    );
  }

  delete() {
    console.log(typeof (this.currentProduct.id));
    // let did = String(this.currentProduct.id);
    this.httpclient.post(this.baseUrl + 'deleteProduct', this.productForm.value).subscribe(
      (val: any) => {
        if (val.succ) {
          alert('删除成功!');
          this.searchall();
        }
        else{
          alert('删除失败!');
          this.searchall();
        }
      }
    )
  }

  update() {
    this.httpclient.post(this.baseUrl + 'updateProduct', this.productForm.value).subscribe(
      (val: any) => {
        if (val.succ) {
          alert('修改成功!');
          this.searchall();
        }
        else{
          alert('修改失败!');
          this.searchall();
        }
      }
    )
  }

  search() {
    if (this.id.value) {
      // console.log(this.id.value);
      this.products$ = <Observable<Product>>this.httpclient.get(this.baseUrl + 'searchProduct/' + this.id.value);
    } else {
      this.products$ = <Observable<Product>>this.httpclient.get(this.baseUrl + 'searchAllProduct');
    }
  }


}
