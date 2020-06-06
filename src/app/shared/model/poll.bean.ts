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

  get totalOtherVotes() {
    let tot = 0;
    this.results.forEach((r) => {
      tot += r.otherVotes;
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

  get totalNonWeightedVotes() {
    return this.totalNewbieVotes + this.totalVerifiedVotes + this.totalHumanVotes + this.totalOtherVotes;
  }

  get optionDescriptions() {
    let arr = [];
    this.results.forEach((r) => (arr.push(r.description)));
    return arr;
  }

  get optionTotalVotes() {
    let arr = [];
    this.results.forEach((r) => (arr.push(r.totalVotes)));
    return arr;
  }

  get optionTotalWeightedVotes() {
    let arr = [];
    this.results.forEach((r) => {
      arr.push((!isNaN(this.newbieMultiplier) ? this.newbieMultiplier * r.newbieVotes : 0) + (!isNaN(this.verifiedMultiplier) ? this.verifiedMultiplier * r.verifiedVotes : 0) + (!isNaN(this.humanMultiplier) ? this.humanMultiplier * r.humanVotes : 0));
    });
    console.log(arr);
    return arr;
  }

  get optionOtherVotes() {
    let arr = [];
    this.results.forEach((r) => arr.push(r.otherVotes));
    return arr;
  }

  get optionNewbieVotes() {
    let arr = [];
    this.results.forEach((r) => arr.push(r.newbieVotes));
    return arr;
  }

  get optionVerifiedVotes() {
    let arr = [];
    this.results.forEach((r) => arr.push(r.verifiedVotes));
    return arr;
  }

  get optionHumanVotes() {
    let arr = [];
    this.results.forEach((r) => arr.push(r.humanVotes));
    return arr;
  }

  get optionNewbieWeightedVotes() {
    let arr = [];
    this.results.forEach((r) => arr.push(r.newbieVotes * this.newbieMultiplier));
    return arr;
  }

  get optionVerifiedWeightedVotes() {
    let arr = [];
    this.results.forEach((r) => arr.push(r.verifiedVotes * this.verifiedMultiplier));
    return arr;
  }

  get optionHumanWeightedVotes() {
    let arr = [];
    this.results.forEach((r) => arr.push(r.humanVotes * this.humanMultiplier));
    return arr;
  }

  get optionAges() {
    let arr = [];
    this.results.forEach((r) => {
      r.voteAges.forEach((a) => {
        for (let k of arr) {
          if (k.value === a.value) {
            k.voter += a.voter;
          } else {
            arr.push({value: a.value, voter: 0});
          }
        }
        if (arr.length == 0) {
          arr.push({value: a.value, voter: a.voter});
        }
      });
    });
    return arr;
  }

  get ageLabels() {
    let arr = this.optionAges;
    let labeledArr = [];
    arr.forEach((a) => {
      labeledArr.push(a.value);
    });
    labeledArr.sort((n1,n2) => n1 - n2);
    labeledArr.forEach((a) => {
      if(a == 1){
        a += 'Epoch';
      }else{
        a += 'Epochs';
      }
    });
    return labeledArr;
  }

  get ageData() {
    let arr = this.optionAges;
    let dataArr = [];
    arr.forEach((a) => dataArr.push(a.voter));
    return dataArr;
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
  otherVotes: number = 0;
  value: string;
  description: string;
  totalVotes: number;
  votes: VoterBean[] = [];
  voteAges = [];

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
      } else {
        this.otherVotes++;
      }
      for (let a of this.voteAges) {
        if (a.value === v.age) {
          a.voter++;
        } else {
          this.voteAges.push({value: v.age, voter: 1});
        }
      }
      if (this.voteAges.length == 0) {
        this.voteAges.push({value: v.age, voter: 1});
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
