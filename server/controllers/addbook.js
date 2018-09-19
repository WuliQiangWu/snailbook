// https://api.douban.com/v2/book/isbn/:name

const https = require('https')
const {mysql} = require('../qcloud')

module.exports = async (ctx, next) => {
    const {isbn, openid} = ctx.request.body
    if (isbn && openid) {
        const findRes = await mysql('books').select().where('isbn', isbn)
        if (findRes.length) {
            ctx.state = {
                code: -1,
                data: {
                    msg: '图书已存在'
                }
            }
            return false
        }
        let urls = 'https://api.douban.com/v2/book/isbn/' + isbn
        let result = await getJSON(urls)
        const rating = result.rating.average
        const {image, title, summary, price, alt, publisher} = result
        const tags = result.tags.map(v => {
            return `${v.title} ${v.count}`
        }).join(',')
        const authors = result.author.join(',')
        try {
            await mysql('books').insert({
                isbn, openid, rating, image, title, alt, publisher, summary, price, tags, authors
            })
            ctx.state.data = {
                title,
                code: 0,
                msg: 'success'
            }
        } catch (e) {
            ctx.state.data = {
                code: -1,
                msg: '新增图书失败' + e.sqlMessage
            }
        }
    }
}

function getJSON (url) {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            let urlData = ''
            res.on('data', data => {
                urlData += data
            })
            res.on('end', data => {
                const bookInfo = JSON.parse(urlData)
                if (bookInfo.title) {
                    resolve(bookInfo)
                }
                reject(bookInfo)
            })
        })
    })
}
