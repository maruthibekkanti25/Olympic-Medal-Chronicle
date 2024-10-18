const db = require('../models/models');
const { default: mongoose } = require('mongoose');
const middleware = require('../middleware/middleware');
exports.authenticateAdmin = async (req, res) => {
    const { username, password } = req.body;
    console.log("Received username:", username);
    
    try {
      const result = await db.authenticateAdmin(username, password);
      const token = middleware.generateToken(req.body);
      res.status(200).json({token, result}); 
    //   res.status(200).json(result); 
    } catch (err) {
      console.error("Error logging admin:", err);
      return res.status(500).json({ success: false, message: "Error logging admin" });
    }
};

exports.addAdmin = async (req, res) =>{
    const {username, password} = req.body;
    try {
        const result = await db.addAdmin(username, password);
        res.status(200).json(result); 
      } catch (err) {
        console.error("Error adding admin:", err);
        return res.status(500).json({ success: false, message: "Error adding admin" });
      }
}

exports.updateAdmin = async (req, res) => {
    const adminId = req.params.id; 
    const { username, password } = req.body; 

    console.log("Admin ID received:", adminId); 

    try {
        const result = await db.updateAdmin(adminId, username, password);
        return res.status(200).json(result);
    } catch (err) {
        console.error("Error updating admin:", err);
        return res.status(500).json({ success: false, message: "Error updating admin" });
    }
};

exports.deleteAdmin = async (req, res) => {
    const adminID = req.params.adminID; 
    const new_id=new mongoose.Types.ObjectId(adminID);
    if(!new_id){
      return res.status(400).json({ success: false, message: "Invalid ObjectId format" });
    }
    try {
      const result = await db.deleteAdmin(adminID);
  
      if (!result) {
        return res.status(404).json({ success: false, message: "Admin not found" });
      }
  
      res.status(200).json({ success: true, message: "Admin deleted successfully" });
    } catch (err) {
      console.error("Error deleting admin:", err);
      return res.status(500).json({ success: false, message: "Error deleting admin" });
    }
  };

exports.getAdmins = async (req, res) =>{
    try{
        const result = await db.getAdmins();
        res.status(200).json(result);
    }
    catch(err){
        console.error("Error getting admins",err);
        return res.status(500).json({success: false, message: "Error getting admins"});
    }
}

exports.addEventManager = async(req, res) =>{
    const {username, password} = req.body;

    try{
        const result = await db.addEventManager(username, password);
        res.status(200).json(result);
    }
    catch(err){
        console.error("Error adding a Event Manager");
        return res.status(500).json({ success: false, message: "Error adding Event Manager"});
    }
}

exports.getEventManagers = async(req, res) =>{
    try{
        const result = await db.getEventManagers();
        res.status(200).json(result);
    }
    catch(err){
        console.error("Error getting managers",err);
        return res.status(500).json({success: false, message: "Error getting managers"});
    }
}

exports.updateEventManager = async(req, res) =>{
    const adminID = req.params.id;
    const {username, password} = req.body;
    console.log("EventManager ID received:", adminID);
    try{
        const result = await db.updateEventManager(adminID, username, password);
        res.status(200).json(result);
    }catch(err){
        console.error("Error updating manager:", err);
        return res.status(500).json({ success: false, message: "Error updating manager" });
    }
}

exports.deleteEventManager = async (req, res) => {
    const eventManagerID = req.params.managerID; 
    const new_id = new mongoose.Types.ObjectId(eventManagerID);
    
    if (!new_id) {
        return res.status(400).json({ success: false, message: "Invalid ObjectId format" });
    }
    
    try {
        const result = await db.deleteEventManager(eventManagerID);
        
        if (!result) {
            return res.status(404).json({ success: false, message: "Event Manager not found" });
        }
        
        res.status(200).json({ success: true, message: "Event Manager deleted successfully" });
    } catch (err) {
        console.error("Error deleting event manager:", err);
        return res.status(500).json({ success: false, message: "Error deleting event manager" });
    }
};

exports.authenticateEventManager = async(req, res) =>{
    const { username, password } = req.body;
    console.log("Received username:", username);
    
    try {
      const result = await db.authenticateEventManager(username, password);
      if(result.success) {
        return res.status(200).json({success: true, token: result.token});
      }
      else{
        return res.status(401).json({success: false, message: result.message});
      }
    } catch (err) {
      console.error("Error logging manager:", err);
      return res.status(500).json({ success: false, message: "Error logging manager" });
    }
}

exports.addMedals = async (req, res) =>{
    const {country, flag, sportName, playerName, medal} = req.body;
    try{
        const result = await db.addMedals(country, flag, sportName, playerName, medal);
        res.status(200).json(result);
    }catch(err){
        console.error("Error adding medals:", err);
        return res.status(500).json({success:false, message: "Error Adding Medals"});
    }
}

exports.getMedals = async(req,res) => {
    try{
        const result = await db.getMedals();
        res.status(200).json(result);
    }catch(err){
        console.error("Error getting medals:", err);
        return res.status(500).json({success:false, message: "Error getting Medals"});
    }
}

exports.updateMedalsCountry = async(req, res) =>{
    const countryId = req.params.countryId;
    const newCountryName = req.body;
    try{
        const result = await db.updateMedalsCountry(countryId, newCountryName);
        res.status(200).json(result);
    }catch(err){
        console.error("Error updating medals:", err);
        return res.status(500).json({success:false, message: "Error updating Medals"});
    }
}

exports.updateMedalsSport = async(req, res) =>{
    const countryId = req.params.countryId;
    const sportId = req.params.sportId;
    const newSportName = req.body;
     const {country, sportName, playerName, medal} = req.body;
    try{
        const result = await db.updateMedalsSport(countryId, sportId, newSportName);
        res.status(200).json(result);
    }catch(err){
        console.error("Error updating medals:", err);
        return res.status(500).json({success:false, message: "Error updating Medals"});
    }
}

exports.updateCountryNameById = async (req, res) => {
    const countryId = req.params.countryId;
    const { newCountryName } = req.body;
  
    // Validate that the new country name is provided
    if (!newCountryName) {
      return res.status(400).json({ success: false, message: "New country name is required." });
    }
  
    try {
      // Log the update request
      console.log(`Updating country with ID: ${countryId}, to new name: ${newCountryName}`);
  
      // Call the model function to update the country's name
      const result = await db.updateMedalsCountry(countryId, newCountryName);
  
      // Log the result of the update operation
      console.log('Result from updateMedalsCountry:', result);
  
      // Return appropriate success or error message
      if (result.success) {
        return res.status(200).json(result);
      } else {
        return res.status(404).json({ success: false, message: result.message });
      }
    } catch (err) {
      // Log and return server-side error
      console.error("Error updating country:", err);
      return res.status(500).json({ success: false, message: "Error updating country." });
    }
  };
  

exports.updateSportNameUsingCountry = async (req, res) => {
    const countryId = req.params.countryId;
    const { oldSportName, newSportName } = req.body;
  
    // Check if both old and new sport names are provided
    if (!oldSportName || !newSportName) {
      return res.status(400).json({ success: false, message: "Both old and new sport names are required." });
    }
  
    try {
      // Call the model function to update the sport name
      const result = await db.updateSportName(countryId, oldSportName, newSportName);
  
      if (result.success) {
        return res.status(200).json(result);
      } else {
        return res.status(404).json({ success: false, message: result.message });
      }
    } catch (err) {
      console.error("Error updating sport name:", err);
      return res.status(500).json({ success: false, message: "Error updating sport name." });
    }
  };
  

exports.updatePlayer = async (req, res) => {
    const playerId = req.params.playerId; 
    const { playerName, medalType } = req.body;
  
    if (!playerId || !playerName || !medalType) {
      return res.status(400).json({ success: false, message: "Player ID, player name, and medal type are required." });
    }
  
    try {
      // Call the model function to update the player details
      const result = await db.updatePlayerDetails(playerId, playerName, medalType);
  
      if (result.success) {
        return res.status(200).json(result);
      } else {
        return res.status(404).json({ success: false, message: result.message });
      }
    } catch (error) {
      console.error("Error updating player details:", error);
      return res.status(500).json({ success: false, message: "Error updating player details." });
    }
  };  


exports.deleteMedalsCountry = async(req, res) =>{
    const countryId = req.params.countryId;
    try{
        const result = await db.deleteMedalsCountry(countryId);
        res.status(200).json(result);
    }catch(err){
        console.error("Error deleting medals:", err);
        return res.status(500).json({success:false, message: "Error deleting Medals"});
    }
}

exports.deleteMedalsSport = async(req, res) =>{
    const countryId = req.params.countryId;
    const sportName = req.params.sportName;
    try{
        const result = await db.deleteMedalsSport(countryId, sportName);
        res.status(200).json(result);
    }catch(err){
        console.error("Error deleting medals:", err);
        return res.status(500).json({success:false, message: "Error deleting Medals"});
    }
}

exports.deleteMedalsPlayer = async(req, res) =>{
    const playerId = req.params.playerId;
    try{
        const result = await db.deleteMedalsPlayer(playerId);
        res.status(200).json(result);
    }catch(err){
        console.error("Error deleting medals:", err);
        return res.status(500).json({success:false, message: "Error deleting Medals"});
    }
}

exports.getOverallMedals = async (req, res) =>{
    try {
        const result = await db.getOverallMedals();
        
        // Check if result is not empty
        // if (result.length === 0) {
        //     return res.status(404).json({ success: false, message: "No medals found for the specified sport." });
        // }
        res.status(200).json(result);
    } catch (err) {
        console.error("Error getting Over-all medals:", err);
        return res.status(500).json({ success: false, message: "Error getting overall Wise medals" });
    }
}

exports.getCountryMedals = async(req, res) =>{
    const countryName = req.params.countryName;
    try {
        const result = await db.getCountryMedals(countryName);
        
        // Check if result is not empty
        // if (result.length === 0) {
        //     return res.status(404).json({ success: false, message: "No medals found for the specified sport." });
        // }

        res.status(200).json(result);
    } catch (err) {
        console.error("Error getting country medals:", err);
        return res.status(500).json({ success: false, message: "Error getting country Wise medals" });
    }
}

exports.getSportMedals = async (req, res) => {
    const sportName = req.params.sportName;

    try {
        const result = await db.getSportMedals(sportName);
        
        // Check if result is not empty
        // if (result.length === 0) {
        //     return res.status(404).json({ success: false, message: "No medals found for the specified sport." });
        // }

        res.status(200).json(result);
    } catch (err) {
        console.error("Error getting sport medals:", err);
        return res.status(500).json({ success: false, message: "Error getting Sport Wise medals" });
    }
};


exports.getPlayerMedals = async(req, res) =>{
    const playerName = req.params.playerName;
    try{
        const result = await db.getPlayerMedals(playerName);
        res.status(200).json(result);
    }
    catch(err){
        console.error("Error getting player medals");
        res.status(500).json({sucess: false, message:"Error getting Player Wise medals"});
    }
}

exports.getAllPlayers = async (req, res) => {
    try {
        const players = await db.getAllPlayers(); // Call the model function to fetch players
        res.status(200).json(players); // Send the players data as a JSON response
    } catch (error) {
        console.error("Error fetching players:", error);
        res.status(500).json({ message: 'Error fetching players' }); // Send error response
    }
};

exports.getCountries = async (req, res) => {
    try {
      // Call the model function to get the data
      const countriesData = await db.getCountries();
      
      // Send the fetched data as a response
      res.status(200).json(countriesData);
    } catch (error) {
      // Handle any errors and send a failure response
      res.status(500).json({ error: "Failed to fetch countries data" });
    }
  };