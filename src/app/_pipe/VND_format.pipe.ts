import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'VN_DateTime'})
export class VN_DateTimePipe implements PipeTransform {
  transform(value: string): string {
    let d = new Date(value);
    let _d = "dd/mm/yyyy hh:mm:ss"
    _d = _d.replace("dd", ('0' + d.getDate()).slice(-2));
    _d = _d.replace("mm", ('0' + (d.getMonth() + 1)).slice(-2));
    _d = _d.replace("yyyy", ('0' + d.getFullYear()).slice(-4));
    _d = _d.replace("hh", ('0' + d.getHours()).slice(-2));
    _d = _d.replace("mm", ('0' + d.getMinutes()).slice(-2));
    _d = _d.replace("ss", ('0' + d.getSeconds()).slice(-2));
    return _d;
  }
}

@Pipe({name: 'VN_Hour'})
export class VN_HourPipe implements PipeTransform {
  transform(value: string): string {
    let d = new Date(value);
    let _d = "hh:mm"
    _d = _d.replace("hh", ('0' + d.getHours()).slice(-2));
    _d = _d.replace("mm", ('0' + d.getMinutes()).slice(-2));
    return _d;
  }
}

@Pipe({name: 'VN_Date'})
export class VN_DatePipe implements PipeTransform {
  transform(value: string): string {
    let d = new Date(value);
    let _d = "dd/mm/yyyy";
    _d = _d.replace("dd", ('0' + d.getDate()).slice(-2));
    _d = _d.replace("mm", ('0' + (d.getMonth() + 1)).slice(-2));
    _d = _d.replace("yyyy", ('0' + d.getFullYear()).slice(-4));
    return _d;
  }
}
@Pipe({name: 'VN_WeekDay'})
export class VN_WeekDayPipe implements PipeTransform {
  transform(value: string): string {
    let d = new Date(value);
    let _d = new Date(d.getTime() - 24*60*60*1000);
    let return_value:string = "";
    let week_days = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];

    return_value = week_days[d.getDay()];
    if(
      _d.getDate() === new Date().getDate() &&
      _d.getMonth() === new Date().getMonth() &&
      _d.getFullYear() === new Date().getFullYear()
    ){
      return_value = "Ngày mai, " + return_value;
    }
    if(
      d.getDate() === new Date().getDate() &&
      d.getMonth() === new Date().getMonth() &&
      d.getFullYear() === new Date().getFullYear()
    ){
      return_value = "Hôm nay";
    }


    return return_value;
  }
}

@Pipe({name: 'VN_CountDown'})
export class VN_CountDown implements PipeTransform {
  transform(value: number): string {
    let days = Math.floor(value / (1000 * 60 * 60 * 24));
    let _day = ('0' + days);
    _day = _day.substr(_day.length - 2);

    let hours = Math.floor((value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let _hours = ('0' + hours);
    _hours = _hours.substr(_hours.length - 2);

    let minutes = Math.floor((value % (1000 * 60 * 60)) / (1000 * 60));
    let _minutes = ('0' + minutes);
    _minutes = _minutes.substr(_minutes.length - 2);

    let seconds = Math.floor((value % (1000 * 60)) / 1000);
    let _seconds = ('0' + seconds);
    _seconds = _seconds.substr(_seconds.length - 2);

    let mili = Math.floor(value % 1000 / 100);

    let return_text = _day + ' ngày ' + _hours + ':' + _minutes + ':' + _seconds + '.' + mili;

    return return_text;
  }
}
@Pipe({name: 'VN_CountDownLarge'})
export class VN_CountDownLarge implements PipeTransform {
  transform(value: number): string {
    let days = Math.floor(value / (1000 * 60 * 60 * 24));
    let _day = ('0' + days);
    _day = _day.substr(_day.length - 2);

    let hours = Math.floor((value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let _hours = ('0' + hours);
    _hours = _hours.substr(_hours.length - 2);

    let minutes = Math.floor((value % (1000 * 60 * 60)) / (1000 * 60));
    let _minutes = ('0' + minutes);
    _minutes = _minutes.substr(_minutes.length - 2);

    let seconds = Math.floor((value % (1000 * 60)) / 1000);
    let _seconds = ('0' + seconds);
    _seconds = _seconds.substr(_seconds.length - 2);

    let mili = Math.floor(value % 1000 / 100);

    let return_text = _day + '<small> ngày </small>' + _hours + ':' + _minutes + ':' + _seconds + '.' + mili;
    return return_text;
  }
}
