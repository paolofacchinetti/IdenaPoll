export class PollBean {
  id: string;
  status: string; // active || closed
  title: string;
  description: string;
  creator: string;
  options: OptionBean[] = [];
  settings: SettingsBean;
  createdAt: Date;
  endsAt: Date;
  totalVotes: number;

  constructor(json?: string) {
    if (json) {
      this.totalVotes = 0;
      this.id = json['id'];
      this.status = json['status'];
      this.title = json['title'];
      this.description = json['description'];
      this.creator = json['creator'];
      this.createdAt = new Date(json['createdAt']);
      this.endsAt = new Date(json['endsAt']);
      for (let j of json['options']) {
        let opbean = new OptionBean(j);
        this.totalVotes += opbean.totalVotes;
        this.options.push(opbean);
      }
      this.settings = new SettingsBean(json['settings']);
    }
  }
}

export class OptionBean {
  value: string;
  description: string;
  totalVotes: number;
  votes: VoterBean[] = [];

  constructor(json?: string) {
    if (json) {
      this.totalVotes = 0;
      this.value = json['value'];
      this.description = json['description'];
      for (let j of json['votes']) {
        this.totalVotes++;
        this.votes.push(new VoterBean(j));
      }
    }
  }
}

export class VoterBean {
  voter: string;

  constructor(json?: string) {
    if (json) {
      this.voter = json['voter'];
    }
  }
}

export class SettingsBean {
  statusRequirement: string;
  ageRequirement: string;
  isStatusWeighted: boolean;
  newbieWeight: string;
  verifiedWeight: string;
  humanWeight: string;

  constructor(json?: string) {
    if (json) {
      this.statusRequirement = json['statusRequirement'];
      this.ageRequirement = json['ageRequirement'];
      this.isStatusWeighted = json['isStatusWeighted'];
      if (json['isStatusWeighted']) {
        this.newbieWeight = json['newbieWeight'];
        this.verifiedWeight = json['verifiedWeight'];
        this.humanWeight = json['verifiedWeight'];
      }
    }
  }
}
