//建立伺服器
const express = require('express')
const port = 3000
const app = express()
const Restaurant = require('./models/restaurant')


//建立mongoose連線 並檢查狀態
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)

// 設定環境變數
// set "MONGODB_URI=mongodb+srv://alpha:camp@cluster0.mjpff.mongodb.net/restaurant?retryWrites=true&w=majority"

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})


//設立監聽器
app.listen(port, (req, res) => {
  console.log(`App is running on http://localhost:${port}`)
})

//設定路由
// app.get('/', (req, res) => {
//   res.render('index', { restaurants: restaurantList.results })
// })

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))

})





//設定handlebars 路由
const exphbs = require('express-handlebars')
app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//建立public連結
app.use(express.static('public'))

//導入外部json file
const restaurantList = require('./restaurant.json')

//設定show 動態路由
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant =>
    restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

//設定搜尋列 (name, category)
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
      || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants, keyword })
})


//設定new 畫面路由
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})