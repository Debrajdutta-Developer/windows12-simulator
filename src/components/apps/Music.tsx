'use client';

import React, { useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Repeat, Shuffle, Music as MusicIcon, ListMusic, Heart, MoreHorizontal, Volume2 } from 'lucide-react';

interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  cover: string;
}

const Music: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  const songs: Song[] = [
    { id: 1, title: "Midnight City", artist: "M83", album: "Hurry Up, We're Dreaming", duration: "4:03", cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=100&h=100&fit=crop" },
    { id: 2, title: "Starboy", artist: "The Weeknd", album: "Starboy", duration: "3:50", cover: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=100&h=100&fit=crop" },
    { id: 3, title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", duration: "3:20", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop" },
    { id: 4, title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", duration: "3:23", cover: "https://images.unsplash.com/photo-1459749411177-042180ce673c?w=100&h=100&fit=crop" },
    { id: 5, title: "Save Your Tears", artist: "The Weeknd", album: "After Hours", duration: "3:35", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&h=100&fit=crop" },
  ];

  if (!currentSong && songs.length > 0) {
    setCurrentSong(songs[0]);
  }

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] text-white">
      {/* Top Section: Library & Player */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 bg-black/40 p-4 space-y-6 hidden md:block">
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2">Library</h3>
            <div className="flex items-center gap-3 px-3 py-2 bg-white/10 rounded-lg text-sm font-medium">
              <MusicIcon size={18} /> Music
            </div>
            <div className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg text-sm text-gray-400">
              <ListMusic size={18} /> Playlists
            </div>
            <div className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg text-sm text-gray-400">
              <Heart size={18} /> Liked Songs
            </div>
          </div>
        </div>

        {/* Song List */}
        <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-blue-900/20 to-black/40">
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <table className="w-full text-left text-sm">
            <thead className="text-gray-500 border-b border-white/10 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="pb-3 pl-2">#</th>
                <th className="pb-3">Title</th>
                <th className="pb-3">Album</th>
                <th className="pb-3 text-right pr-2">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {songs.map((song, index) => (
                <tr 
                  key={song.id} 
                  onClick={() => setCurrentSong(song)}
                  className={`group hover:bg-white/10 cursor-pointer transition-colors ${currentSong?.id === song.id ? 'bg-white/5 text-blue-400' : ''}`}
                >
                  <td className="py-3 pl-2 w-10 text-gray-500 group-hover:text-white">
                    {currentSong?.id === song.id && isPlaying ? (
                       <div className="flex gap-0.5 items-end h-3">
                        <div className="w-1 bg-blue-400 animate-[music-bar_0.5s_infinite_alternate]" />
                        <div className="w-1 bg-blue-400 animate-[music-bar_0.7s_infinite_alternate]" />
                        <div className="w-1 bg-blue-400 animate-[music-bar_0.6s_infinite_alternate]" />
                       </div>
                    ) : index + 1}
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <img src={song.cover} alt={song.title} className="w-10 h-10 rounded shadow-lg" />
                      <div>
                        <p className="font-medium">{song.title}</p>
                        <p className="text-xs text-gray-400 group-hover:text-gray-300">{song.artist}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-gray-400 group-hover:text-gray-300">{song.album}</td>
                  <td className="py-3 text-right pr-2 text-gray-500 group-hover:text-gray-300">{song.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Section: Controls */}
      <div className="h-24 bg-[#121212] border-t border-white/10 px-4 flex items-center justify-between">
        <div className="flex items-center gap-4 w-1/3">
          {currentSong && (
            <>
              <img src={currentSong.cover} alt={currentSong.title} className="w-14 h-14 rounded shadow-xl" />
              <div>
                <p className="text-sm font-semibold truncate max-w-[150px]">{currentSong.title}</p>
                <p className="text-xs text-gray-400 truncate max-w-[150px]">{currentSong.artist}</p>
              </div>
              <button className="text-gray-400 hover:text-white transition-colors ml-2">
                <Heart size={18} />
              </button>
            </>
          )}
        </div>

        <div className="flex flex-col items-center gap-2 w-1/3">
          <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-white transition-colors"><Shuffle size={18} /></button>
            <button className="text-gray-300 hover:text-white transition-colors"><SkipBack size={24} fill="currentColor" /></button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-all"
            >
              {isPlaying ? <Pause size={24} fill="black" /> : <Play size={24} fill="black" className="ml-1" />}
            </button>
            <button className="text-gray-300 hover:text-white transition-colors"><SkipForward size={24} fill="currentColor" /></button>
            <button className="text-gray-400 hover:text-white transition-colors"><Repeat size={18} /></button>
          </div>
          <div className="w-full flex items-center gap-2 text-[10px] text-gray-500">
            <span>1:23</span>
            <div className="flex-1 h-1 bg-white/10 rounded-full relative group">
              <div className="absolute left-0 top-0 h-full w-1/3 bg-blue-500 rounded-full" />
              <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100" />
            </div>
            <span>{currentSong?.duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 w-1/3">
          <button className="text-gray-400 hover:text-white"><ListMusic size={18} /></button>
          <div className="flex items-center gap-2">
            <Volume2 size={18} className="text-gray-400" />
            <div className="w-24 h-1 bg-white/10 rounded-full">
              <div className="w-2/3 h-full bg-blue-500 rounded-full" />
            </div>
          </div>
          <button className="text-gray-400 hover:text-white"><MoreHorizontal size={18} /></button>
        </div>
      </div>

      <style jsx>{`
        @keyframes music-bar {
          from { height: 4px; }
          to { height: 12px; }
        }
      `}</style>
    </div>
  );
};

export default Music;
