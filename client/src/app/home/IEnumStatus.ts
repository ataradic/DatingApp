export interface IStatus {
    statusName: string;
    statusUrl: string;
}
export const Status = {
    1: { statusName: 'אושר', statusUrl: 'אדום.img' },
    2: { statusName: 'פתוח', statusUrl: 'ירוק.img' },
    3: { statusName: 'דחוי', statusUrl: 'כתום.img' }
}


//  getStatusName(status) {
//      return (<IStatus>Status[status]).statusName;
//  }
//  getStatusUrl(status) {
//      return (<IStatus>Status[status]).statusUrl;
//  }
//   תמונה { { getStatusUrl(status) } }
//  סטטוס { { getStatusName(status) } }

import myLocaleHe from '@angular/common/locales/he'
import { registerLocaleData } from '@angular/common/';
registerLocaleData(myLocaleHe);

// { { dateTime | date: 'MMMM': "": "he" } }

