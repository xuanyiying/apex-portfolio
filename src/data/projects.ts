// src/data/projects.ts

export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    image: string;
    tags: string[];
    github: string;
    demo: string;
    featured: boolean;
}

export const projects: Project[] = [
    {
        id: 'p1',
        title: 'AI Chat Assistant',
        description: 'A real-time chat application powered by OpenAI API.',
        longDescription: 'Built with Next.js 14, this application features real-time streaming responses, conversation history management, and a responsive dark mode UI. It uses the Vercel AI SDK for seamless integration.',
        image: '/images/project-ai-chat.jpg', // 建议将图片放在 public/images 目录下
        tags: ['Next.js', 'TypeScript', 'OpenAI', 'Tailwind CSS'],
        github: 'https://github.com/yourusername/ai-chat',
        demo: 'https://ai-chat-demo.vercel.app',
        featured: true,
    },
    {
        id: 'p2',
        title: 'E-Commerce Dashboard',
        description: 'Analytics dashboard for online store owners.',
        longDescription: 'A comprehensive dashboard visualizing sales data, user demographics, and inventory levels. It uses Recharts for data visualization and Supabase for the backend database.',
        image: '/images/project-dashboard.jpg',
        tags: ['React', 'Recharts', 'Supabase', 'Styled Components'],
        github: 'https://github.com/yourusername/dashboard',
        demo: 'https://dashboard-demo.vercel.app',
        featured: false,
    },
    {
        id: 'p3',
        title: 'Task Master App',
        description: 'Productivity app for managing daily tasks.',
        longDescription: 'A drag-and-drop task management tool inspired by Kanban. It supports local storage persistence, dark mode, and collaborative features via WebSockets.',
        image: '/images/project-taskmaster.jpg',
        tags: ['Vue.js', 'Pinia', 'Node.js', 'Socket.io'],
        github: 'https://github.com/yourusername/taskmaster',
        demo: 'https://taskmaster-demo.vercel.app',
        featured: true,
    },
];
