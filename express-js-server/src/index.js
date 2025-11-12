const express = require('express');
const app = express();
const PORT = 8001;

app.use(express.json());

// Import routes
const tasksRouter = require('./routes/tasks');
app.use('/tasks', tasksRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});