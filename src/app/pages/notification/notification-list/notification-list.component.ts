import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CoreService } from 'src/app/_service/core.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private popoverController: PopoverController,
    private core: CoreService,
    private storage: Storage
  ) { }

  ngOnInit(): void {
  }
  dismissModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
