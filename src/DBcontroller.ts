import { Client } from "pg";
import { Request, Response } from "express";

class DBController {


        async create(request: Request, response: Response) {
            const dataInicial = new Date().getTime();
            const client =  new Client({
                host: "192.168.0.31",
                port: 5432,
                database: "teste",
                password: "docker",
                user: "postgres"
            })

            await client.connect();

            const { rows } = await client.query("SELECT * FROM pessoa");

            const dataFinal = new Date().getTime();

            console.log('O Resultado do Postgres foi', (dataFinal - dataInicial));

            // console.log(rows)        

            return response.json(rows);


        }

}

export default new DBController;
