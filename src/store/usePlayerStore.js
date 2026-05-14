import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import audio from '../utils/simpleAudio';

const SONGS = [
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

const usePlayerStore = create(
  persist(
    (set, get) => {
      // Direct event-to-state sync
      if (typeof window !== 'undefined') {
        audio.addEventListener('play', () => set({ isPlaying: true }));
        audio.addEventListener('pause', () => set({ isPlaying: false, isLoading: false }));
        audio.addEventListener('timeupdate', () => {
          if (!get().isSeeking) {
            set({ 
              currentTime: audio.currentTime, 
              duration: isFinite(audio.duration) ? audio.duration : 0 
            });
          }
        });
        audio.addEventListener('ended', () => {
          const { repeatMode, currentSongIndex, queue } = get();
          if (repeatMode === 'off' && currentSongIndex === queue.length - 1) {
            set({ isPlaying: false, isLoading: false });
            return;
          }
          get().nextTrack();
        });
        audio.addEventListener('loadedmetadata', () => {
          set({ duration: isFinite(audio.duration) ? audio.duration : 0 });
          audio.volume = get().volume;
        });
        
        // Loading & Buffering States
        audio.addEventListener('loadstart', () => set({ isLoading: true }));
        audio.addEventListener('waiting', () => set({ isLoading: true }));
        audio.addEventListener('canplay', () => set({ isLoading: false }));
        audio.addEventListener('playing', () => set({ isLoading: false }));
        audio.addEventListener('error', () => set({ isLoading: false, isPlaying: false }));
      }

      return {
        // State
        currentTrack: SONGS[0],
        queue: SONGS,
        currentSongIndex: 0,
        isPlaying: false,
        isLoading: false,
        currentTime: 0,
        duration: 0,
        volume: 0.8,
        isFullScreen: false,
        likedSongs: [],
        recentlyPlayed: [],
        isSeeking: false,
        isShuffle: false,
        repeatMode: 'off',

        // Actions
        togglePlay: () => {
          const { currentTrack, volume } = get();
          const isCorrectSource = audio.src && audio.src.includes(currentTrack.audioUrl);
          
          if (!isCorrectSource) {
            audio.pause();
            audio.src = currentTrack.audioUrl;
            audio.load();
            audio.volume = volume;
          }
          
          if (audio.paused) {
            audio.play().catch(e => console.warn("Playback interrupted:", e));
          } else {
            audio.pause();
          }
        },

        setTrackByIndex: (idx) => {
          const { queue, volume } = get();
          const track = queue[idx];
          if (!track) return;
          
          audio.pause();
          audio.src = track.audioUrl;
          audio.volume = volume;
          audio.load();
          audio.play().catch(e => console.warn("Playback failed", e));
          
          set({ currentTrack: track, currentSongIndex: idx, currentTime: 0, isLoading: true });
          get().addToRecentlyPlayed(track);
        },

        setVolume: (val) => {
          const v = Math.max(0, Math.min(1, val));
          audio.volume = v;
          set({ volume: v });
        },

        addToRecentlyPlayed: (track) => {
          set((state) => {
            const filtered = state.recentlyPlayed.filter((t) => t.id !== track.id);
            return {
              recentlyPlayed: [track, ...filtered].slice(0, 10),
            };
          });
        },

        nextTrack: () => {
          const { queue, currentSongIndex, isShuffle, repeatMode } = get();
          
          if (repeatMode === 'track') {
            get().setTrackByIndex(currentSongIndex);
            return;
          }

          if (isShuffle && queue.length > 1) {
            let nextIdx;
            do {
              nextIdx = Math.floor(Math.random() * queue.length);
            } while (nextIdx === currentSongIndex);
            get().setTrackByIndex(nextIdx);
          } else {
            const isLastSong = currentSongIndex === queue.length - 1;
            if (isLastSong && repeatMode === 'off') {
              get().setTrackByIndex(0);
            } else {
              const nextIdx = (currentSongIndex + 1) % queue.length;
              get().setTrackByIndex(nextIdx);
            }
          }
        },

        prevTrack: () => {
          const { queue, currentSongIndex, currentTime } = get();
          if (currentTime > 3) {
            audio.currentTime = 0;
            return;
          }
          const prevIdx = (currentSongIndex - 1 + queue.length) % queue.length;
          get().setTrackByIndex(prevIdx);
        },

        setQueue: (tracks, idx = 0) => {
          set({ queue: tracks, currentSongIndex: idx });
          get().setTrackByIndex(idx);
        },

        seek: (time) => {
          if (isFinite(time)) {
            audio.currentTime = time;
            set({ currentTime: time, isSeeking: false });
          }
        },
        
        setSeeking: (val) => set({ isSeeking: val }),
        setCurrentTime: (time) => set({ currentTime: time }),

        // UI State
        toggleFullScreen: () => set(s => ({ isFullScreen: !s.isFullScreen })),
        toggleLike: (track) => set(s => {
          const isLiked = s.likedSongs.some(t => t.id === track.id);
          return { likedSongs: isLiked ? s.likedSongs.filter(t => t.id !== track.id) : [...s.likedSongs, track] };
        }),
        toggleShuffle: () => set(s => ({ isShuffle: !s.isShuffle })),
        toggleRepeat: () => set(s => {
          const modes = ['off', 'queue', 'track'];
          const nextIdx = (modes.indexOf(s.repeatMode) + 1) % modes.length;
          return { repeatMode: modes[nextIdx] };
        }),
        clearError: () => {}
      };
    },
    {
      name: 'spotify-player-v4',
      partialize: (state) => ({
        likedSongs: state.likedSongs,
        recentlyPlayed: state.recentlyPlayed,
        isShuffle: state.isShuffle,
        repeatMode: state.repeatMode,
        volume: state.volume
      })
    }
  )
);

export default usePlayerStore;
