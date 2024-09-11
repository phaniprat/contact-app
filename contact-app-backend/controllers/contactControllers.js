const Contact = require('../models/contact');


exports.createContact = async (req, res) => {
  try {
    const existingContact = await Contact.findOne({ 
      $or: [{ email: req.body.email }, { phone: req.body.phone }],
      userId: req.userId
    });

    if (existingContact) {
      return res.status(400).json({ error: "Contact already exists." });
    }
    const contact = new Contact({ ...req.body, userId: req.userId });
    await contact.save();

    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ userId: req.userId });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id, userId: req.userId });
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ error: 'Contact not found or you do not have access' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ error: 'Contact not found or you do not have access' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (contact) {
      res.status(200).json({ message: 'Contact deleted successfully' });
    } else {
      res.status(404).json({ error: 'Contact not found or you do not have access' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.sortContacts = async(req, res) => {
try{
  const contacts = await Contact.find({userId: req.userId}).sort({ name: 1 });
  res.status(200).json(contacts);
}
catch(error) {
  res.status(500).json({ error: error.message });
}
}

exports.getRecentContact = async (req, res) => {
  try {
    const recentContact = await Contact.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(3).exec();
    if (recentContact) {
      res.status(200).json(recentContact);
    } else {
      res.status(404).json({ error: "No recent contact found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateFavContact = async (req, res) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id, userId: req.userId  });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found or you do not have access" });
    }

    contact.isFav = req.body.isFavorite;
    await contact.save(); 
    
    res.status(200).json(contact);
  } catch (error) {
    console.error("Error updating favorite contact:", error);
    res.status(500).json({ message: "Error updating favorite contact" });
  }
};

exports.getFavContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ userId: req.userId, isFav: true });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
