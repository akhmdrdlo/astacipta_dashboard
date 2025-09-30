// src/components/AIAssistant.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { fetchPrograms, formatProgramsToTextContext, askGemini } from '@/lib/api';
import type { Program } from '@/data/types';

// Tipe data untuk setiap pesan dalam percakapan
interface Message {
  sender: 'user' | 'assistant';
  text: string;
}

export const AIAssistant = () => {
  const [isMounted, setIsMounted] = useState(false); // State untuk memastikan render hanya di client
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'assistant', text: "Halo! Saya adalah asisten AI Anda. Tanyakan apa saja tentang program-program yang ada di dasbor ini." }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [programContext, setProgramContext] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Efek untuk menandai bahwa komponen sudah di-mount di client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Efek untuk mengambil data program sebagai konteks
  useEffect(() => {
    const loadContext = async () => {
      console.log("Mengambil data untuk konteks AI...");
      const allPrograms = await fetchPrograms();
      if (allPrograms.length > 0) {
        const contextText = formatProgramsToTextContext(allPrograms);
        setProgramContext(contextText);
        console.log("Konteks AI berhasil dimuat.");
      } else {
        console.warn("Gagal memuat konteks AI, tidak ada data program yang ditemukan.");
      }
    };
    loadContext();
  }, []);

  // Efek untuk scroll otomatis ke pesan terakhir
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim() === '' || isLoading || !programContext) return;

    const newUserMessage: Message = { sender: 'user', text: userInput };
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);
    setUserInput('');

    const aiResponse = await askGemini(programContext, userInput);
    
    setMessages(prev => [...prev, { sender: 'assistant', text: aiResponse }]);
    setIsLoading(false);
  };
  
  // Jangan render apa-apa di server untuk menghindari hydration error
  if (!isMounted) {
    return null;
  }

  return (
    // Membungkus semuanya dalam satu div untuk mencegah error hydration
    <div>
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-red-700 text-white rounded-full p-4 shadow-lg hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-transform transform hover:scale-110"
        aria-label="Buka Asisten AI"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-md bg-white rounded-lg shadow-2xl flex flex-col h-[70vh] animate-fade-in">
          <div className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-200 rounded-t-lg">
            <h3 className="font-bold text-lg text-gray-800">AI Assistant</h3>
            <button onClick={toggleChat} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
          </div>

          <div ref={chatContainerRef} className="flex-grow p-4 space-y-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                <div className={`max-w-[80%] rounded-lg px-4 py-2 ${msg.sender === 'user' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                  {/* Menggunakan dangerouslySetInnerHTML untuk merender baris baru dari AI */}
                  <p className="text-sm" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }} />
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-end gap-2">
                <div className="max-w-[80%] rounded-lg px-4 py-2 bg-gray-200 text-gray-800">
                  <p className="text-sm animate-pulse">Mengetik...</p>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-gray-100 border-t border-gray-200 rounded-b-lg">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={programContext ? "Tanyakan sesuatu..." : "Memuat data konteks..."}
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
                disabled={isLoading || !programContext}
              />
              <button
                type="submit"
                className="bg-red-700 text-white rounded-full p-3 hover:bg-red-800 disabled:bg-gray-400"
                disabled={isLoading || !programContext}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.428A1 1 0 0010 16.57l5.11 1.46a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

