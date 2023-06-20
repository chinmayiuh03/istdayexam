const prompt = require('prompt-sync')();
class Politician {
  constructor(name) {
    this.name = name;
    this.votes = 0;
  }

  receiveVote() {
    this.votes++;
  }
}

function findMaxVotes(politicians) {
  let maxVotes = 0;
  let maxVotesPolitician = null;

  for (const politician of politicians) {
    if (politician.votes > maxVotes) {
      maxVotes = politician.votes;
      maxVotesPolitician = politician;
    }
  }

  return maxVotesPolitician;
}

function main() {
  const politician1 = new Politician("Politician 1");
  const politician2 = new Politician("Politician 2");
  const politician3 = new Politician("Politician 3");

  // Simulate receiving votes
  politician1.receiveVote();
  politician2.receiveVote();
  politician2.receiveVote();
  politician3.receiveVote();
  politician3.receiveVote();
  politician3.receiveVote();

  const politicians = [politician1, politician2, politician3];
  const politicianWithMaxVotes = findMaxVotes(politicians);

  console.log("Politician with Maximum Votes:", politicianWithMaxVotes.name);
}

main();
