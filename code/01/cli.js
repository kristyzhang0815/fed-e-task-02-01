#!/usr/bin/env node

console.log('cli working!')

const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message:'Project name?'
  },  {
    type: 'list',
    name: 'theme',
    choices:[{
      name: '深色主题',
      value: 'dark'
    },{
      name: '浅色主题',
      value: 'light'
    }],
    message:'请选择预设的主题?'
  }
]).then(anwsers=>{
  const tmplDir = path.join(__dirname,'templates')
  const destDir = process.cwd()
  fs.readdir(tmplDir,(err,files)=>{
    if(err) throw err;
    files.forEach(file=>{
      ejs.renderFile(path.join(tmplDir,file),anwsers,(err,result)=>{
        if(err) throw err
        fs.writeFileSync(path.join(destDir,file),result)
      })
    })
  })
})