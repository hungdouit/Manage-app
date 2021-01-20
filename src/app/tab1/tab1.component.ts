import { Component, OnInit, ViewChild } from '@angular/core';
import { CoreService } from '../_service/core.service';
import { CalendarComponent  } from '../subcom/calendar/calendar.component';
import { AddWorkModalComponent } from '../pages/work/add-work-modal/add-work-modal.component'
import { AlertController, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.component.html',
  styleUrls: ['./tab1.component.scss'],
})
export class Tab1Component implements OnInit {
  @ViewChild (CalendarComponent)  cl: CalendarComponent;
  placement: NzDrawerPlacement = 'bottom';
  month:any;
  email:any;
  selectedDay:Number;
  selectedMonth:Number;
  selectedYear:Number;
  showTaskInDay: Boolean = false;
  tasks:any = [];
  constructor(
    private core: CoreService,
    private modalController: ModalController,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private router: Router
  ) {}
  open(): void {
    this.showTaskInDay = true;
  }

  close(): void {
    this.showTaskInDay = false;
  }

  ngOnInit() {
    let today = new Date();
    this.route.paramMap.subscribe(map => {
      setTimeout(() => {
        this.Init(today.getMonth() + 1,today.getFullYear());
      }, 10)
    });
  }
  

  Init(month:any, year:any){
    this.core.getMonthDetail$(month, year).subscribe((rsp:any)=>{
      this.month = rsp.payload;
    })
  }
  loadMonthForward(month:any, year:any){
    month = +month + 1;
    if(month > 12)
    {
      month = +month - 12;
      year = +year + 1;
    }
    setTimeout(() => {
      this.Init(month, year);
      this.cl.reload(this.month)
    }, 10)
  }
  loadMonthBefore(month:any, year: any){
    month = +month - 1;
    if(month <= 0)
    {
      month = +month + 12;
      year = +year - 1;
    }
    setTimeout(() => {
      this.Init(month, year);
      this.cl.reload(this.month);
    }, 10)
  }
  async presentAddWorkModal() {
    const modal = await this.modalController.create({
      component: AddWorkModalComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if(data.dismissed == true){
      return;
    }
    this.core.CreateTask$(data).subscribe((rsp:any)=>{
      this.core.showNotification(rsp.payload);
    })
    setTimeout(() => {
      this.core.getMonthDetail$(this.month.month, this.month.year).subscribe((rsp:any)=>{
        this.cl.reload(rsp.payload);
      })
      
    }, 10)
  }
  toNow(){
    let today = new Date();
    this.Init(today.getMonth() + 1,today.getFullYear());
  }
  showDayTask(payload){
    if(!payload.day){
      return;
    }
    this.selectedDay = payload.day;
    this.selectedMonth = +payload.month;
    this.selectedYear = +payload.year;
    this.showTaskInDay = true;
    this.core.InitService$().subscribe((email:any)=>{
      this.email = email;
      this.core.GetTaskByEmail$(this.email.email,this.selectedDay, this.selectedMonth, this.selectedYear).subscribe((rsp:any)=>{
        this.tasks = rsp.payload;
      })
    })
  }
  doRefresh(event){
    this.core.getMonthDetail$(this.month.month, this.month.year).subscribe((rsp:any)=>{
      this.cl.reload(rsp.payload);
      event.target.complete();
    })
  }
  OnCheck(task:any){
    this.core.UpdateTask$(task).subscribe((rsp:any)=>{
    })
  }
  goOnDetail(task:any){
    this.showTaskInDay = false;
    setTimeout(() => {
      this.router.navigate(['work/work-detail/' + task.id]);
    }, 500);
  }
}
