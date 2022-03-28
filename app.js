//建立伺服器
const express = require('express')
const port = 3000
const app = express()

//設立監聽器
app.listen(port, (req, res) => {
  console.log(`App is running on http://localhost:${port}`)
})

//設定路由
app.get('/', (req, res) => {
  res.render('index', {restaurants: restaurantList.results})
})

//設定handlebars 路由
const exphbs = require('express-handlebars')
app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//建立public連結
app.use(express.static('public'))

//導入外部json file
const restaurantList = require('./restaurant.json')