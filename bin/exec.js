#!/usr/bin/env node --trace-warnings

const { exec } = require('../release')
const [ NODE_CLI, SCRIPT_PATH, ...args ] = process.argv
exec(...args)