# Olympic-Medal-Chronicle



backend:
1. Change the values of MONGO_URL in .env file.
2. Create the collections in the MongoDB compass or MongoDB Atlas.
3. The collection names are : "admins", "managers", "countries".
4. Insert the documents into "admins" and "managers" in the json form 
         {
           "username": "name",
           "password": "password"
         }
5. Insert the documents into the "countries" in json form. The example is given below:
          {
            "country": "USA",
            "flag": "https://example.com/flags/usa.png",
            "medals": {
              "gold": 10,
              "silver": 5,
              "bronze": 3
            },
            "sports": [
              {
                "sportName": "Swimming",
                "medals": {
                  "gold": 6,
                  "silver": 3,
                  "bronze": 1
                },
                "players": [
                  {
                    "playerName": "Michael Phelps",
                    "medal": "gold",
                    "image": "https://example.com/images/michael-phelps.jpg"
                  },
                  {
                    "playerName": "Katie Ledecky",
                    "medal": "gold",
                    "image": "https://example.com/images/katie-ledecky.jpg"
                  }
                ]
              },
              {
                "sportName": "Athletics",
                "medals": {
                  "gold": 4,
                  "silver": 2,
                  "bronze": 2
                },
                "players": [
                  {
                    "playerName": "Allyson Felix",
                    "medal": "gold",
                    "image": "https://example.com/images/allyson-felix.jpg"
                  },
                  {
                    "playerName": "Justin Gatlin",
                    "medal": "bronze",
                    "image": "https://example.com/images/justin-gatlin.jpg"
                  }
                ]
              }
            ]
          }

6. Open backend folder in terminal.
7. Run "npm install" command. This will install all the packages needed for the backend.
8. Run "node server.js" command to run server.js file.

frontend:
1. Open frontend folder in terminal.
2. Run "npm install" command. This will install all the packages needed for the frontend.
3. Run "npm run dev" command. This will start the app.jsx file.



