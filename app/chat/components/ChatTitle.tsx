import { RefreshCw } from 'lucide-react'

interface ChatTitleProps {
    compact?: boolean;
}

export function ChatTitle({ compact = false }: ChatTitleProps) {
    return compact ? (
        <div className="border-b border-gray-200">
            <div className="max-w-4xl mx-auto px-4 py-4 md:px-6 text-center relative">
                <h1 className="text-xl font-semibold">
                    <span className="text-blue-600">Disposable</span> Chat
                </h1>
                <button 
                    onClick={() => window.location.reload()}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors"
                    title="Refresh chat"
                >
                    <RefreshCw className="w-5 h-5 text-gray-600" />
                </button>
            </div>
        </div>
    ) : (
        <div className="text-center py-8">
            <h1 className="text-4xl font-extrabold mb-2">
                <span className="text-blue-600">Disposable</span> AI Chat
            </h1>
            <p className="text-lg text-gray-500">
                <b>No Limits. Not Recorded.</b>
            </p>
        </div>
    );
}