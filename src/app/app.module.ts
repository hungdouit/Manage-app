import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { registerLocaleData } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import en from '@angular/common/locales/en';
import { Tab2Module } from './tab2/tab2.module';
import { Tab4Module } from './tab4/tab4.module';
import { IonicStorageModule } from '@ionic/storage';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { WorkModule } from './pages/work/work.module';
import { antModule } from './ant/ant.module';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { SharedModule } from './shared.module';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import * as Hammer from 'hammerjs';
import { FriendListModule } from './pages/friend-list/friend-list.module';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
registerLocaleData(en);
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
export class CustomHammerConfig extends HammerGestureConfig {
 overrides = {
   'pan': {
     direction: Hammer.DIRECTION_ALL
   }
 }
}
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    Tab2Module,
    Tab4Module,
    IonicStorageModule.forRoot(),
    WorkModule,
    antModule,
    SharedModule,
    HammerModule,
    FriendListModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICONS, useValue: icons },
    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig },
    HTTP,
    LocalNotifications
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
