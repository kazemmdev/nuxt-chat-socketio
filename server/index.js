const express = require("express")();
const socket = require("./startup/socket")(express);
const nuxt = require("./startup/nuxt");

nuxt(express, socket);
