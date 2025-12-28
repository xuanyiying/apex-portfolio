# 数据管理指南

本目录包含应用中所有可修改的数据。所有展示的数据都从这些文件中获取，避免了硬编码。

## 数据文件说明

- `projects.ts` - 项目展示数据
- `skills.ts` - 技能展示数据  
- `experience.ts` - 工作经历数据
- `hero.ts` - Hero部分数据
- `contact.ts` - 联系信息数据
- `index.ts` - 数据导出入口

## 如何修改数据

要修改网站上的内容，只需编辑相应的数据文件。例如：

### 修改项目信息
编辑 `projects.ts` 文件中的 `projects` 数组：

```typescript
export const projects: Project[] = [
  {
    id: 'p1',
    title: '新项目名称',
    description: '新项目描述',
    // ... 其他属性
  }
];
```

### 修改技能信息
编辑 `skills.ts` 文件中的 `skills` 数组：

```typescript
export const skills: Skill[] = [
  {
    name: '新技能',
    level: 4, // 1-5 级别
    category: 'Frontend',
  }
];
```

### 修改个人经历
编辑 `experience.ts` 文件中的 `experiences` 数组：

```typescript
export const experiences: Experience[] = [
  {
    id: 'exp1',
    company: '新公司',
    position: '新职位',
    // ... 其他属性
  }
];
```

## 注意事项

- 修改数据文件后，重新构建或刷新页面即可看到更改
- 保持数据类型的一致性
- 所有数据都使用 TypeScript 接口定义，确保类型安全