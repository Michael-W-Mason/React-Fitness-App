const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');

app.use(cors());

require("./config/mongoose.config");
app.use(express.json(), express.urlencoded({ extended: true }));
require("./routes/goal.routes")(app);
require("./routes/workout.routes")(app);
require("./routes/calendar.routes")(app);
app.listen(port, () => console.log(`Listening on port: ${port}`));