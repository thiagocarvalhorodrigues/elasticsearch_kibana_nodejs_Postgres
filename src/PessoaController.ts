import { Request, Response } from "express";
import { Client } from "pg";
import getClient from "./client/elasticsearch";

class PessoaController {

    async create(request: Request, response: Response) {
            const client =  new Client({
                host: "192.168.0.31",
                port: 5432,
                database: "teste",
                password: "docker",
                user: "postgres"
            })

            await client.connect();

            const { rows } = await client.query("SELECT * FROM pessoa");

            for await(let row of rows) {
               await getClient().index({
                   index: "pessoa",
                   type: "type_pessoa",
                   body: row
               }, (erro) => {
                   if(erro){
                   return response.status(400).json({error: erro})
               }
            }) 
                
            }
            
            return response.json({message: "Index ok!"})
          
    }

    async findAll(request: Request, response: Response) {

        const dataInicial = new Date().getTime();
        
        const data = await getClient().search({
            index: "pessoa",
            size: 1000,
        });

        const dataFinal = new Date().getTime();

        console.log('O Resultado do elasticsearch foi', (dataFinal - dataInicial));     

        return response.json(data);
    }

    async findById(request: Request, response: Response) {
        
        const { age } = request.params;

        const data = await getClient().search({
        index: "pessoa",
        q: `age: ${age}`
    });

    return response.json(data.hits.hits);
        
    }

    async createPessoa(request: Request, response: Response){
        const pessoa = {
            "id": 9999999999,
            "name": "TEO",
            "age" :2
        }

    const data = await getClient().index({
        index: "pessoa",
        type: "type_pessoa",
        body: pessoa
    });

    return response.json(data);
};


    async findByQuery(request: Request, response: Response){

        const data =await getClient().search({
            index: "pessoa",
            body: {
                query: {
                    match:{
                        "name": 'BEATRIZ'
                    }
                }
            }

        })

        return response.json(data);

}
}
export default new PessoaController;