export interface TodoState {
  status: "idle" | "loading" | "failed";
  categories: { [categoryId: string]: TodoCategory };
}

export type TodoCategory = {
  label: string;
  id: string;
  items: TodoItem[];
  imageUrl: string;
};

export type TodoItem = {
  label: string;
  id: string;
  categoryId: string;
  isComplete: boolean;
  dateCreated: number;
  dateLastUpdated: number;
};
