const express = require('express');

const bodyParser = require('body-parser')

const app = express();

app.listen(8000, () => {
    console.log('服务启动')
})

app.use(express.static('src'))

app.use(bodyParser.urlencoded({ extended: false }))


app.use((req, res) => {
    res.json({
        error_code: 404,
        msg: '找不到请求资源'
    })
})

app.use((err, req, res) => {
    res.json({
        error_code: 404,
        msg: '错误' + err
    })
})