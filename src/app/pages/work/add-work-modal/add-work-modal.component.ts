import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { CoreService } from 'src/app/_service/core.service';
import { Storage } from '@ionic/storage';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
@Component({
  selector: 'app-add-work-modal',
  templateUrl: './add-work-modal.component.html',
  styleUrls: ['./add-work-modal.component.scss']
})
export class AddWorkModalComponent implements OnInit {
  repeat_selected: Boolean = false;
  notification_options = [
    {
      label: "Không",
      value: 0
    },
    {
      label: "5 phút",
      value: 5
    },
    {
      label: "15 phút",
      value: 15
    },
    {
      label: "30 phút",
      value: 60
    },
    {
      label: "1 giờ",
      value: 60
    },
    {
      label: "2 giờ",
      value: 120
    },
    {
      label: "3 giờ",
      value: 180
    },
    {
      label: "6 giờ",
      value: 360
    },
    {
      label: "12 giờ",
      value: 720
    },
    {
      label: "1 ngày",
      value: 1440
    },
  ]
  selected_option = 0;
  chips = [
    {
      label: "Ghi chú",
      icon: "document-text-outline"
    },
    {
      label: "To-Do List",
      icon: "checkmark-done-outline"
    }
  ]
  selected_tag_color = {
    label: "Deep sky blue",
    color: "#00bfff" 
  }
  color_tag = [
    {
      label: "Emerald green",
      color: "#2dd36f" 
    },
    {
      label: "Modern cyan",
      color: "#00FFFF" 
    },
    {
      label: "Deep sky blue",
      color: "#00bfff" 
    },
    {
      label: "Pastel brown",
      color: "#836953" 
    },
    {
      label: "Midnight black",
      color: "#151B54" 
    },
    {
      label: "Apple red",
      color: "#ff0800" 
    },
    {
      label: "French rose",
      color: "#f64a8a" 
    },
    {
      label: "Coral pink",
      color: "#f88379" 
    },
    {
      label: "Bright orange",
      color: "#FFA500" 
    },
    {
      label: "Soft violet",
      color: "#EE82EE" 
    },

  ]

  title:any;
  note:any;
  toggle_allday:Boolean = false;
  fromDate:any = new Date()
  toDate:any = new Date()
  fromTime:any = new Date()
  toTime:any = new Date()
  ToDoList = [];
  tag_color:any;
  email:any;
  optional_field = [];
  friendList:any = [];
  search:any = '';
  selectedFriend: any = [];
  constructor(
    private modalCtrl: ModalController,
    private popoverController: PopoverController,
    private core: CoreService,
    private storage: Storage
  ) { }

  ngOnInit(): void {
    this.Init();
  }
  dismissModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  confirmModal(){
    if(!this.title) {
      this.core.showNotification("Chưa nhập tiêu đề");
      return;
    }
    if(!this.email)
    {
      this.core.showNotification("Chưa đăng nhập");
      return;
    }
    let assign_email = [];
    this.selectedFriend.forEach(item => {
      assign_email.push(item.email)
    });
    this.modalCtrl.dismiss({
      title: this.title,
      allday: this.toggle_allday,
      fromDate: this.fromDate,
      toDate: this.toDate,
      fromTime: this.fromTime,
      toTime: this.toTime,
      selected_noti_option: this.selected_option,
      ToDoList: this.ToDoList,
      note: this.note,
      selected_tag_color: this.selected_tag_color,
      host: this.email.email,
      assign_email: assign_email
    });
  }
  onChangeNotiOption(){

  }
  onSelectRepeat(){
    this.repeat_selected = !this.repeat_selected;
  }
  selectChip(i:any){
    this.optional_field.push(this.chips[i]);
    this.chips.splice(i, 1);
  }
  removeOptionalField(i:any){
    this.chips.push(this.optional_field[i]);
    this.optional_field.splice(i, 1);
  }
  addToDoList(){
    this.ToDoList.push(
      {
        name: "",
        completed: false
      }
    )
  }
  OnToggleAllDay(){
    this.toggle_allday = !this.toggle_allday;
    console.log(this.toggle_allday)
  }
  Init(){
    this.storage.get("selected_email").then((index:any)=>{
      this.storage.get("verify_emails").then((emails:any)=>{
        this.email = emails[index];
        this.handler_get_fr_list();
      })
    });
    this.fromTime.setMinutes(0);
    this.toTime.setMinutes(0);
    this.fromTime.setHours(new Date().getHours() + 1);
    this.toTime.setHours(new Date().getHours() + 2);
  }
  updatefromDate($event){
    this.fromDate = $event.detail.value;
  }
  updatetoDate($event){
    this.toDate = $event.detail.value;
  }
  updatefromTime($event){
    this.fromTime = $event.detail.value;
  }
  updatetoTime($event){
    this.toTime = $event.detail.value;
  }
  selectNotiOption($event)
  {
    this.selected_option = $event.detail.value;
  }
  OnchangeTagColor($event){
    this.selected_tag_color.color = $event.detail.value;
  }
  visible = false;
  placement: NzDrawerPlacement = 'bottom';
  openAddAttentdant(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
  handler_get_fr_list(){
    this.friendList = []
    this.core.GetFriendList$(this.email.email).subscribe((rsp:any)=>{
      rsp.payload.friends.forEach((item:any)=>{
        if(this.checkEmailInAdded(item) == false)
          {
            this.friendList.push({
              select: false,
              email: item
            }) 
          }
      })
    })
  }
  handler_Search(){
    if(this.search != ""){
      this.friendList = [];
      this.core.SearchFriend$(this.search, this.email.email).subscribe((rsp:any)=>{
        rsp.payload.friends.forEach((item:any)=>{
          if(this.checkEmailInAdded(item) == false)
          {
            this.friendList.push({
              select: false,
              email: item
            }) 
          }
        })
      })
    }
    else{
      this.handler_get_fr_list()
    }
  }
  checkEmailInAdded(email:any){
    for(let i = 0; i < this.selectedFriend.length; i++ ){
      if(this.selectedFriend[i].email == email)
      {
        return true;
      }
    }
    return false;
  }
  handler_add_to_task(){
    if(this.friendList){
      this.friendList.filter((item:any)=> item.select == true).forEach(item => {
        this.selectedFriend.push(item)
      });
      this.friendList = this.friendList.filter((item:any)=> item.select == false);
      for(let i = 0; i < this.selectedFriend.length; i++ ){
        this.selectedFriend[i].select = false;
      }
    } 
  }
  handler_remove_from_task(){
    if(this.selectedFriend){
      this.selectedFriend.filter((item:any)=> item.select == true).forEach(item => {
        this.friendList.push(item)
      });
      this.selectedFriend = this.selectedFriend.filter((item:any)=> item.select == false);
      for(let i = 0; i < this.friendList.length; i++ ){
        this.friendList[i].select = false;
      }
    }  
  }
}
