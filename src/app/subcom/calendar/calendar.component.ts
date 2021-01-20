import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CoreService } from 'src/app/_service/core.service';
import { DayDetailComponent } from '../day-detail/day-detail.component';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  @Input() month;
  @Output() signal = new EventEmitter<any>();
  @Output() signalDetail = new EventEmitter<any>();
  @ViewChild (DayDetailComponent) cd : DayDetailComponent;
  constructor(
    public loadingController: LoadingController,
    private core: CoreService,
    private route: ActivatedRoute
  ) { }
  today = new Date()
  ngOnInit() {
    this.route.paramMap.subscribe(map => {
      setTimeout(() => {
        this.Init();
      }, 10)
    });
  }
  week1 = ["","","","","","",""];
  week2 = ["","","","","","",""];
  week3 = ["","","","","","",""];
  week4 = ["","","","","","",""];
  week5 = ["","","","","","",""];
  week6 = ["","","","","","",""];
  async Init(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Đang tải...',
      duration: 1
    });
    await loading.present();
    this.week1 = ["","","","","","",""];
    this.week2 = ["","","","","","",""];
    this.week3 = ["","","","","","",""];
    this.week4 = ["","","","","","",""];
    this.week5 = ["","","","","","",""];
    this.week6 = ["","","","","","",""];
    // if(this.cd){
    //   this.cd.initChange();
    // }
    this.renderMonth().subscribe((rsp:any)=>{
      // this.cd.initChange();
      loading.onDidDismiss();
    })
  }
  
  renderMonth(){
    return new Observable((o)=>{
      for(let i = this.month.firstday.day; i < this.week1.length; i++)
      {
        this.week1[i] = this.month.dayArr[0]; 
        this.month.dayArr.splice(0, 1)
      }
      for(let i = 0; i < 7 ; i++)
      {
        this.week2[i] = this.month.dayArr[0] 
        this.month.dayArr.splice(0, 1)
      }
      for(let i = 0; i < 7 ; i++)
      {
        this.week3[i] = this.month.dayArr[0]
        this.month.dayArr.splice(0, 1)
      }
      for(let i = 0; i < 7 ; i++)
      {
        this.week4[i] = this.month.dayArr[0]
        this.month.dayArr.splice(0, 1)
      }
      for(let i = 0; i < 7 ; i++)
      {
        this.week5[i] = this.month.dayArr[0];
        this.month.dayArr.splice(0, 1)
      }
      if(this.month.dayArr.length != 0)
      {
        for(let i = 0; i < 7 ; i++)
        {
          this.week6[i] = this.month.dayArr[0];
          this.month.dayArr.splice(0, 1)
        }
      }
      o.next();
    })
  }
  async reload(month:any){
    this.week1 = ["","","","","","",""];
    this.week2 = ["","","","","","",""];
    this.week3 = ["","","","","","",""];
    this.week4 = ["","","","","","",""];
    this.week5 = ["","","","","","",""];
    this.week6 = ["","","","","","",""];
    this.month = month;
    console.log(month)
    await this.Init();
    this.cd.initChange();
  }
  toNow(){
    let today = new Date();
    this.core.getMonthDetail$(today.getMonth() + 1, today.getFullYear()).subscribe((rsp:any)=>{
      this.month = rsp.payload;
      this.Init();
      this.signal.emit("tonow")
    })
  }
  onClickShowTask(day:Number, month:Number, year:Number){  
    console.log(day, month, year)
    this.signalDetail.emit({day, month, year})
  }
  
}
