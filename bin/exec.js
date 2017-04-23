#!/usr/bin/env node

const { exec } = require('../release')
const [ NODE_CLI, SCRIPT_PATH, ...args ] = process.argv
exec(...args)