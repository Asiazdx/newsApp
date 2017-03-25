var CronJob=require('cron').CronJob;
var main=require("./main");
new CronJob('* * * */28 * * *',function(){
    process.send("ÕýÔÚÅÀ");
    main();//Ö´ÐÐÅÀ³æ
},null,true);
