var CronJob=require('cron').CronJob;
var main=require("./main");
new CronJob('* * * */28 * * *',function(){
    process.send("������");
    main();//ִ������
},null,true);
