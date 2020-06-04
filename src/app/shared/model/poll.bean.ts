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

// getter totale dei 3 ^-
export class ResultsPollBean {
  poll: PollBean;
  results: ResultsOptionBean[] = [];

  get newbieMultiplier() {
    return parseInt(this.poll.settings.newbieWeight);
  }

  get verifiedMultiplier() {
    return parseInt(this.poll.settings.verifiedWeight);
  }

  get humanMultiplier() {
    return parseInt(this.poll.settings.humanWeight);
  }

  get totalNewbieVotes() {
    let tot = 0;
    this.results.forEach((r) => {
      tot += r.newbieVotes;
    });
    return tot;
  }

  get totalVerifiedVotes() {
    let tot = 0;
    this.results.forEach((r) => {
      tot += r.verifiedVotes;
    });
    return tot;
  }

  get totalHumanVotes() {
    let tot = 0;
    this.results.forEach((r) => {
      tot += r.humanVotes;
    });
    return tot;
  }

  get weightedNewbieVotes() {
    return this.newbieMultiplier * this.totalNewbieVotes;
  }

  get weightedVerifiedVotes() {
    return this.verifiedMultiplier * this.totalVerifiedVotes;
  }

  get weightedHumanVotes() {
    return this.humanMultiplier * this.totalHumanVotes;
  }

  get totalWeightedVotes() {
    return this.weightedNewbieVotes + this.weightedVerifiedVotes + this.weightedHumanVotes;
  }

  constructor(poll?: PollBean) {
    this.poll = poll;
    for (let op of this.poll.options) {
      let resOpBean = new ResultsOptionBean(op);
      this.results.push(resOpBean);
    }
  }
}

export class ResultsOptionBean {
  newbieVotes: number = 0;
  verifiedVotes: number = 0;
  humanVotes: number = 0;
  value: string;
  description: string;
  totalVotes: number;
  votes: VoterBean[] = [];

  constructor(opBean: OptionBean) {
    this.value = opBean.value;
    this.description = opBean.description;
    this.votes = opBean.votes;
    this.totalVotes = opBean.totalVotes;
    for (let v of opBean.votes) {
      if (v.status === 'NEWBIE') {
        this.newbieVotes++;
      } else if (v.status === 'VERIFIED') {
        this.verifiedVotes++;
      } else if (v.status === 'HUMAN') {
        this.humanVotes++;
      }
    }
  }
}

export class VoterBean {
  address: string;
  status: string;
  age: string;

  constructor(json?: string) {
    if (json) {
      this.address = json['address'];
      this.status = json['status'];
      this.age = json['age'];
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
