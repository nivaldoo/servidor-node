module.exports = (app) => {
  const repository = app.repositories.pessoa;
  return {
    async add(req, res) {
      try {
        res.json(await repository.add(
          req.body
        ));
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
    async getFromUser(req, res) {
      try {
        res.json(await repository.getFromUser(
          req.params.id
        ));
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
    async get(req, res) {
      try {
        res.json(await repository.get(
          req.params.id
        ));
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
    async search(req, res) {
      try {
        res.json(await repository.search(
          req.body
        ));
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
    async delete(req, res) {
      try {
        res.json(await repository.delete(
          req.params.id
        ));
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
    async update(req, res) {
      try {
        res.json(await repository.update(
          req.body
        ));
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
    async searchReturnNames(req, res) {
      try {
        res.json(await repository.searchReturnNames(
          req.body
        ));
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
    async getCidade(req, res) {
      try {
        res.json(await repository.getCidade(
          req.body
        ));
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
    async searchReturnList(req, res) {
      try {
        res.json(await repository.searchReturnList(
          req.body
        ));
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
    async searchImportacao(req, res) {
      try {
        res.json(await repository.searchImportacao(
          req.body
        ));
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
    async searchTerm(req, res) {
      try {
        res.json(await repository.searchTerm(
          req.body
        ));
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    }
  };
};
