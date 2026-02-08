"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import io from "socket.io-client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ChatPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [chats, setChats] = useState<any[]>([]);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState<any>(null);
  const messagesEndRef = useRef<any>(null);

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }

    const socketConnection = io(process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || "http://localhost:5000");
    setSocket(socketConnection);

    api.getChats().then(setChats);

    return () => {
      socketConnection.disconnect();
    };
  }, [user, router]);

  useEffect(() => {
    if (selectedChat && socket) {
      socket.emit("join-chat", selectedChat._id);
      
      api.getChat(selectedChat._id).then(chat => {
        setMessages(chat.messages || []);
      });

      socket.on("receive-message", (data: any) => {
        if (data.chatId === selectedChat._id) {
          setMessages(prev => [...prev, data.message]);
        }
      });
    }
  }, [selectedChat, socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;

    const messageData = {
      chatId: selectedChat._id,
      message: {
        sender: user._id,
        content: newMessage,
        createdAt: new Date()
      }
    };

    socket.emit("send-message", messageData);
    setMessages(prev => [...prev, messageData.message]);
    
    await api.sendMessage(selectedChat._id, newMessage);
    setNewMessage("");
  };

  if (!user) return null;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden" style={{ height: "70vh" }}>
            <div className="flex h-full">
              <div className="w-1/3 border-r overflow-y-auto">
                <div className="p-4 border-b">
                  <h2 className="text-xl font-bold">Messages</h2>
                </div>
                {chats.length === 0 ? (
                  <p className="p-4 text-gray-600">No chats yet</p>
                ) : (
                  chats.map((chat: any) => (
                    <div
                      key={chat._id}
                      onClick={() => setSelectedChat(chat)}
                      className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${selectedChat?._id === chat._id ? 'bg-gray-100' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">👤</div>
                        <div className="flex-1">
                          <p className="font-semibold">{chat.participants?.find((p: any) => p._id !== user._id)?.name}</p>
                          <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="flex-1 flex flex-col">
                {selectedChat ? (
                  <>
                    <div className="p-4 border-b">
                      <h3 className="font-bold">{selectedChat.participants?.find((p: any) => p._id !== user._id)?.name}</h3>
                      <p className="text-sm text-gray-600">{selectedChat.product?.title}</p>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {messages.map((msg: any, i) => (
                        <div
                          key={i}
                          className={`flex ${msg.sender === user._id || msg.sender._id === user._id ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-xs px-4 py-2 rounded-2xl ${msg.sender === user._id || msg.sender._id === user._id ? 'bg-primary-500 text-white' : 'bg-gray-200'}`}>
                            {msg.content}
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>

                    <div className="p-4 border-t">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                          placeholder="Type a message..."
                          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:border-primary-500"
                        />
                        <button
                          onClick={sendMessage}
                          className="p-2 bg-primary-500 text-white rounded-full hover:bg-primary-600"
                        >
                          <Send className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-400">
                    Select a chat to start messaging
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
