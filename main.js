const http = require('http');
const cheerio = require("cheerio");
const superagent = require('superagent');
const url = require('url');
const fs = require('fs');


// let urlParams='https://www.shixiseng.com/interns/c-110100?p=2';
let urls=[]
for (let i = 1; i < 500;i ++){
    urls.push('https://www.shixiseng.com/interns/c-110100?p='+i)
}
http.createServer((req,res) => {
    for(let i = 0;i<urls.length;i++){
        let result_str=''
        superagent.get(urls[i]).end((err, press) => {
            let html = press.text;
            let $ = cheerio.load(html);
            let detail_url=[];
            let total=0;
            $('.font .name').each((index,element) => {
                // console.log($(element).attr('href'))
                detail_url.push('https://www.shixiseng.com'+$(element).attr('href'))
            });
            async function a(){
                for(let j = 0; j < detail_url.length;j++){
                    let aa = await superagent.get(detail_url[j]).end((err,pre) => {
                        let detail = pre.text;
                        let $$ = cheerio.load(detail);
                        result_str += '标题为：'+$$('.new_job_name').text()
                        result_str += '内容为：'+$$('.job_introduce').text();
                        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                        console.log(detail_url[j])

                        fs.writeFileSync('log/爬取第' + i + '页数据.txt',result_str)

                    });
                }
            }
            a();
            // for(let j = 0; j < detail_url.length;j++){
            //     superagent.get(detail_url[j]).end((err,pre) => {
            //         let detail = pre.text;
            //         total ++;
            //         let $$ = cheerio.load(detail);
            //         result_str += '标题为：'+$$('.new_job_name').text()
            //         result_str += '内容为：'+$$('.job_introduce').text();
            //         // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa')
            //         // console.log(detail_url[j])
            //         console.log('第'+ i + '页一共有' + detail_url.length + '页' )
            //         fs.writeFile('log/爬取第' + i + '页数据.txt',result_str,function (err,data) {
            //             console.log('写入成功总数为'+total)
            //         })
            //
            //     });
            // }
        });
        res.end();
    }
}).listen(1212)