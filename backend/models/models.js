const mongoose = require('mongoose');
const middleware = require('../middleware/middleware');
require('dotenv').config();

// MongoDB connection
const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI

    )
    .then(() => {
      console.log("MongoDB connected");
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

//SCHEMAS
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const eventManagerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const playerSchema = new mongoose.Schema({
  player_id : {
    type: mongoose.Types.ObjectId
  },
  playerName: { 
    type: String, 
    required: true 
  },
  medal: { 
    type: String, 
    enum: ['gold', 'silver', 'bronze'], // To limit to valid medal types
    required: true 
  },
  image: { 
    type: String, 
    // required: true 
  }
});

// Sport schema
const sportSchema = new mongoose.Schema({
  sportName: { 
    type: String, 
    required: true 
  },
  medals: {
    gold: { 
      type: Number, 
      default: 0 
    },
    silver: { 
      type: Number, 
      default: 0 
    },
    bronze: { 
      type: Number, 
      default: 0 
    }
  },
  players: [playerSchema] // Embedding the player schema inside the sports schema
});

// Country schema
const countrySchema = new mongoose.Schema({
  country: { 
    type: String, 
    required: true 
  },
  flag: { 
    type: String, 
    required: true 
  },
  medals: {
    gold: { 
      type: Number, 
      default: 0 
    },
    silver: { 
      type: Number, 
      default: 0 
    },
    bronze: { 
      type: Number, 
      default: 0 
    }
  },
  sports: [sportSchema] // Embedding the sports schema inside the country schema
});

const Admin = mongoose.model("admins",adminSchema);
const Manager = mongoose.model("managers",eventManagerSchema);
const Country = mongoose.model("countries",countrySchema);
mongoose.connection.on('disconnected', () => {
  console.error('MongoDB disconnected! Reconnecting...');
  db(); // Reconnect to the database
});

mongoose.connection.on('reconnected', () => {
  console.log('MongoDB reconnected');
});

exports.authenticateAdmin = async (username, password) => {
  try {
      const admin = await Admin.findOne({ username: username });
      if (admin) {
          
          if (admin.password === password) {
              const token = middleware.generateToken({ username });
              return { success: true, token };
          } else {
              return { success: false, message: "Invalid password" };
          }
      } else {
          return { success: false, message: "Admin not found" };
      }
  } catch (err) {
      console.error("Error logging admin:", err);
      return { success: false, message: "Error logging admin" };
  }
};

exports.addAdmin = async (adminUserName, password) => {
  try {
    // Create new admin instance using Mongoose model
    const newAdmin = new Admin({
      username: adminUserName,
      password: password
    });

    // Save the admin to the collection
    const result = await newAdmin.save();

    if (result) {
      console.log("Admin inserted successfully");
      return { success: true };
    } else {
      console.log("Failed to insert admin");
      return { success: false, message: "Failed to insert admin" };
    }
  } catch (error) {
    console.error("Error inserting admin:", error);
    return { success: false, message: "Error inserting admin" };
  }
};
exports.updateAdmin = async (adminID, newAdminUserName, newPassword) => {
  const new_id=new mongoose.Types.ObjectId(adminID);
  if (!new_id){
    return {
      success: "false",
      message: "Invalid ID format"
    };
  }

  try {
    const result = await Admin.findByIdAndUpdate(
      new_id, 
      {
        $set: {
          username: newAdminUserName,
          password: newPassword
        }
      },
      { new: true }
    );

    if (!result) {
      return {
        success: "false",
        message: "No admin found or no updates made"
      };
    }

    return {
      success: "true",
      message: "Admin updated successfully",
      updatedAdmin: result 
    };
  } catch (error) {
    return {
      success: "false",
      message: "Error updating admin",
      error: error.message
    };
  }
};

exports.deleteAdmin = async (adminID) => {
  const adminId = adminID;
  if (!mongoose.Types.ObjectId.isValid(adminId)) {
    return {
      success: "false",
      message: "Invalid ID format"
    };
  }

  try {
    const result = await Admin.findByIdAndDelete(adminId);

    if (!result) {
      return {
        success: "false",
        message: "No admin found or no deletes made"
      };
    }

    return {
      success: "true",
      message: "Admin deleted successfully"
    };
  } catch (error) {
    return {
      success: "false",
      message: "Error deleting admin",
      error: error.message
    };
  }
}

exports.getAdmins = async() => {
  try {
    const admins = await Admin.find({}, { _id: 1, username: 1, password: 1 });
    console.log("All Admins:", admins);
    return admins;
  }
  catch(err){
    console.log("Database Query Error:", err);
    return {success: false, message: "Database Query Error"}
  }
}
exports.addEventManager = async(username, password) => {

  try {
    // Create new admin instance using Mongoose model
    const newManager = new Manager({
      username: username,
      password: password
    });
    const result = await newManager.save();

    if (result) {
      console.log("Manager inserted successfully");
      return { success: true };
    } else {
      console.log("Failed to insert manager");
      return { success: false, message: "Failed to insert manager" };
    }
  } catch (error) {
    console.error("Error inserting manager:", error);
    return { success: false, message: "Error inserting manager" };
  }
}

exports.getEventManagers = async() => {
  try {
    const managers = await Manager.find({}, { _id: 1, username: 1, password: 1 });
    console.log("All Admins:", managers);
    return managers;
  }
  catch(err){
    console.log("Database Query Error:", err);
    return {success: false, message: "Database Query Error"}
  }
}
exports.updateEventManager = async (eventManagerID, newUsername, newPassword) => {
  const new_id = new mongoose.Types.ObjectId(eventManagerID);
  
  if (!new_id) {
    return {
      success: "false",
      message: "Invalid ID format"
    };
  }

  try {
    const result = await Manager.findByIdAndUpdate(
      new_id, 
      {
        $set: {
          username: newUsername,
          password: newPassword
        }
      },
      { new: true } 
    );

    if (!result) {
      return {
        success: "false",
        message: "No event manager found or no updates made"
      };
    }

    return {
      success: "true",
      message: "Event manager updated successfully",
      updatedEventManager: result 
    };
  } catch (error) {
    return {
      success: "false",
      message: "Error updating event manager",
      error: error.message
    };
  }
};


exports.deleteEventManager = async (managerID) => {
  const managerId = managerID;
  if (!mongoose.Types.ObjectId.isValid(managerId)) {
    return {
      success: "false",
      message: "Invalid ID format"
    };
  }

  try {
    const result = await Manager.findByIdAndDelete(managerId);

    if (!result) {
      return {
        success: "false",
        message: "No event manager found or no deletes made"
      };
    }

    return {
      success: "true",
      message: "Event Manager deleted successfully"
    };
  } catch (error) {
    return {
      success: "false",
      message: "Error deleting event manager",
      error: error.message
    };
  }
}

exports.authenticateEventManager = async(username, password) => {
  try {
    const manager = await Manager.findOne({ username: username});
    if (manager) {
      if(manager.password === password){
        const token = middleware.generateToken({username});
        return {success: true, token};
      }
      else{
        return {success: false, message: "Invalid password"};
      }
    } else {
      return { success: false };
    }
  } catch (err) {
    console.log("Database Query Error:", err);
    throw err; 
  }
}

exports.addMedals = async (countryName, flag, sportName, playerName, medalType) => {
  try {
    // Check if the country exists
    let existingCountry = await Country.findOne({ country: countryName });

    if (!existingCountry) {
      // If the country doesn't exist, create it with 0 medals for the new sport
      existingCountry = await Country.create({
        country: countryName,
        flag: flag,
        medals: { gold: 0, silver: 0, bronze: 0 },
        sports: []
      });
    }

    // Increment the country-level medal count
    await Country.updateOne(
      { country: countryName },
      { $inc: { [`medals.${medalType}`]: 1 } } // Correct dynamic field syntax
    );

    // Now handle the sport-level medals
    let sport = existingCountry.sports.find(s => s.sportName === sportName); // Use correct field name

    if (!sport) {
      // If the sport doesn't exist, add it to the country
      await Country.updateOne(
        { country: countryName },
        {
          $push: {
            sports: {
              sportName: sportName,  // Use correct sportName
              medals: { gold: 0, silver: 0, bronze: 0 },
              players: [{ playerName: playerName, medal: medalType }] // Correct player format
            }
          }
        }
      );

      // Increment the medal count for the newly added sport
      await Country.updateOne(
        { country: countryName, "sports.sportName": sportName },
        { $inc: { [`sports.$.medals.${medalType}`]: 1 } } // Correct dynamic field syntax for sport medals
      );
    } else {
      // If the sport exists, just increment the medal count and update the player
      await Country.updateOne(
        { country: countryName, "sports.sportName": sportName },
        {
          $inc: { [`sports.$.medals.${medalType}`]: 1 }, // Increment sport-level medals
          $addToSet: { "sports.$.players": { playerName: playerName, medal: medalType } } // Ensure the player is added
        }
      );
    }

    return { success: true, country: countryName, sportName, playerName, medal: medalType };
  } catch (error) {
    console.error("Database Query Error:", error);
    return { success: false, message: "Database Query Error", error: error.message };
  }
};

exports.getMedals = async() => {
  try{
    const result = await Country.aggregate([
      { $unwind: "$sports" },  // Unwind the sports array
      { $unwind: "$sports.players" },  // Unwind the players array within each sport
      { $project: { 
          country: 1,  // Include the country name in the output
          playerName: "$sports.players.playerName",  // Extract the player's name
          medal: "$sports.players.medal",  // Extract the player's medal type
          sportName: "$sports.sportName"  // Extract the sport name (correct field spelling)
      }}
    ]);
    
  return result;
  }catch(err){
    console.error("Database Query Error: ", err);
    return { success: false, message: "Database Query Error" };
  }
}

exports.updateMedalsCountry = async (countryId, newCountryName) => {
  try {
    const id = new mongoose.Types.ObjectId(countryId);

    // Update the country's name in the database
    const result = await Country.updateOne(
      { _id: id }, 
      { $set: { country: newCountryName } }
    );

    // Check if the country was found and updated
    if (result.matchedCount === 1) {
      return { success: true, message: `Country name updated to ${newCountryName}.`, country: newCountryName };
    } else {
      return { success: false, message: "Country not found." };
    }
  } catch (error) {
    console.error('Error updating country:', error);
    return { success: false, message: "Error updating country." };
  }
};


exports.updateSportName = async (countryId, oldSportName, newSportName) => {
  try {
    const id = new mongoose.Types.ObjectId(countryId);
    
    // Update the sport name inside the country's sports array
    const result = await Country.updateOne(
      { _id: id, "sports.sportName": oldSportName },
      { $set: { "sports.$.sportName": newSportName } }
    );

    // Check if any document was matched and modified
    if (result.matchedCount === 1) {
      return { success: true, message: `Sport name updated from ${oldSportName} to ${newSportName}.` };
    } else {
      return { success: false, message: "Sport not found." };
    }
  } catch (error) {
    console.error('Error updating sport name:', error);
    return { success: false, message: "Error updating sport name." };
  }
};


exports.updatePlayerDetails = async (playerId, playerName, medalType) => {
  try {
    const id = new mongoose.Types.ObjectId(playerId);

    // Find the player within the sports array
    const playerData = await Country.findOne({ "sports.players._id": id });

    if (!playerData) {
      return { success: false, message: "Player not found." };
    }

    // Find the sport that has the player
    const sport = playerData.sports.find(s => s.players.some(p => p._id.equals(id)));
    const currentPlayer = sport.players.find(p => p._id.equals(id));

    const currentPlayerName = currentPlayer.playerName;
    const currentMedalType = currentPlayer.medal;

    // If the name and medal type haven't changed, no update is needed
    if (currentPlayerName === playerName && currentMedalType === medalType) {
      return { success: true, message: "No update needed." };
    }

    // Update the medal counts if the medal type has changed
    if (currentMedalType !== medalType) {
      // Decrement the old medal type count
      if (playerData.medals[currentMedalType] > 0) {
        await Country.updateOne(
          { _id: playerData._id, "sports.sportName": sport.sportName },
          {
            $inc: {
              [`sports.$.medals.${currentMedalType}`]: -1,
              [`medals.${currentMedalType}`]: -1
            }
          }
        );
      }

      // Increment the new medal type count
      await Country.updateOne(
        { _id: playerData._id, "sports.sportName": sport.sportName },
        {
          $inc: {
            [`sports.$.medals.${medalType}`]: 1,
            [`medals.${medalType}`]: 1
          }
        }
      );
    }

    // Update the player's name and medal type
    await Country.updateOne(
      { "sports.players._id": id },
      {
        $set: {
          "sports.$[sport].players.$[player].playerName": playerName,
          "sports.$[sport].players.$[player].medal": medalType
        }
      },
      {
        arrayFilters: [
          { "sport.sportName": sport.sportName },
          { "player._id": id }
        ]
      }
    );

    return { success: true, message: "Player details updated successfully." };
  } catch (error) {
    console.error("Error updating player details:", error);
    return { success: false, message: "Error updating player details." };
  }
};



exports.deleteMedalsCountry = async (countryId) => {
  try {
    // Find and delete the country by its ID
    const result = await Country.findByIdAndDelete(countryId);

    if (!result) {
      // If no country is found with the given ID, return a not found message
      return { success: false, message: "Country not found" };
    }

    return { success: true, message: "Country and its medals deleted successfully" };
  } catch (err) {
    console.error("Database deletion error: ", err);
    throw new Error("Database deletion error");
  }
};


exports.deleteMedalsSport = async (countryId, sportName) => {
  try {
    // Find the country by its ID
    const country = await Country.findById(countryId);
    
    if (!country) {
      return { success: false, message: "Country not found" };
    }

    // Find the sport to delete
    const sportToDelete = country.sports.find(sport => sport.sportName === sportName);
    
    if (!sportToDelete) {
      return { success: false, message: "Sport not found" };
    }

    // Subtract the sport's medal tally from the country
    const { gold, silver, bronze } = sportToDelete.medals;
    country.medals.gold -= gold;
    country.medals.silver -= silver;
    country.medals.bronze -= bronze;

    // Remove the sport from the sports array
    country.sports = country.sports.filter(sport => sport.sportName !== sportName);

    // Save the updated country document
    await country.save();

    return { success: true, message: `Sport '${sportName}' deleted and medals adjusted` };

  } catch (err) {
    console.error("Database deletion error: ", err);
    throw new Error("Database deletion error");
  }
};


exports.deleteMedalsPlayer = async (playerId) => {
  const playerIdstr = new mongoose.Types.ObjectId(playerId); // Ensure playerId is an ObjectId
  try {
      // Find the country and the sport that contains the player
      const country = await Country.findOne({ "sports.players._id": playerIdstr }).lean(); // Use _id to find the player

      // Debug log
      console.log("Fetched Country:", JSON.stringify(country, null, 2));

      // Check if country is found
      if (!country || !Array.isArray(country.sports)) {
          throw new Error("Country or sports data not found");
      }

      // Find the sport that contains the player
      let sport;
      let player;

      for (let s of country.sports) {
          const foundPlayer = s.players.find(p => (p._id).equals(playerIdstr)); // Compare ObjectIds
          if (foundPlayer) {
              sport = s;
              player = foundPlayer;
              break;
          }
      }
      console.log("sport and player after shortlist");
      console.log(sport);
      console.log(player);

      if (!sport || !player) {
          throw new Error("Player not found in any sport");
      }

      const medalType = player.medal;

      // Remove the player from the specific sport's players array using sport._id and player._id
      await Country.updateOne(
          { _id: country._id, "sports._id": sport._id },
          { $pull: { "sports.$.players": { _id: playerIdstr } } }
      );

      // Decrease the sport's medal count based on the player's medal
      await Country.updateOne(
          { _id: country._id, "sports._id": sport._id },
          { $inc: { [`sports.$.medals.${medalType}`]: -1 } }
      );

      // Decrease the country's overall medal count
      await Country.updateOne(
          { _id: country._id },
          { $inc: { [`medals.${medalType}`]: -1 } }
      );

      return { success: true, message: `Player ${player.playerName} deleted and medals adjusted` };

  } catch (err) {
      console.error("Error deleting player and adjusting medals:", err);
      return { success: false, message: "Error deleting player and adjusting medals", error: err.message };
  }
};





exports.getOverallMedals = async() => {
  try{
    const result = await Country.aggregate([{
            $project: {
                country: 1,                        
                flag: 1,                            
                gold: "$medals.gold",             
                silver: "$medals.silver",         
                bronze: "$medals.bronze",          
                totalMedals: {                     
                    $add: [
                        "$medals.gold",
                        "$medals.silver",
                        "$medals.bronze"
                    ]
                }
            }
        }
    ]);
    return result;
  }catch(err){
    console.error("Database Query Error", err);
    return {success: false,  message:"Database Query Error"};
  }
}

exports.getCountryMedals = async (countryName) => {
  try {
    // MongoDB Aggregation Query
    // const result = await Country.aggregate([
    //   { $match: { country: countryName } }, // Matching the country name
    //   { $unwind: "$sports" }, // Unwinding the sports array to get each sport
    //   {
    //     $project: {
    //       sportname: "$sports.sportName", // Projecting the sport name
    //       players: "$sports.players", // Getting the players array for each sport
    //       gold: "$sports.medals.gold",
    //       silver: "$sports.medals.silver",
    //       bronze: "$sports.medals.bronze",
    //     },
    //   },
    //   { $unwind: "$players" }, // Unwinding the players array to access each player
    //   {
    //     $project: {
    //       sportname: 1,
    //       playerName: "$players.playerName", // Projecting player details
    //       medal: "$players.medal",
    //       gold: 1,
    //       silver: 1,
    //       bronze: 1,
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: { sportname: "$sportname" }, // Grouping by sport name
    //       players: { $push: { playerName: "$playerName", medal: "$medal" } }, // Pushing players and their medals into an array
    //     },
    //   },
    // ]);
    const result = await Country.aggregate([
      { $match: { country: countryName } }, // Match the country name
      { $unwind: "$sports" }, // Unwind the sports array to get each sport
      {
        $project: {
          country: 1, // Include country
          flag: 1, // Include flag
          sportname: "$sports.sportName", // Project sport name
          players: "$sports.players", // Get players array for each sport
          gold: "$sports.medals.gold",
          silver: "$sports.medals.silver",
          bronze: "$sports.medals.bronze",
        },
      },
      { $unwind: "$players" }, // Unwind the players array to access each player
      {
        $project: {
          country: 1, // Include country in the result
          flag: 1, // Include flag in the result
          sportname: 1,
          playerName: "$players.playerName", // Project player details
          medal: "$players.medal",
          gold: 1,
          silver: 1,
          bronze: 1,
        },
      },
      {
        $group: {
          _id: { sportname: "$sportname" }, // Group by sport name
          country: { $first: "$country" }, // Include country name in the grouped results
          flag: { $first: "$flag" }, // Include flag in the grouped results
          players: { $push: { playerName: "$playerName", medal: "$medal" } }, // Push players and their medals into an array
          gold: { $first: "$gold" }, // Include gold medals
          silver: { $first: "$silver" }, // Include silver medals
          bronze: { $first: "$bronze" }, // Include bronze medals
        },
      },
    ]);
    

    return result; // Return the aggregated result
  } catch (error) {
    console.error("Database Query Error:", error);
    throw error; // Propagate error to be caught in the controller
  }
};

exports.getSportMedals = async (sportName) => {
  try {
      const result = await Country.aggregate([
          { $unwind: "$sports" },
          { $match: { "sports.sportName": sportName } },
          { $unwind: "$sports.players" },
          { 
              $project: { 
                  country: 1, 
                  flag: 1, 
                  playerName: "$sports.players.playerName", 
                  medal: "$sports.players.medal"
              } 
          }
      ]);
    
      // const result = await country.find();
      console.log(result);
      // if (result.length === 0) {
      //     throw new Error("No medals found for the specified sport.");
      // }

      return result; // Return the aggregated result
  } catch (error) {
      console.error("Database Query Error:", error);
      throw error; // Throw the error to be caught in the controller
  }
};

exports.getPlayerMedals = async (playerName) => {
  try {
      // Use aggregation to unwind sports and players arrays, then match the playerName
      const result = await Country.aggregate([
          { $unwind: "$sports" }, // Unwind sports array
          { $unwind: "$sports.players" }, // Unwind players array within each sport
          { $match: { "sports.players.playerName": playerName } }, // Match the playerName
          { $project: {
              flag:1,
              playerName : "$sports.players.playerName",
              sportname: "$sports.sportName", // Project sportName
              medal: "$sports.players.medal" // Project player's medal
          }}
      ]);
     
      

      return result;
  } catch (err) {
      console.error("Database Query Error:", err);
      throw err; // Rethrow error to be caught in the controller
  }
};

exports.getAllPlayers = async () => {
  try {
      // const countries = await Country.find().populate('sports.players'); // Fetch all countries with populated players
      // const players = [];

      // countries.forEach(country => {
      //     country.sports.forEach(sport => {
      //         sport.players.forEach(player => {
      //             players.push({
      //                 country: country.country,
      //                 flag: country.flag,
      //                 sportname: sport.sportName,
      //                 playerName: player.playerName,
      //                 medal: player.medal
      //             });
      //         });
      //     });
      // });

      const countries = await Country.find().populate('sports.players'); // Fetch all countries with populated players
      const players = [];

      countries.forEach(country => {
          country.sports.forEach(sport => {
              sport.players.forEach(player => {
                  players.push({
                      country: country.country,
                      flag: country.flag,
                      sportname: sport.sportName,
                      playerName: player.playerName,
                      medal: player.medal,
                      playerId: player._id // Include the player's _id
                  });
              });
          });
      });


      return players; // Return an array of players with their details
  } catch (error) {
      console.error("Error fetching players:", error);
      throw error; // Handle the error as per your application logic
  }
};

exports.getCountries = async () => {
  try {
    // Find all players and select the required fields
    const playersData = await Country.aggregate([
      // Unwind the sports array to access each sport
      { $unwind: "$sports" },
      // Unwind the players array to access each player in the sport
      { $unwind: "$sports.players" },
      {
        // Project the required fields
        $project: {
          _id: 1, // Include the country _id (or exclude by setting to 0 if not needed)
          country: 1, // Include the country name
          flag: 1, // Include the flag
          sportName: "$sports.sportName", // Access sport name
          playerName: "$sports.players.playerName", // Access player name
          player_id: "$sports.players._id", // Include player ID
          medal: "$sports.players.medal" // Access player's medal
        }
      }
    ]); // Adjust field names based on your schema
    return playersData;
  } catch (error) {
    throw new Error("Error fetching countries data: " + error.message);
  }
};


db();
