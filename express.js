const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const { writeErrLog, resinfo } = require('./src/utils/utils')
const userRouter = require('./src/router/user.ts')


app.listen(8080, () => {
    console.log('服务启动')
})

app.use(express.static('src'))

app.use(express.json({limit:'25mb'}));
app.use(express.urlencoded({limit:'25mb',extended:true}));

app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/users', userRouter)

app.use((req, res) => {
    writeErrLog('404')
    resinfo(res, 404, req.url + '路径错误！')
})

app.use((err, req, res) => {
    writeErrLog(err)
    resinfo(res, 410, req.url + '请求错误！')
})