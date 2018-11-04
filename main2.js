const http = require('http');
const cheerio = require("cheerio");
const superagent = require('superagent');
const url = require('url');
const fs = require('fs');


// let urlParams='https://www.shixiseng.com/interns/c-110100?p=2';
let urls=[]
for (let i = 1; i <= 4;i ++){
    urls.push('https://www.shixiseng.com/interns/c-110100?p='+i)
}
for (let i = 1;i < urls.length;i ++) {
    superagent.get(urls[i]).end((err, press) => {
        if (err) {
            console.log(err)
            return
        }
        let html = press.text;
        let $ = cheerio.load(html);
        $('.font .name').each((index, element) => {
            let detail_url='https://www.shixiseng.com' + $(element).attr('href');
            superagent.get(detail_url).end((err,cont) => {
                let $$ = cheerio.load(cont.text);
                let job_name = $$('.new_job_name').attr('title');//实习名称
                // let updata_time = $$('.cutom_font').text();//这条信息的刷新时间
                // let job_money = $$('.job_money').text();//实习薪资
                let job_position = $$('.job_position').text();//实习地点
                let job_academic = $$('.job_academic').text();//实习学历要求
                // let job_week = $$('.job_week').text();//实习天数
                // let job_time = $$('.job_time').text();//实习总时间
                let job_good = $$('.job_good').text();//只为诱惑
                let job_detail = $$('.job_detail').text();//职位详情
                let result = {
                    job_name: job_name,
                    // updata_time: updata_time,
                    // job_money: job_money,
                    job_position: job_position,
                    job_academic: job_academic,
                    // job_week: job_week,
                    // job_time: job_time,
                    job_good: job_good,
                    job_detail:job_detail,

                };
                let str = `第${i*(index+1)}个职位介绍：\n`
                str += `职位名称为:${job_name}。\n`
                str += `实习地带为:${job_position}。\n`
                str += `学历要求为:${job_academic}。\n`
                str += `职位诱惑为:${job_good}。\n`
                str += `职位详情为:${job_detail}。\n`
                fs.appendFile('log/result.txt',str,'utf-8',function (err) {
                    if(err){
                        console.log(err)
                    }
                    console.log('抓取成功');
                })
            })
        });
    })
}