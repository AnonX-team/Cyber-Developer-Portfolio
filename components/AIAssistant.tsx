
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, User, Bot, Loader2, Mic, MicOff, Terminal as TerminalIcon } from 'lucide-react';
import { getGeminiResponse } from '../services/geminiService';
import { Message } from '../types';
import Terminal from './Terminal';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm Adil's Pro AI. I'm now equipped with real-time web search and voice capabilities. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Voice State
  const audioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);
    const response = await getGeminiResponse(userMsg);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  const toggleVoice = async () => {
    if (isVoiceActive) {
      setIsVoiceActive(false);
      sessionRef.current?.close();
      return;
    }

    setIsVoiceActive(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Voice Decoding Helpers
    const decode = (base64: string) => {
      const binaryString = atob(base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
      return bytes;
    };

    const decodeAudioData = async (data: Uint8Array, ctx: AudioContext) => {
      const dataInt16 = new Int16Array(data.buffer);
      const buffer = ctx.createBuffer(1, dataInt16.length, 24000);
      const channelData = buffer.getChannelData(0);
      for (let i = 0; i < dataInt16.length; i++) channelData[i] = dataInt16[i] / 32768.0;
      return buffer;
    };

    const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    audioContextRef.current = outputCtx;
    let nextStartTime = 0;

    const sessionPromise = ai.live.connect({
      model: 'gemini-2.5-flash-native-audio-preview-09-2025',
      callbacks: {
        onopen: () => {
          setMessages(prev => [...prev, { role: 'assistant', content: "[Voice Mode Active] Listening for your questions..." }]);
        },
        onmessage: async (message: LiveServerMessage) => {
          const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
          if (base64Audio) {
            const audioBuffer = await decodeAudioData(decode(base64Audio), outputCtx);
            const source = outputCtx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(outputCtx.destination);
            nextStartTime = Math.max(nextStartTime, outputCtx.currentTime);
            source.start(nextStartTime);
            nextStartTime += audioBuffer.duration;
          }
        },
        onclose: () => setIsVoiceActive(false),
        onerror: () => setIsVoiceActive(false)
      },
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } } },
        systemInstruction: "You are Adil Khan's professional voice representative. Answer concisely and professionally."
      }
    });

    sessionRef.current = await sessionPromise;
    
    // Microphone Streaming
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const inputCtx = new AudioContext({ sampleRate: 16000 });
    const source = inputCtx.createMediaStreamSource(stream);
    const processor = inputCtx.createScriptProcessor(4096, 1, 1);
    
    processor.onaudioprocess = (e) => {
      const inputData = e.inputBuffer.getChannelData(0);
      const int16 = new Int16Array(inputData.length);
      for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
      
      let binary = '';
      const bytes = new Uint8Array(int16.buffer);
      for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
      
      sessionRef.current?.sendRealtimeInput({
        media: { data: btoa(binary), mimeType: 'audio/pcm;rate=16000' }
      });
    };
    
    source.connect(processor);
    processor.connect(inputCtx.destination);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
        {isOpen && (
          <div className="bg-gray-900 border border-blue-500/30 w-80 sm:w-[450px] rounded-2xl shadow-2xl flex flex-col h-[600px] overflow-hidden backdrop-blur-xl">
            <div className="bg-blue-600 p-4 flex items-center justify-between text-white shadow-lg">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Bot className="w-6 h-6" />
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-blue-600 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-tight">Adil AI v2.0</h4>
                  <p className="text-[10px] opacity-80 uppercase tracking-widest font-mono">Pro Connection Secured</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={toggleVoice}
                  className={`p-2 rounded-lg transition-all ${isVoiceActive ? 'bg-red-500 animate-pulse' : 'bg-blue-500/50 hover:bg-blue-400'}`}
                  title="Toggle Voice Mode"
                >
                  {isVoiceActive ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
                <button onClick={() => setIsOpen(false)} className="hover:bg-blue-500 p-1 rounded transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-950/50 cyber-grid">
              {messages.map((m, idx) => (
                <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-2 max-w-[90%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${m.role === 'user' ? 'bg-blue-600 shadow-lg shadow-blue-500/20' : 'bg-gray-800 border border-gray-700'}`}>
                      {m.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-blue-400" />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-gray-900/90 text-gray-300 border border-gray-800 rounded-tl-none shadow-xl'}`}>
                      {m.content}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-900 border border-gray-800 p-3 rounded-2xl flex items-center gap-3 text-gray-400 text-xs font-mono">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                    SEARCHING_WEB_FOR_GROUNDING...
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-gray-900/80 border-t border-gray-800 backdrop-blur-md">
              <div className="flex gap-2">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask Adil's AI (e.g., 'What are the top CVEs this month?')"
                  className="flex-1 bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-600"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="bg-blue-600 text-white px-4 rounded-xl hover:bg-blue-500 transition-all disabled:opacity-50 shadow-lg shadow-blue-500/20"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex gap-3">
          <button 
            onClick={() => setIsTerminalOpen(!isTerminalOpen)}
            className="bg-gray-800 text-blue-400 p-4 rounded-full shadow-xl border border-blue-500/30 hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
          >
            <TerminalIcon className="w-6 h-6 group-hover:rotate-12 transition-transform" />
          </button>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="bg-blue-600 text-white p-4 rounded-full shadow-2xl shadow-blue-500/30 hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
          >
            {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isTerminalOpen && <Terminal onClose={() => setIsTerminalOpen(false)} />}
    </>
  );
};

export default AIAssistant;
