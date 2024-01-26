const Word = require('../models/wordModel');

exports.searchVolume = async (req, res) => {
    try {
      const { keyword } = req.body;
  
      let word = await Word.findOne({ word: keyword });
  
      if (word) {
        // Check if the word's creation date is more than 30 days ago
        const creationDate = new Date(word.createdAt);
        const currentDate = new Date();
        const timeDifference = currentDate - creationDate;
        const daysDifference = timeDifference / (1000 * 60 * 60 * 24); // Convert milliseconds to days
  
        if (daysDifference > 30) {
          // If more than 30 days, delete the existing word
          await Word.deleteOne({ word: keyword });
  
          // Create a new entry with the same word and current date
          word = new Word({ word: keyword });
          await word.save();
        } else {
          // If less than or equal to 30 days, increment the count
          word.count++;
          await word.save();
        }
      } else {
        // If the word doesn't exist, create a new entry
        word = new Word({ word: keyword });
        word.count++;
        await word.save();
      }
  
      res.json({ searchVolume: word.count });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

