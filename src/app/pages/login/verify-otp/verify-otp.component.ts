import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { CoreService } from 'src/app/_service/core.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent implements OnInit {
  otp: any;
  email:any;
  DisabledResendButton:boolean = true;
  DisabledConfirmButton: Boolean = true;
  constructor(
    private storage: Storage,
    private toastController: ToastController,
    private core: CoreService,
    public loadingController: LoadingController,
    private router: Router
  ) { 
    
  }
  countdown = 60;
  counter: number = 0;
  timer$:any
  timer_subscription:any;
  ngOnInit(): void {
    this.storage.get("email")
    .then((email:any)=>{
      this.email = email;
      console.log(email)
    })
    this.startCounter();
    // this.storage.get("verify_emails")
    // .then((emails:any)=>{
    //   console.log(emails)
    // })
  }
  startCounter(){
    this.counter = 60;
    const timer$ = new Observable((o) => {
        setInterval(
          () => {o.next(1)}, 
        1000);
      })

    this.timer_subscription = timer$.subscribe(() => {
      this.counter = this.counter - 1;
      if(this.counter === 0){
        this.DisabledResendButton = false;
        this.timer_subscription.unsubscribe();
      }
    })
  }
  handler_on_input(val: string){
    if(val.length < 6 ){
      return;
    }
    this.confirmOTP();
  }
  async confirmOTP(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();
    this.core.ComfirmOtp$(this.email, this.otp).subscribe((rsp:any)=>{
      if(rsp.code == "00")
      {
        this.storage.get("verify_emails").then((emails:any)=>{
          if(!emails){
            emails = []
          }
          emails.unshift(rsp.payload);
          this.storage.set("verify_emails", emails);
          this.storage.set("selected_email", 0);
          loading.onDidDismiss();
          this.router.navigate(['./'])
          this.core.showNotification("Thêm email thành công!");
          this.storage.remove('email')
        })
      }
      if(rsp.code == '10'){
        this.core.showNotification("Sai OTP")
      }
    })
    // this.input.disabled = true;
    // this.UserService.verified_otp(this.otp, this.UserService.otp_request_id)
    //   .pipe(
    //     mergeMap((r: any) => {
    //       if(r.code === '00'){
    //         return this.UserService.updateToken$(r.payload);
    //       }
    //       return of(r)
    //     }),
    //     mergeMap((r:any) => {
    //       if(r.code === '00'){
    //         this.AddressBookService.Address.phone = this.UserService.otp_phone;
    //         return this.UserService.initService().pipe(
    //           mergeMap(() => {
    //               this.Phantom.initFbq();
    //               this.Tracking.setUserID(this.UserService.UserData.id);
    //               if(this.UserService.UserData.is_new_user){
    //                 this.Tracking.TrackSignUp();
    //               }
    //               this.modalController.dismiss({code: '00', payload:'success'}, 'LoginSuccess');
    //               return of([]);
    //           })
    //         )
    //       }
    //       this.presentToast("Mã OTP không chính xác!");
    //       this.input.disabled = false;
    //       this.input.setFocus();
    //       return of([]);
    //     })
    //   )
    //   .subscribe()
  }
  resendOTP(){
    // this.UserService.request_otp(this.UserService.otp_phone)
    //   .subscribe((r:any) => {
    //     this.otp = "";
    //     this.UserService.otp_request_id = r.payload;
    //     this.startCounter();
    //     this.DisabledResendButton = true;
    //   });      
  }

  async presentToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      position: 'top',
      duration: 1000
    });
    toast.onDidDismiss().then(() => {
      this.otp = '';
    })
    toast.present();
  }

}
