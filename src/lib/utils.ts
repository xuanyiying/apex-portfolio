// src/lib/utils.ts

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 合并 Tailwind CSS 类名，处理条件类名
 * 使用 clsx 和 tailwind-merge 库
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 工具函数：根据给定的键从对象中获取值
 * 用于国际化和数据访问
 */
export function getValueFromPath(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

/**
 * 工具函数：深拷贝对象
 * 用于安全地修改数据而不影响原始数据
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as any;
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as any;
  const clonedObj: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }
  return clonedObj;
}

/**
 * 工具函数：合并对象（浅合并）
 * 用于更新配置数据
 */
export function mergeObjects<T extends Record<string, any>, U extends Record<string, any>>(
  target: T,
  source: U
): T & U {
  const result = { ...target } as T & U;
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      result[key as keyof (T & U)] = source[key];
    }
  }
  return result;
}

/**
 * 工具函数：生成唯一ID
 * 用于创建新项目或条目的ID
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

/**
 * 工具函数：格式化日期
 */
export function formatDate(date: string | Date, locale: string = 'en-US'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString(locale, { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

/**
 * 工具函数：截断字符串
 */
export function truncateString(str: string, maxLength: number, suffix: string = '...'): string {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength - suffix.length) + suffix;
}

/**
 * 工具函数：验证邮箱格式
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 工具函数：防抖
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), wait);
  };
}