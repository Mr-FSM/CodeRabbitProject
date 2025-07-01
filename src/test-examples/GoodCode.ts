/**
 * 这个文件包含了良好的编程实践示例
 * 用于测试CodeRabbit的代码审查功能
 */

// 良好的类型定义
interface User {
  readonly id: string;
  name: string;
  email: string;
  createdAt: Date;
  isActive: boolean;
}

interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: Date;
}

// 良好的枚举定义
enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator'
}

// 良好的错误处理类
class UserServiceError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number = 400
  ) {
    super(message);
    this.name = 'UserServiceError';
  }
}

// 良好的服务类设计
class UserService {
  private readonly users: Map<string, User> = new Map();

  /**
   * 创建新用户
   * @param userData 用户数据
   * @returns 创建的用户信息
   * @throws UserServiceError 当用户已存在时
   */
  async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    // 输入验证
    if (!userData.name?.trim()) {
      throw new UserServiceError('用户名不能为空', 'INVALID_NAME', 400);
    }

    if (!this.isValidEmail(userData.email)) {
      throw new UserServiceError('邮箱格式不正确', 'INVALID_EMAIL', 400);
    }

    // 检查用户是否已存在
    const existingUser = Array.from(this.users.values())
      .find(user => user.email === userData.email);
    
    if (existingUser) {
      throw new UserServiceError('用户已存在', 'USER_EXISTS', 409);
    }

    // 创建用户
    const newUser: User = {
      id: this.generateId(),
      ...userData,
      createdAt: new Date()
    };

    this.users.set(newUser.id, newUser);
    return newUser;
  }

  /**
   * 根据ID获取用户
   * @param id 用户ID
   * @returns 用户信息或null
   */
  async getUserById(id: string): Promise<User | null> {
    if (!id?.trim()) {
      return null;
    }
    
    return this.users.get(id) ?? null;
  }

  /**
   * 获取所有活跃用户
   * @returns 活跃用户列表
   */
  async getActiveUsers(): Promise<User[]> {
    return Array.from(this.users.values())
      .filter(user => user.isActive)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  /**
   * 更新用户信息
   * @param id 用户ID
   * @param updates 更新数据
   * @returns 更新后的用户信息
   */
  async updateUser(
    id: string, 
    updates: Partial<Pick<User, 'name' | 'email' | 'isActive'>>
  ): Promise<User> {
    const user = this.users.get(id);
    if (!user) {
      throw new UserServiceError('用户不存在', 'USER_NOT_FOUND', 404);
    }

    // 验证更新数据
    if (updates.email && !this.isValidEmail(updates.email)) {
      throw new UserServiceError('邮箱格式不正确', 'INVALID_EMAIL', 400);
    }

    const updatedUser: User = {
      ...user,
      ...updates
    };

    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // 私有辅助方法
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private generateId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// 良好的工具函数
export const utils = {
  /**
   * 安全的JSON解析
   * @param jsonString JSON字符串
   * @param defaultValue 默认值
   * @returns 解析结果或默认值
   */
  safeJsonParse: <T>(jsonString: string, defaultValue: T): T => {
    try {
      return JSON.parse(jsonString) as T;
    } catch {
      return defaultValue;
    }
  },

  /**
   * 防抖函数
   * @param func 要防抖的函数
   * @param delay 延迟时间(ms)
   * @returns 防抖后的函数
   */
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout;
    
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  },

  /**
   * 深度克隆对象
   * @param obj 要克隆的对象
   * @returns 克隆后的对象
   */
  deepClone: <T>(obj: T): T => {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    if (obj instanceof Date) {
      return new Date(obj.getTime()) as unknown as T;
    }

    if (Array.isArray(obj)) {
      return obj.map(item => utils.deepClone(item)) as unknown as T;
    }

    const cloned = {} as T;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        cloned[key] = utils.deepClone(obj[key]);
      }
    }

    return cloned;
  }
};

// 良好的异步处理
export class ApiClient {
  private readonly baseUrl: string;
  private readonly timeout: number;

  constructor(baseUrl: string, timeout = 5000) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.timeout = timeout;
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        data,
        success: true,
        timestamp: new Date()
      };

    } catch (error) {
      return {
        data: null as unknown as T,
        success: false,
        message: error instanceof Error ? error.message : '未知错误',
        timestamp: new Date()
      };
    } finally {
      clearTimeout(timeoutId);
    }
  }
}

export { UserService, UserServiceError, type User, type ApiResponse, UserRole }; 