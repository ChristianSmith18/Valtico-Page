export class FrontEvento {
  imgFront: string;

  shortDescription: string;
}

export class CompleteEvento {
  imgTop: string;

  article: string;
}

export class Evento {
  title: string;

  front: FrontEvento;

  complete: CompleteEvento;

  enabled: boolean;

  id?: string;

  dateAt?: Date;
}
