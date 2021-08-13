const uuid = require('uuid/v4');

module.exports = (app) => {
  const repository = {
    list: async (params) => {
      console.log('body params', params);
      //const result = await app.db.models.Parameters.findAll();
      return 'funcionado';
    },
    // list: async (params) => {
    //   console.log('body params', params);
    //   const result = await app.db.models.Parameters.findAll();
    //   return result;
    // },
  };
  return repository;
};
