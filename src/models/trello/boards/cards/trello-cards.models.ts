class TrelloCard {
  id: string;
  name: string;
  desc: string;

  constructor(id: string, name: string, desc: string) {
    this.id = id;
    this.name = name;
    this.desc = desc;
  }
}

export { TrelloCard };
