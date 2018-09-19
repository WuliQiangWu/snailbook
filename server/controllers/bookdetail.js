const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {id} = ctx.request.query
    const result = await mysql('books')
        .select('books.*', 'cSessionInfo.user_info')
        .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
        .where('id', id)
        .first()
    const info = JSON.parse(result.user_info)
    ctx.state = {
        data: Object.assign({}, result, {
            user_info: {
                nickName: info.nickName,
                image: info.avatarUrl
            },
            tags: result.tags.split(','),
            summary: result.summary.split('\n')
        })
    }
    await mysql('books').where('id', id).increment('count', 1)
}
