export type Topic = {
  id: number;
  title: string;
  description: string;
  created_at: string;
};

export type Post = {
  id: number;
  title: string;
  content: string;
  user_id: number;
  topic_id: number;
  created_at: string;
  edited_at: string
};

export type User = {
  id: number;
  username: string;
};