'use client'

import { useState, useRef, useEffect } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { ChatTitle } from './components/ChatTitle'
import { MessageList } from './components/MessageList'
import { ChatInput } from './components/ChatInput'
import { ImagePreview } from './components/ImagePreview'
import { useImageUpload } from './hooks/useImageUpload'
import { useChatMessages } from './hooks/useChatMessages'
import { AnimatedBackground } from "../../components/animated-background"
import RenderFooter from '@/components/RenderFooter'

export default function MinimalistChatbot() {
    const { messages, isLoading, sendMessage, clearMessages } = useChatMessages();
    const {
        isUploading,
        localImageUrl,
        imageBase64,
        clearImages,
        handleImageChange,
    } = useImageUpload();

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [input, setInput] = useState('');

    useEffect(() => {
        const scrollToBottom = () => {
            if (messagesEndRef.current) {
                // First scroll the messages container
                messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
                
                // Then scroll the window to ensure the input is visible
                setTimeout(() => {
                    window.scrollTo({
                        top: document.documentElement.scrollHeight,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        };

        // Add a small delay when there's an image preview to ensure it's loaded
        if (localImageUrl) {
            setTimeout(scrollToBottom, 100);
        } else {
            scrollToBottom();
        }
    }, [messages, localImageUrl]);

    useEffect(() => {
        const adjustViewportHeight = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        adjustViewportHeight();
        window.addEventListener('resize', adjustViewportHeight);
        window.addEventListener('orientationchange', adjustViewportHeight);

        return () => {
            window.removeEventListener('resize', adjustViewportHeight);
            window.removeEventListener('orientationchange', adjustViewportHeight);
        };
    }, []);

    const handleInputImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        handleImageChange(file);
    };

    return (
        <>
            <Sidebar />
            <div className="flex flex-col min-h-[100dvh]">
                <AnimatedBackground />
                <div className="flex-grow flex flex-col items-center w-full">
                    <div className="flex-grow flex flex-col w-full min-w-[320px] max-w-[1200px] mx-auto">
                        {messages.length === 0 ? (
                            <div className="flex-grow flex flex-col px-4 sm:px-6 md:px-8 w-full">
                                <div className="flex-grow flex flex-col items-center justify-center w-full">
                                    <ChatTitle clearMessages={clearMessages} />
                                    <div className="w-full max-w-3xl mt-8">
                                        {localImageUrl && (
                                            <ImagePreview
                                                localImageUrl={localImageUrl}
                                                isUploading={isUploading}
                                                onRemove={() => {
                                                    clearImages();
                                                    if (fileInputRef.current) {
                                                        fileInputRef.current.value = '';
                                                    }
                                                }}
                                            />
                                        )}
                                        <ChatInput
                                            input={input}
                                            setInput={setInput}
                                            isLoading={isLoading}
                                            fileInputRef={fileInputRef}
                                            onImageSelect={handleInputImageChange}
                                            autoFocus={messages.length > 0}
                                            imageBase64={imageBase64}
                                            clearImages={clearImages}
                                            sendMessage={sendMessage}
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex-grow flex flex-col">
                                <ChatTitle compact clearMessages={clearMessages} />
                                <div className="flex-grow overflow-y-auto">
                                    <MessageList
                                        messages={messages}
                                        messagesEndRef={messagesEndRef}
                                    />
                                </div>
                                <div className="w-full border-t border-gray-200">
                                    {localImageUrl && (
                                        <ImagePreview
                                            localImageUrl={localImageUrl}
                                            isUploading={isUploading}
                                            onRemove={() => {
                                                clearImages();
                                                if (fileInputRef.current) {
                                                    fileInputRef.current.value = '';
                                                }
                                            }}
                                        />
                                    )}
                                    <ChatInput
                                        input={input}
                                        setInput={setInput}
                                        isLoading={isLoading}
                                        fileInputRef={fileInputRef}
                                        onImageSelect={handleInputImageChange}
                                        autoFocus={messages.length > 0}
                                        imageBase64={imageBase64}
                                        clearImages={clearImages}
                                        sendMessage={sendMessage}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="mt-8 sm:mt-20 w-full px-4">
                        <RenderFooter />
                    </div>
                </div>
            </div>
        </>
    )
}