import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css']
})
export class ScreenComponent implements OnInit {
  baseUrl = 'http://172.20.10.4:4000/';
  led: number;
  ac: number;
  fan: number;
  temp: number;
  humd: number;
  furnace: number;
  Humdplus: number;
  jiujing: number;
  diox: number;
  light: number;
value:number;
value1:number;
value2:number;
value3:number;
value4:number;
 

constructor(private httpclient: HttpClient) { }



  ngOnInit(): void {
   
    timer(2000, 2000).subscribe(() => {
      this.httpclient.get(this.baseUrl + 'getled').subscribe((value: any) => {
        console.log(value[0].value)
        if (value[0].value == 1) {
          this.led = 1
        } else {
          this.led = 0
        }
      })
    });

    timer(2000, 2000).subscribe(() => {
      this.httpclient.get(this.baseUrl + 'getac').subscribe((value: any) => {
        console.log(value[0].value)
        if (value[0].value == 1) {
          this.ac = 1
        } else {
          this.ac = 0
        }
      })
    });

    timer(2000, 2000).subscribe(() => {
      this.httpclient.get(this.baseUrl + 'getfan').subscribe((value: any) => {
        console.log(value[0].value)
        if (value[0].value == 1) {
          this.fan = 1
        } else {
          this.fan = 0
        }
      })
    });

    timer(2000, 2000).subscribe(() => {
      this.httpclient.get(this.baseUrl + 'getfurnace').subscribe((value: any) => {
        console.log(value[0].value)
        if (value[0].value == 1) {
          this.furnace = 1
        } else {
          this.furnace = 0
        }
      })
    });

    timer(2000, 2000).subscribe(() => {
      this.httpclient.get(this.baseUrl + 'getHumdplus').subscribe((value: any) => {
        console.log(value[0].value)
        if (value[0].value == 1) {
          this.Humdplus = 1
        } else {
          this.Humdplus = 0
        }
      })
    });


    timer(2000, 2000).subscribe(() => {
      this.httpclient.get(this.baseUrl + 'gettemp').subscribe((value: any) => {
        // this.temp = value[0].value;
        //console.log(value[0].temp);
        this.value = value[0].value;
      })
    });

    timer(2000, 2000).subscribe(() => {
      this.httpclient.get(this.baseUrl + 'gethumd').subscribe((value: any) => {
        // this.temp = value[0].value;
        //console.log(value[0].humd);
        
        this.value1 = value[0].value1;
      })
    });


    timer(2000, 2000).subscribe(() => {
      this.httpclient.get(this.baseUrl + 'getlight').subscribe((value: any) => {
        // this.temp = value[0].value;
        //console.log(value[0].humd);
        this.value4 = value[0].value4;
      })
    });

    timer(2000, 2000).subscribe(() => {
      this.httpclient.get(this.baseUrl + 'getjiujing').subscribe((value: any) => {
        // this.temp = value[0].value;
        //console.log(value[0].humd);
        this.value3 = value[0].value3;
      })
    });

    timer(2000, 2000).subscribe(() => {
      this.httpclient.get(this.baseUrl + 'getdiox').subscribe((value: any) => {
        // this.temp = value[0].value;
        //console.log(value[0].humd);
        this.value2 = value[0].value2;
      })
    });
  }


  turnonled() {
    const obj = {
      status: 1
    }
    this.httpclient.put(this.baseUrl + 'alisetled', obj).subscribe((val: any) => {
      if (val.succ) {
        alert('灯已打开!');
      }
    })
  }

  turnoffled() {
    const obj = {
      status: 0
    }
    this.httpclient.put(this.baseUrl + 'alisetled', obj).subscribe((val: any) => {
      if (val.succ) {
        alert('灯已关闭!');
      }
    })
  }



}
