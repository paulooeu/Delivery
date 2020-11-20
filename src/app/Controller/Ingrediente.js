import api from 'axios';
import keyConfig from '../config/key';

class IngredienteController {
  async store(req, res) {
    const { i } = req.query;

    if(i.split(',').length<3){
      try {
        await api.get(`http://www.recipepuppy.com/api/?i=${i}`).then(response => {
          const { results } = response.data;
          return results;

        }).then((results) => {
          let instalacoes = []

          Promise.all(results.map(async (r, x) => {
            let giphy, resposta, dados;
            await api.get(`http://api.giphy.com/v1/gifs/search?q=${r.title}&api_key=${process.env.APP_KEY}&limit=1`).then(responseGiphy => {
              resposta = responseGiphy.data;
              giphy = resposta.data[0].url;
              dados = {
                title: r.title,
                ingredients: r.ingredients,
                link: r.href,
                gif: giphy
              }

              instalacoes.push(dados);
            }).catch(()=>{
              return res.status(400).json({ error: "Sistema giphy esta indisponivel" });
            })
          })).then(() => {

          function compare(a,b) {
            if (a.title < b.title)
               return -1;
            if (a.title > b.title)
              return 1;
            return 0;
          }
          instalacoes.sort(compare);
            const resultado = {
              keywords: i.split(','),
              recipes: instalacoes
            }
            return res.json(resultado);
          })
        }).catch(()=>{
          return res.status(400).json({ error: "Sistema recipepuppy esta indisponivel" });
        })
      } catch (e) {
        console.log('errro', e)
        return res.json(e);
      }
    }else{
      return res.status(400).json({ error: "So é permitido até 3 paramêtros" });
    }

  }

}

export default new IngredienteController();
