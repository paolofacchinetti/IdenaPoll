export class PollBean {
  id: string;
  status: string; // active || closed
  title: string;
  description: string;
  creator: string;
  options: OptionBean;
}

export class OptionBean{
  value: string;
  description: string;
  votes: VoterBean[];
  constructor(json?: string){
    if (json){
      this.value = json['value'];
      this.description = json['description'];
      this.votes = json['votes'];
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
