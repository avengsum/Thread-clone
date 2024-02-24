import Conversation from "../models/conversationModel";
import Message from "../models/messageModel";

const sendMessage = async (req,res) => {
try {
  const {recipientId , message} = req.body;
  const senderId = req.user._id;

  let conversation = await Conversation.find({
    participants : {$all : [senderId,recipientId]},
  });

  if(!conversation){
    conversation = new Conversation({
      participants: [senderId,recipientId],
      lastMessage:{
        text:message,
        sender:senderId
      }
    })
    await conversation.save();
  
  
  const newMessage = new Messsage({
    conversationId:conversation._id,
    sender:senderId,
    text:message,
  })

  await Promise.all([
    newMessage.save().
    consveration.updateOne({
      lastMessage:{
        text:message,
        sender:senderId,
      }
    })
  ])

  res.status(201).json(newMessage)
}

} catch (error) {
  res.status(500).json({error:error.message})
}
}

const getMessage = async (req,res) => {
  const {otherUserId} = req.params;
  const userId = req.user_id;

  try {
    const conversation = await Conversation.findOne({
      participants:{$all: [userId,otherUserId]}
    })

    if(!conversation) {
      res.status(400).json({error:"conersation not found"})
    }

    const message = await Message.find({
      conversationId:conversation._id
    }).sort({createdAt:-1})

    res.status(200).json(message)

  } catch (error) {
    res.status(500).json({error:error.message})
  }
}

const getConversations = async (req,res) => {
  const userId = req.user._id;
  try {
    const conversation = await Conversation.find({
      participants:userId 
    }).populate({path:"participants",select:"username profilePic"})

    res.status(200).json(conversation)
  } catch (error) {
    res.status(500).json({error:error.message})
  }
}

export {sendMessage , getConversations ,getMessage};