export type Topic = {
  id: number;
  title: string;
  description: string;
  user_id: number;
  created_at: string;
};

export type Post = {
  id: number;
  title: string;
  content: string;
  user_id: number;
  topic_id: number;
  created_at: string;
  edited_at: string;
  username: string
  topic_name: string;
};

export type Comment = {
  id: number;
  content: string;
  user_id: number;
  post_id: number;
  created_at: string;
  edited_at: string;
  username: string;
};

export type User = {
  id: number;
  username: string;
};