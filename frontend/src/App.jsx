import React, { useState, useEffect } from 'react';
import { 
  Search, Heart, User, Sparkles, MapPin, Briefcase, 
  Filter, Check, Calendar, ThumbsUp, AlertCircle, 
  Copy, Smile, Coffee, ChevronRight, X, Loader2,
  GraduationCap, IndianRupee, Languages, Users, Settings,
  Lock, Mail, LogOut, KeyRound, ArrowLeft, HeartHandshake,
  CheckCircle, PauseCircle, Phone, Info, Send, Plus, ClipboardList
} from 'lucide-react';

function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (email.toLowerCase() === 'matchmaker@tdc.com' && password === 'tdc2024') {
        onLogin();
      } else {
        setError('Invalid matchmaker credentials. Please try again.');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative overflow-hidden bg-[#0d080c]">
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-rose-950/20 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-950/15 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md glass-card p-8 rounded-3xl border border-amber-500/20 shadow-2xl relative z-10 animate-float">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="bg-gradient-to-tr from-rose-600 to-amber-500 p-3.5 rounded-2xl shadow-xl shadow-rose-900/30 mb-4 glow-gold">
            <Heart className="h-8 w-8 text-white fill-white animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white font-display">
            The Date Crew
          </h1>
          <p className="text-xs text-amber-400 font-medium mt-1 tracking-wider uppercase">Matchmaker Portal</p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-rose-500/40 via-amber-500/40 to-rose-500/40 mt-3" />
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-lg bg-rose-950/30 border border-rose-500/30 flex items-center gap-2 text-xs text-rose-300 text-left">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-rose-200/60 uppercase tracking-wider">
              Matchmaker Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-rose-300/40" />
              <input
                type="email"
                required
                placeholder="name@tdc.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950/60 border border-amber-500/25 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/40 focus:bg-slate-950"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-rose-200/60 uppercase tracking-wider">
              Security Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-rose-300/40" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950/60 border border-amber-500/25 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/40 focus:bg-slate-950"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white font-semibold text-sm shadow-lg shadow-rose-900/40 transition duration-300 flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-white" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <KeyRound className="h-4 w-4 text-rose-200" />
                <span>Unlock Dashboard</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-amber-500/10 text-center">
          <p className="text-[10px] text-rose-300/40 font-medium uppercase tracking-wider mb-1.5">Demo Access Credentials</p>
          <div className="inline-block bg-slate-950/40 rounded-lg p-2.5 border border-amber-500/5 text-[11px] text-rose-200/60 font-mono text-left space-y-0.5">
            <div><span className="text-amber-500/70 font-semibold">User:</span> matchmaker@tdc.com</div>
            <div><span className="text-amber-500/70 font-semibold">Pass:</span> tdc2024</div>
          </div>
        </div>
      </div>

      <footer className="mt-8 text-center text-[10px] text-rose-300/30 relative z-10 font-light">
        &copy; {new Date().getFullYear()} The Date Crew CRM. All rights reserved.
      </footer>
    </div>
  );
}

// SKELETON 1: Customer Grid Skeleton Loader
function CustomerGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="glass-card p-5 rounded-2xl border border-amber-500/10 h-[280px] flex flex-col justify-between bg-slate-950/20">
          <div>
            <div className="flex items-start justify-between mb-4">
              <div className="h-16 w-16 bg-slate-900 rounded-xl" />
              <div className="h-5 w-16 bg-slate-900 rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-900 rounded w-3/4" />
              <div className="h-3.5 bg-slate-900 rounded w-1/2" />
              <div className="h-3 bg-slate-900 rounded w-2/3" />
            </div>
          </div>
          <div className="h-7 bg-slate-900 rounded w-full mt-4" />
        </div>
      ))}
    </div>
  );
}

// SKELETON 2: Matches Row Skeleton Loader
function MatchesSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="glass-card p-5 rounded-2xl border border-amber-500/10 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-950/20">
          <div className="flex items-center space-x-4">
            <div className="h-14 w-14 bg-slate-900 rounded-xl shrink-0" />
            <div className="space-y-2 min-w-[200px]">
              <div className="h-4 bg-slate-900 rounded w-2/3" />
              <div className="h-3 bg-slate-900 rounded w-1/2" />
              <div className="h-3 bg-slate-900 rounded w-3/4" />
            </div>
          </div>
          <div className="h-8 w-24 bg-slate-900 rounded-xl shrink-0" />
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Navigation & Views
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedClient, setSelectedClient] = useState(null);
  
  // Dashboard Filtering State (Only applies to CRM directory view)
  const [searchQuery, setSearchQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState('All');
  const [religionFilter, setReligionFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Matchmaking State (Inside Customer Match View)
  const [suggestedMatches, setSuggestedMatches] = useState([]);
  const [loadingMatches, setLoadingMatches] = useState(false);
  const [candidateClient, setCandidateClient] = useState(null);
  const [compatibilityResult, setCompatibilityResult] = useState(null);
  const [isLoadingScore, setIsLoadingScore] = useState(false);
  const [matchmakerNotes, setMatchmakerNotes] = useState('');
  
  // Matrimonial Call Log Notes State
  const [notes, setNotes] = useState([]);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');
  const [newNoteCategory, setNewNoteCategory] = useState('General');

  // FEATURE 1 — AI Match Explanation State
  const [aiExplanation, setAiExplanation] = useState('');
  const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);

  // FEATURE 2 — AI Intro Email Generator State
  const [introResult, setIntroResult] = useState('');
  const [isLoadingIntro, setIsLoadingIntro] = useState(false);
  const [copied, setCopied] = useState(false);

  // Send Match Modal State
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [modalIntroText, setModalIntroText] = useState('');
  const [activeMatchCandidate, setActiveMatchCandidate] = useState(null);

  // Unified API Error Boundaries
  const [apiError, setApiError] = useState('');

  // Toast Notification System
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3500);
  };

  // Check auth state on load
  useEffect(() => {
    const auth = localStorage.getItem('tdc_auth');
    if (auth === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  // Load clients
  useEffect(() => {
    if (isLoggedIn) {
      fetchClients();
    }
  }, [isLoggedIn]);

  const fetchClients = async () => {
    try {
      setLoading(true);
      setApiError('');
      const res = await fetch('/api/clients');
      if (!res.ok) throw new Error('API server returned an error fetching clients database.');
      const data = await res.json();
      setClients(data);
    } catch (err) {
      console.error('Error fetching clients:', err);
      setApiError('Unable to load client database from server. Using locally stored cache if available.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch matches from the backend matching service
  const fetchSuggestedMatches = async (clientId) => {
    try {
      setLoadingMatches(true);
      setSuggestedMatches([]);
      setApiError('');
      const res = await fetch(`/api/clients/${clientId}/matches`);
      if (!res.ok) throw new Error('API error calculating matches.');
      const data = await res.json();
      setSuggestedMatches(data);
    } catch (err) {
      console.error('Error fetching suggested matches:', err);
      setApiError('Unable to fetch calculated matchmaking matches from server. Please check connection.');
    } finally {
      setLoadingMatches(false);
    }
  };

  const handleSelectClient = (client) => {
    setSelectedClient(client);
    setCandidateClient(null);
    setCompatibilityResult(null);
    setIntroResult('');
    setAiExplanation('');
    setApiError('');
    setActiveView('customer');
    fetchSuggestedMatches(client.id);

    // Load localStorage Notes
    const savedNotes = JSON.parse(localStorage.getItem(`tdc_notes_${client.id}`) || '[]');
    setNotes(savedNotes);
    setIsAddingNote(false);
    setNewNoteText('');
    setNewNoteCategory('General');
  };

  const handleLogin = () => {
    localStorage.setItem('tdc_auth', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('tdc_auth');
    setIsLoggedIn(false);
    setActiveView('dashboard');
    setSelectedClient(null);
    setCandidateClient(null);
    setCompatibilityResult(null);
    setIntroResult('');
    setAiExplanation('');
    setSuggestedMatches([]);
    setNotes([]);
    setApiError('');
  };

  // Update client status locally
  const handleUpdateStatus = (clientId, newStatus) => {
    setClients(prev => prev.map(c => c.id === clientId ? { ...c, profileStatus: newStatus } : c));
    setSelectedClient(prev => ({ ...prev, profileStatus: newStatus }));
    triggerToast(`Status updated to "${newStatus}" for ${selectedClient.name}!`);
  };

  // Add a call note
  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim() || newNoteText.length > 500) return;

    const newNote = {
      id: `note_${Date.now()}`,
      text: newNoteText.trim(),
      category: newNoteCategory,
      timestamp: new Date().toLocaleString('en-IN', { 
        dateStyle: 'medium', 
        timeStyle: 'short' 
      })
    };

    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    localStorage.setItem(`tdc_notes_${selectedClient.id}`, JSON.stringify(updatedNotes));
    setNewNoteText('');
    setNewNoteCategory('General');
    setIsAddingNote(false);
    triggerToast("Call note saved successfully!");
  };

  // Delete a call note
  const handleDeleteNote = (noteId) => {
    const updatedNotes = notes.filter(n => n.id !== noteId);
    setNotes(updatedNotes);
    localStorage.setItem(`tdc_notes_${selectedClient.id}`, JSON.stringify(updatedNotes));
    triggerToast("Call note deleted.");
  };

  // Open "Send Match" Modal with pre-filled message
  const handleOpenSendMatchModal = (candidate) => {
    setActiveMatchCandidate(candidate);
    const text = `Dear ${selectedClient.firstName},\n\nI hope you're having a wonderful week! As part of our bespoke matchmaking search at The Date Crew, I have selected a highly compatible prospect for you.\n\nMeet ${candidate.name}, a ${candidate.age}-year-old ${candidate.designation} based in ${candidate.city}. They completed their undergraduate degree at ${candidate.undergraduateCollege} and earn ${candidate.income} LPA. They identify as ${candidate.religion} (${candidate.caste}) and share your diet preference of "${candidate.dietPreference}".\n\nI believe you both share excellent values around family dynamics (${candidate.familyType} setup) and lifestyle goals.\n\nLet me know if you would like me to share your profile with them and coordinate a brief introductory call!\n\nWarmly,\n\nPriya Sharma\nSenior Matchmaker, The Date Crew`;
    setModalIntroText(text);
    setShowMatchModal(true);
  };

  const handleSendMatchEmail = () => {
    setShowMatchModal(false);
    triggerToast(`Match proposal email sent successfully to ${selectedClient.name}!`);
  };

  // FEATURE 1 — Call Claude AI to Explain Match Compatibility
  const fetchAIExplanation = async (customer, match, score, reasons) => {
    try {
      setIsLoadingExplanation(true);
      setAiExplanation('');
      setApiError('');
      const res = await fetch('/api/explain-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer, match, score, reasons })
      });
      if (!res.ok) throw new Error('Explain match API returned error state.');
      const data = await res.json();
      setAiExplanation(data.explanation);
    } catch (err) {
      console.error('Error getting AI match explanation:', err);
      setAiExplanation('Fallback analysis: Aligned on core family structures, education levels, and regional location.');
      setApiError('AI explanation service unavailable. Displaying local fallback compatibility pointers.');
    } finally {
      setIsLoadingExplanation(false);
    }
  };

  // FEATURE 2 — Call Claude AI to Generate Warm Matrimonial Introduction
  const generateIntroduction = async () => {
    if (!selectedClient || !candidateClient) return;
    try {
      setIsLoadingIntro(true);
      setIntroResult('');
      setApiError('');
      
      const res = await fetch('/api/generate-intro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          customer: selectedClient, 
          match: candidateClient 
        })
      });
      if (!res.ok) throw new Error('Generate intro API failed.');
      const data = await res.json();
      setIntroResult(data.introMessage);
      triggerToast(`AI Matrimonial Letter drafted successfully!`);
    } catch (err) {
      console.error('Error generating intro:', err);
      setApiError('AI Email drafting service failed. Using local text templates.');
      const fallbackIntro = `Dear ${selectedClient.name},\n\nI wanted to introduce you to ${candidateClient.name}, a ${candidateClient.age}-year-old ${candidateClient.designation} from ${candidateClient.city}. You both share common interests including ${selectedClient.hobbies[0] || 'exploring'} and match on dietary requirements. Let me know if you would like me to coordinate a brief call!\n\nBest regards,\nPriya Sharma`;
      setIntroResult(fallbackIntro);
    } finally {
      setIsLoadingIntro(false);
    }
  };

  // Run compatibility score
  const analyzeCompatibility = async (c1Id, c2Id) => {
    try {
      setIsLoadingScore(true);
      setCompatibilityResult(null);
      setApiError('');
      
      const res = await fetch('/api/matchmaking/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId1: c1Id, clientId2: c2Id })
      });
      if (!res.ok) throw new Error('Scoring chemistry endpoint error.');
      const data = await res.json();
      setCompatibilityResult(data);
    } catch (err) {
      console.error('Error scoring compatibility:', err);
      setApiError('Matrimonial scoring check failed. Please try again.');
    } finally {
      setIsLoadingScore(false);
    }
  };

  // Copy intro to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(introResult || modalIntroText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 1. Get Priya's assigned clients (assignedMatchmakerId === "matchmaker_1")
  const assignedClients = clients.filter(c => c.assignedMatchmakerId === "matchmaker_1");

  // 2. Apply search and filters to Priya's assigned clients
  const filteredAssignedClients = assignedClients.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGender = genderFilter === 'All' || c.gender === genderFilter;
    const matchesReligion = religionFilter === 'All' || c.religion === religionFilter;
    const matchesStatus = statusFilter === 'All' || c.profileStatus === statusFilter;
    
    return matchesSearch && matchesGender && matchesReligion && matchesStatus;
  });

  // Calculate status counters for Priya's clients
  const activeCount = assignedClients.filter(c => c.profileStatus === 'Active').length;
  const holdCount = assignedClients.filter(c => c.profileStatus === 'On Hold').length;
  const matchedCount = assignedClients.filter(c => c.profileStatus === 'Matched').length;

  // Extract unique religions from Priya's profiles for dropdown
  const uniqueReligions = ["All", ...new Set(assignedClients.map(c => c.religion))];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'On Hold': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Matched': return 'bg-slate-700/20 text-slate-400 border-slate-700/35';
      default: return 'bg-slate-800 text-slate-300';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20';
    if (score >= 70) return 'text-amber-400 border-amber-500/30 bg-amber-950/20';
    return 'text-rose-400 border-rose-500/30 bg-rose-950/20';
  };

  const getCategoryStyles = (category) => {
    switch (category) {
      case 'Preference': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Feedback': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Follow-up': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default: return 'bg-slate-700/20 text-slate-400 border-slate-700/35';
    }
  };

  // Render Login screen if not authenticated
  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#0d080c] relative">
      
      {/* Toast Notification Widget */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 glass-card px-5 py-3.5 rounded-xl border border-emerald-500/30 bg-emerald-950/90 shadow-2xl flex items-center gap-3 animate-float max-w-sm">
          <div className="bg-emerald-500 p-1 rounded-full shrink-0">
            <Check className="h-4.5 w-4.5 text-slate-950" />
          </div>
          <div>
            <p className="text-xs font-semibold text-white">Action Complete</p>
            <p className="text-[11px] text-rose-200/70 mt-0.5">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* Send Match Modal overlay */}
      {showMatchModal && activeMatchCandidate && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl glass-card p-6 rounded-2xl border border-amber-500/25 shadow-2xl space-y-4 animate-float">
            <div className="flex items-center justify-between border-b border-amber-500/10 pb-3">
              <h3 className="text-lg font-bold text-white font-display flex items-center gap-1.5 text-left">
                <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
                Propose Match: {selectedClient.name} & {activeMatchCandidate.name}
              </h3>
              <button 
                onClick={() => setShowMatchModal(false)}
                className="text-rose-200/40 hover:text-white p-1 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-1 text-left">
              <label className="block text-[10px] font-bold text-rose-300/60 uppercase tracking-wider">
                Pre-filled Matchmaker Introduction
              </label>
              <textarea
                rows={12}
                value={modalIntroText}
                onChange={(e) => setModalIntroText(e.target.value)}
                className="w-full bg-slate-950/60 border border-amber-500/20 rounded-xl p-3 text-xs text-rose-100/90 font-mono leading-relaxed focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-amber-500/10">
              <button
                onClick={copyToClipboard}
                className="px-3.5 py-2 rounded-xl bg-slate-900 border border-amber-500/20 text-amber-300 text-xs font-semibold hover:border-amber-500/50 flex items-center gap-1.5"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-400" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" /> Copy Email Template
                  </>
                )}
              </button>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowMatchModal(false)}
                  className="px-4 py-2 rounded-xl border border-rose-500/10 text-rose-300 text-xs hover:bg-rose-950/20"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendMatchEmail}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 text-white text-xs font-semibold flex items-center gap-1.5"
                >
                  <Send className="h-3.5 w-3.5" /> Send Email (Mock)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top Navbar */}
      <header className="glass-card border-b border-amber-500/10 px-6 py-4 flex flex-col sm:flex-row gap-4 sm:gap-0 items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-3 text-center sm:text-left">
          <div className="bg-gradient-to-tr from-rose-600 to-amber-500 p-2.5 rounded-xl shadow-lg shadow-rose-900/30 shrink-0">
            <Heart className="h-6 w-6 text-white fill-white animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex flex-wrap items-center justify-center sm:justify-start">
              The Date Crew <span className="text-amber-400 ml-2 font-display italic text-base sm:text-lg font-normal">Matrimonial CRM</span>
            </h1>
            <p className="text-[10px] sm:text-xs text-rose-300/60 font-light">Boutique Relationship Management System</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex flex-col text-right shrink-0">
            <span className="text-xs font-semibold text-rose-200">Priya Sharma</span>
            <span className="text-[10px] text-amber-400/80 font-medium">Senior Matchmaker</span>
          </div>
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 flex items-center justify-center font-bold text-sm text-white shrink-0">
            PS
          </div>
          <button
            onClick={handleLogout}
            className="px-3.5 py-1.5 rounded-xl border border-rose-500/20 hover:border-rose-500/40 text-rose-300 hover:text-white flex items-center gap-1.5 text-xs font-semibold transition shrink-0"
          >
            <LogOut className="h-3.5 w-3.5" /> Logout
          </button>
        </div>
      </header>

      {/* Unified Dismissible Error Banner */}
      {apiError && (
        <div className="mx-6 mt-4 p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs text-amber-300 flex items-center justify-between gap-3 animate-float relative z-20 text-left">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4.5 w-4.5 shrink-0 text-amber-400" />
            <span>{apiError}</span>
          </div>
          <button onClick={() => setApiError('')} className="p-0.5 rounded text-amber-300/60 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Main Workspace Router */}
      {activeView === 'dashboard' ? (
        
        /* 1. CRM DIRECTORY DASHBOARD VIEW */
        <main className="flex-1 flex flex-col p-6 space-y-6 overflow-y-auto">
          {/* Dashboard Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-card p-4 sm:p-5 rounded-2xl border border-amber-500/10 flex items-center justify-between text-left">
              <div>
                <span className="text-[10px] sm:text-xs text-rose-200/50 uppercase tracking-wider font-semibold">My Client Base</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">{assignedClients.length}</h3>
              </div>
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-amber-500 opacity-60" />
            </div>
            
            <div className="glass-card p-4 sm:p-5 rounded-2xl border border-amber-500/10 flex items-center justify-between text-left">
              <div>
                <span className="text-[10px] sm:text-xs text-rose-200/50 uppercase tracking-wider font-semibold">Active Searchers</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1">{activeCount}</h3>
              </div>
              <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-400 opacity-60" />
            </div>
            
            <div className="glass-card p-4 sm:p-5 rounded-2xl border border-amber-500/10 flex items-center justify-between text-left">
              <div>
                <span className="text-[10px] sm:text-xs text-rose-200/50 uppercase tracking-wider font-semibold">Clients On Hold</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-400 mt-1">{holdCount}</h3>
              </div>
              <PauseCircle className="h-6 w-6 sm:h-8 sm:w-8 text-amber-400 opacity-60" />
            </div>

            <div className="glass-card p-4 sm:p-5 rounded-2xl border border-amber-500/10 flex items-center justify-between text-left">
              <div>
                <span className="text-[10px] sm:text-xs text-rose-200/50 uppercase tracking-wider font-semibold">Matched Matches</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-400 mt-1">{matchedCount}</h3>
              </div>
              <HeartHandshake className="h-6 w-6 sm:h-8 sm:w-8 text-rose-400 opacity-60" />
            </div>
          </div>

          {/* CRM Controls / Search & Filters */}
          <div className="glass-card p-4 rounded-2xl border border-amber-500/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-3 h-4 w-4 text-rose-300/40" />
              <input
                type="text"
                placeholder="Search my clients by name or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/60 border border-amber-500/20 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            
            {/* Filter Shelf */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="flex items-center space-x-1.5 text-xs w-full sm:w-auto">
                <span className="text-rose-200/60 flex items-center gap-1 font-semibold"><Filter className="h-3.5 w-3.5" /> Gender:</span>
                <select 
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value)}
                  className="bg-slate-900 border border-amber-500/20 rounded-lg p-1.5 text-white focus:outline-none focus:border-amber-500 text-xs w-full sm:w-auto cursor-pointer"
                >
                  <option value="All">All</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="flex items-center space-x-1.5 text-xs w-full sm:w-auto">
                <span className="text-rose-200/60 font-semibold">Religion:</span>
                <select 
                  value={religionFilter}
                  onChange={(e) => setReligionFilter(e.target.value)}
                  className="bg-slate-900 border border-amber-500/20 rounded-lg p-1.5 text-white focus:outline-none focus:border-amber-500 text-xs w-full sm:w-auto cursor-pointer"
                >
                  {uniqueReligions.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              <div className="flex items-center space-x-1.5 text-xs w-full sm:w-auto">
                <span className="text-rose-200/60 font-semibold">Status:</span>
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-900 border border-amber-500/20 rounded-lg p-1.5 text-white focus:outline-none focus:border-amber-500 text-xs w-full sm:w-auto cursor-pointer"
                >
                  <option value="All">All</option>
                  <option value="Active">Active</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Matched">Matched</option>
                </select>
              </div>
            </div>
          </div>

          {/* Customer Grid */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between text-xs text-rose-200/50">
              <span className="font-semibold">Showing {filteredAssignedClients.length} assigned profiles</span>
              <span>CRM Database Version: 1.0.3</span>
            </div>

            {loading ? (
              <CustomerGridSkeleton />
            ) : filteredAssignedClients.length === 0 ? (
              <div className="h-64 rounded-2xl glass-card border border-dashed border-amber-500/20 flex flex-col items-center justify-center text-center p-6">
                <User className="h-12 w-12 text-rose-300/10 mb-2" />
                <p className="text-sm text-rose-200/40 font-medium">No assigned clients match the search queries.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAssignedClients.map((client) => (
                  <div
                    key={client.id}
                    onClick={() => handleSelectClient(client)}
                    className="glass-card glass-card-hover p-5 rounded-2xl border border-amber-500/15 cursor-pointer relative overflow-hidden flex flex-col justify-between h-[280px] text-left"
                  >
                    <div>
                      {/* Card Header Profile Row */}
                      <div className="flex items-start justify-between space-x-3 mb-4">
                        <img
                          src={client.avatar}
                          alt={client.name}
                          className="h-16 w-16 rounded-xl object-cover border border-amber-500/20 shadow shrink-0"
                        />
                        <span className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded border ${getStatusColor(client.profileStatus)}`}>
                          {client.profileStatus}
                        </span>
                      </div>

                      {/* Client Demographics */}
                      <div className="space-y-1">
                        <h4 className="text-base font-bold text-white tracking-tight">{client.name}</h4>
                        <p className="text-xs text-amber-400 font-medium truncate">{client.designation}</p>
                        <p className="text-[11px] text-rose-200/60 truncate">{client.currentCompany}</p>
                      </div>
                    </div>

                    {/* Bottom Metadata Details */}
                    <div className="mt-4 pt-3 border-t border-amber-500/10 flex items-center justify-between text-[11px] text-rose-200/40">
                      <div className="space-y-0.5">
                        <div><strong className="text-rose-200/60">Age:</strong> {client.age} • {client.gender[0]}</div>
                        <div><strong className="text-rose-200/60">City:</strong> {client.city}</div>
                      </div>
                      <div className="text-right space-y-0.5">
                        <div className="text-amber-400 font-bold">{client.income} LPA</div>
                        <div>{client.maritalStatus}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      ) : !selectedClient ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#0d080c] min-h-[400px]">
          <div className="bg-rose-950/20 border border-rose-500/25 p-4 rounded-2xl mb-4 animate-pulse">
            <User className="h-12 w-12 text-rose-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2 font-display">Client Profile Not Found</h3>
          <p className="text-xs text-rose-200/50 max-w-sm mb-6">
            The profile you are looking for is unavailable, or you haven't selected a client from the directory.
          </p>
          <button
            onClick={() => setActiveView('dashboard')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white text-xs font-semibold shadow-lg shadow-rose-900/40 transition duration-300 active:scale-95 cursor-pointer"
          >
            Return to Dashboard
          </button>
        </div>
      ) : (
        
        /* 2. CUSTOMER DETAILED WORKBENCH VIEW (activeView === 'customer') */
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Sub Header / Navigation Bar */}
          <div className="bg-slate-950/40 border-b border-amber-500/10 px-6 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveView('dashboard')}
                className="p-1.5 rounded-lg border border-amber-500/20 hover:border-amber-500 text-amber-300 hover:text-white flex items-center gap-1 text-xs font-semibold transition"
              >
                <ArrowLeft className="h-4 w-4" /> Back to My Directory
              </button>
              <div className="h-4 w-px bg-amber-500/20" />
              <div className="text-xs text-rose-200/60 flex items-center gap-1">
                Workspace for <strong className="text-white">{selectedClient.name}</strong>
              </div>
            </div>
            <div className="text-xs font-mono text-amber-400/50">
              ID: {selectedClient.id}
            </div>
          </div>
          
          {/* Two Section Side-by-Side Panel Split (Responsive stacks on Mobile/Tablet, locks on Desktop lg+) */}
          <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">
            
            {/* LEFT PANEL — Full Biodata Column */}
            <section className="w-full lg:w-[480px] xl:w-[520px] border-b lg:border-b-0 lg:border-r border-amber-500/10 bg-slate-950/20 lg:overflow-y-auto p-6 space-y-6 shrink-0">
              
              {/* Header profile row */}
              <div className="glass-card p-5 rounded-2xl border border-amber-500/20 relative overflow-hidden flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <img
                  src={selectedClient.avatar}
                  alt={selectedClient.name}
                  className="h-20 w-20 rounded-2xl object-cover border-2 border-amber-500/30 shadow-lg shrink-0"
                />
                
                <div className="flex-1 min-w-0 text-center sm:text-left space-y-2">
                  <div>
                    <h3 className="text-xl font-bold text-white font-display truncate">{selectedClient.name}</h3>
                    <p className="text-xs text-amber-400 font-semibold truncate">{selectedClient.designation}</p>
                  </div>

                  {/* Dynamic Profile Status Switcher dropdown */}
                  <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
                    <span className={`text-[10px] font-bold tracking-wider px-2.5 py-0.5 rounded border shrink-0 ${getStatusColor(selectedClient.profileStatus)}`}>
                      {selectedClient.profileStatus}
                    </span>
                    <select
                      value={selectedClient.profileStatus}
                      onChange={(e) => handleUpdateStatus(selectedClient.id, e.target.value)}
                      className="bg-slate-900 border border-amber-500/25 rounded-md px-2 py-0.5 text-[10px] text-amber-300 font-medium focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      <option value="Active">Toggle: Active</option>
                      <option value="On Hold">Toggle: On Hold</option>
                      <option value="Matched">Toggle: Matched</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* About Me Section */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Info className="h-3.5 w-3.5" /> About Client
                </h4>
                <div className="bg-slate-950/40 p-4 rounded-xl border border-amber-500/10 text-xs text-rose-100/80 leading-relaxed italic text-left">
                  "{selectedClient.aboutMe}"
                </div>
              </div>

              {/* Personal Info Grid */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" /> Personal Information
                </h4>
                <div className="grid grid-cols-2 gap-3 bg-slate-950/20 p-4 rounded-xl border border-amber-500/5 text-xs text-left">
                  <div><strong className="text-rose-200/50 block mb-0.5">Gender</strong> <span className="text-white">{selectedClient.gender}</span></div>
                  <div><strong className="text-rose-200/50 block mb-0.5">Date of Birth (Age)</strong> <span className="text-white">{selectedClient.dateOfBirth} ({selectedClient.age} yrs)</span></div>
                  <div><strong className="text-rose-200/50 block mb-0.5">Height</strong> <span className="text-white">{selectedClient.height} cm</span></div>
                  <div><strong className="text-rose-200/50 block mb-0.5">Location</strong> <span className="text-white">{selectedClient.city}, India</span></div>
                  <div><strong className="text-rose-200/50 block mb-0.5">Marital Status</strong> <span className="text-white">{selectedClient.maritalStatus}</span></div>
                  <div><strong className="text-rose-200/50 block mb-0.5">Religion</strong> <span className="text-white">{selectedClient.religion}</span></div>
                  <div><strong className="text-rose-200/50 block mb-0.5">Caste</strong> <span className="text-white">{selectedClient.caste}</span></div>
                  <div><strong className="text-rose-200/50 block mb-0.5">Manglik status</strong> <span className="text-white">{selectedClient.manglik === 'Yes' ? 'Manglik (Yes)' : selectedClient.manglik}</span></div>
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" /> Contact Details
                </h4>
                <div className="grid grid-cols-2 gap-3 bg-slate-950/20 p-4 rounded-xl border border-amber-500/5 text-xs text-left">
                  <div><strong className="text-rose-300/50 block mb-0.5">Email Address</strong> <span className="text-white truncate block">{selectedClient.email}</span></div>
                  <div><strong className="text-rose-300/50 block mb-0.5">Phone Number</strong> <span className="text-white">{selectedClient.phone}</span></div>
                </div>
              </div>

              {/* Education & Career Details */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <GraduationCap className="h-3.5 w-3.5" /> Education & Career
                </h4>
                <div className="grid grid-cols-2 gap-3 bg-slate-950/20 p-4 rounded-xl border border-amber-500/5 text-xs text-left">
                  <div className="col-span-2"><strong className="text-rose-200/50 block mb-0.5">Undergraduate College</strong> <span className="text-white">{selectedClient.undergraduateCollege}</span></div>
                  <div><strong className="text-rose-200/50 block mb-0.5">Degree</strong> <span className="text-white">{selectedClient.degree}</span></div>
                  <div><strong className="text-rose-200/50 block mb-0.5">Annual Income</strong> <span className="text-amber-400 font-bold">{selectedClient.income} LPA</span></div>
                  <div><strong className="text-rose-200/50 block mb-0.5">Current Company</strong> <span className="text-white">{selectedClient.currentCompany}</span></div>
                  <div><strong className="text-rose-200/50 block mb-0.5">Designation</strong> <span className="text-white">{selectedClient.designation}</span></div>
                </div>
              </div>

              {/* Lifestyle Habits */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Settings className="h-3.5 w-3.5" /> Lifestyle & Habits
                </h4>
                <div className="grid grid-cols-2 gap-3 bg-slate-950/20 p-4 rounded-xl border border-amber-500/5 text-xs text-left">
                  <div><strong className="text-rose-300/50 block mb-0.5">Diet Style</strong> <span className="text-white">{selectedClient.dietPreference}</span></div>
                  <div><strong className="text-rose-300/50 block mb-0.5">Family Structure</strong> <span className="text-white">{selectedClient.familyType} Family</span></div>
                  <div><strong className="text-rose-300/50 block mb-0.5">Smoking habits</strong> <span className="text-white">{selectedClient.smokingHabits}</span></div>
                  <div><strong className="text-rose-300/50 block mb-0.5">Drinking habits</strong> <span className="text-white">{selectedClient.drinkingHabits}</span></div>
                  <div><strong className="text-rose-300/50 block mb-0.5">Siblings count</strong> <span className="text-white">{selectedClient.siblings}</span></div>
                  <div><strong className="text-rose-300/50 block mb-0.5">Languages Known</strong> <span className="text-white">{selectedClient.languagesKnown.join(', ')}</span></div>
                  <div className="col-span-2"><strong className="text-rose-300/50 block mb-0.5">Hobbies & Interests</strong> <span className="text-white">{selectedClient.hobbies.join(', ')}</span></div>
                </div>
              </div>

              {/* Partner Preferences */}
              <div className="space-y-2 text-left">
                <h4 className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" /> Core Partner Preferences
                </h4>
                <div className="grid grid-cols-3 gap-3 bg-slate-950/20 p-4 rounded-xl border border-amber-500/5 text-xs text-center">
                  <div><strong className="text-rose-200/50 block mb-1">Want Kids?</strong> <span className="px-2 py-0.5 rounded bg-slate-900 border border-amber-500/10 text-white font-medium">{selectedClient.wantKids}</span></div>
                  <div><strong className="text-rose-200/50 block mb-1">Relocate?</strong> <span className="px-2 py-0.5 rounded bg-slate-900 border border-amber-500/10 text-white font-medium">{selectedClient.openToRelocate}</span></div>
                  <div><strong className="text-rose-200/50 block mb-1">Open to Pets?</strong> <span className="px-2 py-0.5 rounded bg-slate-900 border border-amber-500/10 text-white font-medium">{selectedClient.openToPets}</span></div>
                </div>
              </div>

              {/* MATCHMAKER INTERNAL NOTES SECTION */}
              <div className="space-y-3 border-t border-amber-500/10 pt-5 text-left">
                <div className="flex items-center justify-between">
                  <h4 className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <ClipboardList className="h-3.5 w-3.5 text-amber-400" />
                    Matchmaker call log notes
                  </h4>
                  {!isAddingNote && (
                    <button
                      onClick={() => setIsAddingNote(true)}
                      className="px-2.5 py-1 rounded bg-gradient-to-r from-rose-700 to-amber-700 hover:from-rose-600 hover:to-amber-600 text-white text-[10px] font-semibold flex items-center gap-1 shadow transition cursor-pointer"
                    >
                      <Plus className="h-3 w-3" /> Add Log Note
                    </button>
                  )}
                </div>

                {/* Add Note Form Area */}
                {isAddingNote && (
                  <form onSubmit={handleAddNote} className="space-y-3 bg-slate-950/40 p-3.5 rounded-xl border border-amber-500/10 animate-float text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-rose-300/40 uppercase tracking-wider">Drafting Call Log</span>
                      <button 
                        type="button" 
                        onClick={() => setIsAddingNote(false)}
                        className="text-rose-200/40 hover:text-white"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    
                    {/* Category Selection Dropdown */}
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold text-rose-200/60">Category:</span>
                      <select
                        value={newNoteCategory}
                        onChange={(e) => setNewNoteCategory(e.target.value)}
                        className="bg-slate-900 border border-amber-500/20 rounded px-2 py-1 text-[10px] text-amber-300 focus:outline-none focus:border-amber-500 cursor-pointer flex-1"
                      >
                        <option value="General">General Note</option>
                        <option value="Preference">Preference Update</option>
                        <option value="Feedback">Client Feedback</option>
                        <option value="Follow-up">Follow-up Needed</option>
                      </select>
                    </div>

                    <textarea
                      rows={3}
                      required
                      placeholder="Jot down notes from call (e.g. wants a partner who values traveling, very traditional upbringing...)"
                      value={newNoteText}
                      onChange={(e) => setNewNoteText(e.target.value.slice(0, 500))}
                      className="w-full bg-slate-900 border border-amber-500/20 rounded-lg p-2.5 text-xs text-white placeholder-rose-200/20 focus:outline-none focus:border-amber-500/60"
                    />

                    <div className="flex items-center justify-between text-[10px] text-rose-200/50 pt-1">
                      <span>{newNoteText.length} / 500 characters</span>
                      <button
                        type="submit"
                        disabled={!newNoteText.trim() || newNoteText.length > 500}
                        className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white font-semibold disabled:opacity-40 shadow transition cursor-pointer"
                      >
                        Save Note
                      </button>
                    </div>
                  </form>
                )}

                {/* Notes List display */}
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                  {notes.length === 0 ? (
                    <p className="text-[11px] text-rose-200/30 italic py-4 text-center border border-dashed border-amber-500/5 rounded-xl bg-slate-950/10">No call logs recorded for this client.</p>
                  ) : (
                    notes.map((note) => (
                      <div 
                        key={note.id}
                        className="p-3 rounded-lg bg-slate-900/60 border border-amber-500/5 hover:border-amber-500/10 flex items-start justify-between gap-3 group transition-all duration-300 animate-float"
                      >
                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border shrink-0 ${getCategoryStyles(note.category)}`}>
                              {note.category || 'General'}
                            </span>
                            <span className="text-[9px] font-mono text-rose-200/30">{note.timestamp}</span>
                          </div>
                          <p className="text-xs text-rose-100/90 leading-relaxed break-words whitespace-pre-wrap">{note.text}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="text-rose-300/30 hover:text-rose-500 p-0.5 rounded transition shrink-0 self-center md:opacity-0 md:group-hover:opacity-100 cursor-pointer"
                          title="Delete call note"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>

            {/* RIGHT PANEL — Suggested Matches Column */}
            <main id="right-panel" className="flex-1 lg:overflow-y-auto p-6 space-y-6">
              
              <div className="space-y-6">
                
                {/* Matchmaker AI Scoring and Intro generator Lab detail workbench panel */}
                {candidateClient && (
                  <div className="border-b border-amber-500/10 pb-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5 font-display text-left">
                        <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" />
                        Detailed AI Match Chemistry Scorer: {selectedClient.name} & {candidateClient.name}
                      </h4>
                      <button 
                        onClick={() => setCandidateClient(null)} 
                        className="px-2.5 py-1 rounded bg-slate-900 border border-rose-500/20 hover:border-rose-500 text-rose-300 hover:text-white text-[10px] font-semibold flex items-center gap-1 cursor-pointer transition"
                      >
                        <X className="h-3 w-3" /> Close Scorer
                      </button>
                    </div>
                    
                    <div className="glass-card p-5 rounded-2xl border border-amber-500/20 relative overflow-hidden bg-gradient-to-r from-rose-950/10 to-amber-950/10">
                      
                      {/* FEATURE 1: Claude AI 1-2 Sentence Match Explanation */}
                      <div className="mb-4 pb-4 border-b border-amber-500/10 text-left">
                        <h5 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                          <Sparkles className="h-3.5 w-3.5" /> AI Match Explanation (Priya's Assistant)
                        </h5>
                        
                        {isLoadingExplanation && (
                          <div className="flex items-center space-x-2 py-2 text-rose-200/50">
                            <Loader2 className="h-4 w-4 animate-spin text-amber-400" />
                            <span className="text-[11px]">Claude is analyzing compatibility points...</span>
                          </div>
                        )}
                        
                        {!isLoadingExplanation && aiExplanation && (
                          <p className="text-xs text-rose-100/90 leading-relaxed font-serif bg-slate-950/30 p-3 rounded-lg border border-slate-900/60 animate-float text-left">
                            {aiExplanation}
                          </p>
                        )}
                      </div>

                      {!compatibilityResult && !isLoadingScore ? (
                        <div className="py-4 flex flex-col items-center justify-center space-y-3 text-center">
                          <button
                            onClick={() => analyzeCompatibility(selectedClient.id, candidateClient.id)}
                            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white font-semibold text-sm shadow-lg shadow-rose-900/40 transition duration-300 flex items-center gap-2 scale-100 active:scale-95 cursor-pointer"
                          >
                            <Sparkles className="h-4 w-4" /> Run Deep Claude API Chemistry Check
                          </button>
                          <p className="text-[10px] text-rose-300/40">Calls Anthropic API to score Manglik matching, diets, income parity, and values.</p>
                        </div>
                      ) : null}

                      {isLoadingScore && (
                        <div className="py-8 flex flex-col items-center justify-center space-y-3 text-center">
                          <Loader2 className="h-10 w-10 text-amber-400 animate-spin" />
                          <div className="text-center">
                            <p className="text-sm font-semibold text-white">Claude is scoring matrimonial parameters...</p>
                            <p className="text-xs text-rose-200/50">Analyzing Kundali match indicators, diet preference, family structure, and relocate comfort</p>
                          </div>
                        </div>
                      )}

                      {compatibilityResult && (
                        <div className="space-y-4">
                          {/* Score and Overview */}
                          <div className="flex flex-col sm:flex-row items-center sm:space-x-5 py-2">
                            <div className={`h-24 w-24 shrink-0 rounded-2xl border flex flex-col items-center justify-center ${getScoreColor(compatibilityResult.score)} shadow-inner`}>
                              <span className="text-3xl font-extrabold tracking-tight">{compatibilityResult.score}%</span>
                              <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">Match Score</span>
                            </div>
                            
                            <div className="mt-3 sm:mt-0 text-center sm:text-left">
                              <h4 className="text-sm font-bold text-white flex items-center justify-center sm:justify-start gap-1">
                                Detailed AI Chemistry Report
                                {compatibilityResult.isFallback && (
                                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 text-rose-300 border border-rose-500/10 ml-2">Fallback Simulation</span>
                                )}
                              </h4>
                              <p className="text-xs text-rose-100/80 leading-relaxed mt-1 text-left">
                                {compatibilityResult.summary}
                              </p>
                            </div>
                          </div>

                          {/* Progress Axes */}
                          <div className="grid grid-cols-2 gap-4 bg-slate-950/20 p-4 rounded-xl border border-amber-500/5">
                            {Object.entries(compatibilityResult.axes).map(([key, axis]) => (
                              <div key={key} className="space-y-1 text-left">
                                <div className="flex justify-between text-xs font-semibold">
                                  <span className="capitalize text-rose-200/70">{key}</span>
                                  <span className="text-amber-400">{axis.score}%</span>
                                </div>
                                <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                                  <div 
                                    className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full" 
                                    style={{ width: `${axis.score}%` }} 
                                  />
                                </div>
                                <p className="text-[10px] text-rose-100/40 leading-normal line-clamp-2">{axis.details}</p>
                              </div>
                            ))}
                          </div>

                          {/* Strengths & Challenges */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-left">
                            <div className="space-y-1.5 p-3 rounded-lg bg-emerald-950/10 border border-emerald-500/10">
                              <h5 className="font-bold text-emerald-400 flex items-center gap-1 uppercase tracking-wider text-[10px]">
                                <ThumbsUp className="h-3.5 w-3.5" /> Strengths
                              </h5>
                              <ul className="space-y-1 text-rose-100/75 list-disc list-inside">
                                {compatibilityResult.strengths.map((s, idx) => (
                                  <li key={idx} className="leading-snug">{s}</li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="space-y-1.5 p-3 rounded-lg bg-rose-950/10 border border-rose-500/10">
                              <h5 className="font-bold text-rose-400 flex items-center gap-1 uppercase tracking-wider text-[10px]">
                                <AlertCircle className="h-3.5 w-3.5" /> Friction Points
                              </h5>
                              <ul className="space-y-1 text-rose-100/75 list-disc list-inside">
                                {compatibilityResult.challenges.map((c, idx) => (
                                  <li key={idx} className="leading-snug">{c}</li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Matchmaker Coaching Advice */}
                          <div className="p-3.5 rounded-lg border border-amber-500/20 bg-amber-500/5 text-xs text-left">
                            <h5 className="font-bold text-amber-400 uppercase tracking-wider text-[10px] mb-1 flex items-center gap-1">
                              <Coffee className="h-3.5 w-3.5" /> Matchmaker Coaching Tip
                            </h5>
                            <p className="text-rose-100/80 leading-relaxed italic">
                              "{compatibilityResult.matchmakerTip}"
                            </p>
                          </div>

                          {/* AI custom intro generator form */}
                          <div className="pt-4 border-t border-amber-500/10 space-y-3 text-left">
                            <h4 className="text-sm font-semibold text-white mb-1 flex items-center gap-1.5 font-display">
                              <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" />
                              Custom Matrimonial outreach Drafter
                            </h4>

                            <button
                              onClick={generateIntroduction}
                              disabled={isLoadingIntro}
                              className="w-full py-2.5 rounded-lg bg-slate-900 border border-amber-500/30 hover:border-amber-500 text-amber-300 font-semibold text-xs transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                            >
                              {isLoadingIntro ? (
                                <>
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Drafting letter...
                                </>
                              ) : (
                                <>
                                  Generate AI Intro Letter
                                </>
                              )}
                            </button>

                            {introResult && (
                              <div className="mt-3 relative glass-card p-4 rounded-xl border border-rose-500/20 bg-slate-950/40 text-left animate-float">
                                <div className="flex justify-between items-center mb-2 border-b border-rose-500/10 pb-1.5">
                                  <span className="text-[10px] font-bold uppercase text-rose-300 tracking-wider">Suggested Outreach Email</span>
                                  <button
                                    onClick={copyToClipboard}
                                    className="text-[10px] text-amber-300 flex items-center gap-1 hover:text-white transition cursor-pointer"
                                  >
                                    {copied ? (
                                      <>
                                        <Check className="h-3 w-3 text-emerald-400" /> Copied!
                                      </>
                                    ) : (
                                      <>
                                        <Copy className="h-3 w-3" /> Copy Text
                                      </>
                                    )}
                                  </button>
                                </div>
                                <p className="text-xs text-rose-100/90 whitespace-pre-line leading-relaxed font-mono bg-slate-950/30 p-2.5 rounded border border-slate-900 text-left">
                                  {introResult}
                                </p>
                              </div>
                            )}
                          </div>

                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Header label suggested list */}
                <div className="space-y-3 text-left">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2 font-display">
                    <Heart className="h-5 w-5 text-rose-500 fill-rose-500/20 animate-pulse" /> Suggested Matches for {selectedClient.name}
                  </h3>
                  <p className="text-xs text-rose-200/50 leading-relaxed">
                    The candidates below represent opposite gender profiles from our active client base, ranked by custom matrimonial compatibility heuristics.
                  </p>
                </div>

                {/* Matches cards lists */}
                {loadingMatches ? (
                  <MatchesSkeleton />
                ) : suggestedMatches.length === 0 ? (
                  <div className="text-center py-16 text-rose-200/40 text-xs border border-dashed border-amber-500/25 rounded-2xl">
                    No suggested matches found in database.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {suggestedMatches.map((matchItem) => {
                      const matchCandidate = matchItem.client;
                      const isSelectedCandidate = candidateClient?.id === matchCandidate.id;
                      
                      return (
                        <div
                          key={matchCandidate.id}
                          className={`glass-card p-5 rounded-2xl border transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left ${
                            isSelectedCandidate 
                              ? 'glass-card-selected ring-2 ring-amber-500/60' 
                              : 'border-amber-500/10 hover:border-amber-500/30'
                          }`}
                        >
                          {/* Profile Photo and demographics */}
                          <div className="flex items-center space-x-4 min-w-0">
                            <img
                              src={matchCandidate.avatar}
                              alt={matchCandidate.name}
                              className="h-14 w-14 rounded-xl object-cover border border-amber-500/20 shrink-0"
                            />
                            <div className="min-w-0 space-y-1">
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-bold text-white truncate">{matchCandidate.name}</h4>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 border border-amber-500/10 text-amber-300 font-semibold">{matchItem.scorePct}% Compatible</span>
                              </div>
                              
                              <p className="text-xs text-rose-200/60 truncate">
                                Age {matchCandidate.age} • {matchCandidate.city} • {matchCandidate.religion} ({matchCandidate.caste})
                              </p>
                              
                              <p className="text-xs text-amber-400/80 truncate flex items-center gap-1 font-medium">
                                <Briefcase className="h-3.5 w-3.5 shrink-0" /> {matchCandidate.designation} • {matchCandidate.income} LPA
                              </p>

                              {/* Quick Match Alignment Chips */}
                              <div className="flex flex-wrap gap-1.5 py-1">
                                {selectedClient.city === matchCandidate.city && (
                                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-sky-950/40 text-sky-300 border border-sky-500/15 font-semibold">
                                    📍 Local
                                  </span>
                                )}
                                {selectedClient.dietPreference === matchCandidate.dietPreference && (
                                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950/40 text-emerald-300 border border-emerald-500/15 font-semibold">
                                    🍽️ {selectedClient.dietPreference}
                                  </span>
                                )}
                                {selectedClient.religion === matchCandidate.religion && (
                                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-950/40 text-amber-300 border border-amber-500/15 font-semibold">
                                    🕉️ Aligned Religion
                                  </span>
                                )}
                                {selectedClient.familyType === matchCandidate.familyType && (
                                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-950/40 text-purple-300 border border-purple-500/15 font-semibold">
                                    🏠 Aligned Family
                                  </span>
                                )}
                              </div>

                              {/* AI Explanation 1-liner */}
                              <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 mt-1 bg-emerald-950/20 px-2 py-1 rounded border border-emerald-500/10 max-w-fit">
                                <Sparkles className="h-3 w-3 shrink-0" />
                                <span>{matchItem.aiExplanation}</span>
                              </div>
                            </div>
                          </div>

                          {/* Interactive Buttons block */}
                          <div className="flex items-center space-x-2.5 shrink-0 self-end md:self-center">
                            <button
                              onClick={() => {
                                setCandidateClient(matchCandidate);
                                setCompatibilityResult(null);
                                setIntroResult('');
                                setAiExplanation('');
                                fetchAIExplanation(selectedClient, matchCandidate, matchItem.scorePct, matchItem.reasons);
                                document.getElementById('right-panel')?.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className={`px-3 py-2 rounded-xl text-xs font-semibold transition border cursor-pointer ${
                                isSelectedCandidate 
                                  ? 'bg-slate-900 border-amber-500/40 text-amber-300' 
                                  : 'border-amber-500/25 text-rose-200 hover:border-amber-500 hover:text-white'
                              }`}
                            >
                              Analyze
                            </button>

                            <button
                              onClick={() => handleOpenSendMatchModal(matchCandidate)}
                              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-950 border border-rose-500/30 hover:border-rose-500 text-rose-300 hover:text-white text-xs font-semibold transition flex items-center gap-1 cursor-pointer"
                            >
                              <Send className="h-3 w-3" /> Send Match
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </main>

          </div>
        </div>
      )}
    </div>
  );
}
