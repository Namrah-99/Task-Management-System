export interface Task {
    id?: string;
    title: string;
    description: string;
    priority: string;
    estimatedTime: number;
    completed: boolean;
    category?: {
        name?: string;
        subCategory?: string;
    }
}
