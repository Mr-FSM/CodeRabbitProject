/**
 * 更多坏习惯代码示例 - 专门用于测试CodeRabbit检测能力
 * 包含安全漏洞、性能问题、可维护性问题等
 */

// ==================== 安全问题 ====================

// 1. 命令注入漏洞
function executeCommand(userInput: string) {
  const { exec } = require('child_process');
  exec(`ls -la ${userInput}`, (error, stdout, stderr) => { // 命令注入风险
    console.log(stdout);
  });
}

// 2. 路径遍历攻击
function readUserFile(filename: string) {
  const fs = require('fs');
  return fs.readFileSync(`./uploads/${filename}`, 'utf8'); // 路径遍历风险
}

// 3. 不安全的Cookie设置
function setUserCookie(response: any, sessionId: string) {
  response.cookie('sessionId', sessionId); // 没有设置secure, httpOnly等安全标志
}

// 4. 弱密码策略
function isPasswordStrong(password: string): boolean {
  return password.length >= 6; // 过于简单的密码策略
}

// 5. 不安全的JWT实现
function createJWT(payload: any) {
  const secret = "12345"; // 弱密钥
  return btoa(JSON.stringify(payload)) + "." + btoa(secret); // 不安全的JWT实现
}

// ==================== 性能问题 ====================

// 6. 低效的数组操作
function processLargeArray(items: any[]) {
  let result = [];
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < items.length; j++) { // O(n²)复杂度
      if (items[i].id === items[j].relatedId) {
        result.push(items[i]);
      }
    }
  }
  return result;
}

// 7. 字符串拼接性能问题
function buildLargeString(items: string[]) {
  let result = "";
  for (let item of items) {
    result += item + "\n"; // 每次拼接都创建新字符串
  }
  return result;
}

// 8. 不必要的DOM查询
function updateMultipleElements() {
  for (let i = 0; i < 1000; i++) {
    const element = document.getElementById(`item-${i}`); // 重复DOM查询
    if (element) {
      element.style.color = 'red';
    }
  }
}

// 9. 内存泄漏 - 大对象缓存
const hugeCache = new Map();
function cacheData(key: string, data: any) {
  hugeCache.set(key, data); // 无限制缓存，可能导致内存泄漏
}

// ==================== 并发问题 ====================

// 10. 共享状态竞态条件
let globalCounter = 0;
function incrementGlobalCounter() {
  setTimeout(() => {
    const current = globalCounter;
    // 这里可能被其他调用打断
    globalCounter = current + 1;
  }, Math.random() * 10);
}

// 11. 不安全的单例模式
class UnsafeSingleton {
  private static instance: UnsafeSingleton;
  
  static getInstance() {
    if (!UnsafeSingleton.instance) {
      UnsafeSingleton.instance = new UnsafeSingleton(); // 在多线程环境下不安全
    }
    return UnsafeSingleton.instance;
  }
}

// ==================== 错误处理问题 ====================

// 12. 吞掉所有异常
function riskyDatabaseOperation() {
  try {
    // 数据库操作
    return performDatabaseQuery();
  } catch (error) {
    return null; // 吞掉所有异常，不记录日志
  }
}

// 13. 不当的Promise错误处理
async function badAsyncFunction() {
  const result = await fetch('/api/data'); // 没有错误处理
  return result.json(); // 如果fetch失败，这里会抛出异常
}

// 14. 错误的finally使用
function badFinallyUsage() {
  try {
    return "success";
  } finally {
    return "finally"; // finally中的return会覆盖try中的return
  }
}

// ==================== 代码质量问题 ====================

// 15. 过长的函数
function monsterFunction(data: any) {
  // 100多行的函数...
  let result = {};
  if (data.type === 'user') {
    if (data.status === 'active') {
      if (data.permissions.includes('read')) {
        if (data.profile.verified) {
          if (data.subscription.active) {
            // 更多嵌套逻辑...
            result = processActiveUser(data);
          } else {
            result = processInactiveUser(data);
          }
        } else {
          result = processUnverifiedUser(data);
        }
      } else {
        result = processNoPermissionUser(data);
      }
    } else {
      result = processInactiveUser(data);
    }
  } else if (data.type === 'admin') {
    // 另一大堆逻辑...
    result = processAdmin(data);
  }
  // 还有更多条件分支...
  return result;
}

// 16. 魔法数字和硬编码
function calculatePrice(quantity: number, userType: string) {
  let price = quantity * 19.99; // 魔法数字
  
  if (userType === 'premium') {
    price *= 0.85; // 魔法数字
  } else if (userType === 'gold') {
    price *= 0.75; // 魔法数字
  }
  
  if (quantity > 10) {
    price *= 0.9; // 魔法数字
  }
  
  return price;
}

// 17. 重复代码
function validateUserEmail(email: string) {
  if (!email || email.length === 0) {
    throw new Error('Email is required');
  }
  if (email.length > 100) {
    throw new Error('Email too long');
  }
  if (!email.includes('@')) {
    throw new Error('Invalid email format');
  }
}

function validateAdminEmail(email: string) {
  if (!email || email.length === 0) {
    throw new Error('Email is required');
  }
  if (email.length > 100) {
    throw new Error('Email too long');
  }
  if (!email.includes('@')) {
    throw new Error('Invalid email format');
  }
  // 几乎完全重复的代码
}

// ==================== 类型安全问题 ====================

// 18. 不安全的类型断言
function unsafeTypeAssertion(data: unknown) {
  const user = data as { name: string; age: number }; // 不安全的类型断言
  return user.name.toUpperCase(); // 如果data不是预期类型，会出错
}

// 19. any类型滥用
function processAnyData(data: any): any {
  return data.someProperty.anotherProperty.value; // 完全没有类型安全
}

// ==================== React特定问题 ====================

// 20. 不当的useEffect使用
function BadReactComponent() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    // 没有依赖数组，每次渲染都会执行
    setInterval(() => {
      setCount(count + 1); // 闭包陷阱，count永远是初始值
    }, 1000);
  }); // 缺少依赖数组
  
  return <div>{count}</div>;
}

// 21. 直接修改state
function AnotherBadComponent() {
  const [items, setItems] = useState([1, 2, 3]);
  
  const addItem = () => {
    items.push(4); // 直接修改state
    setItems(items); // 不会触发重新渲染
  };
  
  return <button onClick={addItem}>Add Item</button>;
}

// ==================== 数据库相关问题 ====================

// 22. N+1查询问题
async function getUsersWithPosts() {
  const users = await getUsers(); // 1次查询
  const usersWithPosts = [];
  
  for (const user of users) {
    const posts = await getPostsByUserId(user.id); // N次查询
    usersWithPosts.push({ ...user, posts });
  }
  
  return usersWithPosts;
}

// 23. 不安全的数据库查询
function findUserByName(name: string) {
  const query = `SELECT * FROM users WHERE name = '${name}'`; // SQL注入风险
  return executeQuery(query);
}

// ==================== 网络请求问题 ====================

// 24. 不当的重试机制
async function retryRequest(url: string) {
  let attempts = 0;
  while (attempts < 100) { // 过多重试
    try {
      return await fetch(url);
    } catch (error) {
      attempts++;
      // 没有延迟，可能导致服务器过载
    }
  }
}

// 25. 不安全的CORS配置
function setupCORS(app: any) {
  app.use((req: any, res: any, next: any) => {
    res.header('Access-Control-Allow-Origin', '*'); // 允许所有来源
    res.header('Access-Control-Allow-Headers', '*'); // 允许所有头部
    next();
  });
}

// ==================== 文件操作问题 ====================

// 26. 不安全的文件上传
function handleFileUpload(file: any) {
  const filename = file.originalname; // 没有验证文件名
  const path = `./uploads/${filename}`; // 路径遍历风险
  
  // 没有文件类型验证
  // 没有文件大小限制
  return saveFile(path, file.buffer);
}

// 27. 资源泄漏
function processFiles(filenames: string[]) {
  const fs = require('fs');
  
  for (const filename of filenames) {
    const fd = fs.openSync(filename, 'r'); // 打开文件
    const content = fs.readSync(fd, Buffer.alloc(1024), 0, 1024, 0);
    
    if (content.includes('error')) {
      return; // 提前返回，没有关闭文件描述符
    }
    
    processContent(content);
    // 忘记关闭文件描述符
  }
}

// ==================== 加密问题 ====================

// 28. 弱加密算法
function encryptData(data: string) {
  const crypto = require('crypto');
  const cipher = crypto.createCipher('des', 'weak-key'); // 使用弱加密算法
  return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
}

// 29. 不安全的随机数
function generatePassword() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < 8; i++) {
    password += chars[Math.floor(Math.random() * chars.length)]; // 不安全的随机数
  }
  return password;
}

// ==================== 日志和监控问题 ====================

// 30. 敏感信息记录
function logUserLogin(user: any, password: string) {
  console.log(`User ${user.email} logged in with password: ${password}`); // 记录密码
  console.log(`Credit card: ${user.creditCard}`); // 记录敏感信息
}

// 这些代码包含了各种安全漏洞、性能问题、可维护性问题等
// CodeRabbit应该能够检测出这些问题并提供改进建议

// 导出一些函数以避免未使用的声明警告
export {
  executeCommand,
  readUserFile,
  processLargeArray,
  incrementGlobalCounter,
  riskyDatabaseOperation,
  monsterFunction,
  calculatePrice,
  validateUserEmail,
  unsafeTypeAssertion,
  processAnyData
}; 