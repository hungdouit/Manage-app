import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CoreService } from '../_service/core.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.component.html',
  styleUrls: ['./tab3.component.scss']
})
export class Tab3Component implements OnInit {

  constructor(
    private storage: Storage,
    private core: CoreService,
    private modalController: ModalController,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  email: any;
  emails: any;
  noti_list:any = [];
  ngOnInit(): void {
    this.route.paramMap.subscribe(map => {
      setTimeout(() => {
        this.core.InitService$().subscribe((email: any) => {
          this.email = email;
          this.core.GetListEmails().subscribe((emails: any) => {
            this.emails = emails;
          })
          this.core.GetAllNoti$(email.email).subscribe((rsp:any)=>{
            this.noti_list = rsp.payload;
          })
        });
      }, 10)
    });
  }
  Seen(id:any,redirect_id:any, i:any){
    this.core.SeenNoti$(id).subscribe((rsp:any)=>{
      if(rsp.code == "00"){
        this.noti_list[i].status = "APROVED";
        this.router.navigate(['work/work-detail/' + redirect_id]);
      }
    })
  }


}
