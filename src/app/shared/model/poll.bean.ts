export class PollBean {
  id: string;
  status: string; // active || closed
  title: string;
  description: string;
  creator: string;
  options: OptionBean[] = [];
  createdAt: Date;
  editedAt: Date;
  endsAt: Date;
  constructor(json?: string){
    if (json){
      this.id = json['id'];
      this.status = json['status'];
      this.title = json['title'];
      this.description = json['description'];
      this.creator = json['creator'];
      this.createdAt = new Date(json['createdAt']);
      this.editedAt = new Date(json['editedAt']);
      this.endsAt = new Date(json['endsAt']);
      for (let j of json['options']){
        this.options.push(new OptionBean(j));
      }
    }
  }
}

export class OptionBean{
  value: string;
  description: string;
  votes: VoterBean[] = [];
  constructor(json?: string){
    if (json){
      this.value = json['value'];
      this.description = json['description'];
      for (let j of json['votes']){
        this.votes.push(new VoterBean(j));
      }
    }
  }
}

export class VoterBean{
  voter: string;
  constructor(json?: string){
    if (json){
      this.voter = json['voter'];
    }
  }
}
