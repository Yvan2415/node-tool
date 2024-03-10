#!/usr/bin/env node

import { program } from 'commander'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'


import { readAllFile } from '../src/utils/variable.js'
import { transformLangToJson } from '../src/utils/singleFileToJson.js'

// 先获取命令行传入的参数
const order = program.parse(process.argv).args[0]

// 获取当前路径
const __dirname = dirname(fileURLToPath(import.meta.url))
// 拼接命令行参数的路径
const orderPath = resolve(__dirname, '../' , order)

const fileList = readAllFile(orderPath)

let json = {}
fileList.forEach(item => {
  json[item] = transformLangToJson(item)
})

console.log(json)
