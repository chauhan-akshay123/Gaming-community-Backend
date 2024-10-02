let express = require("express");
let cors = require("cors");
let sqlite3 = require("sqlite3").verbose();
let { open } = require("sqlite");

let app = express();
let PORT = process.env.PORT || 3000;

let db;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite database connection
(async () => {
  db = await open({
    filename: "./Backend/database.sqlite",
    driver: sqlite3.Database,
  });
  console.log("Database connected.");
})();

// function to get all games
async function getAllGames(){
 let query = "SELECT * FROM games";
 let response = await db.all(query, []);
 return { games: response };
}

// Route to get all games
app.get("/games", async (req, res)=>{
 try{
   const results = await getAllGames();
   
   if(results.games.length === 0){
     res.status(404).json({ message: "No games found." });
   }
   
   return res.status(200).json(results);
 } catch(error){
   res.status(500).json({ error: error.message });
 }
});

// function to get game by Id
async function gameById(id){
  let query = "SELECT * FROM games WHERE id = ?";
  let response = await db.all(query, [id]);
  return { games: response };
}

// Route to get game by Id
app.get("/games/details/:id", async (req, res)=>{
 let id = parseInt(req.params.id);
 try{
  const results = await gameById(id);
   
  if(results.games.length === 0){
    res.status(404).json({ message: "No games found for Id: " + id });
  } 

  return res.status(200).json(results);
 } catch(error){
   res.status(500).json({ error: error.message });
 }
});

// function to get games by genre
async function gamesByGenre(genre){
  let query = "SELECT * FROM games WHERE genre = ?";
  let response = await db.all(query, [genre]);
  return { games: response };
}

// Route t get games by genre
app.get("/games/genre/:genre",  async (req, res)=>{
 let genre = req.params.genre;
 try{
  const results = await gamesByGenre(genre);
  
  if(results.games.length === 0){
    res.status(404).json({ message: "No games for the genre: " + genre});
  }

  return res.status(200).json(results);
 } catch(error){
   res.status(500).json({ error: error.message });
 }
});

// function to get games by platform
async function gamesByPlatform(platform){
  let query = "SELECT * FROM games WHERE platform = ?";
  let response = await db.all(query, [platform]);
  return { games: response };
}

// Route to get games by platform
app.get("/games/platform/:platform", async (req, res)=>{
 let platform = req.params.platform;
 try{
   const results = await gamesByPlatform(platform);
   
   if(results.games.length === 0){
     res.status(404).json({ message: "No games found for platform: " + platform });
   }

   res.status(200).json(results);
 } catch(error){
   res.status(500).json({ error: error.message });
 }
});

// function to get games sorted by rating 
async function sortedGamesByRating(){
  let query = "SELECT * FROM games ORDER BY rating DESC";
  let response = await db.all(query, []);
  return { games: response };
}

// Route to get games sorted by rating 
app.get("/games/sort-by-rating",  async (req, res)=>{
 try{
   const results = await sortedGamesByRating();
   
   if(results.games.length === 0){
     res.status(404).json({ message: "No games found." });
   }

   res.status(200).json(results);
 } catch(error){
   res.status(500).json({ error: error.message });
 }
});

// function to get all players
async function getAllPlayers(){
  let query = "SELECT * FROM players";
  let response = await db.all(query, []);
  return { players: response };
}

// Route to get all players
app.get("/players", async (req, res)=>{
 try{
   const results = await getAllPlayers();
   
   if(results.players.length === 0){
     res.status(404).json({ message: "No players found." });
   }

   return res.status(200).json(results);
 } catch(error){
   res.status(500).json({ error: error.message });
 }
});

// function to get players by id
async function getPlayerById(id){
 let query = "SELECT * FROM players WHERE id = ?";
 let response = await db.all(query, [id]);
 return { players: response };
}

// Route to get players by id
app.get("/players/details/:id", async (req, res)=>{
  let id = parseInt(req.params.id);
  try{
    const results = await getPlayerById(id);
    
    if(results.players.length === 0){
      res.status(404).json({ message: "No players found for Id: " + id });
    }

    res.status(200).json(results);
  } catch(error){
    res.status(500).json({ error: error.message });
  }
}); 

// function to get players by platform
async function playersByPlatform(platform){
  let query = "SELECT * FROM players WHERE platform = ?";
  let response = await db.all(query, [platform]);
  return { players: response };
}

// Route to get players by Platform
app.get("/players/platform/:platform", async (req, res)=>{
 let platform = req.params.platform;
 try{
   const results = await playersByPlatform(platform);

   if(results.players.length === 0){
     res.status(404).json({ message: "No players found for platform: " + platform });
   } 

   res.status(200).json(results);
 } catch(error){
   res.status(500).json({ error: error.message });
 }
});

// function to get players sorted by rating
async function sortPlayersByRating(){
 let query = "SELECT * FROM players ORDER BY rating DESC";
 let response = await db.all(query, []);
 return { players: response };
}

// Route to get players sorted by rating
app.get("/players/sort-by-rating",  async (req, res)=>{
 try{
   const results = await sortPlayersByRating();
   
   if(results.players.length === 0){
     res.status(404).json({ message: "No players found" });
   }

   res.status(200).json(results); 
 } catch(error){
   res.status(500).json({ error: error.message });
 }
});

// function to get all tournaments
async function allTournaments(){
  let query = "SELECT * FROM tournaments";
  let response = await db.all(query, []);
  return { tournaments: response };
}

// Route to get all tournaments
app.get("/tournaments", async (req, res)=>{
 try{
   const results = await allTournaments();
   
   if(results.tournaments.length === 0){
     res.status(404).json({ message: "No tournaments found." });
   }
   
   res.status(200).json(results);
 } catch(error){
   res.status(500).json({ error: error.message });
 }
});

// function to get tournament by id
async function tournamentById(id){
  let query = "SELECT * FROM tournaments WHERE id = ?";
  let response = await db.all(query, [id]);
  return { tournaments: response };
}

// Route to get Tournament by Id
app.get("/tournaments/details/:id", async (req, res)=>{
 let id = parseInt(req.params.id);
 try{
   const results = await tournamentById(id);
   
   if(results.tournaments.length === 0){
     res.status(404).json({ message: "No tournaments found for Id: " + id});
   }

   return res.status(200).json(results);
 } catch(error){
   res.status(500).json({ error: error.message });
 }
});

// function to get tournaments by game Id
async function tournamentsByGameId(id){
  let query = "SELECT * FROM tournaments WHERE gameId = ?";
  let response = await db.all(query, [id]);
  return { tournaments: response };
}

// Route to get tournaments by game Id
app.get("/tournaments/game/:id", async (req, res)=>{
 let id = parseInt(req.params.id);
 try{
   const results = await tournamentsByGameId(id);
   
   if(results.tournaments.length === 0){
     res.status(404).json({ message: "No tournaments found for game Id: " + id});
   }

   return res.status(200).json(results);
 } catch(error){
   res.status(500).json({ error: error.message });
 }
});

// function to get tournaments sorted by prize pool
async function tournamentsSorted(){
  let query = "SELECT * FROM tournaments ORDER BY prizePool DESC";
  let response = await db.all(query, []);
  return { tournaments: response };
}

// Route to get tournaments sorted by Prize Pool
app.get("/tournaments/sort-by-prize-pool", async (req, res)=>{
 try{
   const results = await tournamentsSorted();
   
   if(results.tournaments.length === 0){
     res.status(404).json({ message: "No tournaments found." });
   }

   return res.status(200).json(results);
 } catch(error){
   res.status(500).json({ error: error.message });
 }
});

// Start server
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
