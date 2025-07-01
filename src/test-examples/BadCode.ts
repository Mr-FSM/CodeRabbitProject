/**
 * 这个文件包含了糟糕的编程实践示例
 * 用于测试CodeRabbit能否识别代码问题
 */

// 糟糕的类型定义 - 使用any
var user: any = {
  id: 123,
  name: "张三",
  email: "zhangsan@example.com"
};

// 没有类型定义的函数
function createUser(data) {
  // 没有输入验证
  var newUser = {
    id: Math.random(),
    name: data.name,
    email: data.email,
    password: data.password // 明文存储密码
  };
  
  // 直接修改全局变量
  users.push(newUser);
  
  // 没有错误处理
  localStorage.setItem('user', JSON.stringify(newUser));
  
  return newUser;
}

// 全局变量污染
var users = [];
var isLoggedIn = false;
var currentUser = null;

// 魔法数字和硬编码
function validatePassword(pwd) {
  if (pwd.length < 8) return false; // 魔法数字
  if (pwd.indexOf("123") !== -1) return false; // 硬编码检查
  return true;
}

// 糟糕的错误处理
function getUser(id) {
  try {
    for(var i = 0; i < users.length; i++) {
      if(users[i].id == id) { // 使用 == 而不是 ===
        return users[i];
      }
    }
  } catch(e) {
    // 空的catch块
  }
  return null;
}

// 没有使用const/let，var的作用域问题
function processUsers() {
  for(var i = 0; i < users.length; i++) {
    setTimeout(function() {
      console.log(users[i]); // 闭包问题，i总是最后一个值
    }, 100);
  }
}

// 深度嵌套和复杂的逻辑
function complexUserValidation(userData) {
  if (userData) {
    if (userData.name) {
      if (userData.name.length > 0) {
        if (userData.email) {
          if (userData.email.includes("@")) {
            if (userData.password) {
              if (userData.password.length >= 6) {
                if (userData.age) {
                  if (userData.age > 18) {
                    return true;
                  } else {
                    console.log("年龄不够");
                  }
                } else {
                  console.log("缺少年龄");
                }
              } else {
                console.log("密码太短");
              }
            } else {
              console.log("缺少密码");
            }
          } else {
            console.log("邮箱格式错误");
          }
        } else {
          console.log("缺少邮箱");
        }
      } else {
        console.log("用户名为空");
      }
    } else {
      console.log("缺少用户名");
    }
  } else {
    console.log("用户数据为空");
  }
  return false;
}

// 内存泄漏问题
var eventListeners = [];
function addListener() {
  var element = document.getElementById('button');
  var listener = function() {
    console.log('clicked');
  };
  element.addEventListener('click', listener);
  // 没有清理监听器，造成内存泄漏
  eventListeners.push(listener);
}

// 不安全的eval使用
function executeUserCode(code) {
  eval(code); // 极其危险的代码执行
}

// 阻塞主线程
function heavyComputation() {
  var result = 0;
  for(var i = 0; i < 10000000; i++) {
    result += Math.random();
  }
  return result;
}

// 不当的异步处理
function fetchUserData(id, callback) {
  setTimeout(() => {
    var userData = users.find(u => u.id == id);
    if (userData) {
      callback(null, userData);
    } else {
      callback("User not found", null);
    }
  }, Math.random() * 1000); // 随机延迟，不可预测
}

// 回调地狱
function processUserWorkflow(userId) {
  fetchUserData(userId, (err, user) => {
    if (!err) {
      validateUser(user, (validationErr, isValid) => {
        if (!validationErr && isValid) {
          updateUserStatus(user.id, 'active', (updateErr, result) => {
            if (!updateErr) {
              sendNotification(user.email, (notifyErr) => {
                if (!notifyErr) {
                  logActivity(user.id, 'workflow_complete', (logErr) => {
                    if (logErr) {
                      console.log('Failed to log activity');
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
}

// 混合职责的类
class UserManagerWithEverything {
  constructor() {
    this.users = [];
    this.database = null;
    this.emailService = null;
    this.logger = null;
  }
  
  // 这个类做了太多事情
  createUser(data) {
    // 数据库操作
    this.database.insert(data);
    
    // 发送邮件
    this.emailService.send(data.email, "Welcome!");
    
    // 记录日志
    this.logger.log("User created: " + data.name);
    
    // 更新UI
    document.getElementById('userCount').innerHTML = this.users.length;
    
    // 业务逻辑
    if (data.type === 'premium') {
      this.grantPremiumAccess(data);
    }
    
    return data;
  }
  
  // 重复的验证逻辑
  validateUserName(name) {
    if (!name || name.length < 2 || name.length > 50) {
      return false;
    }
    return true;
  }
  
  validateUserEmail(email) {
    if (!email || !email.includes("@") || email.length > 100) {
      return false;
    }
    return true;
  }
  
  validateUserAge(age) {
    if (!age || age < 0 || age > 150) {
      return false;
    }
    return true;
  }
}

// React组件的坏习惯
function UserComponent(props) {
  // 在render中创建新对象和函数
  return React.createElement('div', {
    onClick: function() { // 每次render都创建新函数
      console.log('clicked');
    },
    style: { // 每次render都创建新对象
      color: 'red',
      fontSize: '16px'
    }
  }, props.user.name);
}

// 低效的搜索算法
function getUserByQuery(searchTerm) {
  var results = [];
  for(var i = 0; i < users.length; i++) {
    for(var j = 0; j < searchTerm.length; j++) {
      if(users[i].name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
        results.push(users[i]);
        break;
      }
    }
  }
  return results;
}

// 不安全的密码处理
function hashPassword(password) {
  return btoa(password); // 简单的base64编码，不是真正的哈希
}

// 未清理的计数器
var counter = 0;
function incrementCounter() {
  setInterval(() => {
    counter++;
    console.log(counter);
  }, 1000); // 每次调用都会创建新的interval，没有清理
}

// ===== 新增的更多坏习惯代码 =====

// 1. SQL注入风险
function getUserFromDB(userId) {
  var query = "SELECT * FROM users WHERE id = '" + userId + "'"; // SQL注入风险
  // 假设这里执行数据库查询
  return executeQuery(query);
}

// 2. XSS攻击风险
function displayUserMessage(message) {
  document.getElementById('messageContainer').innerHTML = message; // XSS风险
}

// 3. 敏感信息泄露
function logUserActivity(user) {
  console.log("User activity:", {
    id: user.id,
    name: user.name,
    password: user.password, // 密码不应该被记录
    creditCard: user.creditCard, // 敏感信息泄露
    ssn: user.ssn
  });
}

// 4. 硬编码的API密钥
const API_KEY = "sk-1234567890abcdef"; // 硬编码的API密钥
const DATABASE_PASSWORD = "admin123"; // 硬编码的数据库密码

// 5. 不安全的随机数生成
function generateToken() {
  return Math.random().toString(36); // 不安全的随机数生成
}

// 6. 竞态条件
var isProcessing = false;
function processData(data) {
  if (isProcessing) return; // 简单的标志位，可能有竞态条件
  isProcessing = true;
  
  setTimeout(() => {
    // 处理数据
    console.log("Processing:", data);
    isProcessing = false; // 如果这里抛出异常，标志位永远不会重置
  }, 1000);
}

// 7. 内存泄漏 - 闭包引用
var leakyFunctions = [];
function createLeakyFunction(largeData) {
  return function() {
    console.log("Function created with data size:", largeData.length);
    // largeData被闭包引用，即使不再需要也不会被垃圾回收
  };
}

// 8. 不当的异常处理
function riskyOperation() {
  try {
    // 可能抛出异常的操作
    var result = JSON.parse(invalidJson);
    return result;
  } catch (e) {
    return {}; // 吞掉异常，返回空对象，调用者无法知道出错了
  }
}

// 9. 阻塞循环
function findUserByName(name) {
  while (true) { // 无限循环风险
    for (var i = 0; i < users.length; i++) {
      if (users[i].name === name) {
        return users[i];
      }
    }
    // 如果没找到，会无限循环
  }
}

// 10. 不安全的对象属性访问
function getNestedProperty(obj, path) {
  var parts = path.split('.');
  var current = obj;
  for (var i = 0; i < parts.length; i++) {
    current = current[parts[i]]; // 没有检查current是否为null/undefined
  }
  return current;
}

// 11. 资源未释放
function processFile(filename) {
  var fileHandle = openFile(filename);
  var content = fileHandle.read();
  
  if (content.includes("error")) {
    return null; // 提前返回，没有关闭文件句柄
  }
  
  var processed = processContent(content);
  fileHandle.close();
  return processed;
}

// 12. 不安全的类型转换
function convertToNumber(value) {
  return +value; // 不安全的类型转换，可能产生NaN
}

// 13. 时间炸弹 - 硬编码的过期时间
function isTokenValid(token) {
  var expireDate = new Date('2024-12-31'); // 硬编码的过期时间
  return new Date() < expireDate;
}

// 14. 不当的Promise使用
function fetchDataBadly() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      var data = Math.random() > 0.5 ? "success" : null;
      if (data) {
        resolve(data);
      }
      // 没有调用reject，Promise会一直pending
    }, 1000);
  });
}

// 15. 污染原型链
Array.prototype.myCustomMethod = function() {
  return this.length > 0;
};

// 16. 不安全的正则表达式
function validateInput(input) {
  var regex = new RegExp("^(" + input + ")+$"); // ReDoS攻击风险
  return regex.test(input);
}

// 17. 内存泄漏 - DOM引用
var domReferences = [];
function cacheDOMElements() {
  for (var i = 0; i < 1000; i++) {
    var element = document.createElement('div');
    domReferences.push(element); // 缓存大量DOM元素，造成内存泄漏
  }
}

// 18. 不当的错误重试机制
function unreliableOperation() {
  var attempts = 0;
  while (attempts < 1000) { // 过多的重试次数
    try {
      return performOperation();
    } catch (e) {
      attempts++;
      // 没有延迟，可能造成资源耗尽
    }
  }
}

// 19. 不安全的序列化
function serializeUser(user) {
  return JSON.stringify(user); // 可能序列化敏感信息
}

// 20. 竞态条件 - 异步操作
var sharedResource = 0;
function incrementSharedResource() {
  setTimeout(() => {
    var current = sharedResource;
    // 在这里可能被其他调用打断
    sharedResource = current + 1;
  }, Math.random() * 100);
}

// 导出所有变量和函数（不好的模块设计）
module.exports = {
  user,
  users,
  isLoggedIn,
  currentUser,
  createUser,
  validatePassword,
  getUser,
  processUsers,
  complexUserValidation,
  addListener,
  executeUserCode,
  heavyComputation,
  fetchUserData,
  processUserWorkflow,
  UserManagerWithEverything,
  UserComponent,
  getUserByQuery,
  hashPassword,
  incrementCounter,
  PASSWORD_SALT
}; 