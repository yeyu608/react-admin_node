const userModel = require('../mongdb/user.ts')

const { resinfo } = require('../utils/utils.js')

// 加密
const bcryptjs = require('bcryptjs')
// 令牌
const jwt = require('jsonwebtoken')
module.exports = {
    register: async (req, res) => {
        let { username, password, gender, email, residence, prefix, phone, intro, agreement } = JSON.parse(req.body.value)
        // 跨域配置
        res.setHeader("Access-Control-Allow-Origin", "*")
        let userData
        try {
            userData = await userModel.findOne({ username })
        } catch (err) {
            resinfo(res, 1, "请求错误，请刷新重试！")
            return
        }
        if (userData) {
            // 如果查找到用户数据提示用户用户名已被占用
            resinfo(res, 2, "用户名已被占用!")
            return
        }
        // 将数据添加进数据库
        let insertResult
        try {
            insertResult = await userModel.insertMany({
                username,
                password: bcryptjs.hashSync(password, 10),
                gender,
                email,
                residence,
                prefix,
                phone,
                intro,
                agreement
            })
        } catch (err) {
            resinfo(res, 1, '请求错误，请刷新后再试！')
            return
        }
        if (insertResult.length) {
            resinfo(res, 0, '注册成功')
            return
        }
        resinfo(res, 3, '注册失败！')
    },
    login: async (req, res) => {
        let { username, password } = req.body
        console.log(username)
        // 跨域配置
        res.setHeader("Access-Control-Allow-Origin", "*")
        let userData
        try {
            userData = await userModel.findOne({ username })
        } catch (err) {
            resinfo(res, 1, '用户名或密码输入错误！')
            return
        }
        if (userData) {
            // 查询到了用户数据，开始验证密码
            let bool = bcryptjs.compareSync(password, userData.password)

            if (bool) {
                resinfo(res, 0, '登录成功！', {
                    token: jwt.sign({
                        username: userData.username,
                        startTime: +new Date(),
                        exp: Math.floor(Date.now() / 1000) + (60 * 60)
                    }, 'asdfASDFerq@#^%^%&akjl4567896'),
                    userid: userData._id,
                    username: userData.username
                })
                return
            }
            resinfo(res, 2, '用户名或密码错误！')
            return
        }
        resinfo(res, 2, '用户名或密码错误！')
    },
    info: (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*")
        let token = req.headers.authorization
        console.log(token)
        res.send(token)
    },
    chunk: async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*")
        console.log(req.body)
        res.send({ fileExists: true, uploadedChunks: 0 })
    }
}