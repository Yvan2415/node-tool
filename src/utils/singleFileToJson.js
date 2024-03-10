import fs from 'fs'
import compiler from 'vue-template-compiler'

// 单文件转成国际化
export const transformLangToJson = (filename) => {
  let data = fs.readFileSync(filename, 'utf8')
  const result = compiler.parseComponent(data)

  // 通过正则的方式匹配出元素内部的内容
  const pattern = /<[a-z]+[1-6]?\b[^>]*>(.*?)<\/[a-z]+[1-6]?>/g;
  const res = [];
  let match;

  while ((match = pattern.exec(result.template.content)) !== null) {
    const content = match[1].trim();
    res.push(content);
  }

  let jsonText = {}
  res.forEach(item => {
    jsonText[item] = item
  })
  return jsonText
}