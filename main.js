const http = require('http');
const cheerio = require("cheerio");
const superagent = require('superagent');
const url = require('url');
const fs = require('fs');


// let urlParams='https://www.shixiseng.com/interns/c-110100?p=2';
let urls=[]
for (let i = 1; i < 20;i ++){
    urls.push('https://www.shixiseng.com/interns/c-110100?p='+i)
}
http.createServer((req,res) => {
        let result_str='';
        let str =''
        for (let i = 1;i < urls.length;i ++) {
            superagent.get(urls[i]).end((err, press) => {
                if (err) {
                    console.log(err)
                    return
                }
                let html = press.text;
                let $ = cheerio.load(html);
                let detail_url = [];
                let total = 0;
                str += `第${i}页数据为<br/>`;
                $('.font .name').each((index, element) => {
                    // console.log($(element).attr('href'))
                    detail_url.push('https://www.shixiseng.com' + $(element).attr('href'))
                    str += `   第${index}条文章地址： https://www.shixiseng.com${$(element).attr('href')}<br/>`
                });
                console.log(`第${i}页数据为`);
                console.log(detail_url);
                res.writeHead(200,{"Content-Type":"text/plain;charset=UTF-8"})
            })
        }
         // function b(){
         //    for(let i = 1;i<urls.length;i++){
         //         superagent.get(urls[i]).end((err, press) => {
         //            if(err){
         //                console.log(err)
         //                return
         //            }
         //            let html = press.text;
         //            let $ = cheerio.load(html);
         //            let detail_url=[];
         //            let total=0;
         //            $('.font .name').each((index,element) => {
         //                // console.log($(element).attr('href'))
         //                detail_url.push('https://www.shixiseng.com'+$(element).attr('href'))
         //            });
         //            console.log(`第${i}页数据为`);
         //            console.log(detail_url)
                // async function a(){
                //     for(let j = 0; j < detail_url.length;j++){
                //         let aa = await superagent.get(detail_url[j]).end((err,pre) => {
                //             let detail = pre.text;
                //             let $$ = cheerio.load(detail);
                //             result_str += '标题为：'+$$('.new_job_name').text()
                //             result_str += '内容为：'+$$('.job_introduce').text();
                //             console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                //             console.log(detail_url[j])
                //         });
                //     }
                // }
                // a();
                // fs.writeFileSync('log/爬取第' + i + '页数据.txt',result_str)
        //         });
        //     }
        //
        // }
        // b()
    res.write(str.toString())
    res.end();
}).listen(1212)