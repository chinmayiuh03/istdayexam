const mongoose = require('mongoose');

class Politician {
  constructor(name) {
    this.name = name;
    this.votes = 0;
  }

  receiveVote() {
    this.votes++;
  }
}

async function savePoliticians(politicians) {
  try {
    await mongoose.connect('mongodb+srv://chintu:chintu@cluster0.pxexu2q.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const politicianSchema = new mongoose.Schema({
      name: String,
      votes: Number
    });

    const PoliticianModel = mongoose.model('Politician', politicianSchema);

    for (const politicianData of politicians) {
      const politician = new PoliticianModel(politicianData);
      await politician.save();
      console.log('Politician data saved:', politician);
    }

    console.log('All politicians saved to MongoDB.');
  } catch (error) {
    console.error('Error saving politicians to MongoDB:', error);
  } finally {
    mongoose.connection.close();
  }
}

const politicians = [
  { name: 'Politician 1', votes: 2 },
  { name: 'Politician 2', votes: 4 },
  { name: 'Politician 3', votes: 1 }
];

savePoliticians(politicians);
