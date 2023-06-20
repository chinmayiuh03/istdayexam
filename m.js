const { MongoClient } = require("mongodb");

class Politician {
  constructor(name) {
    this.name = name;
    this.votes = 0;
  }

  receiveVote() {
    this.votes++;
  }
}

async function findMaxVotes(politicians) {
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

async function main() {
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
  const politicianWithMaxVotes = await findMaxVotes(politicians);

  console.log("Politician with Maximum Votes:", politicianWithMaxVotes.name);

  // Connect to MongoDB
  const uri = "mongodb+srv://chintu:chintu@cluster0.pxexu2q.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  try {
    await client.connect();

    // Access the database and collection
    const database = client.db("mydatabase");
    const collection = database.collection("politicians");

    // Insert the politician data into the collection
    await collection.insertMany(politicians);

    console.log("Politician data inserted into MongoDB.");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  } finally {
    // Close the connection
    await client.close();
  }
}

// Call the main function
main().catch((err) => {
  console.error("An error occurred:", err);
});
