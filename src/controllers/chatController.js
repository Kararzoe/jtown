const Chat = require('../models/Chat');

exports.getChats = async (req, res) => {
  try {
    const chats = await Chat.find({ participants: req.user._id })
      .populate('participants', 'name avatar shopName')
      .populate('product', 'title images')
      .sort('-lastMessageTime');
    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getChat = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id)
      .populate('participants', 'name avatar shopName')
      .populate('product', 'title images price')
      .populate('messages.sender', 'name avatar');
    res.json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createChat = async (req, res) => {
  try {
    const { recipientId, productId, message } = req.body;
    
    let chat = await Chat.findOne({
      participants: { $all: [req.user._id, recipientId] },
      product: productId
    });

    if (!chat) {
      chat = await Chat.create({
        participants: [req.user._id, recipientId],
        product: productId,
        messages: [{ sender: req.user._id, content: message }],
        lastMessage: message,
        lastMessageTime: new Date()
      });
    } else {
      chat.messages.push({ sender: req.user._id, content: message });
      chat.lastMessage = message;
      chat.lastMessageTime = new Date();
      await chat.save();
    }

    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const chat = await Chat.findById(req.params.id);

    chat.messages.push({ sender: req.user._id, content });
    chat.lastMessage = content;
    chat.lastMessageTime = new Date();
    await chat.save();

    res.json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
