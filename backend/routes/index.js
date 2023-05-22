const express = require('express')

const app = express()
const emailRoutes = require('./email');
const spapiRoutes = require('./spapi');
const authRoutes = require('./auth');
const userRoutes = require('./user');
const roleRoutes = require('./role');
const taskRoutes = require('./task');
const tagRoutes = require('./tag');
const notificationRoutes = require('./notification')
const logRoutes = require('./log');

app.use('/email', emailRoutes);
app.use('/spapi', spapiRoutes)
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/role', roleRoutes);
app.use('/task', taskRoutes);
app.use('/tag', tagRoutes);
app.use('/notification', notificationRoutes);
app.use('/log', logRoutes);

module.exports = app;