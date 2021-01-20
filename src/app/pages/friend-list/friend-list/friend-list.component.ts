import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CoreService } from 'src/app/_service/core.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {
  isVisible = false;
  email:any;
  email_to_add:any;
  frRequestList:any = [];
  friendList:any = [];
  search:any = '';
  constructor(
    private modalCtrl: ModalController,
    private core: CoreService
  ) { }

  ngOnInit(): void {
    this.core.InitService$().subscribe((email:any)=>{
      this.email = email;
      this.handler_get_fr_request_list();
      this.handler_get_fr_list()
    })
    
  }
  dismissModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  showModalAddFriend(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  handler_send_fr_request(){
    this.email_to_add = this.email_to_add.replace(/\s/g, '');
    if(this.email_to_add == this.email.email){
      this.core.showNotification("Email không hợp lệ!")
      return;
    }
    if(!this.validateEmail(this.email_to_add)){
      this.core.showNotification("Email không hợp lệ!")
       return;
    }
    this.core.SendFriendRequest$(this.email.email, this.email_to_add).subscribe((rsp:any)=>{
      this.core.showNotification("Lời mời đã gửi!")
      this.isVisible = false;
    })

  }
  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  } 
  handler_get_fr_request_list(){
    this.core.GetFriendRequestList$(this.email.email).subscribe((rsp:any)=>{
      this.frRequestList = rsp.payload;
    })
  }
  handler_get_fr_list(){
    this.core.GetFriendList$(this.email.email).subscribe((rsp:any)=>{
      this.friendList = rsp.payload;
    })
  }
  Accept(owner:any, sender:any){
    this.core.AcceptFrRequest$(owner, sender).subscribe((rsp:any)=> {
      if(rsp.code == "00"){
        this.handler_get_fr_request_list();
      }
    })
  }
  Decline(owner:any, sender:any){
    this.core.AcceptFrRequest$(owner, sender).subscribe((rsp:any)=> {
      if(rsp.code == "00"){
        this.handler_get_fr_request_list();
      }
    })
  }
  handler_Search(){
    if(this.search != ""){
      this.core.SearchFriend$(this.search, this.email.email).subscribe((rsp:any)=>{
        this.friendList = rsp.payload;
      })
    }
    else{
      this.handler_get_fr_list()
    }
  }
}
