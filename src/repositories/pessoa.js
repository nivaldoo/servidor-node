const uuid = require('uuid/v4');
const CryptoJS = require('crypto-js');
const { Sequelize } = require('sequelize');
const sequelize = require('sequelize');
const pessoa = require('../routes/pessoa');

module.exports = (app) => {
  const repository = {
    add: async (params) => {
      console.log('body params', params);
      params.id = uuid();
      const transaction = await app.db.sequelize.transaction();
      try {
        await app.db.models.Pessoa.create({
          id: params.id,
          nome: params.nome,
          nome_social: params.nome_social,
          email: params.email,
          id_faixa_etaria: params.id_faixa_etaria || null,
          nome_fantasia: params.nome_fantasia,
          id_numero_funcionario: params.id_numero_funcionario || null,
          telefone: params.telefone,
          celular: params.celular,
          id_estado_civil: params.id_estado_civil || null,
          id_qtd_filhos: params.id_qtd_filhos || null,
          id_renda: params.id_renda,
          id_genero: params.id_genero || null,
          id_raca: params.id_raca || null,
          cep: params.cep,
          endereco: params.endereco,
          numero: params.numero,
          bairro: params.bairro,
          complemento: params.complemento,
          id_cidade: params.id_cidade,
          latitude: params.latitude || 0,
          longitude: params.longitude || 0,
          autobiografia: params.autobiografia,
          foto: params.foto,
          facebook: params.facebook,
          instagram: params.instagram,
          website: params.website,
          rodada_capacidade_atendimento: params.rodada_capacidade_atendimento,
          rodada_caracteristica_tecnica: params.rodada_caracteristica_tecnica,
          ativo: 1,
          importacao: params.importacao || 0,
          afroestima: params.afroestima || 0,
          cpf: params.cpf
        }, { transaction });
        params.id_pessoa = params.id;
        // await app.db.models.Importacao.destroy({
        //   where: {
        //     cpf: params.cpf
        //   }
        // }, { transaction })
        const usuario = await app.repositories.usuario.addFromPessoa(params, transaction);
        await transaction.commit();
        params.Usuario = { id: usuario.id };

        await app.utils.sendMail.sendT(params.email, '', 'CADASTRO AFROBIZ', `
        <table width="640" border="0" align="center" cellpadding="0" cellspacing="0">
        <tbody>
          <tr>
            <td><img src="https://afrobiz.com.br/assets/images/img-mail-topo.jpg" width="640" height="184" alt="" style="display: block;" /></td>
          </tr>
          <tr>
            <td><table width="100%" border="0" cellspacing="12" cellpadding="0">
              <tbody>
                <tr>
                  <td> 
                  <h2 style="font-family: Helvetica, Arial, sans-serif">Bem vindo ao Afrobiz!</h2>
                    <p style="font-family: Helvetica, Arial, sans-serif"><b>O Afrobiz Salvador</b> é a plataforma que conecta a industria criativa afro de salvador com consumidores, mentores e investidores do Brasil e do mundo. Cadastre agora mesmo seus produtos e serviços! <b>Acesse <a href="https://www.afrobizsalvador.com.br">www.afrobizsalvador.com.br</a>.</b></p></td>
                </tr>
                <tr>
                  <td height="60">&nbsp;</td>
                </tr>
              </tbody>
            </table></td>
          </tr>
          <tr>
            <td><table width="640" border="0" cellpadding="0" cellspacing="0" bgcolor="#21D097">
              <tbody>
                <tr>
                  <td width="367" valign="top">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tbody>
                      <tr>
                        <td height="155">
                        <p style= "font-family: Helvetica, Arial, sans-serif; padding: 16px">Cnsetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna <br><br>
                          <a style="color:#000000" href="http://afroestimasalvador.com.br">www.afroestimasalvador.com.br</a>
                          </p></td>
                      </tr>
                    </tbody>
                  </table></td>
                  <td width="273" valign="top"><img src="https://afrobiz.com.br/assets/images/img-mail-afroestima-2.jpg" width="273" border="0" style="display: block;" alt=""/></td>
                </tr>
                <tr>
                  <td width="367" height="106" valign="top"><img src="https://afrobiz.com.br/assets/images/img-mail-afroestima-0.jpg" width="367" height="106" border="0" alt="" style="display: block;" /></td>
                  <td width="273" height="106" valign="top"><img src="https://afrobiz.com.br/assets/images/img-mail-afroestima-1.jpg" width="273" height="106" border="0" alt="" style="display: block;"/></td>
                </tr>
              </tbody>
            </table></td>
          </tr>
          <tr>
            <td bgcolor="#070808"><table width="100%" border="0" cellspacing="20" cellpadding="0">
              <tbody>
                <tr>
                  <td height="18" align="center" style="font-size: 12px; text-decoration: none; text-transform: uppercase; letter-spacing: 6px; font-family: Helvetica, Arial, sans-serif"><a style="color:#ffffff" href="https://afrobizsalvador.com.br">www.afrobizsalvador.com.br</a></td>
                </tr>
              </tbody>
            </table></td>
          </tr>
        </tbody>
      </table>       
        `)

        return params;
      } catch (error) {
        await transaction.rollback();
        throw error;
      }
    },
    resolveAddress: async (idPessoa, enderecos) => {
      await app.db.models.Endereco.destroy({ where: { id_pessoa: idPessoa } });
      if (Array.isArray(enderecos)) {
        for (const endereco of enderecos) {
          await app.db.models.Endereco.create({
            id: uuid(),
            rua: endereco.rua,
            cep: endereco.cep,
            numero: endereco.numero,
            id_pessoa: idPessoa
          });
        }
      }
    },
    get: async (id) => {
      console.log('body id:', id);
      const pessoa = await app.db.models.Pessoa.findOne({
        where: { id: id },
        raw: true
      });
      const cidade = await app.db.models.Cidade.findOne({
        attributes: ['id_uf', 'nome', 'uf'],
        where: { id: pessoa.id_cidade },
        raw: true
      });
      pessoa.uf = cidade.uf;
      pessoa.id_uf = cidade.id_uf;
      pessoa.cidade = cidade.nome;
      pessoa.urlMapa = `https://www.google.com/maps/embed/v1/place?key=API_KEY&q=${pessoa.cep}+Brasil`;
      return pessoa;
    },
    getFromUser: async (id) => {
      console.log('body id:', id);
      const usuario = await app.db.models.Usuario.findOne({
        where: { id: id }
      });
      const pessoa = await app.db.models.Pessoa.findOne({
        where: { id: usuario.id_pessoa },
        raw: true
      });
      const cidade = await app.db.models.Cidade.findOne({
        attributes: ['uf'],
        where: { id: pessoa.id_cidade },
        raw: true
      });
      pessoa.id_uf = cidade.uf;
      pessoa.id_perfil = usuario.id_perfil;
      return pessoa;
    },
    search: async (params) => {
      const Op = await app.db.Sequelize.Op;
      console.log('body params: ', params);
      let where = null;
      let whereCidade = null;
      let whereUsuario = null;
      let whereServico = null;
      const user = null;
      let subcategorias = null;
      let requiredServico = false;
      let order = ['nome', 'ASC'];

      if (params.order) {
        order = ['nome', 'DESC'];
      }

      whereUsuario = { // Sempre obter os usuários que são do perfil Pessoa.
        id_perfil: '6da4dc31-67b8-11eb-99db-641c678d9ca2'
      };

      if (params.nome) {
        where = where || {};
        where.nome = { $like: `%${params.nome}%` };
      }
      if (params.cpf) {
        where = where || {};
        where.cpf = params.cpf;
      }
      if (params.email) {
        where = where || {};
        where.email = params.email;
      }
      if (params.cidade) {
        whereCidade = whereCidade || {};
        whereCidade = {
          nome: {
            [Op.like]: `%${params.cidade}%`
          }
        };
      }
      // if (params.usuarioLogado) { //No caso da listagem de pessoas/entidades da administração... Quando o usuário logado é do perfil 'Agente', só deve retornar os usuários com perfil de 'Pessoa'.
      //   user = await app.db.models.Usuario.findOne({
      //     attributes: ['id', 'id_perfil'],
      //     where: { id: params.usuarioLogado },
      //   });
      //   if (user.id_perfil == '63e51c77-80fe-11eb-af2d-00fff548cc13') {
      //      whereUsuario = {
      //       id_perfil: '6da4dc31-67b8-11eb-99db-641c678d9ca2'
      //     }
      //   }
      // }
      if (params.tipo) {
        whereServico = whereServico || {};
        whereServico.tipo = params.tipo;
        requiredServico = true;
      }
      if (params.id_categoria && !params.id_subcategoria) {
        whereServico = whereServico || {};
        subcategorias = await app.db.models.Subcategoria.findAll({
          attributes: ['id'],
          where: { id_categoria: params.id_categoria },
        });
        subcategorias = subcategorias.map((subc) => {
          return subc.id;
        });
        whereServico.id_subcategoria = { [Op.in]: subcategorias };
        requiredServico = true;
      } else if (params.id_subcategoria) {
        whereServico = whereServico || {};
        whereServico.id_subcategoria = params.id_subcategoria;
        requiredServico = true;
      }
      if (params.existeProdutoServico) {
        requiredServico = true;
      }
      const pessoas = await app.db.models.Pessoa.findAndCountAll({
        limit: params.limit,
        offset: params.offset,
        order: [['nome', 'ASC']],
        where: where,
        include: [
          {
            attributes: [],
            model: app.db.models.Servico,
            required: requiredServico,
            where: whereServico
          },
          {
            attributes: ['id', 'id_perfil', 'senha', 'nome'],
            model: app.db.models.Usuario,
            required: true,
            where: whereUsuario
          },
          {
            model: app.db.models.Cidade,
            attributes: ['id', 'nome'],
            required: true,
            where: whereCidade,
            include: [
              {
                model: app.db.models.Uf,
                attributes: ['id', 'nome', 'sigla'],
                required: true,
              }
            ]
          }
        ],
        group: ['Pessoa.id', 'Usuario.id'],
        order: [order]
      });
      pessoas.count = pessoas.count.length;
      return pessoas;
    },
    delete: async (id) => {
      console.log('params id:', id);
      const transaction = await app.db.sequelize.transaction();
      try {
        await app.repositories.usuario.deleteFromPessoa(id, transaction);
        const deleted = await app.db.models.Pessoa.destroy({
          where: { id: id }
        }, { transaction });
        await transaction.commit();
        return deleted;
      } catch (error) {
        await transaction.rollback();
        throw 'Houve um erro ao excluir pessoa';
      }
    },
    update: async (params) => {
      console.log('body :', params);
      const transaction = await app.db.sequelize.transaction();
      try {
        await app.db.models.Pessoa.update({
          nome: params.nome,
          nome_social: params.nome_social,
          id_faixa_etaria: params.id_faixa_etaria,
          nome_fantasia: params.nome_fantasia,
          id_numero_funcionario: params.id_numero_funcionario,
          telefone: params.telefone,
          celular: params.celular,
          id_estado_civil: params.id_estado_civil || null,
          id_qtd_filhos: params.id_qtd_filhos || null,
          id_renda: params.id_renda,
          id_genero: params.id_genero || null,
          id_raca: params.id_raca || null,
          cep: params.cep,
          endereco: params.endereco,
          numero: params.numero,
          bairro: params.bairro,
          complemento: params.complemento,
          id_cidade: params.id_cidade,
          latitude: params.latitude || 0,
          longitude: params.longitude || 0,
          autobiografia: params.autobiografia,
          facebook: params.facebook,
          instagram: params.instagram,
          website: params.website,
          rodada_capacidade_atendimento: params.rodada_capacidade_atendimento,
          rodada_caracteristica_tecnica: params.rodada_caracteristica_tecnica,
          foto: params.foto,
          afroestima: params.afroestima || 0
        }, {
          where: { id: params.id },
          transaction
        });
        await app.repositories.usuario.updateFromPessoa(params, transaction);
        await transaction.commit();
        const pessoa = await app.db.models.Pessoa.findOne({
          where: { id: params.id },
          include: [
            {
              attributes: ['id'],
              model: app.db.models.Usuario,
              required: true,
            },
          ]
        });
        return pessoa;
      } catch (error) {
        await transaction.rollback();
        throw 'Houve um erro ao atualizar pessoa';
      }
    },
    changePessoaState: async (params) => {
      const transaction = await app.db.sequelize.transaction();
      const pessoa = await app.db.models.Pessoa.findOne({
        where: {
          id: params.id
        }
      });
      try {
        await pessoa.update({
          ativo: !pessoa.ativo
        }, {
          transaction
        });
        await transaction.commit();
        return true;
      } catch (error) {
        await transaction.rollback();
        throw 'Houve um erro ao mudar o status do usuário';
      }
    },
    searchReturnNames: async (params) => {
      const nomes = await app.db.models.Pessoa.findAll({
        attributes: ['nome'],
        raw: true,
        where: {
          nome: { $like: `%${params.nome}%` },
          ativo: 1
        }
      });
      return nomes;
    },
    searchReturnList: async (params) => {
      let pessoa;
      let servico;

      if (params.pessoa) {
        pessoa = {
          nome: { $like: `%${params.pessoa}%` },
          entidade: 'P'
        };
      }

      if (params.servico) {
        servico = {
          nome: { $like: `%${params.servico}%` },
          entidade: 'S'
        };
      }

      let where = {};

      if (pessoa || servico) {
        where = { $or: [pessoa, servico] };
      }

      if (params.id_subcategoria) {
        where.id_subcategoria = params.id_subcategoria;
      }

      if (params.id_pessoa) {
        where = {
          id_pessoa: params.id_pessoa
        };
      }

      let order = ['nome'];

      if (params.order) {
        order = [['nome', params.order]];
      }

      const lista = await app.db.models.PessoaServico.findAndCountAll({
        attributes: ['entidade', 'id', 'nome', 'descricao', 'foto', 'valor', 'telefone',
          'celular', 'email', 'cep', 'id_subcategoria', 'id_pessoa'],
        raw: true,
        where: where,
        limit: params.limit,
        offset: params.offset,
        order: order
      });

      let whereC = '';
      if (params.pessoa) {
        whereC = ` WHERE p.nome LIKE '%${params.pessoa}%' `;
        if (params.servico) {
          whereC = ` WHERE (p.nome LIKE '%${params.pessoa}%' OR s.nome LIKE '%${params.servico}%') `;
        }
      } else if (params.servico) {
        whereC = ` WHERE s.nome LIKE '%${params.servico}%' `;
      }

      if (params.id_subcategoria) {
        if (whereC) {
          whereC += ` AND sc.id = '${params.id_subcategoria}'`;
        } else {
          whereC = ` WHERE sc.id = '${params.id_subcategoria}'`;
        }
      }

      if (params.id_pessoa) {
        whereC = ` WHERE s.id_pessoa='${params.id_pessoa}' `;
      }

      const qtdCategoria = await app.db.sequelize.query(`
        SELECT sc.id, sc.nome, COUNT(*) AS qtd FROM servico s
        JOIN pessoa p ON p.id = s.id_pessoa
        JOIN subcategoria sc ON s.id_subcategoria = sc.id
        ${whereC}
        GROUP BY sc.id`, { type: app.db.sequelize.QueryTypes.SELECT });

      lista.Categoria = qtdCategoria;

      return lista;
    },
    getCidade: async (params) => {
      const usuario = await app.db.models.Usuario.findOne({
        attributes: ['id_pessoa'],
        raw: true,
        where: { id: params.id }
      });
      const pessoa = await app.db.models.Pessoa.findOne({
        attributes: ['id_cidade'],
        raw: true,
        where: { id: usuario.id_pessoa }
      });
      const cidade = await app.db.models.Cidade.findOne({
        attributes: ['nome', 'codigo'],
        raw: true,
        where: { id: pessoa.id_cidade }
      });
      return cidade;
    },
    searchImportacao: async (params) => {

      if (!params.cpf && !params.email.trim()) {
        return []
      }
      let whereImportacao = {}
      if (params.cpf && params.email) {

        let arr = []
        arr.push({ cpf: params.cpf })
        arr.push({ email: params.email })
        whereImportacao = { $or: arr }
      }
      if (params.cpf) {
        whereImportacao = {
          cpf: params.cpf
        }
      }
      if (params.email) {
        whereImportacao = {
          email: params.email
        }
      }

      let pessoa = await app.db.models.Pessoa.findAll({
        attributes: ['nome'],
        where: whereImportacao,
        include: [{
          model: await app.db.models.Usuario,
          attributes: ['id']
        }]
      });

      if (pessoa.length > 0) {
        return pessoa;
      }

      const importacao = await app.db.models.Importacao.findAll({
        attributes: ['nome', 'nome_social', 'cpf', 'email', 'telefone', 'celular', 'id_estado_civil',
          'id_qtd_filhos', 'cep', 'endereco', 'numero', 'bairro', 'complemento', 'id_cidade'],
        where: whereImportacao
      })

      if (importacao.length > 0) {
        return importacao;
      }

      return [];
    },
    searchTerm: async (params) => {
      console.log('body params: ', params);

      if (params.term === '') {
        return {
          count: 0,
          rows: []
        };
      }

      const pessoas = await app.db.models.Pessoa.findAndCountAll({
        attributes: ['id', 'nome', 'bairro', 'id_cidade', 'latitude', 'longitude', 'foto'],
        limit: params.limit,
        offset: params.offset,
        include: [
          {
            model: app.db.models.Cidade,
            attributes: ['id', 'nome'],
            required: true
          },
        ],
        where: {
          nome: {
            like: `%${params.term}%`
          }
        },
        order: [['nome', 'ASC']],
      });

      const servicos = await app.db.models.Servico.findAndCountAll({
        attributes: ['id', 'bairro', 'nome', 'id_cidade', 'id_pessoa', 'latitude', 'longitude'],
        limit: params.limit,
        offset: params.offset,
        include: [
          {
            model: app.db.models.Cidade,
            attributes: ['id', 'nome'],
            required: true
          },
          {
            model: app.db.models.Pessoa,
            attributes: ['id', 'nome', 'foto'],
            required: true
          }
        ],
        where: {
          nome: {
            like: `%${params.term}%`
          },
        },
        order: [['nome', 'ASC']],
      });

      const count = pessoas.count + servicos.count;
      const rows = [];

      pessoas.rows.map((item) => {
        rows.push(item);
      });

      servicos.rows.map((servico) => {
        servico.tipo = 'servico';
        rows.push(servico);
      });

      const result = {
        count,
        rows
      };

      return result;
    }
  };
  return repository;
};
