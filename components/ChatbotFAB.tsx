import React from 'react';

const AgentIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.5,14.5c-0.3-0.3-0.7-0.5-1-0.5c-0.6,0-1,0.4-1,1v2c0,1.7-1.3,3-3,3h-1c-0.6,0-1-0.4-1-1v-2c0-0.6-0.4-1-1-1s-1,0.4-1,1v2c0,0.6-0.4,1-1,1h-1c-1.7,0-3-1.3-3-3v-2c0-0.6-0.4-1-1-1s-1,0.4-1,1v2c0,2.8,2.2,5,5,5h1c0.6,0,1,0.4,1,1s-0.4,1-1,1H9.5c-0.3,0-0.5,0.1-0.7,0.3L7,22.1V21c0-0.6-0.4-1-1-1s-1,0.4-1,1v2.5C5,24.8,5.2,25,5.5,25c0.1,0,0.2,0,0.3-0.1l2.5-1.5c0.2-0.1,0.4-0.2,0.6-0.2h1c2.8,0,5-2.2,5-5v-2c0-0.6-0.4-1-1-1c-0.3,0-0.7,0.2-1,0.5c-0.3,0.3-0.5,0.7-0.5,1v0.5c0,0.6-0.4,1-1,1s-1-0.4-1-1V17c0-1.1,0.9-2,2-2h1c1.1,0,2-0.9,2-2v-1c0-0.6,0.4-1,1-1s1,0.4,1,1v1C21.5,13.8,21.8,14.2,21.5,14.5z M12,12c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S15.3,12,12,12z M12,2c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S14.2,2,12,2z" />
    </svg>
);

interface ChatbotFABProps {
    onClick: () => void;
}

const ChatbotFAB: React.FC<ChatbotFABProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-6 right-6 bg-teal-500 hover:bg-teal-600 text-white rounded-full p-4 shadow-lg z-50 transition-transform duration-300 ease-in-out hover:scale-110"
            aria-label="Open financial advisor chat"
        >
            <AgentIcon />
        </button>
    );
};

export default ChatbotFAB;
