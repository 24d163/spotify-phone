import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route, NavLink, useNavigate, useParams } from 'react-router-dom';
import { Home, Search, Library, Play, Heart, Bell, Clock, Settings, User, ChevronDown, SkipBack, SkipForward, Shuffle, Repeat, MoreVertical, Loader, AlertCircle, X, VolumeX, Volume1, Volume2, Share2, ListMusic, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import usePlayerStore from './store/usePlayerStore';

const masterLibrary = {
  all: [
    {
      id: 1,
      title: "Oru Pere Varalaaru",
      artist: "Anirudh Ravichander",
      image: "https://res.cloudinary.com/dyfejeqp1/image/upload/v1778604366/oru_pere_varalaaru_tgri8o.jpg",
      audioUrl: "https://res.cloudinary.com/dyfejeqp1/video/upload/v1778599791/Oru-Pere-Varalaaru-MassTamilan.dev_gtkwaq.mp3"
    },
    {
      id: 2,
      title: "Pavazha Malli",
      artist: "Unknown Artist",
      image: "https://res.cloudinary.com/dyfejeqp1/image/upload/v1778604366/pavazha_malli_kikgjn.jpg",
      audioUrl: "https://res.cloudinary.com/dyfejeqp1/video/upload/v1778599792/Pavazha_Malli_elfjp3.mp3"
    },
    {
      id: 3,
      title: "Kutti Story",
      artist: "Anirudh Ravichander",
      image: "https://res.cloudinary.com/dyfejeqp1/image/upload/v1778604366/kutti_story_jv4hke.jpg",
      audioUrl: "https://res.cloudinary.com/dyfejeqp1/video/upload/v1778599811/Kutti-Story-MassTamilan.io_w6ule5.mp3"
    }
  ]
};

const HomePage = () => {
  const navigate = useNavigate();
  const setQueue = usePlayerStore((state) => state.setQueue);
  const recentItems = [
    { id: 1, title: 'Liked Songs', image: '/album_cover_1.png' },
    { id: 2, title: 'Lofi Beats', image: '/album_cover_3.png' },
    { id: 3, title: 'Daily Mix 1', image: '/album_cover_1.png' },
    { id: 4, title: 'Discover Weekly', image: '/album_cover_3.png' },
    { id: 5, title: 'Chill Vibes', image: '/album_cover_1.png' },
    { id: 6, title: 'Release Radar', image: '/album_cover_3.png' },
  ];

  const madeForYou = [
    { id: 'mix-1', title: 'Daily Mix 2', artist: 'Pop & Electronic Essentials', image: '/album_cover_1.png' },
    { id: 'mix-2', title: 'Coding Mode', artist: 'Lo-fi & Deep Focus Beats', image: '/album_cover_3.png' },
    { id: 'mix-3', title: 'Deep Focus', artist: 'Cinematic Soundscapes', image: '/album_cover_1.png' },
    { id: 'mix-4', title: 'Late Night', artist: 'Relaxing Synth & Chill', image: '/album_cover_3.png' },
  ];

  const genres = [
    { id: 'pop', title: 'Pop', color: 'bg-[#8d67ab]' },
    { id: 'synthwave', title: 'Synthwave', color: 'bg-[#e91e63]' },
    { id: 'hip-hop', title: 'Hip Hop', color: 'bg-[#bc5922]' },
    { id: 'rock', title: 'Rock', color: 'bg-[#e81123]' },
    { id: 'lo-fi', title: 'Lo-fi', color: 'bg-[#503750]' },
  ];

  return (
    <>
      <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-spotify-green/40 to-black -z-10 opacity-60"></div>
      
      <header className="px-4 pt-12 pb-4 sticky top-0 z-10 bg-black/80 backdrop-blur-md">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img src="/profile_pic.png" alt="Profile" className="w-8 h-8 rounded-full border border-gray-700 shadow-lg object-cover" />
            <h1 className="text-xl font-bold tracking-tight">Good evening</h1>
          </div>
          <div className="flex items-center gap-4 text-white">
            <Bell size={24} className="hover:text-white transition-colors cursor-pointer stroke-[1.5]" />
            <Clock size={24} className="hover:text-white transition-colors cursor-pointer stroke-[1.5]" />
            <Settings size={24} className="hover:text-white transition-colors cursor-pointer stroke-[1.5]" />
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
          <button className="px-4 py-1.5 bg-spotify-green text-black rounded-full text-sm font-semibold whitespace-nowrap shadow-sm hover:scale-105 transition-transform">All</button>
          <button className="px-4 py-1.5 bg-[#2A2A2A] text-white rounded-full text-sm font-medium whitespace-nowrap hover:bg-[#333] transition-colors">Music</button>
          <button className="px-4 py-1.5 bg-[#2A2A2A] text-white rounded-full text-sm font-medium whitespace-nowrap hover:bg-[#333] transition-colors">Podcasts & Shows</button>
        </div>
      </header>

      <section className="px-4 mt-2 mb-8">
        <div className="grid grid-cols-2 gap-2">
          {recentItems.map((item) => (
            <div 
              key={item.id} 
              className="flex items-center bg-[#2A2A2A]/60 hover:bg-[#3A3A3A] transition-colors rounded overflow-hidden group cursor-pointer shadow-md shadow-black/20"
              onClick={() => navigate(`/playlist/${item.title.toLowerCase().replace(/ /g, '-')}`)}
            >
              <img src={item.image} alt={item.title} className="w-14 h-14 object-cover shadow-sm" />
              <div className="px-3 flex-1 font-semibold text-sm line-clamp-2">{item.title}</div>
              <div className="pr-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 bg-spotify-green rounded-full flex items-center justify-center text-black shadow-lg shadow-black/40">
                  <Play size={16} fill="currentColor" className="ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recently Played Section */}
      <RecentlyPlayedSection />

      <section className="px-4 mb-8">
        <h2 className="text-2xl font-bold mb-4 tracking-tight">Made For Yaswanth</h2>
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 snap-x">
          {madeForYou.map((item) => (
            <div 
              key={item.id} 
              className="min-w-[150px] p-3 bg-[#181818] hover:bg-[#282828] transition-colors rounded-lg group cursor-pointer snap-start"
              onClick={() => navigate(`/playlist/${item.title.toLowerCase().replace(/ /g, '-')}`)}
            >
              <div className="relative mb-3 shadow-lg shadow-black/40 rounded-md overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full aspect-square object-cover" />
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                  <div className="w-10 h-10 bg-spotify-green rounded-full flex items-center justify-center text-black shadow-xl">
                    <Play size={20} fill="currentColor" className="ml-1" />
                  </div>
                </div>
              </div>
              <h3 className="font-semibold text-[15px] truncate text-white mb-1">{item.title}</h3>
              <p className="text-[#a7a7a7] text-sm line-clamp-2 leading-snug">{item.artist}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 mb-8">
        <h2 className="text-2xl font-bold mb-4 tracking-tight">Browse Genres</h2>
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 snap-x">
          {genres.map((genre) => (
            <div 
              key={genre.id} 
              className={`min-w-[140px] h-[140px] p-4 ${genre.color} rounded-lg cursor-pointer snap-start shadow-lg relative overflow-hidden group hover:scale-105 transition-all duration-300`}
              onClick={() => navigate(`/playlist/${genre.id}`)}
            >
              <h3 className="font-bold text-xl leading-tight relative z-10">{genre.title}</h3>
              <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-white/20 rounded-lg rotate-[25deg] group-hover:rotate-[15deg] transition-transform duration-500 shadow-xl"></div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold tracking-tight">Your Top Songs</h2>
          <button className="text-sm font-bold text-[#b3b3b3] hover:text-white transition-colors">Show all</button>
        </div>
        <div className="flex flex-col gap-2">
          {masterLibrary.all.map((song, index, allSongs) => (
            <div 
              key={song.id} 
              className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-md transition-colors group cursor-pointer"
              onClick={() => setQueue(allSongs, index)}
            >
              <img src={song.image} alt={song.title} className="w-12 h-12 object-cover rounded shadow-md" />
              <div className="flex-1 overflow-hidden">
                <h4 className="font-semibold truncate text-[15px]">{song.title}</h4>
                <p className="text-xs text-[#b3b3b3] truncate">{song.artist}</p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity pr-2">
                <Play size={18} fill="currentColor" />
              </div>
              <MoreVertical size={20} className="text-[#b3b3b3]" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

const RecentlyPlayedSection = () => {
  const { recentlyPlayed, setQueue } = usePlayerStore();

  if (!recentlyPlayed || recentlyPlayed.length === 0) return null;

  return (
    <section className="px-4 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold tracking-tight">Recently Played</h2>
        <button className="text-sm font-bold text-[#b3b3b3] hover:text-white transition-colors">Show all</button>
      </div>
      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 snap-x">
        {recentlyPlayed.map((song, index) => (
          <div 
            key={`${song.id}-${index}`} 
            className="min-w-[160px] p-4 bg-[#181818] hover:bg-[#282828] transition-all duration-300 rounded-lg group cursor-pointer snap-start shadow-xl shadow-black/20"
            onClick={() => setQueue(recentlyPlayed, index)}
          >
            <div className="relative mb-4 shadow-2xl shadow-black/60 rounded-md overflow-hidden">
              <img src={song.image} alt={song.title} className="w-full aspect-square object-cover transform group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 duration-300">
                <div className="w-12 h-12 bg-spotify-green rounded-full flex items-center justify-center text-black shadow-xl hover:scale-110 active:scale-95 transition-all">
                  <Play size={24} fill="currentColor" className="ml-1" />
                </div>
              </div>
            </div>
            <h3 className="font-bold text-[15px] truncate text-white mb-1 tracking-tight">{song.title}</h3>
            <p className="text-[#a7a7a7] text-sm line-clamp-1 font-medium">{song.artist}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { queue, setQueue, likedSongs, toggleLike } = usePlayerStore();

  const allSongs = [
    {
      id: 1,
      title: "Oru Pere Varalaaru",
      artist: "Anirudh Ravichander",
      image: "https://res.cloudinary.com/dyfejeqp1/image/upload/v1778604366/oru_pere_varalaaru_tgri8o.jpg",
      audioUrl: "https://res.cloudinary.com/dyfejeqp1/video/upload/v1778599791/Oru-Pere-Varalaaru-MassTamilan.dev_gtkwaq.mp3"
    },
    {
      id: 2,
      title: "Pavazha Malli",
      artist: "Unknown Artist",
      image: "https://res.cloudinary.com/dyfejeqp1/image/upload/v1778604366/pavazha_malli_kikgjn.jpg",
      audioUrl: "https://res.cloudinary.com/dyfejeqp1/video/upload/v1778599792/Pavazha_Malli_elfjp3.mp3"
    },
    {
      id: 3,
      title: "Kutti Story",
      artist: "Anirudh Ravichander",
      image: "https://res.cloudinary.com/dyfejeqp1/image/upload/v1778604366/kutti_story_jv4hke.jpg",
      audioUrl: "https://res.cloudinary.com/dyfejeqp1/video/upload/v1778599811/Kutti-Story-MassTamilan.io_w6ule5.mp3"
    }
  ];

  const filteredSongs = allSongs.filter(song => 
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-4 pt-12 pb-8 h-full flex flex-col relative z-0">
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-gray-800 to-black -z-10 opacity-60"></div>
      <h1 className="text-3xl font-bold mb-6 tracking-tight">Search</h1>
      <div className="bg-white text-black flex items-center px-4 py-3.5 rounded-md mb-6 shadow-lg shadow-black/40 focus-within:ring-2 focus-within:ring-spotify-green transition-all">
        <Search size={24} className="mr-3 text-gray-700" />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="What do you want to listen to?" 
          className="bg-transparent outline-none font-semibold w-full placeholder-gray-600 text-base" 
        />
      </div>

      <AnimatePresence mode="wait">
        {searchQuery ? (
          <motion.div 
            key="results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex-1 overflow-y-auto hide-scrollbar pb-10"
          >
            <h2 className="text-xl font-bold mb-4 tracking-tight">Songs</h2>
            <div className="flex flex-col gap-1">
              {filteredSongs.length > 0 ? (
                filteredSongs.map((song, index) => (
                  <motion.div 
                    key={`${song.id}-${index}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-md transition-colors cursor-pointer group"
                    onClick={() => setQueue(filteredSongs, index)}
                  >
                    <div className="relative shrink-0">
                      <img src={song.image} alt={song.title} className="w-12 h-12 rounded object-cover shadow-md" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded transition-opacity">
                        <Play size={16} fill="white" className="text-white" />
                      </div>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="font-semibold text-white truncate text-[15px]">{song.title}</div>
                      <div className="text-sm text-[#b3b3b3] truncate font-medium group-hover:text-white transition-colors">{song.artist}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleLike(song); }}
                        className={`p-2 transition-all active:scale-125 ${likedSongs.some(s => s.id === song.id) ? 'text-spotify-green' : 'text-[#b3b3b3] opacity-0 group-hover:opacity-100'}`}
                      >
                        <Heart size={20} fill={likedSongs.some(s => s.id === song.id) ? 'currentColor' : 'none'} />
                      </button>
                      <button className="text-[#b3b3b3] opacity-0 group-hover:opacity-100 hover:text-white transition-all">
                        <MoreVertical size={20} />
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-[#282828] rounded-full flex items-center justify-center mb-4 shadow-xl">
                    <Search size={40} className="text-[#b3b3b3]" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">No results found for "{searchQuery}"</h3>
                  <p className="text-[#b3b3b3] max-w-xs mx-auto font-medium">Please check your spelling or try searching for something else.</p>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="browse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col"
          >
            <h2 className="text-xl font-bold mb-4 tracking-tight">Browse all</h2>
            <div className="grid grid-cols-2 gap-3 md:gap-4 overflow-y-auto hide-scrollbar pb-10">
              {[
                { title: 'Podcasts', color: 'bg-[#E13300]', img: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=200&h=200&fit=crop' },
                { title: 'Made For You', color: 'bg-[#1E3264]', img: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=200&h=200&fit=crop' },
                { title: 'Charts', color: 'bg-[#8D67AB]', img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop' },
                { title: 'New Releases', color: 'bg-[#E8115B]', img: 'https://images.unsplash.com/photo-1514525253361-bee8a48790c3?w=200&h=200&fit=crop' },
                { title: 'Discover', color: 'bg-[#8D67AB]', img: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=200&h=200&fit=crop' },
                { title: 'Live Events', color: 'bg-[#7358FF]', img: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=200&h=200&fit=crop' },
                { title: 'Pop', color: 'bg-[#148A08]', img: 'https://images.unsplash.com/photo-1520127875765-a66ba1e26070?w=200&h=200&fit=crop' },
                { title: 'Hip-Hop', color: 'bg-[#D84000]', img: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=200&h=200&fit=crop' }
              ].map((cat, i) => (
                <motion.div 
                  key={cat.title}
                  whileHover={{ scale: 0.98, brightness: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className={`${cat.color} rounded-lg p-4 font-bold overflow-hidden relative h-28 shadow-lg shadow-black/20 cursor-pointer group`}
                >
                  <span className="text-xl tracking-tight leading-tight">{cat.title}</span>
                  <img 
                    src={cat.img} 
                    alt={cat.title} 
                    className="w-16 h-16 absolute -bottom-1 -right-2 rotate-[25deg] shadow-2xl rounded group-hover:scale-110 transition-transform duration-500" 
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LibraryPage = () => {
  const navigate = useNavigate();
  const setQueue = usePlayerStore((state) => state.setQueue);
  const likedSongsCount = usePlayerStore((state) => state.likedSongs.length);

  return (
    <div className="px-4 pt-12 pb-8 h-full relative z-0">
    <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-indigo-900/40 to-black -z-10 opacity-60"></div>
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop" alt="Profile" className="w-9 h-9 rounded-full border border-gray-700 object-cover shadow-md" />
        <h1 className="text-2xl font-bold tracking-tight">Your Library</h1>
      </div>
      <div className="flex items-center gap-5">
        <Search size={24} className="hover:text-white text-[#b3b3b3] cursor-pointer" />
        <div className="w-6 h-6 flex items-center justify-center font-normal text-2xl mb-1 text-[#b3b3b3] hover:text-white cursor-pointer">+</div>
      </div>
    </div>
    <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar mb-6">
      <button className="px-4 py-1.5 border border-[#727272] text-white rounded-full text-sm font-medium whitespace-nowrap hover:border-white transition-colors">Playlists</button>
      <button className="px-4 py-1.5 border border-[#727272] text-white rounded-full text-sm font-medium whitespace-nowrap hover:border-white transition-colors">Podcasts</button>
      <button className="px-4 py-1.5 border border-[#727272] text-white rounded-full text-sm font-medium whitespace-nowrap hover:border-white transition-colors">Albums</button>
      <button className="px-4 py-1.5 border border-[#727272] text-white rounded-full text-sm font-medium whitespace-nowrap hover:border-white transition-colors">Artists</button>
    </div>
    <div className="flex flex-col gap-4">
      <div 
        className="flex items-center gap-4 hover:bg-[#2A2A2A]/50 p-2 -mx-2 rounded-md transition-colors cursor-pointer group"
        onClick={() => navigate('/playlist/liked')}
      >
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-400 flex items-center justify-center rounded-md shadow-md">
          <Heart fill="white" size={24} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg">Liked Songs</h3>
          <p className="text-[#a7a7a7] text-sm">Playlist • {likedSongsCount} songs</p>
        </div>
      </div>
      <div 
        className="flex items-center gap-4 hover:bg-[#2A2A2A]/50 p-2 -mx-2 rounded-md transition-colors cursor-pointer group"
        onClick={() => navigate('/playlist/lofi-beats')}
      >
        <img src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=200&h=200&fit=crop" alt="Lofi" className="w-16 h-16 object-cover rounded-md shadow-md" />
        <div className="flex-1">
          <h3 className="font-semibold text-lg">Lofi Beats</h3>
          <p className="text-[#a7a7a7] text-sm">Playlist • Yaswanth</p>
        </div>
      </div>
      <div 
        className="flex items-center gap-4 hover:bg-[#2A2A2A]/50 p-2 -mx-2 rounded-md transition-colors cursor-pointer group"
        onClick={() => navigate('/playlist/top-songs')}
      >
        <img src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=200&h=200&fit=crop" alt="Chill" className="w-16 h-16 object-cover rounded-md shadow-md" />
        <div className="flex-1">
          <h3 className="font-semibold text-lg">Your Top Songs</h3>
          <p className="text-[#a7a7a7] text-sm">Playlist • Spotify</p>
        </div>
      </div>
    </div>
  </div>
  );
};

const PlaylistPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { likedSongs, setQueue, currentTrack, isPlaying } = usePlayerStore();
  
  let playlist = {
    title: 'Playlist',
    artist: 'Spotify',
    image: '/album_cover_1.png',
    songs: [],
    description: 'Enjoy your favorite music in this curated collection.',
    gradient: 'from-blue-900 to-black'
  };

  const formattedId = id.replace(/-/g, ' ');
  const capitalizedTitle = formattedId.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  if (id === 'liked-songs' || id === 'liked') {
    playlist = {
      title: 'Liked Songs',
      artist: 'Yaswanth',
      image: 'https://res.cloudinary.com/dyfejeqp1/image/upload/v1778604366/oru_pere_varalaaru_tgri8o.jpg',
      songs: likedSongs,
      description: 'All the songs you have liked, kept in one place.',
      gradient: 'from-indigo-900 to-black'
    };
  } else {
    // Determine gradient based on ID or use a default
    const gradients = {
      'pop': 'from-purple-900 to-black',
      'synthwave': 'from-pink-900 to-black',
      'hip-hop': 'from-orange-900 to-black',
      'rock': 'from-red-900 to-black',
      'lo-fi': 'from-stone-800 to-black',
    };

    playlist = {
      title: capitalizedTitle,
      artist: 'Curated by Spotify',
      image: masterLibrary.all[0].image,
      songs: masterLibrary.all,
      description: `A handpicked selection of the best ${capitalizedTitle} tracks just for you.`,
      gradient: gradients[id] || 'from-blue-900 to-black'
    };
  }

  return (
    <div className="flex flex-col h-full relative min-h-screen pb-32">
      {/* Dynamic Background */}
      <div className={`absolute top-0 left-0 right-0 h-[450px] bg-gradient-to-b ${playlist.gradient} -z-10 opacity-90`}></div>
      <div className="absolute top-0 left-0 right-0 h-full bg-black -z-20"></div>
      
      {/* Header with Navigation */}
      <div className="sticky top-0 z-50 px-4 py-4 flex items-center bg-transparent backdrop-blur-md transition-all duration-300">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 bg-black/40 rounded-full hover:bg-black/60 transition-colors"
        >
          <ChevronDown className="rotate-90" size={24} />
        </button>
      </div>

      {/* Playlist Hero Section */}
      <div className="px-6 pt-2 pb-8 flex flex-col md:flex-row items-center md:items-end gap-6">
        <div className="w-52 h-52 md:w-64 md:h-64 shrink-0 shadow-2xl shadow-black/60 rounded-md overflow-hidden">
          <img src={playlist.image} alt={playlist.title} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
          <span className="hidden md:block text-xs uppercase font-bold tracking-widest mb-2">Playlist</span>
          <h1 className="text-4xl md:text-7xl font-black mb-4 tracking-tight leading-tight w-full truncate">{playlist.title}</h1>
          <p className="text-[#b3b3b3] text-sm md:text-base font-medium mb-2 max-w-[500px] line-clamp-2">{playlist.description}</p>
          <div className="flex items-center gap-2 text-sm font-bold">
            <span className="text-white">Yaswanth</span>
            <span className="text-[#b3b3b3] font-normal">• {playlist.songs.length} songs</span>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="px-6 py-6 flex items-center gap-8 bg-black/20 backdrop-blur-sm">
        <button 
          className="w-14 h-14 bg-spotify-green rounded-full flex items-center justify-center text-black shadow-xl hover:scale-105 active:scale-95 transition-all"
          onClick={() => playlist.songs.length > 0 && setQueue(playlist.songs, 0)}
        >
          <Play size={28} fill="currentColor" className="ml-1" />
        </button>
        <button className="text-[#b3b3b3] hover:text-white transition-colors active:scale-125"><Heart size={32} /></button>
        <button className="text-[#b3b3b3] hover:text-white transition-colors"><MoreVertical size={28} /></button>
      </div>

      {/* Song List */}
      <div className="px-2 md:px-6">
        <div className="hidden md:grid grid-cols-[16px_1fr_1fr_40px] gap-4 px-4 py-2 border-b border-white/10 mb-4 text-[#b3b3b3] text-sm uppercase tracking-wider font-semibold">
          <span>#</span>
          <span>Title</span>
          <span>Album</span>
          <Clock size={16} />
        </div>

        {playlist.songs.map((song, index) => (
          <div 
            key={`${song.id}-${index}`} 
            className="group flex items-center gap-4 p-3 hover:bg-white/10 rounded-md transition-all cursor-pointer"
            onClick={() => setQueue(playlist.songs, index)}
          >
            <div className="w-4 text-center text-[#b3b3b3] font-medium group-hover:hidden">
              {index + 1}
            </div>
            <div className="hidden group-hover:block w-4 text-spotify-green">
              <Play size={14} fill="currentColor" />
            </div>
            
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 relative shrink-0">
                <img src={song.image} alt={song.title} className="w-full h-full object-cover rounded shadow-md" />
                {currentTrack.id === song.id && isPlaying && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded">
                    <div className="flex gap-0.5 items-end h-3">
                      <div className="w-0.5 bg-spotify-green animate-bounce-slow h-full"></div>
                      <div className="w-0.5 bg-spotify-green animate-bounce-slow h-2 [animation-delay:0.2s]"></div>
                      <div className="w-0.5 bg-spotify-green animate-bounce-slow h-full [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <h4 className={`font-semibold truncate text-[15px] ${currentTrack.id === song.id ? 'text-spotify-green' : 'text-white'}`}>{song.title}</h4>
                <p className="text-xs text-[#b3b3b3] truncate group-hover:text-white transition-colors">{song.artist}</p>
              </div>
            </div>

            <div className="hidden md:block flex-1 text-sm text-[#b3b3b3] truncate">
              {song.title} Single
            </div>

            <div className="flex items-center gap-4">
              <button 
                className={`transition-all ${likedSongs.some(s => s.id === song.id) ? 'text-spotify-green opacity-100' : 'opacity-0 group-hover:opacity-100 text-[#b3b3b3] hover:text-white'}`}
                onClick={(e) => { e.stopPropagation(); toggleLike(song); }}
              >
                <Heart size={18} fill={likedSongs.some(s => s.id === song.id) ? 'currentColor' : 'none'} />
              </button>
              <span className="text-xs text-[#b3b3b3] font-medium tabular-nums">3:45</span>
              <button className="opacity-0 group-hover:opacity-100 text-[#b3b3b3] hover:text-white transition-all">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>
        ))}

        {playlist.songs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-[#b3b3b3] gap-4">
            <div className="p-6 bg-white/5 rounded-full">
              <Clock size={48} className="opacity-20" />
            </div>
            <p className="text-lg font-bold text-white">Your playlist is empty.</p>
            <p className="text-sm">Add some songs to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ProfilePage = () => (
  <div className="px-4 pt-16 pb-8 h-full flex flex-col items-center text-center relative z-0">
    <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#2A2A2A] to-black -z-10 opacity-80"></div>
    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop" alt="Profile" className="w-36 h-36 rounded-full border-[6px] border-black object-cover mb-4 shadow-2xl" />
    <h1 className="text-3xl font-bold mb-1 tracking-tight">Yaswanth</h1>
    <p className="text-[#b3b3b3] mb-8 font-medium">Premium Individual</p>
    
    <div className="flex gap-10 mb-10 border-y border-white/10 py-6 w-full justify-center">
      <div className="flex flex-col items-center">
        <span className="font-bold text-xl">42</span>
        <span className="text-xs text-[#b3b3b3] uppercase tracking-wider mt-1">Playlists</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="font-bold text-xl">128</span>
        <span className="text-xs text-[#b3b3b3] uppercase tracking-wider mt-1">Followers</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="font-bold text-xl">56</span>
        <span className="text-xs text-[#b3b3b3] uppercase tracking-wider mt-1">Following</span>
      </div>
    </div>
    
    <button className="px-8 py-2.5 rounded-full border border-gray-500 font-bold hover:border-white hover:scale-105 transition-all mb-4 text-sm tracking-wide">Edit Profile</button>
  </div>
);

const formatTime = (seconds) => {
  if (isNaN(seconds) || seconds === Infinity || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const ProgressBar = ({ isMini = false }) => {
  const { currentTime, duration, seek, setSeeking, setCurrentTime, isSeeking } = usePlayerStore();
  const [localProgress, setLocalProgress] = useState(0);
  const progressRef = useRef(null);

  const calculateProgress = (clientX) => {
    if (!progressRef.current) return 0;
    const rect = progressRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    return x / rect.width;
  };

  const handlePointerDown = (e) => {
    e.stopPropagation();
    setSeeking(true);
    const progress = calculateProgress(e.clientX);
    setLocalProgress(progress);
    setCurrentTime(progress * duration);
    
    // Use pointer capture to keep tracking even if the pointer leaves the element
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isSeeking) return;
    const progress = calculateProgress(e.clientX);
    setLocalProgress(progress);
    setCurrentTime(progress * duration);
  };

  const handlePointerUp = (e) => {
    if (!isSeeking) return;
    const progress = calculateProgress(e.clientX);
    seek(progress * duration);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const displayProgress = isSeeking ? localProgress * 100 : (duration > 0 ? (currentTime / duration) * 100 : 0);

  if (isMini) {
    return (
      <div 
        className="absolute bottom-0 left-2 right-2 h-[12px] -mb-[6px] flex items-center cursor-pointer z-30 group"
        ref={progressRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full h-[3px] bg-white/10 rounded-full relative overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all duration-100 ease-linear"
            style={{ width: `${displayProgress}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mb-6 shrink-0 group">
      <div 
        className="h-1 bg-white/20 rounded-full w-full mb-3 cursor-pointer relative flex items-center h-[16px] -mt-[6px]"
        ref={progressRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div className="w-full h-1 bg-white/20 rounded-full absolute pointer-events-none"></div>
        <div 
          className={`h-1 rounded-full relative pointer-events-none ${isSeeking ? 'bg-spotify-green' : 'bg-white group-hover:bg-spotify-green'}`}
          style={{ width: `${displayProgress}%` }}
        >
          <div className={`w-3.5 h-3.5 bg-white rounded-full absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 transition-opacity shadow-lg ${isSeeking ? 'opacity-100 scale-110' : 'opacity-0 group-hover:opacity-100'}`}></div>
        </div>
      </div>
      <div className="flex justify-between text-[11px] text-[#b3b3b3] font-bold tracking-tight">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

const VolumeControl = () => {
  const { volume, setVolume } = usePlayerStore();
  const [isHovered, setIsHovered] = useState(false);
  const volumeRef = useRef(null);

  const calculateVolume = (clientX) => {
    if (!volumeRef.current) return 0;
    const rect = volumeRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    return x / rect.width;
  };

  const handlePointerDown = (e) => {
    e.stopPropagation();
    const v = calculateVolume(e.clientX);
    setVolume(v);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (e.buttons !== 1) return;
    const v = calculateVolume(e.clientX);
    setVolume(v);
  };

  const VolumeIcon = () => {
    if (volume === 0) return <VolumeX size={20} className="text-[#b3b3b3]" />;
    if (volume < 0.5) return <Volume1 size={20} className="text-[#b3b3b3]" />;
    return <Volume2 size={20} className="text-[#b3b3b3]" />;
  };

  return (
    <div 
      className="flex items-center gap-3 w-full max-w-[300px] mt-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button onClick={() => setVolume(volume === 0 ? 0.8 : 0)}>
        <VolumeIcon />
      </button>
      <div 
        className="flex-1 h-1 bg-white/20 rounded-full relative cursor-pointer flex items-center h-[20px]"
        ref={volumeRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
      >
        <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
          <div 
            className={`h-full ${isHovered ? 'bg-spotify-green' : 'bg-white'} rounded-full transition-colors`}
            style={{ width: `${volume * 100}%` }}
          />
        </div>
        <div 
          className={`absolute w-3 h-3 bg-white rounded-full shadow-lg transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          style={{ left: `calc(${volume * 100}% - 6px)` }}
        />
      </div>
    </div>
  );
};

const FullScreenPlayer = () => {
  const { 
    currentTrack, 
    isPlaying, 
    togglePlay, 
    toggleFullScreen,
    nextTrack,
    prevTrack,
    isShuffle,
    toggleShuffle,
    repeatMode,
    toggleRepeat,
    likedSongs,
    toggleLike,
    isLoading,
    isFullScreen
  } = usePlayerStore();

  if (!currentTrack) return null;
  const isLiked = likedSongs.some(s => s.id === currentTrack.id);

  return (
    <AnimatePresence>
      {isFullScreen && (
        <motion.div 
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed top-0 left-0 right-0 h-[100dvh] bg-gradient-to-b from-[#422123] to-black z-[100] flex flex-col px-6 overflow-hidden"
          style={{ paddingTop: 'max(2rem, env(safe-area-inset-top))', paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}
        >
      <div className="flex items-center justify-between mb-6 shrink-0">
        <button onClick={(e) => { e.stopPropagation(); toggleFullScreen(); }} className="text-white p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
          <ChevronDown size={28} />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-xs uppercase tracking-widest text-[#b3b3b3] font-medium">Playing from playlist</span>
          <span className="text-sm font-bold text-white truncate max-w-[200px]">{currentTrack.title}</span>
        </div>
        <button className="text-white p-2 -mr-2 hover:bg-white/10 rounded-full transition-colors">
          <MoreVertical size={28} />
        </button>
      </div>

      <div className="flex-1 min-h-0 flex items-center justify-center mb-6">
        <motion.img 
          key={currentTrack.id}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          src={currentTrack.image} 
          alt={currentTrack.title} 
          className="w-full max-h-full aspect-square object-cover rounded-md shadow-2xl shadow-black/60 object-center" 
        />
      </div>

      <div className="flex items-center justify-between mb-4 shrink-0">
        <div className="flex flex-col overflow-hidden pr-4">
          <motion.h2 
            key={currentTrack.title}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-2xl font-bold text-white mb-1 truncate"
          >
            {currentTrack.title}
          </motion.h2>
          <motion.p 
            key={currentTrack.artist}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-base text-[#b3b3b3] truncate"
          >
            {currentTrack.artist}
          </motion.p>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); toggleLike(currentTrack); }}
          className={`${isLiked ? 'text-spotify-green' : 'text-white'} p-2 shrink-0 transition-all active:scale-125`}
        >
          <Heart size={28} fill={isLiked ? "currentColor" : "none"} />
        </button>
      </div>

      <ProgressBar />

      <div className="flex items-center justify-between mb-2 shrink-0">
        <button 
          onClick={toggleShuffle}
          className={`transition-colors p-2 -ml-2 ${isShuffle ? 'text-spotify-green' : 'text-[#b3b3b3] hover:text-white'}`}
        >
          <Shuffle size={24} />
        </button>
        <button 
          onClick={prevTrack}
          className="text-white hover:text-[#b3b3b3] transition-colors p-2"
        >
          <SkipBack size={32} fill="currentColor" />
        </button>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-16 h-16 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform shadow-xl shrink-0 ${isLoading ? 'opacity-80' : ''}`}
          onClick={(e) => { e.stopPropagation(); !isLoading && togglePlay(); }}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader size={28} className="animate-spin text-black" />
          ) : isPlaying ? (
            <div className="flex gap-1"><div className="w-1.5 h-5 bg-black rounded-sm"></div><div className="w-1.5 h-5 bg-black rounded-sm"></div></div>
          ) : (
            <Play size={24} fill="currentColor" className="ml-1" />
          )}
        </motion.button>
        <button 
          onClick={nextTrack}
          className="text-white hover:text-[#b3b3b3] transition-colors p-2"
        >
          <SkipForward size={32} fill="currentColor" />
        </button>
        <button 
          onClick={toggleRepeat}
          className={`transition-colors p-2 -mr-2 relative ${repeatMode !== 'off' ? 'text-spotify-green' : 'text-[#b3b3b3] hover:text-white'}`}
        >
          <Repeat size={24} />
          {repeatMode === 'track' && <span className="absolute top-1 right-1 bg-spotify-green text-black text-[8px] font-bold w-3 h-3 rounded-full flex items-center justify-center">1</span>}
        </button>
      </div>

      <div className="flex justify-center mt-4 mb-2 shrink-0">
        <VolumeControl />
      </div>
    </motion.div>
    )}
    </AnimatePresence>
  );
};

const App = () => {
  const { 
    currentTrack, 
    isPlaying, 
    togglePlay, 
    isFullScreen, 
    toggleFullScreen, 
    currentTime, 
    duration, 
    likedSongs, 
    toggleLike, 
    isLoading, 
    error, 
    clearError,
    nextTrack,
    prevTrack
  } = usePlayerStore();

  const isLiked = currentTrack ? likedSongs.some(s => s.id === currentTrack.id) : false;

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent shortcuts if typing in search or other inputs
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.code) {
        case 'Space':
          e.preventDefault(); // Prevent page scrolling
          togglePlay();
          break;
        case 'ArrowRight':
          nextTrack();
          break;
        case 'ArrowLeft':
          prevTrack();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, nextTrack, prevTrack]);

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans overflow-hidden">
      {/* Error Toast */}
      {error && (
        <div className="fixed top-4 left-4 right-4 z-[200] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-red-600 text-white px-4 py-3 rounded-md shadow-2xl flex items-center justify-between border border-red-500/50 backdrop-blur-md bg-opacity-90">
            <div className="flex items-center gap-3">
              <AlertCircle size={20} />
              <p className="text-sm font-semibold">{error}</p>
            </div>
            <button onClick={clearError} className="p-1 hover:bg-white/20 rounded-full transition-colors">
              <X size={18} />
            </button>
          </div>
        </div>
      )}
      
      {/* Scrollable Main Content */}
      <main className="flex-1 overflow-y-auto pb-[140px] hide-scrollbar relative">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/playlist/:id" element={<PlaylistPage />} />
        </Routes>
      </main>

      {/* Sticky Now Playing Bar */}
      {currentTrack && (
        <div 
          className="absolute bottom-[65px] left-2 right-2 bg-[#422123] rounded-lg p-2 flex items-center shadow-2xl z-20 mx-2 hover:bg-[#4d2729] transition-colors cursor-pointer border border-white/5 backdrop-blur-lg"
          onClick={toggleFullScreen}
        >
          <img src={currentTrack.image} alt="Now Playing" className="w-10 h-10 rounded shadow-md object-cover" />
          <div className="flex-1 ml-3 overflow-hidden flex flex-col justify-center">
            <div className="flex items-center text-sm font-semibold truncate text-white">
              <span className="truncate">{currentTrack.title}</span>
            </div>
            <div className="text-xs text-[#b3b3b3] truncate flex items-center gap-2">
              <span>{currentTrack.artist}</span>
              <span className="w-1 h-1 bg-[#b3b3b3] rounded-full opacity-50"></span>
              <span className="font-medium tabular-nums">{formatTime(currentTime)} / {formatTime(duration)}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 px-2">
            <button 
              onClick={(e) => { e.stopPropagation(); toggleLike(currentTrack); }}
              className={`${isLiked ? 'text-spotify-green' : 'text-white/70'} hover:scale-110 transition-transform active:scale-125`}
            >
              <Heart size={22} fill={isLiked ? "currentColor" : "none"} />
            </button>
            <button 
              className={`text-white hover:scale-110 transition-transform p-1 ${isLoading ? 'opacity-70 cursor-wait' : ''}`}
              onClick={(e) => { e.stopPropagation(); !isLoading && togglePlay(); }}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader size={26} className="animate-spin text-spotify-green" />
              ) : isPlaying ? (
                <Pause size={28} fill="currentColor" />
              ) : (
                <Play size={28} fill="currentColor" />
              )}
            </button>
          </div>
          {/* Interactive Mini Progress Bar */}
          <ProgressBar isMini={true} />
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="h-[65px] bg-gradient-to-t from-black via-black/95 to-black/90 flex justify-around items-center px-2 pb-safe absolute bottom-0 w-full z-30 border-t border-white/5 backdrop-blur-xl">
        <NavLink to="/" className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors group ${isActive ? 'text-white' : 'text-[#b3b3b3] hover:text-white'}`}>
          <Home size={24} className="group-hover:scale-105 transition-transform" />
          <span className="text-[10px] font-medium tracking-wide">Home</span>
        </NavLink>
        <NavLink to="/search" className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors group ${isActive ? 'text-white' : 'text-[#b3b3b3] hover:text-white'}`}>
          <Search size={24} className="group-hover:scale-105 transition-transform" />
          <span className="text-[10px] font-medium tracking-wide">Search</span>
        </NavLink>
        <NavLink to="/library" className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors group ${isActive ? 'text-white' : 'text-[#b3b3b3] hover:text-white'}`}>
          <Library size={24} className="group-hover:scale-105 transition-transform" />
          <span className="text-[10px] font-medium tracking-wide">Your Library</span>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors group ${isActive ? 'text-white' : 'text-[#b3b3b3] hover:text-white'}`}>
          <User size={24} className="group-hover:scale-105 transition-transform" />
          <span className="text-[10px] font-medium tracking-wide">Profile</span>
        </NavLink>
      </nav>

      {/* Fullscreen Player Overlay */}
      {isFullScreen && <FullScreenPlayer />}

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom);
        }
        @keyframes bounce-slow {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 0.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default App;