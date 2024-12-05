import { Send, Image } from 'lucide-react'

interface ChatInputProps {
    input: string;
    setInput: (input: string) => void;
    isLoading: boolean;
    onSubmit: (e: React.FormEvent) => Promise<void>;
    fileInputRef: React.RefObject<HTMLInputElement>;
    onImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ChatInput({ input, setInput, isLoading, onSubmit, fileInputRef, onImageSelect }: ChatInputProps) {
    return (
        <form onSubmit={onSubmit} className="p-4">
            <div className="flex items-center bg-white rounded-full shadow-md max-w-4xl mx-auto border border-gray-200">
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-3 pl-4 hover:bg-gray-100 focus:outline-none rounded-l-full"
                >
                    <Image className="w-6 h-6 text-gray-500" />
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={onImageSelect}
                    accept="image/*"
                    className="hidden"
                />
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 p-3 bg-transparent focus:outline-none"
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`p-3 pr-4 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'} focus:outline-none rounded-r-full`}
                >
                    <Send className="w-6 h-6 text-blue-500" />
                </button>
            </div>
        </form>
    );
}