export class PollBean {
  id: string;
  status: string; // active || ended
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

  get optionLabels() {
    let arr = [];
    this.results.forEach((r) => (arr.push(r.description.slice(0, 10) + (r.description.length<11 ? '' : '...'))));
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


  get ageLabels() {
    voteAges.sort((n1, n2) => n1.value - n2.value);
    let arr = voteAges;
    let labeledArr = [];
    let correctLabeledArr = [];
    arr.forEach((a) => {
      labeledArr.push(a.value);
    });
    labeledArr.forEach((b) => {
      if(b == 1){
        correctLabeledArr.push(b + ' Epoch');
      }else{
        correctLabeledArr.push(b + ' Epochs');
      }
    });
    return correctLabeledArr;
  }

  get ageData() {
    let arr = voteAges;
    let dataArr = [];
    arr.forEach((a) => dataArr.push(a.voter));
    return dataArr;
  }

  get totalVotes() {
    return this.totalOtherVotes + this.totalNewbieVotes + this.totalVerifiedVotes + this.totalHumanVotes;
  }

  constructor(poll?: PollBean) {
    this.poll = poll;
    voteAges = [];
    for (let op of this.poll.options) {
      let resOpBean = new ResultsOptionBean(op);
      this.results.push(resOpBean);
    }
  }
}

var voteAges = [];
export class ResultsOptionBean {
  newbieVotes: number = 0;
  verifiedVotes: number = 0;
  humanVotes: number = 0;
  otherVotes: number = 0;
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
      } else {
        this.otherVotes++;
      }
      let pushed = false;
      for (let a of voteAges) {
        if (a.value === v.age) {
          a.voter++;
          pushed = true;
        }
      }
      if (!pushed) {
        voteAges.push({value: v.age, voter: 1});
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
        this.humanWeight = json['humanWeight'];
      }
    }
  }
}
