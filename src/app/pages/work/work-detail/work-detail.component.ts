import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CoreService } from 'src/app/_service/core.service';

@Component({
  selector: 'app-work-detail',
  templateUrl: './work-detail.component.html',
  styleUrls: ['./work-detail.component.css']
})
export class WorkDetailComponent implements OnInit {
  task:any;
  constructor(
    private route: ActivatedRoute,
    private core: CoreService,
    private alertController: AlertController,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:any)=>{
      this.core.GetTaskDetail$(params['id']).subscribe((rsp:any)=>{
        console.log(rsp.payload);
        this.task = rsp.payload
      })
    })
  }
  OnCheck(task:any){
    this.core.UpdateTask$(task).subscribe((rsp:any)=>{
    })
  }
  async removePerson(task:any, i:any){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Xác nhận!',
      message: 'Bạn muốn <strong>xóa</strong> người này!!!',
      buttons: [
        {
          text: 'Hủy',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Có',
          handler: () => {
            this.task.assign_email.splice(i, 1);
            this.core.UpdateTask$(task).subscribe((rsp:any)=>{
            })
          }
        }
      ]
    });

    await alert.present();
  }
  Back(){
    this._location.back()
  }

}
