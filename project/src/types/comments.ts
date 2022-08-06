

export type Host = {
    avatarUrl: string;
    id: number;
    isPro: boolean;
    name: string;
  };

export type CommentType = {
    comment: string;
    date: string;
    id: number;
    rating: number;
    user: Host,
  };

export type FormDataType = {
    rating: number;
    comment: string;
  };

export type SendingCommentType = {
    id: string;
    formData: FormDataType;
    resetFormData: ()=> void;
  };

export type FetchingCommentType = {
    id: string;
    data: CommentsType;
  };

export type CommentsType = CommentType[];
