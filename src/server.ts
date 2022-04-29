import  express, { Request, Response } from "express";
import getClient from "./client/elasticsearch";
import DBcontroller from "./DBcontroller";
import PessoaController from "./PessoaController";

const app = express();

app.get("/", async (request: Request, response: Response) => {
    const client = getClient();

    const result = await client.index({
        index: "elastic_teste",
        type: "type_elastic_teste",
        body: {
            user: "Thiago",
            password: "Beatriz meu AMOR",
            email:" tcr.thiago@gmailc.com"
        }
    });

    return response.json(result)

})

app.get("/db/create", DBcontroller.create)
app.get("/pessoa/create", PessoaController.create)
app.get("/pessoa/findAll", PessoaController.findAll)
app.get("/pessoa/findById/:age", PessoaController.findById)
app.get("/pessoa/createPessoa", PessoaController.createPessoa)
app.get("/pessoa/findByQuery", PessoaController.findByQuery)


app.listen(3333, () => console.log("Running"))
