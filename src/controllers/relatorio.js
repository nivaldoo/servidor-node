module.exports = (app) => {
    const repository = app.repositories.relatorio;
    return {
        async pdf(req, res) {
            repository.getPdfReport().then(pdf => {
                res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length })
                res.send(pdf)
            })
        },
        async get(req, res) {

            var params = req.body
            try {
                // repository.getExcelReport(res)       var where = null
                var where = {}
                var whereServico = {}
                var whereSubcategoria = {}

                if (params.nome) {
                    where.nome = { $like: `%${params.nome}%` }
                }
                if (params.cpf) {
                    where.cpf = params.cpf
                }
                if (params.afroestima) {
                    if (params.afroestima == 'true') {
                        where.afroestima = true
                    }
                    else {
                        where.afroestima = { $or: [false, null] }
                    }
                }
                if (params.dataInicial) {
                    where.created_at = { $gte: params.dataInicial };
                    if (params.dataInicial && params.dataFinal) {
                        where.created_at = { $gt: params.dataInicial, $lte: params.dataFinal };
                    }
                } else if (params.dataFinal) {
                    where.created_at = { $lte: params.dataFinal };
                }
                if (params.tipo) {
                    whereServico.tipo = params.tipo
                }
                if (!params.id_subcategoria && params.id_categoria) {
                    whereSubcategoria.id_categoria = params.id_categoria
                }
                if (params.id_subcategoria) {
                    whereServico.id_subcategoria = params.id_subcategoria
                }


                var pessoas = await app.db.models.Pessoa.findAll({
                    //attributes: ['nome', 'nome_fantasia', 'cpf', 'celular', 'email', 'bairro'],
                    attributes: ['nome', 'afroestima', 'created_at'],
                    where: where,
                    include: [{
                        attributes: ['id', 'tipo', 'nome', 'valor'],
                        model: app.db.models.Servico,
                        required: false,
                        where: whereServico,
                        include: [{
                            attributes: ['id', 'nome'],
                            model: app.db.models.Subcategoria,
                            whereSubcategoria,
                            include: [{
                                attributes: ['id', 'nome'],
                                model: app.db.models.Categoria,
                                whereSubcategoria
                            }]
                        }]
                    }]
                })

                var p = JSON.parse(JSON.stringify(pessoas))

                p = p.map(x => {
                    return {
                        nome: x.nome,
                        qtd_s: x.Servicos.reduce((total, elemento) => {
                            if (elemento.tipo === 'S') return total += 1
                            else return total
                        }, 0),
                        qtd_p: x.Servicos.reduce((total, elemento) => {
                            if (elemento.tipo === 'P') return total += 1
                            else return total
                        }, 0),
                        Servicos: x.Servicos.map(x => {
                            return {
                                tipo: x.tipo,
                                nome: x.nome,
                                categoria: x.Subcategorium.Categorium.nome,
                                subcategoria: x.Subcategorium.nome,
                                valor: x.valor
                            }
                        })

                    }
                })

                var qtdServicos = p.reduce((total, el) => { return total += el.Servicos.length }, 0)

                res.json(qtdServicos)
                // if (!req.body.type) {
                //     throw 'missing type'
                // }
                // if (req.body.type == 'excel') {
                //     repository.getExcelReport(res)
                // }
                // if (req.body.type == 'pdf') {
                //     res.end('opa')
                // }
            } catch (err) {
                console.log(err)
                res.status(500).json(err)
            }
        },
    }
}
