//載入model
const Restaurant = require('../restaurant.js')
//建立mongoose連線 並檢查狀態
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

