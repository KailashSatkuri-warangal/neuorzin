import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Key, 
  ShieldCheck, 
  Lock, 
  Cpu, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Zap, 
  Sliders, 
  SlidersHorizontal,
  Server,
  Eye,
  EyeOff,
  ExternalLink,
  Bot
} from 'lucide-react';
import { crmApi } from '../../../data/crmApi';

export default function AiSettingsView({ onShowToast, currentUser }) {
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('gemini-1.5-flash');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(4096);
  const [systemContext, setSystemContext] = useState(
    'You are a high-level enterprise technology journalist and software architect at NeuOrzin. Write well-structured, factual, SEO-rich insights with clear headers and bullet points.'
  );

  const [hasExistingKey, setHasExistingKey] = useState(false);
  const [maskedKey, setMaskedKey] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [revealKey, setRevealKey] = useState(false);

  // States
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  useEffect(() => {
    loadAiConfig();
  }, []);

  const loadAiConfig = async () => {
    setIsLoading(true);
    try {
      const config = await crmApi.getAiConfig();
      if (config) {
        if (config.has_key || config.is_configured || config.masked_key) {
          setHasExistingKey(true);
          setMaskedKey(config.masked_key || 'AIzaSy••••••••••••••••••••');
        } else {
          setHasExistingKey(false);
        }
        if (config.model || config.model_name) setModel(config.model || config.model_name);
        if (config.temperature !== undefined) setTemperature(Number(config.temperature));
        if (config.max_tokens !== undefined) setMaxTokens(Number(config.max_tokens));
        if (config.system_context) setSystemContext(config.system_context);
      }
    } catch (err) {
      console.warn('Notice loading AI config:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveConfig = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload = {
        model,
        model_name: model,
        temperature,
        max_tokens: maxTokens,
        system_context: systemContext
      };
      // Attach api_key if the admin typed a new one
      if (apiKey.trim()) {
        payload.api_key = apiKey.trim();
        payload.gemini_api_key = apiKey.trim();
      }

      const res = await crmApi.saveAiConfig(payload);
      if (onShowToast) onShowToast(res?.message || 'AI & Gemini configuration saved securely server-side!', 'success');
      
      if (apiKey.trim()) {
        const k = apiKey.trim();
        setMaskedKey(k.slice(0, 6) + '...' + k.slice(-4));
        setHasExistingKey(true);
      }
      setApiKey('');
      setShowKeyInput(false);
      await loadAiConfig();
    } catch (err) {
      if (onShowToast) onShowToast(err.message || 'Failed to save AI configuration.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await crmApi.testAiConfig(apiKey.trim() || undefined);
      if (res.success) {
        setTestResult({
          status: 'success',
          message: res.message || 'Successfully connected to Google Gemini API! Response latency: optimal.',
          model: res.model || model
        });
        if (onShowToast) onShowToast('Gemini API verified and fully operational!', 'success');
      } else {
        setTestResult({
          status: 'error',
          message: res.error || 'Connection failed. Please verify the API key and project quota.'
        });
      }
    } catch (err) {
      setTestResult({
        status: 'error',
        message: err.message || 'Network error communicating with server AI gateway.'
      });
      if (onShowToast) onShowToast('AI connection test failed.', 'error');
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-500/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-display tracking-tight">
                  Gemini AI Configuration & Engine
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-[10px] font-bold uppercase tracking-wider">
                  Server-Side Secure
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Manage your Google Gemini credentials and model parameters for automatic blog authoring and SEO enrichment.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleTestConnection}
              disabled={isTesting || (!hasExistingKey && !apiKey.trim())}
              className="px-4 py-2.5 rounded-xl border border-purple-200 bg-purple-50/70 hover:bg-purple-100/70 text-purple-700 text-xs font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isTesting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5" />}
              <span>Test Connection</span>
            </button>
          </div>
        </div>
      </div>

      {/* Security Architecture Notice */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50/80 to-indigo-50/80 border border-blue-200/80 flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-xl bg-[#0070ba] text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="text-xs text-slate-700 space-y-1">
          <div className="font-black text-slate-900 flex items-center gap-2">
            <span>Zero Client-Side Exposure Policy</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <p className="text-slate-600 leading-relaxed text-[11px]">
            Your Google Gemini API Key is encrypted and stored strictly in the server database. The raw key is never bundled in frontend JavaScript, never exposed in localStorage, and never sent back over public APIs. All generative AI requests are executed server-side.
          </p>
        </div>
      </div>

      {/* Connection Test Banner Alert */}
      {testResult && (
        <div
          className={`p-4 rounded-2xl border text-xs flex items-start gap-3 ${
            testResult.status === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}
        >
          {testResult.status === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          )}
          <div className="space-y-0.5">
            <div className="font-bold">
              {testResult.status === 'success' ? 'Connection Successful' : 'Connection Error'}
            </div>
            <p className="text-[11px] leading-relaxed opacity-90">{testResult.message}</p>
          </div>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSaveConfig} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Key & Credentials */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Key className="w-4 h-4 text-[#0070ba]" />
              <h3 className="text-sm font-black text-slate-900">API Credentials</h3>
            </div>

            {/* Current Key Status */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Google Gemini API Key
              </label>

              {hasExistingKey && !showKeyInput ? (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 font-mono text-xs text-slate-800 shadow-2xs">
                    <div className="flex items-center gap-2 truncate">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                      <span className="truncate font-semibold tracking-wider text-emerald-950">{maskedKey}</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider shrink-0 shadow-2xs">
                      Saved in DB
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-500 font-medium">Encrypted on server</span>
                    <button
                      type="button"
                      onClick={() => setShowKeyInput(true)}
                      className="text-xs text-[#0070ba] hover:text-[#00508a] font-bold cursor-pointer transition-colors"
                    >
                      Change / Replace Key
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="relative">
                    <input
                      type={revealKey ? 'text' : 'password'}
                      placeholder="AIzaSy..."
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0070ba] focus:bg-white font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setRevealKey(!revealKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {revealKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  {hasExistingKey && (
                    <button
                      type="button"
                      onClick={() => {
                        setShowKeyInput(false);
                        setApiKey('');
                      }}
                      className="text-xs text-slate-500 hover:text-slate-700 underline"
                    >
                      Cancel
                    </button>
                  )}
                  <p className="text-[11px] text-slate-500 font-medium">
                    Google AI Studio keys start with <code className="bg-slate-100 text-purple-700 px-1 py-0.5 rounded font-mono font-bold">AIzaSy...</code>.{' '}
                    <a
                      href="https://aistudio.google.com/app/apikey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0070ba] font-bold hover:underline inline-flex items-center gap-0.5"
                    >
                      Get Free API Key <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </p>
                </div>
              )}
            </div>

            {/* Model Selector */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Model Engine
              </label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-[#0070ba] cursor-pointer"
              >
                <option value="gemini-1.5-flash-latest">Gemini 1.5 Flash (Ultra Fast & Recommended)</option>
                <option value="gemini-2.0-flash">Gemini 2.0 Flash (Next-Gen Performance)</option>
                <option value="gemini-1.5-pro-latest">Gemini 1.5 Pro (Deep Architecture Reasoning)</option>
              </select>
              <p className="text-[10px] text-slate-400 mt-1">
                Automatic multi-model cascade enabled with enterprise synthesis fallback.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Parameters & Prompt Context */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-black text-slate-900">Engine Hyperparameters & Style</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Temperature */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700">Creativity / Temperature</span>
                  <span className="font-mono font-bold text-[#0070ba]">{temperature}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full accent-[#0070ba] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Factual (0.1)</span>
                  <span>Balanced (0.7)</span>
                  <span>Creative (1.0)</span>
                </div>
              </div>

              {/* Max Tokens */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700">Max Token Length</span>
                  <span className="font-mono font-bold text-indigo-600">{maxTokens}</span>
                </div>
                <input
                  type="range"
                  min="1024"
                  max="8192"
                  step="512"
                  value={maxTokens}
                  onChange={(e) => setMaxTokens(parseInt(e.target.value, 10))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Concise (1024)</span>
                  <span>Standard (4096)</span>
                  <span>Longform (8192)</span>
                </div>
              </div>
            </div>

            {/* System Context */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Brand Tone & System Instructions
              </label>
              <textarea
                rows="4"
                value={systemContext}
                onChange={(e) => setSystemContext(e.target.value)}
                placeholder="Instruct Gemini on the company background, target tone, formatting preferences..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white resize-none leading-relaxed"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Injected into all blog generation prompts to preserve brand voice consistency.
              </p>
            </div>

            {/* Action Save Button */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                <span>Save AI Configuration</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
