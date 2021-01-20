import { Component, Input, OnInit } from '@angular/core';
import { CoreService } from 'src/app/_service/core.service';

@Component({
  selector: 'app-day-detail',
  templateUrl: './day-detail.component.html',
  styleUrls: ['./day-detail.component.scss'],
})
export class DayDetailComponent implements OnInit {
  @Input() day;
  @Input() month;
  @Input() year;
  today = new Date();
  email:any;
  tasks:any = [];
  constructor(
    private core: CoreService
  ) {}
  isToday: Boolean = false;
  ngOnInit() {
    if(this.day && this.month && this.year){
      this.checkToday(this.day, this.month, this.year);
    }
    this.InitData(this.day, this.month, this.year);
  }
  ngOnChanges(): void {
    this.initChange()
  }
  initChange(){
    this.tasks = [];
    this.InitData(this.day, this.month, this.year);
    this.isToday = false;
    if(this.day && this.month && this.year){
      this.checkToday(this.day, this.month, this.year);
    }
  }
  checkToday(day:any, month:any, year:any){
    
    if(day === this.today.getDate() && parseInt(month) === this.today.getMonth() + 1 && parseInt(year) === this.today.getFullYear()){
      this.isToday = true;
    }
    else{
      this.isToday = false;
    }
  }
  InitData(day:any, month:any, year:any){
    if(this.day){
      this.core.InitService$().subscribe((email:any)=>{
        this.email = email;
        this.core.GetTaskByEmail$(this.email.email,day, month, year).subscribe((rsp:any)=>{
          this.tasks = rsp.payload;
        })
      })
    }
  }


}
