import ReactMarkdown from 'react-markdown'
import { Message, ImageMessage } from './types'

interface MessageListProps {
    messages: (Message | ImageMessage)[];
    messagesEndRef: React.RefObject<HTMLDivElement>;
}

export function MessageList({ messages, messagesEndRef }: MessageListProps) {
    return (
        <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto w-full p-4 md:p-6">
                <div className="space-y-4">
                    {messages.map((message, index) => (
                        <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} w-full`}>
                            <div
                                className={`max-w-[80%] rounded-2xl p-3 ${
                                    message.role === 'user'
                                        ? 'bg-blue-500 text-white rounded-br-none'
                                        : 'bg-gray-200 text-gray-800 rounded-bl-none'
                                }`}
                            >
                                {message.role === 'assistant' ? (
                                    <ReactMarkdown className="prose prose-sm max-w-none dark:prose-invert">
                                        {typeof message.content === 'string'
                                            ? message.content
                                            : message.content.map((content, i) =>
                                                content.type === 'text'
                                                    ? content.text
                                                    : content.image_url?.url
                                                        ? `![Image](${content.image_url.url})`
                                                        : ''
                                            ).join('\n')}
                                    </ReactMarkdown>
                                ) : (
                                    typeof message.content === 'string'
                                        ? message.content
                                        : message.content.map((content, i) => (
                                            <div key={i}>
                                                {content.type === 'text' && content.text}
                                                {content.type === 'image_url' && content.image_url?.url && (
                                                    <img
                                                        src={content.image_url.url}
                                                        alt="Uploaded content"
                                                        className="max-w-full max-h-[250px] w-auto h-auto object-contain rounded-lg mt-2"
                                                    />
                                                )}
                                            </div>
                                        ))
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
}