export interface Task {
    id?: string;
    description: string;
    estimatedTime: number;
    completed: boolean;
    category?: {
        name?: string;
        subCategory?: string;
    }
}
