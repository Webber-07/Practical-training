export interface Post {
  id: string;
  text: string;
}

export interface Comment {
  id: string;
  postId: string;
  text: string;
}