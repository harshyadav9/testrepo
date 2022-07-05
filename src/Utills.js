import { toast } from 'react-toastify';
var md5 = require('md5');
export function ExcelDateToJSDate(serial) {
   console.log('serial',serial)
   var utc_days  = Math.floor(serial - 25569);
   var utc_value = utc_days * 86400;                                        
   var date_info = new Date(utc_value * 1000);

   var fractional_day = serial - Math.floor(serial) + 0.0000001;

   var total_seconds = Math.floor(86400 * fractional_day);

   var seconds = total_seconds % 60;

   total_seconds -= seconds;

   var hours = Math.floor(total_seconds / (60 * 60));
   var minutes = Math.floor(total_seconds / 60) % 60;

   return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
}

export const notify = (msg,status) => {
   if(status === true) {
      toast.success(msg)
   } else if(status === false) {
      toast.error(msg)

   } else if(status === 'warn') {
      toast.warn(msg)
   } else {
      toast.info(msg)
   }

}

let hashes = {};
export const checkRowDuplicacy = (rowValues) => {
   let message = []
   rowValues.forEach(function(row, idx){
     var hash = md5( row[4]+'~~~'+row[5] );
     if (hash in hashes) {
       hashes[hash].push(idx);
     } else {
       hashes[hash] = [idx];
     }
   })

   Object.keys(hashes).forEach(function(key, idx) {
     var msg = '';
     if (hashes[key].length > 1) {
       msg = 'Rows ' + hashes[key].join(' and ') + ' are duplicate\n';
       message.push(msg);
       // console.log(msg);
     } 
   });
   return  message;
}



