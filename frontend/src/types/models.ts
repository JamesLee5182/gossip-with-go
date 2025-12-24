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
  username: string;
  topic_id: number;
  topic_name: string;
  created_at: string;
  edited_at: string
};

export type Comment = {
  id: number;
  content: string;
  user_id: number;
  username: string;
  post_id: number;
  created_at: string;
  edited_at: string
};

export type User = {
  id: number;
  username: string;
};