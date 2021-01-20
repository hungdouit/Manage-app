import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { mergeMap, take, switchMap  } from 'rxjs/operators';
import { Observable, Observer, of, from, pipe, bindCallback, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Storage } from  '@ionic/storage';
import { ToastController } from '@ionic/angular';
const authSubject  =  new  BehaviorSubject(false);
const API = environment.API;
@Injectable({
  providedIn: 'root'
})
export class CoreService {
  constructor(
    private http: HttpClient,
    private  storage:  Storage,
    private toastController: ToastController
  ) { }
  email:any;
  InitService$(){
    return new Observable((o)=>{
      this.storage.get("selected_email").then((index:any)=>{
        this.storage.get("verify_emails").then((emails:any)=>{
          this.email = emails[index]
          o.next(emails[index])
        })
      })
    })
  }
  GetListEmails(){
    return new Observable((o)=>{
      this.storage.get("selected_email").then((index:any)=>{
        this.storage.get("verify_emails").then((emails:any)=>{
          emails.splice(index, 1);
          o.next(emails);
        })
      })
    })
  }
  getMonthDetail$(month: any, year:any){
    return this.http.get(API + 'api/get_month_detail/' + month + "/" + year);
  }
  Rqlogin$(payload){
    return this.http.post(API + 'api/handler_register', payload);
  }
  ComfirmOtp$(email, otp){
    return this.http.get(API + 'api/handler_comfirm_otp' + "/" + email + "/" + otp);
  }
  CreateTask$(payload:any){
    return this.http.post(API + 'api/handler_create_task', payload);
  }
  GetTaskByEmail$(email:any, day:any, month:any, year:any){
    return this.http.get(API + 'api/hanler_get_task_by_email/' + email + '/' + day + '/' + month + '/' + year);
  }
  GetTaskExpend(email:any, day:any, month:any, year:any){
    return this.http.get(API + 'api/hanler_get_task_expand/' + email + '/' + day + '/' + month + '/' + year);
  }
  SendFriendRequest$(email:any, email_to_add:any){
    return this.http.get(API + 'api/handler_send_friend_request/' + email + '/' + email_to_add)
  }
  GetFriendList$(email:any){
    return this.http.get(API + 'api/handler_get_friend_list/' + email)
  }
  GetFriendRequestList$(email:any){
    return this.http.get(API + 'api/handler_get_friend_request_list/' + email)
  }
  AcceptFrRequest$(email: any, email_to_add:any){
    return this.http.get(API + 'api/handler_accept_friend_rq/' + email + '/' + email_to_add)
  }
  DeclineFrRequest$(email:any, email_to_add:any){
    return this.http.get(API + 'api/handler_decline_friend_rq/' + email + '/' + email_to_add)
  }
  SearchFriend$(key:any, email:any){
    return this.http.get(API + 'api/handler_search_friend/' + key + '/' + email)
  }
  GetTaskToNoti$(email:any){
    return this.http.get(API + 'api/hadler_get_tasks_to_noti/' + email)
  }
  UpdateTask$(payload:any){
    return this.http.post(API + 'api/handler_update_task', payload);
  }
  GetTaskDetail$(id:any) {
    return this.http.get(API + 'api/handler_get_work_detail/' + id)
  }
  GetAllNoti$(mail:any){
    return this.http.get(API + 'api/handler_get_all_notification/' + mail)
  }
  SeenNoti$(id:any){
    return this.http.get(API + 'api/handler_seen_noti/' + id)
  }
  GetPassTask$(email:any){
    return this.http.get(API + 'api/handler_get_pass_task/' + email)
  }
  GetIncomingTask$(email:any) {
    return this.http.get(API + 'api/handler_get_task_incoming/' + email)
  }
  async showNotification(msg: string, duration?: number, buttons?: any, position?:"bottom"|"top"|"middle"){
    if(!duration){
        duration = 2000;
    }
    if(!buttons){
        buttons = []
    }
    if(!position){
        position = "bottom";
    }
    const toast = await this.toastController.create({
        message: msg,
        duration: duration,
        buttons: buttons,
        position: position
      });
      toast.present();
}
}
