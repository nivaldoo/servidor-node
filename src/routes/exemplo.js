let multer = require('multer')
let upload = multer({ storage: multer.memoryStorage() })

module.exports = (app) => {
  let controller = app.controllers.exemplo
  app.post('/exemplo/post', upload.array('arquivo'), controller.post)
  app.get('/exemplo', controller.get)
}
