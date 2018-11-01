const http = require('http');
const cheerio = require("cheerio");
const superagent = require('superagent');
const url = require('url')


let urlParams='https://www.shixiseng.com/interns?p=6'
http.createServer((req,res) => {
    superagent.get(urlParams).end((err, press) => {
        let html = press.text;
        let $ = cheerio.load(html);
        let detail_url=[]
        $('.font .name').each((index,element) => {
            // console.log($(element).attr('href'))
            detail_url.push('https://www.shixiseng.com'+$(element).attr('href'))
        });
        detail_url.forEach(value => {
            superagent.get(value).end((err,pre) => {
                let detail = pre.text;
                let $$ = cheerio.load(detail);
                console.log('标题为：'+$$('.new_job_name').text())
                console.log('内容为：'+$$('.job_introduce').text())
                // $$('.job_detail p').each((index,element) => {
                //     console.log('职责为'+$$(element).text())
                // })
            })
        })
        res.end()

    })
}).listen(1212)