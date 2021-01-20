import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { CoreService } from 'src/app/_service/core.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  Email: any;
  constructor(
    private core: CoreService,
    private route: ActivatedRoute,
    private location: Location,
    public loadingController: LoadingController,
    private router: Router,
    private storage: Storage
  ) { }
  
  ngOnInit(): void {
  }
  async Login(){
    let payload = {
      email: this.Email
    }
    this.storage.get("verify_emails").then((emails:any)=>{
      if(emails.filter((email:any)=>{
        return email.email == this.Email;
      }).length == 0){
      }
      else{
        this.core.showNotification("Email đang được sử dụng!")
        return;
      }
    })
    if(!this.validateEmail(payload.email)){
      this.core.showNotification("Email không hợp lệ!")
       return;
    }
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 1000
    });
    await loading.present();
    this.core.Rqlogin$(payload).subscribe((rsp:any)=> {
      if(rsp.code == "00"){
        loading.onDidDismiss();
        this.storage.remove('email')
        this.storage.set("email", this.Email);
        this.router.navigate(['login/otp'])
      }
    })
    
    
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 1000
    });

    const { role, data } = await loading.onDidDismiss();
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  } 

}
