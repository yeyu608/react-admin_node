const { readFileSync, writeFileSync } = require('fs')

const path = require('path')

module.exports = {
    writeErrLog: (err) => {
        let logData = readFileSync(path.join(__dirname, '../logs/api.log'), 'utf-8')
        let reg = /ok$/
        logData = logData.replace(reg, '错误：' + err)
        writeFileSync(path.join(__dirname, '../logs/api.log'), logData)
    },
    resinfo: (res, error_code, msg, data = null) => {
        console.log(error_code, msg, data)
        res.json({
            error_code,
            msg,
            data
        })
    }
}