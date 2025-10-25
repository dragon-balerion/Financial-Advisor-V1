import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { sendMessageToAI } from '../services/geminiService';

const UserIcon: React.FC = () => (
    <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center font-bold text-white flex-shrink-0">
        U
    </div>
);

const ModelIcon: React.FC = () => (
    <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3.5a1 1 0 00.02 1.84l7 3.5a1 1 0 00.748 0l7-3.5a1 1 0 00.02-1.84l-7-3.5zM3 9.369L10 13l7-3.631V14a1 1 0 01-1 1h-2a1 1 0 01-1-1v-1a1 1 0 10-2 0v1a1 1 0 01-1 1H6a1 1 0 01-1-1V9.369z" />
        </svg>
    </div>
);

interface ChatbotProps {
    financialData: string;
    onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ financialData, onClose }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    
    useEffect(() => {
        const getInitialMessage = async () => {
            setIsLoading(true);
            const initialResponse = await sendMessageToAI("Hello", financialData);
            setMessages([{ role: 'model', content: initialResponse }]);
            setIsLoading(false);
        };
        getInitialMessage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        
        const response = await sendMessageToAI(input, financialData);

        const modelMessage: ChatMessage = { role: 'model', content: response };
        setMessages(prev => [...prev, modelMessage]);
        setIsLoading(false);
    };

    return (
        <div className="fixed bottom-24 right-4 sm:right-6 bg-gray-800 rounded-xl shadow-2xl flex flex-col h-[70vh] max-h-[600px] w-full max-w-[400px] z-40 animate-slide-in-bottom origin-bottom-right" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
                <div>
                    <h3 className="text-xl font-semibold text-white">FinancAI Advisor</h3>
                    <p className="text-sm text-gray-400">Your personal finance assistant</p>
                </div>
                 <button onClick={onClose} className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                        {msg.role === 'model' && <ModelIcon />}
                        <div className={`max-w-xs md:max-w-md lg:max-w-sm xl:max-w-md p-3 rounded-lg ${msg.role === 'user' ? 'bg-teal-500 text-white' : 'bg-gray-700 text-gray-300'}`}>
                           <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                        </div>
                        {msg.role === 'user' && <UserIcon />}
                    </div>
                ))}
                 {isLoading && (
                    <div className="flex items-start gap-3">
                        <ModelIcon />
                        <div className="max-w-xs p-3 rounded-lg bg-gray-700">
                            <div className="flex items-center space-x-2">
                               <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                               <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                               <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                           </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-gray-700">
                <form onSubmit={handleSend} className="flex items-center gap-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask a financial question..."
                        className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={isLoading || !input.trim()} className="bg-teal-500 text-white p-2 rounded-lg disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-teal-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chatbot;
