// src/data/contact.ts

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactInfo {
  title: string;
  subtitle: string;
  description: string;
  email: string;
  phone?: string;
  location?: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
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

export const contactInfo: ContactInfo = {
  title: 'Get In Touch',
  subtitle: 'Contact Me',
  description: 'I\'m currently looking for new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I\'ll try my best to get back to you!',
  email: 'alex.johnson@example.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  socialLinks: {
    github: 'https://github.com/alexjohnson',
    linkedin: 'https://linkedin.com/in/alexjohnson',
    twitter: 'https://twitter.com/alexjohnson',
    portfolio: 'https://alexjohnson.dev'
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