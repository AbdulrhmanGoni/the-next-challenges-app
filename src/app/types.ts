type Post = {
  id: string;
  title: string;
  body: string;
  thumbnail: PostThumbnail;
  publishedAt: number;
  userVote: usersVotes;
  authorId: string;
  author: PostAuther;
  category: string;
  tags: string[];
  upvotes: number;
  downvotes: number;
  resources: PostResource[];
  commentsCount: number;
};

type usersVotes = "upvote" | "downvote" | null;

type UserBasicData = {
  firstName: string;
  lastName: string;
  headline: string;
  avatar: string;
};

type User = UserBasicData & {
  id: string;
  email: string;
  role: string;
  bookmarks: Post["id"][];
};

type PostAuther = UserBasicData;

type PostResource = {
  title: string;
  type: string;
  link: string;
};

type PostThumbnail = {
  id: string;
  src: string;
};

type PostCommentOwner = UserBasicData;

type PostComment = {
  id: string;
  commenterId: string;
  comment: string;
  owner: PostCommentOwner;
  createdAt: number;
  upvotes: number;
  downvotes: number;
};

type PaginationOptions = {
  page: number;
  pageSize: number;
};
