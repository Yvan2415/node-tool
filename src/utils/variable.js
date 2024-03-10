import fs from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'


// 读取当前路径下所有的文件
export const readAllFile = (path) => {
  let url = path
  let stat = fs.statSync(path) // 判断一下当前路径的状态
  if(stat.isFile()) return [ path ] // 是文件, 直接返回
  /********** 是文件夹 *********** */
  const fileList = []
  let urlList = fs.readdirSync(url) // 当前文件夹下的文件名
  urlList.forEach(item => {
    let childUrl = resolve(url, item)
    if(fs.statSync(childUrl).isFile()){
      fileList.push(childUrl)
    } else {
      fileList.push(...readAllFile(childUrl))
    }
  })
  return fileList
}
