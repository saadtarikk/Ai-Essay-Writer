// src/types/index.ts

export interface User {
    id: number;
    name: string;
    email: string;
    password?: string; // Add the password property
  }
  
  export interface Essay {
    id: number;
    title: string;
    content: string;
    topic: string;
    userId: number;
  }

  export interface CreateUserDto {
    email: string;
    password: string;
    name: string;
  }