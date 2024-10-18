const express = require('express');
const controllers = require('../controllers/controllers');
const middleware = require('../middleware/middleware');
const router = express.Router();

//Admin routes
router.post("/admin-login",controllers.authenticateAdmin);

//admin previlages
router.post("/admins" , middleware.authenticateUser, controllers.addAdmin);
router.put("/admins/:id", middleware.authenticateUser, controllers.updateAdmin);
router.delete("/admins/:adminID", middleware.authenticateUser, controllers.deleteAdmin);
router.get("/admins", controllers.getAdmins);

router.post("/event-managers", middleware.authenticateUser, controllers.addEventManager);
router.get("/event-managers", controllers.getEventManagers);
router.put("/event-managers/:id", middleware.authenticateUser, controllers.updateEventManager);
router.delete("/event-managers/:managerID", middleware.authenticateUser, controllers.deleteEventManager);

//Event-Manager routes
router.post("/event-manager-login", controllers.authenticateEventManager);

// common for admins and Event-Managers  FOR ALL PLAYERS.
router.post("/medals", controllers.addMedals); // adding the country or sport or player
router.get("/medals", controllers.getMedals);  // for getting all medals
router.put("/medals-country/:countryId", controllers.updateCountryNameById); // editing Country by countryId || req.body contains newCountryName 
router.put("/medals-sport/:countryId", controllers.updateSportNameUsingCountry);// editing sport by countryId || req.body contains oldSportName and newSportName
router.put("/medals-player/:playerId", controllers.updatePlayer); // editing a player using playerId || req.body contains playerName and medalType
router.delete("/medals-country/:countryId", controllers.deleteMedalsCountry); // deleting a country by countryID
router.delete("/medals-sport/:countryId/:sportName", controllers.deleteMedalsSport); // deleting a sport by countryId and sportName
router.delete("/medals-player/:playerId", controllers.deleteMedalsPlayer);// deleting a player by playerId


//User routes
router.get("/overall-medals", controllers.getOverallMedals);
router.get('/country-medals/:id', controllers.getCountryMedals);
router.get("/sport-medals/:sportName", controllers.getSportMedals);
router.get("/player-medals/:playerName", controllers.getPlayerMedals);

//all players
router.get("/players", controllers.getAllPlayers);
router.get("/countries", controllers.getCountries);

module.exports = router;