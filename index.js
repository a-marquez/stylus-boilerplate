#!/usr/bin/env node
const fs = require('fs-extra'),
      path = require('path'),
      boilerplate_path = require.resolve('stylus-boilerplate'),
      argument = process.argv.slice(2,3)[0]

try {
  // check argument is given
  if (argument === undefined) {
    throw Error('ERROR: stylus-boilerplate requires a directory')
  }

  // check path exists
  if (!fs.existsSync(path.resolve(argument))) {
    throw Error(`ERROR: the given path "${path.resolve(argument)}" does not exist`)
  }

  // check argument is a directory
  if (!fs.statSync(path.resolve(argument)).isDirectory()) {
    throw Error(`ERROR: the given path "${path.resolve(argument)}" is not a directory`)
  }
  // check destination does not already exist
  if (fs.existsSync(path.resolve(argument, 'css'))) {
    throw Error(`ERROR: the destination "${path.resolve(argument, 'css')}" already exists`)
  }
} catch (error) {
  console.error(error)
  process.exit(1)
}

console.log(`copying stylus-boilerplate to "${path.resolve(argument, 'css')}"`)
fs.copySync(path.resolve(boilerplate_path, '..', 'src'), path.resolve(argument, 'css'), {errorOnExist: true})
console.log('done')

