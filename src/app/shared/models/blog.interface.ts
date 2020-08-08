export class FrontBlog {
  readonly imgFront: string;

  readonly shortDescription: string;
}

export class CompleteBlog {
  readonly imgTop: string;

  readonly article: string;
}

export class Blog {
  readonly title: string;

  readonly front: FrontBlog;

  readonly complete: CompleteBlog;
}
