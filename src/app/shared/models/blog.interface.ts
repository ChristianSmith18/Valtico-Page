export class FrontBlog {
  imgFront: string;

  shortDescription: string;
}

export class CompleteBlog {
  imgTop: string;

  article: string;
}

export class Blog {
  title: string;

  front: FrontBlog;

  complete: CompleteBlog;

  enabled: boolean;

  id?: string;

  dateAt?: Date;
}
