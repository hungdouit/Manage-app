import { Component, OnInit } from '@angular/core';
import { CoreService } from '../_service/core.service';
@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.component.html',
  styleUrls: ['./tab2.component.css']
})
export class Tab2Component implements OnInit {
  selectedIndex;
  email:any;
  tasks:any = [];
  todayCount:any;
  passedCount:any;
  incomingCount:any;
  constructor(
    private core: CoreService
  ) { }
  tags = [
    {
      name: 'Hôm nay',
      num: ""
    },
    {
      name: 'Sắp diễn ra',
      num: ""
    },
    {
      name: 'Đã kết thúc',
      num: ""
    },
  ]
  selected_tag: any = 1;
  ngOnInit(): void {
    this.core.InitService$().subscribe((email: any) => {
      this.email = email.email;
      this.Init()
    });
    
  }
  Init(){
    let day = new Date();
    this.core.GetTaskByEmail$(this.email,day.getDay(), day.getMonth() + 1, day.getFullYear).subscribe((rsp:any)=>{
      this.tags[0].num = rsp.payload.length
    })
    this.core.GetIncomingTask$(this.email).subscribe((rsp:any)=>{
      this.tags[1].num = rsp.payload.length
    })
    this.core.GetPassTask$(this.email).subscribe((rsp:any)=>{
      this.tags[2].num = rsp.payload.length
    })
  }
  onClick(NUM:any){
    let day = new Date();
    this.tasks = [];
    console.log(NUM)
    if(NUM == 0){
      this.core.GetTaskByEmail$(this.email,day.getDay(), day.getMonth() + 1, day.getFullYear).subscribe((rsp:any)=>{
        this.tasks = rsp.payload;
      })
    }
    if(NUM == 1){
      this.core.GetIncomingTask$(this.email).subscribe((rsp:any)=>{
        this.tasks = rsp.payload;
      })
    }
    if(NUM == 2){
      this.core.GetPassTask$(this.email).subscribe((rsp:any)=>{
        this.tasks = rsp.payload;
      })
    }
  } 
  check(num){
    if(num === this.selected_tag)
    {
      return true;
    }
    return false;
  }

}
