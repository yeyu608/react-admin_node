//连接数据库
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/react-admin')

module.exports = mongoose