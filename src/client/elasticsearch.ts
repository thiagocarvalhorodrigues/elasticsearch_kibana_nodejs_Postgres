import elasticseach from "elasticsearch"

function getClient() {
    const client = new elasticseach.Client({
        host: "localhost:9200",
        // log: "trace"
    });

    return client;
}

export default getClient;
