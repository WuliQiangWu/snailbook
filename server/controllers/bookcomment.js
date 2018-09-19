const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {id, openid} = ctx.request.query
    const comment = mysql('comments').select('comments.*', 'cSessionInfo.user_info').join('cSessionInfo', 'comments.openid', 'cSessionInfo.open_id')
    let result
    if (id) {
        result = await comment.where('bookid', id)
    } else if (openid) {
        result = await comment.where('openid', openid)
    }
    ctx.state = {
        data:{
            list: result.map(v => {
                const info = JSON.parse(v.user_info)
                return Object.assign({}, v, {
                    title: info.nickName,
                    image: info.avatarUrl
                })
            })
        }
    }
}
