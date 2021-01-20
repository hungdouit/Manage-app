import { Component } from '@angular/core';
import { CoreService } from '../_service/core.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.css']
})
export class HomePage {
  constructor(
    private core: CoreService
  ) {}
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  email:any;
  count: any = 0;
  onClick(){

  }
  ngOnInit(): void {
    setInterval(() => {
      this.count = 0;
      this.core.InitService$().subscribe((email: any) => {
        this.email = email;
        this.core.GetAllNoti$(email.email).subscribe((rsp:any)=>{
          rsp.payload.forEach(element => {
            if(element.status == "WAITING")
            {
              this.count += 1;
            }
          });
        })
      });
    }, 5000)
  }
  
}
