export interface User {
    id?: string;
    email: string;
    password: string;
    username?: string;
    age?: number;
    phoneNumber?: string;
    role: string;
    subscribed: boolean;
    socialMedia?: {
      twitterUri?: string;
      fbUri?: string;
    };
  }
  