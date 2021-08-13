let uuid = require('uuid/v4')
let fs = require("fs")

module.exports = () => {
  return {
    async post(req, res) {
      try {
        console.log('body', req.body)
        console.log('files', req.files[0].fieldname)
        req.files.forEach((file) => {
          let ext = file.originalname.split('.').reverse()[0]
          fs.writeFileSync(`./images/${uuid()}.${ext}`, file.buffer)
        })
        fs.writeFileSync(`./images/${uuid()}.txt`, req.body.teste)
      } catch (err) {
        console.log(err)
        res.status(500).json(err)
      }
    },
    async get(req, res) {
      try {

        console.log(req)
        var rr = req.query.nome
        console.log(rr)

      } catch (err) {
        console.log(err)
        res.status(500).json(err)
      }
    },
  }
}
