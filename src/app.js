const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");
const { query, json } = require("express");
const app = express();

app.use(express.json());
app.use(cors());

// function validateRepositoryID (request, response, next){
//   const {id} = request.params;

//   if (!isUuid(id)){
//     return response.json.status(400).json({Error: "Invalid ID Project"})  
//   }
//   return next();
// }

// app.use(validateRepositoryID);

const repositories = [];

//Lista
app.get("/repositories", (request, response) => {
  //const {id, likes, techs, title, url} = request.query  
  return response.json(repositories)
});
//------------------

//Cria
app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,  //.split para separar os valores do vindos do json em um array 
    likes: 0
  }

  repositories.push(repository);

  return response.json(repository);

});
// --------------

//Atualiza
app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body
  const repoIndex = repositories.findIndex(repository => repository.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({ Error: "Repository does not exist." })
  }

  const likes = repositories[repoIndex].likes; //pegar o valor de likes antigos para não zerar o valor quando atualizar 
  const repository = {
    id,
    title,
    url,
    techs,
    likes
  }

  repositories[repoIndex] = repository;

  return response.json(repository);
});
// --------------


//Deleta
app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex(repository => repository.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({ Error: "Repository does not exist." })
  }

  repositories.splice(repoIndex, 1);

  return response.status(204).send();
});
// -----------------

//Dá Like
app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repoIndex = repositories.findIndex(repository => repository.id === id)
 
  if (repoIndex < 0) {
    return response.status(400).json({Error: "Repository does not exist."})
  }

  repositories[repoIndex].likes ++;

  return response.json(repositories[repoIndex]);
})
  // ----------

  module.exports = app
