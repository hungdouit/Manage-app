import { Component } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { CoreService } from './_service/core.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationListComponent } from '../app/pages/notification/notification-list/notification-list.component'
import { FriendListComponent } from '../app/pages/friend-list/friend-list/friend-list.component'
import { ELocalNotificationTriggerUnit, LocalNotifications } from '@ionic-native/local-notifications/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  email: any;
  emails: any;
  public selectedIndex = 0;
  public appPages = [
    // {
    //   title: 'Inbox',
    //   url: '/folder/Inbox',
    //   icon: 'mail'
    // },
    // {
    //   title: 'Outbox',
    //   url: '/folder/Outbox',
    //   icon: 'paper-plane'
    // },
    // {
    //   title: 'Favorites',
    //   url: '/folder/Favorites',
    //   icon: 'heart'
    // },
    // {
    //   title: 'Archived',
    //   url: '/folder/Archived',
    //   icon: 'archive'
    // },
    {
      title: 'Thông tin tài khoản',
      url: '/tabs/tab4',
      icon: 'person'
    },

    {
      title: 'Thêm email',
      url: '/login',
      icon: 'person-add'
    }
  ];
  customStyle: {
    background: '#ffffff',
  }
  numberFrrq: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private core: CoreService,
    private modalController: ModalController,
    private route: ActivatedRoute,
    private localNotifications: LocalNotifications
  ) {
    this.initializeApp();
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route.paramMap.subscribe(map => {
      setTimeout(() => {
        this.core.InitService$().subscribe((email: any) => {
          this.email = email;
          this.core.GetListEmails().subscribe((emails: any) => {
            this.emails = emails;
          })
        });
      }, 10)
    });
    setInterval(() => {
      this.core.InitService$().subscribe((email: any) => {
        this.email = email;
        this.handler_get_fr_request_list();
        this.Init()
      });
      this.core.GetListEmails().subscribe((emails: any) => {
        this.emails = emails;

      })
    }, 30000)
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.core.InitService$().subscribe((email: any) => {
      this.email = email;
      this.handler_get_fr_request_list();
    })
    this.core.GetListEmails().subscribe((emails: any) => {
      this.emails = emails;
    })
  }
  handler_get_fr_request_list() {
    this.core.GetFriendRequestList$(this.email.email).subscribe((rsp: any) => {
      this.numberFrrq = rsp.payload.length;
    })
  }
  async presentNotificationModal() {
    const modal = await this.modalController.create({
      component: NotificationListComponent,
      cssClass: 'my-custom-class',
      componentProps: {

      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
  }

  async presentFriendModal() {
    const modal = await this.modalController.create({
      component: FriendListComponent,
      cssClass: 'my-custom-class',
      componentProps: {

      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
  }
  switchEmail(email: any) {
    this.storage.get("verify_emails").then((emails: any) => {
      let index = emails.findIndex(x => x.email === email.email);
      this.storage.set("selected_email", index);
      window.location.reload();
    })
  }
  Init() {
    this.core.GetTaskToNoti$(this.email.email).subscribe((rsp:any)=>{
      // console.log(rsp.payload)
      rsp.payload.forEach(element => {
        this.trigger_Noti(element)
      });
    })
    // this.localNotifications.schedule([{
    //   title: 'The Big Meeting',
    //   text: '4:15 - 5:15 PM\nBig Conference Room',
    //   smallIcon: 'https://i.pinimg.com/564x/ff/22/c6/ff22c66b5f7d9b60ec981b2f7411ed0d.jpg',
    //   icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzfXKe6Yfjr6rCtR6cMPJB8CqMAYWECDtDqH-eMnerHHuXv9egrw',
    //   trigger: {
    //     in: 5,
    //     unit: ELocalNotificationTriggerUnit.SECOND
    //   }
    // }]);
  }
  trigger_Noti(payload:any){
    let toDate = new Date(payload.toDate);
    let fromTime = new Date(payload.fromTime);
    let toTime = new Date(payload.toTime);
    let begin = new Date();
    begin.setDate(toDate.getDate()); begin.setMonth(toDate.getMonth()); begin.setFullYear(toDate.getFullYear());
    begin.setHours(fromTime.getHours()); begin.setMinutes(fromTime.getMinutes() - payload.selected_noti_option); begin.setSeconds(0);
    console.log(begin);
    let _h = "hh:mm"
    let _h1 = "hh:mm"
    _h = _h.replace("hh", ('0' + fromTime.getHours()).slice(-2));
    _h = _h.replace("mm", ('0' + fromTime.getMinutes()).slice(-2));
    _h1 = _h1.replace("hh", ('0' + toTime.getHours()).slice(-2));
    _h1 = _h1.replace("mm", ('0' + toTime.getMinutes()).slice(-2));
    if(!payload.note){
      payload.note = ''
    }
    this.localNotifications.schedule([{
      title: payload.title,
      text: _h + ' - ' + _h1 +'\n' + payload.note,
      smallIcon: 'https://i.pinimg.com/564x/ff/22/c6/ff22c66b5f7d9b60ec981b2f7411ed0d.jpg',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzfXKe6Yfjr6rCtR6cMPJB8CqMAYWECDtDqH-eMnerHHuXv9egrw',
      trigger: { at: begin, count: 1 }
    }]);
  }
}
