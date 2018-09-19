const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const toplist = await mysql('books').select('*').limit(9).orderBy('count', 'desc')
    ctx.state = {
        data: toplist
    }
}
