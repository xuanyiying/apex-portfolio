// src/data/contact.ts
export interface ContactInfo {
  title: string;
  subtitle: string;
  description: string;
  email: string;
  phone?: string;
  location?: string;
  socialLinks: {
    github: string;
    portfolio: string;
  };
  formFields: {
    name: {
      label: string;
      placeholder: string;
      required: boolean;
    };
    email: {
      label: string;
      placeholder: string;
      required: boolean;
    };
    subject: {
      label: string;
      placeholder: string;
      required: boolean;
    };
    message: {
      label: string;
      placeholder: string;
      required: boolean;
    };
  };
  submitButtonText: string;
  successMessage: string;
  errorMessage: string;
}

export const contactInfoEn: ContactInfo = {
  title: 'Get In Touch',
  subtitle: 'Contact Me',
  description: 'I\'m currently looking for new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I\'ll try my best to get back to you!',
  email: 'keexi2025@outlook.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  socialLinks: {
    github: 'https://github.com/xuanyiying',
    portfolio: 'https://xuanyiying.dev',
  },
  formFields: {
    name: {
      label: 'Your Name',
      placeholder: 'John Doe',
      required: true
    },
    email: {
      label: 'Email Address',
      placeholder: 'john.doe@example.com',
      required: true
    },
    subject: {
      label: 'Subject',
      placeholder: 'Hello there!',
      required: true
    },
    message: {
      label: 'Message',
      placeholder: 'Your message here...',
      required: true
    }
  },
  submitButtonText: 'Send Message',
  successMessage: 'Message sent successfully! I\'ll get back to you soon.',
  errorMessage: 'There was an error sending your message. Please try again.'
};

export const contactInfoZh: ContactInfo = {
  title: '取得联系',
  subtitle: '联系我',
  description: '我目前正在寻找新的机会，我的收件箱随时为您敞开。无论您有问题还是只是想打个招呼，我都会尽力回复您！',
  email: 'keexi2025@outlook.com',
  phone: '+86 138 0000 0000',
  location: '上海, 中国',
  socialLinks: {
    github: 'https://github.com/xuanyiying',
    portfolio: 'https://xuanyiying.dev',
  },
  formFields: {
    name: {
      label: '您的姓名',
      placeholder: '张三',
      required: true
    },
    email: {
      label: '电子邮箱',
      placeholder: 'zhangsan@example.com',
      required: true
    },
    subject: {
      label: '主题',
      placeholder: '你好！',
      required: true
    },
    message: {
      label: '消息内容',
      placeholder: '在这里输入您的消息...',
      required: true
    }
  },
  submitButtonText: '发送消息',
  successMessage: '消息发送成功！我会尽快回复您。',
  errorMessage: '发送消息时出错。请重试。'
};

export const contactInfo = contactInfoEn;