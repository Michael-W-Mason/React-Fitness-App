const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

app.use(cookieParser());
// app.use(cors({credentials: true, origin: "mni"}));
app.options('*', cors({credentials: true}))

require("./config/mongoose.config");
app.use(express.json(), express.urlencoded({ extended: true }));
require("./routes/goal.routes")(app);
require("./routes/workout.routes")(app);
require("./routes/calendar.routes")(app);
require("./routes/user.routes")(app);
app.listen(port, () => console.log(`Listening on port: ${port}`));