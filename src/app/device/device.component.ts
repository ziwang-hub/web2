import { Component, OnInit } from '@angular/core';

import { TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Device } from './Device';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {
  deviceForm: FormGroup;
  modalRef: BsModalRef;
  devices$: Observable<Device>;
  baseUrl = 'http://172.20.10.4:4000/';

  currentDevice: Device;
  id: AbstractControl;
  ProductKey: AbstractControl;
  DeviceName: AbstractControl;

  constructor(private fb: FormBuilder, private httpclient: HttpClient, private modalService: BsModalService) {
    this.deviceForm = this.fb.group({
      'id': [''],
      'ProductKey': [''],
      'DeviceName': [''],
    });

    this.id = this.deviceForm.controls['id'];
    this.ProductKey = this.deviceForm.controls['ProductKey'];
    this.DeviceName = this.deviceForm.controls['DeviceName'];
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  
  ngOnInit(): void {
    this.devices$ = <Observable<Device>>this.httpclient.get(this.baseUrl + 'searchAllDevice');
  }

  select(device: Device) {
    this.currentDevice = device;
    console.log(this.currentDevice);
    this.deviceForm.setValue(this.currentDevice);
  }

  searchall() {
    this.devices$ = <Observable<Device>>this.httpclient.get(this.baseUrl + 'searchAllDevice');
  }

  add() {
    this.httpclient.post(this.baseUrl + 'addDevice', this.deviceForm.value).subscribe(
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
    console.log(typeof (this.currentDevice.id));
    // let did = String(this.currentDevice.id);
    this.httpclient.post(this.baseUrl + 'deleteDevice', this.deviceForm.value).subscribe(
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

  search() {
    if (this.id.value) {
      // console.log(this.id.value);
      this.devices$ = <Observable<Device>>this.httpclient.get(this.baseUrl + 'searchDevice/' + this.id.value);
    } else {
      this.devices$ = <Observable<Device>>this.httpclient.get(this.baseUrl + 'searchAllDevice');
    }
  }
}
