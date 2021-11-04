import http, { IncomingMessage, Server, ServerResponse } from "http";
import fs from 'fs';
import { getAllData, getDataById, createData, updateData, deleteData } from './Controller/controller';

/*
implement your server code here
*/
const data = [
  {
    organization: "node ninja",
    createdAt: "2020-08-12T19:04:55.455Z",
    updatedAt: "2020-08-12T19:04:55.455Z",
    products: ["developers", "pizza"],
    marketValue: "90%",
    address: "sangotedo",
    ceo: "cn",
    country: "Taiwan",
    id: 1,
    noOfEmployees: 2,
    employees: ["james bond", "jackie chan"]
  }
]

fs.writeFile('./data/database.json', JSON.stringify(data, null, ' '), 'utf8', (err) => {
  if (err) {
    console.log(err)
  }
})


const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const input = req.url as string

    if (input === '/api' && req.method === "GET") {
      getAllData(req, res)
    } else if (input.match(/\/api\/([0-9]+)/) && req.method === "GET") {
      const id = +(input.split('/')[2])
      getDataById(req, res, id)
    } else if (input === '/api' && req.method === "POST") {
      createData(req, res)
    } else if (input.match(/\/api\/([0-9]+)/) && req.method === "PUT") {
      const id = +(input.split('/')[2])
      updateData(req, res, id)
    } else if (input.match(/\/api\/([0-9]+)/) && req.method === "DELETE") {
      const id = +(input.split('/')[2])
      deleteData(req, res, id)
    } else {
      res.writeHead(404, { 'content-type': "application/json" })
      res.end(JSON.stringify({ message: 'Route Not Found' }));
    }
  }
);

server.listen(3005, () => console.log("server started on port: 3005"));
