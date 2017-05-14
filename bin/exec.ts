#!/usr/bin/env ts-node

const { exec } = require('../release')
const [ NODE_CLI, SCRIPT_PATH, ...args ] = process.argv
exec(...args)