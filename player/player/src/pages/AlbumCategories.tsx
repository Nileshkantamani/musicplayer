import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRightIcon, 
  PlayIcon, 
  SparklesIcon, 
  MusicalNoteIcon,
  HeartIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { usePlayer } from '../context/PlayerContext';
import { TrackCard } from '../components/cards/TrackCard';

// Define types
type PreviewTrack = {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverArt: string;
  audioSrc: string;
  duration: number;
};

type Category = {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  coverImage: string;
};

type Album = {
  id: string;
  title: string;
  artist: string;
  category: string;
  coverArt: string;
  year: number;
  songs: PreviewTrack[];
};

// Album categories
const CATEGORIES: Category[] = [
  {
    id: '90s',
    name: '90s Hits',
    description: 'Nostalgic hits from the golden era of the 1990s',
    color: 'from-indigo-600 to-blue-500',
    icon: '🎧',
    coverImage: 'https://placehold.co/800x400/4f46e5/FFFFFF?text=90s+Hits'
  },
  {
    id: 'sad',
    name: 'Sad Songs',
    description: 'Melancholic melodies for your emotional moments',
    color: 'from-slate-700 to-slate-500',
    icon: '😢',
    coverImage: 'https://placehold.co/800x400/475569/FFFFFF?text=Sad+Songs'
  },
  {
    id: 'romance',
    name: 'Romance',
    description: 'Tender melodies that celebrate love and passion',
    color: 'from-pink-600 to-rose-500',
    icon: '❤️',
    coverImage: 'https://placehold.co/800x400/db2777/FFFFFF?text=Romance'
  },
  {
    id: 'love',
    name: 'Love Songs',
    description: 'Timeless songs about the magic of love',
    color: 'from-red-600 to-pink-500',
    icon: '💘',
    coverImage: 'https://placehold.co/800x400/dc2626/FFFFFF?text=Love+Songs'
  },
  {
    id: 'hits',
    name: 'Top Hits',
    description: 'Chart-topping hits that everyone loves',
    color: 'from-amber-500 to-orange-500',
    icon: '🔥',
    coverImage: 'https://placehold.co/800x400/f59e0b/FFFFFF?text=Top+Hits'
  }
];

// Sample albums with songs
const ALBUMS: Album[] = [
  // 90s Albums
  {
    id: 'hum-aapke-hain-koun',
    title: 'Hum Aapke Hain Koun',
    artist: 'Various Artists',
    category: '90s',
    coverArt: 'https://placehold.co/500x500/4f46e5/FFFFFF?text=HAHK',
    year: 1994,
    songs: [
      {
        id: 'didi-tera-devar',
        title: 'Didi Tera Devar Deewana',
        artist: 'Lata Mangeshkar & S. P. Balasubrahmanyam',
        album: 'Hum Aapke Hain Koun',
        coverArt: 'https://placehold.co/500x500/4f46e5/FFFFFF?text=HAHK',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3',
        duration: 352
      },
      {
        id: 'joote-do-paise-lo',
        title: 'Joote Do Paise Lo',
        artist: 'Lata Mangeshkar & S. P. Balasubrahmanyam',
        album: 'Hum Aapke Hain Koun',
        coverArt: 'https://placehold.co/500x500/4f46e5/FFFFFF?text=HAHK',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-12s.mp3',
        duration: 312
      },
      {
        id: 'pehla-pehla-pyar',
        title: 'Pehla Pehla Pyar',
        artist: 'S. P. Balasubrahmanyam & Lata Mangeshkar',
        album: 'Hum Aapke Hain Koun',
        coverArt: 'https://placehold.co/500x500/4f46e5/FFFFFF?text=HAHK',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-9s.mp3',
        duration: 285
      }
    ]
  },
  {
    id: 'dilwale-dulhania',
    title: 'Dilwale Dulhania Le Jayenge',
    artist: 'Various Artists',
    category: '90s',
    coverArt: 'https://placehold.co/500x500/4f46e5/FFFFFF?text=DDLJ',
    year: 1995,
    songs: [
      {
        id: 'tujhe-dekha-to',
        title: 'Tujhe Dekha To',
        artist: 'Lata Mangeshkar & Kumar Sanu',
        album: 'Dilwale Dulhania Le Jayenge',
        coverArt: 'https://placehold.co/500x500/4f46e5/FFFFFF?text=DDLJ',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3',
        duration: 325
      },
      {
        id: 'mehndi-laga-ke-rakhna',
        title: 'Mehndi Laga Ke Rakhna',
        artist: 'Lata Mangeshkar & Udit Narayan',
        album: 'Dilwale Dulhania Le Jayenge',
        coverArt: 'https://placehold.co/500x500/4f46e5/FFFFFF?text=DDLJ',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-12s.mp3',
        duration: 298
      },
      {
        id: 'ho-gaya-hai-tujhko',
        title: 'Ho Gaya Hai Tujhko To Pyar Sajna',
        artist: 'Lata Mangeshkar & Udit Narayan',
        album: 'Dilwale Dulhania Le Jayenge',
        coverArt: 'https://placehold.co/500x500/4f46e5/FFFFFF?text=DDLJ',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-9s.mp3',
        duration: 312
      }
    ]
  },
  {
    id: 'kuch-kuch-hota-hai',
    title: 'Kuch Kuch Hota Hai',
    artist: 'Various Artists',
    category: '90s',
    coverArt: 'https://placehold.co/500x500/4f46e5/FFFFFF?text=KKHH',
    year: 1998,
    songs: [
      {
        id: 'kuch-kuch-hota-hai-title',
        title: 'Kuch Kuch Hota Hai',
        artist: 'Udit Narayan & Alka Yagnik',
        album: 'Kuch Kuch Hota Hai',
        coverArt: 'https://placehold.co/500x500/4f46e5/FFFFFF?text=KKHH',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3',
        duration: 270
      },
      {
        id: 'ladki-badi-anjani-hai',
        title: 'Ladki Badi Anjani Hai',
        artist: 'Kumar Sanu & Alka Yagnik',
        album: 'Kuch Kuch Hota Hai',
        coverArt: 'https://placehold.co/500x500/4f46e5/FFFFFF?text=KKHH',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-12s.mp3',
        duration: 284
      },
      {
        id: 'sajan-ji-ghar-aaye',
        title: 'Sajan Ji Ghar Aaye',
        artist: 'Kavita Krishnamurthy & Kumar Sanu',
        album: 'Kuch Kuch Hota Hai',
        coverArt: 'https://placehold.co/500x500/4f46e5/FFFFFF?text=KKHH',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-9s.mp3',
        duration: 308
      }
    ]
  },

  // Sad Songs Albums
  {
    id: 'sad-melodies',
    title: 'Sad Melodies',
    artist: 'Various Artists',
    category: 'sad',
    coverArt: 'https://placehold.co/500x500/475569/FFFFFF?text=Sad+Melodies',
    year: 2018,
    songs: [
      {
        id: 'channa-mereya',
        title: 'Channa Mereya',
        artist: 'Arijit Singh',
        album: 'Sad Melodies',
        coverArt: 'https://placehold.co/500x500/475569/FFFFFF?text=Sad+Melodies',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3',
        duration: 289
      },
      {
        id: 'agar-tum-saath-ho',
        title: 'Agar Tum Saath Ho',
        artist: 'Arijit Singh & Alka Yagnik',
        album: 'Sad Melodies',
        coverArt: 'https://placehold.co/500x500/475569/FFFFFF?text=Sad+Melodies',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-12s.mp3',
        duration: 341
      },
      {
        id: 'laal-ishq',
        title: 'Laal Ishq',
        artist: 'Arijit Singh',
        album: 'Sad Melodies',
        coverArt: 'https://placehold.co/500x500/475569/FFFFFF?text=Sad+Melodies',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-9s.mp3',
        duration: 325
      }
    ]
  },
  {
    id: 'heartbreak-songs',
    title: 'Heartbreak Songs',
    artist: 'Various Artists',
    category: 'sad',
    coverArt: 'https://placehold.co/500x500/475569/FFFFFF?text=Heartbreak',
    year: 2020,
    songs: [
      {
        id: 'tadap-tadap-ke',
        title: 'Tadap Tadap Ke',
        artist: 'KK',
        album: 'Heartbreak Songs',
        coverArt: 'https://placehold.co/500x500/475569/FFFFFF?text=Heartbreak',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3',
        duration: 318
      },
      {
        id: 'tum-hi-ho',
        title: 'Tum Hi Ho',
        artist: 'Arijit Singh',
        album: 'Heartbreak Songs',
        coverArt: 'https://placehold.co/500x500/475569/FFFFFF?text=Heartbreak',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-12s.mp3',
        duration: 261
      },
      {
        id: 'tujhe-bhula-diya',
        title: 'Tujhe Bhula Diya',
        artist: 'Mohit Chauhan & Shekhar Ravjiani',
        album: 'Heartbreak Songs',
        coverArt: 'https://placehold.co/500x500/475569/FFFFFF?text=Heartbreak',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-9s.mp3',
        duration: 295
      }
    ]
  },
  {
    id: 'melancholy-tunes',
    title: 'Melancholy Tunes',
    artist: 'Various Artists',
    category: 'sad',
    coverArt: 'https://placehold.co/500x500/475569/FFFFFF?text=Melancholy',
    year: 2021,
    songs: [
      {
        id: 'kalank-title-track',
        title: 'Kalank Title Track',
        artist: 'Arijit Singh',
        album: 'Melancholy Tunes',
        coverArt: 'https://placehold.co/500x500/475569/FFFFFF?text=Melancholy',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3',
        duration: 305
      },
      {
        id: 'phir-le-aya-dil',
        title: 'Phir Le Aya Dil',
        artist: 'Arijit Singh',
        album: 'Melancholy Tunes',
        coverArt: 'https://placehold.co/500x500/475569/FFFFFF?text=Melancholy',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-12s.mp3',
        duration: 328
      },
      {
        id: 'main-dhoondne-ko',
        title: 'Main Dhoondne Ko Zamaane Mein',
        artist: 'Arijit Singh',
        album: 'Melancholy Tunes',
        coverArt: 'https://placehold.co/500x500/475569/FFFFFF?text=Melancholy',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-9s.mp3',
        duration: 290
      }
    ]
  },

  // Romance Albums
  {
    id: 'romantic-duets',
    title: 'Romantic Duets',
    artist: 'Various Artists',
    category: 'romance',
    coverArt: 'https://placehold.co/500x500/db2777/FFFFFF?text=Romantic+Duets',
    year: 2019,
    songs: [
      {
        id: 'raabta',
        title: 'Raabta',
        artist: 'Arijit Singh & Nikhita Gandhi',
        album: 'Romantic Duets',
        coverArt: 'https://placehold.co/500x500/db2777/FFFFFF?text=Romantic+Duets',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3',
        duration: 243
      },
      {
        id: 'gerua',
        title: 'Gerua',
        artist: 'Arijit Singh & Antara Mitra',
        album: 'Romantic Duets',
        coverArt: 'https://placehold.co/500x500/db2777/FFFFFF?text=Romantic+Duets',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-12s.mp3',
        duration: 303
      },
      {
        id: 'hawayein',
        title: 'Hawayein',
        artist: 'Arijit Singh',
        album: 'Romantic Duets',
        coverArt: 'https://placehold.co/500x500/db2777/FFFFFF?text=Romantic+Duets',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-9s.mp3',
        duration: 295
      }
    ]
  },
  {
    id: 'timeless-romance',
    title: 'Timeless Romance',
    artist: 'Various Artists',
    category: 'romance',
    coverArt: 'https://placehold.co/500x500/db2777/FFFFFF?text=Timeless+Romance',
    year: 2021,
    songs: [
      {
        id: 'tere-liye',
        title: 'Tere Liye',
        artist: 'Atif Aslam & Shreya Ghoshal',
        album: 'Timeless Romance',
        coverArt: 'https://placehold.co/500x500/db2777/FFFFFF?text=Timeless+Romance',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3',
        duration: 289
      },
      {
        id: 'tere-sang-yaara',
        title: 'Tere Sang Yaara',
        artist: 'Atif Aslam',
        album: 'Timeless Romance',
        coverArt: 'https://placehold.co/500x500/db2777/FFFFFF?text=Timeless+Romance',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-12s.mp3',
        duration: 248
      },
      {
        id: 'jeena-jeena',
        title: 'Jeena Jeena',
        artist: 'Atif Aslam',
        album: 'Timeless Romance',
        coverArt: 'https://placehold.co/500x500/db2777/FFFFFF?text=Timeless+Romance',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-9s.mp3',
        duration: 262
      }
    ]
  },
  {
    id: 'eternal-romance',
    title: 'Eternal Romance',
    artist: 'Various Artists',
    category: 'romance',
    coverArt: 'https://placehold.co/500x500/db2777/FFFFFF?text=Eternal+Romance',
    year: 2022,
    songs: [
      {
        id: 'ae-dil-hai-mushkil',
        title: 'Ae Dil Hai Mushkil',
        artist: 'Arijit Singh',
        album: 'Eternal Romance',
        coverArt: 'https://placehold.co/500x500/db2777/FFFFFF?text=Eternal+Romance',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3',
        duration: 274
      },
      {
        id: 'bolna',
        title: 'Bolna',
        artist: 'Arijit Singh & Asees Kaur',
        album: 'Eternal Romance',
        coverArt: 'https://placehold.co/500x500/db2777/FFFFFF?text=Eternal+Romance',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-12s.mp3',
        duration: 263
      },
      {
        id: 'ik-vaari-aa',
        title: 'Ik Vaari Aa',
        artist: 'Arijit Singh',
        album: 'Eternal Romance',
        coverArt: 'https://placehold.co/500x500/db2777/FFFFFF?text=Eternal+Romance',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-9s.mp3',
        duration: 245
      }
    ]
  },

  // Love Songs Albums
  {
    id: 'love-ballads',
    title: 'Love Ballads',
    artist: 'Various Artists',
    category: 'love',
    coverArt: 'https://placehold.co/500x500/dc2626/FFFFFF?text=Love+Ballads',
    year: 2017,
    songs: [
      {
        id: 'pehli-nazar-mein',
        title: 'Pehli Nazar Mein',
        artist: 'Atif Aslam',
        album: 'Love Ballads',
        coverArt: 'https://placehold.co/500x500/dc2626/FFFFFF?text=Love+Ballads',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3',
        duration: 276
      },
      {
        id: 'tum-se-hi',
        title: 'Tum Se Hi',
        artist: 'Mohit Chauhan',
        album: 'Love Ballads',
        coverArt: 'https://placehold.co/500x500/dc2626/FFFFFF?text=Love+Ballads',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-12s.mp3',
        duration: 241
      },
      {
        id: 'zara-sa',
        title: 'Zara Sa',
        artist: 'KK',
        album: 'Love Ballads',
        coverArt: 'https://placehold.co/500x500/dc2626/FFFFFF?text=Love+Ballads',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-9s.mp3',
        duration: 258
      }
    ]
  },
  {
    id: 'eternal-love',
    title: 'Eternal Love',
    artist: 'Various Artists',
    category: 'love',
    coverArt: 'https://placehold.co/500x500/dc2626/FFFFFF?text=Eternal+Love',
    year: 2019,
    songs: [
      {
        id: 'mere-naam-tu',
        title: 'Mere Naam Tu',
        artist: 'Abhay Jodhpurkar',
        album: 'Eternal Love',
        coverArt: 'https://placehold.co/500x500/dc2626/FFFFFF?text=Eternal+Love',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3',
        duration: 289
      },
      {
        id: 'kal-ho-naa-ho',
        title: 'Kal Ho Naa Ho',
        artist: 'Sonu Nigam',
        album: 'Eternal Love',
        coverArt: 'https://placehold.co/500x500/dc2626/FFFFFF?text=Eternal+Love',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-12s.mp3',
        duration: 322
      },
      {
        id: 'main-agar-kahoon',
        title: 'Main Agar Kahoon',
        artist: 'Sonu Nigam & Shreya Ghoshal',
        album: 'Eternal Love',
        coverArt: 'https://placehold.co/500x500/dc2626/FFFFFF?text=Eternal+Love',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-9s.mp3',
        duration: 278
      }
    ]
  },
  {
    id: 'forever-yours',
    title: 'Forever Yours',
    artist: 'Various Artists',
    category: 'love',
    coverArt: 'https://placehold.co/500x500/dc2626/FFFFFF?text=Forever+Yours',
    year: 2020,
    songs: [
      {
        id: 'shayad',
        title: 'Shayad',
        artist: 'Arijit Singh',
        album: 'Forever Yours',
        coverArt: 'https://placehold.co/500x500/dc2626/FFFFFF?text=Forever+Yours',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3',
        duration: 251
      },
      {
        id: 'kho-gaye-hum-kahan',
        title: 'Kho Gaye Hum Kahan',
        artist: 'Jasleen Royal & Prateek Kuhad',
        album: 'Forever Yours',
        coverArt: 'https://placehold.co/500x500/dc2626/FFFFFF?text=Forever+Yours',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-12s.mp3',
        duration: 267
      },
      {
        id: 'khulke-jeene-ka',
        title: 'Khulke Jeene Ka',
        artist: 'Arijit Singh & Shashwat Singh',
        album: 'Forever Yours',
        coverArt: 'https://placehold.co/500x500/dc2626/FFFFFF?text=Forever+Yours',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-9s.mp3',
        duration: 238
      }
    ]
  },

  // Top Hits Albums
  {
    id: 'blockbuster-hits',
    title: 'Blockbuster Hits',
    artist: 'Various Artists',
    category: 'hits',
    coverArt: 'https://placehold.co/500x500/f59e0b/FFFFFF?text=Blockbuster+Hits',
    year: 2022,
    songs: [
      {
        id: 'naatu-naatu',
        title: 'Naatu Naatu',
        artist: 'Rahul Sipligunj & Kaala Bhairava',
        album: 'Blockbuster Hits',
        coverArt: 'https://placehold.co/500x500/f59e0b/FFFFFF?text=Blockbuster+Hits',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3',
        duration: 253
      },
      {
        id: 'kesariya',
        title: 'Kesariya',
        artist: 'Arijit Singh',
        album: 'Blockbuster Hits',
        coverArt: 'https://placehold.co/500x500/f59e0b/FFFFFF?text=Blockbuster+Hits',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-12s.mp3',
        duration: 281
      },
      {
        id: 'jhoome-jo-pathaan',
        title: 'Jhoome Jo Pathaan',
        artist: 'Arijit Singh & Sukriti Kakar',
        album: 'Blockbuster Hits',
        coverArt: 'https://placehold.co/500x500/f59e0b/FFFFFF?text=Blockbuster+Hits',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-9s.mp3',
        duration: 242
      }
    ]
  },
  {
    id: 'party-anthems',
    title: 'Party Anthems',
    artist: 'Various Artists',
    category: 'hits',
    coverArt: 'https://placehold.co/500x500/f59e0b/FFFFFF?text=Party+Anthems',
    year: 2023,
    songs: [
      {
        id: 'badtameez-dil',
        title: 'Badtameez Dil',
        artist: 'Benny Dayal',
        album: 'Party Anthems',
        coverArt: 'https://placehold.co/500x500/f59e0b/FFFFFF?text=Party+Anthems',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3',
        duration: 243
      },
      {
        id: 'saturday-saturday',
        title: 'Saturday Saturday',
        artist: 'Badshah & Indeep Bakshi',
        album: 'Party Anthems',
        coverArt: 'https://placehold.co/500x500/f59e0b/FFFFFF?text=Party+Anthems',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-12s.mp3',
        duration: 195
      },
      {
        id: 'kala-chashma',
        title: 'Kala Chashma',
        artist: 'Badshah & Neha Kakkar',
        album: 'Party Anthems',
        coverArt: 'https://placehold.co/500x500/f59e0b/FFFFFF?text=Party+Anthems',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-9s.mp3',
        duration: 232
      }
    ]
  },
  {
    id: 'trending-now',
    title: 'Trending Now',
    artist: 'Various Artists',
    category: 'hits',
    coverArt: 'https://placehold.co/500x500/f59e0b/FFFFFF?text=Trending+Now',
    year: 2023,
    songs: [
      {
        id: 'phir-aur-kya-chahiye',
        title: 'Phir Aur Kya Chahiye',
        artist: 'Arijit Singh & Sachin-Jigar',
        album: 'Trending Now',
        coverArt: 'https://placehold.co/500x500/f59e0b/FFFFFF?text=Trending+Now',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3',
        duration: 265
      },
      {
        id: 'o-bedardeya',
        title: 'O Bedardeya',
        artist: 'Arijit Singh',
        album: 'Trending Now',
        coverArt: 'https://placehold.co/500x500/f59e0b/FFFFFF?text=Trending+Now',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-12s.mp3',
        duration: 292
      },
      {
        id: 'chaleya',
        title: 'Chaleya',
        artist: 'Arijit Singh & Shilpa Rao',
        album: 'Trending Now',
        coverArt: 'https://placehold.co/500x500/f59e0b/FFFFFF?text=Trending+Now',
        audioSrc: 'https://samplelib.com/lib/preview/mp3/sample-9s.mp3',
        duration: 240
      }
    ]
  }
];

export const AlbumCategories: React.FC = () => {
  const { play } = usePlayer();
  const [selectedCategory, setSelectedCategory] = useState<string>('90s');
  const [expandedAlbum, setExpandedAlbum] = useState<string | null>(null);

  const filteredAlbums = ALBUMS.filter(album => album.category === selectedCategory);
  const selectedCategoryData = CATEGORIES.find(cat => cat.id === selectedCategory);

  const toggleAlbumExpansion = (albumId: string) => {
    if (expandedAlbum === albumId) {
      setExpandedAlbum(null);
    } else {
      setExpandedAlbum(albumId);
    }
  };

  const playAlbum = (album: Album) => {
    if (album.songs.length > 0) {
      play({
        id: album.songs[0].id,
        title: album.songs[0].title,
        artist: album.songs[0].artist,
        album: album.title,
        coverArt: album.songs[0].coverArt,
        audioSrc: album.songs[0].audioSrc,
        duration: album.songs[0].duration
      });
    }
  };

  const playSong = (song: PreviewTrack) => {
    play({
      id: song.id,
      title: song.title,
      artist: song.artist,
      album: song.album,
      coverArt: song.coverArt,
      audioSrc: song.audioSrc,
      duration: song.duration
    });
  };

  return (
    <div className="pb-8 px-2 sm:px-0 fade-in">
      {/* Hero Banner */}
      {selectedCategoryData && (
        <div className={`w-full h-64 sm:h-72 relative bg-gradient-to-r ${selectedCategoryData.color} mb-8 rounded-xl overflow-hidden`}>
          <img 
            src={selectedCategoryData.coverImage} 
            alt={selectedCategoryData.name} 
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 p-6 sm:p-8">
            <div className="text-4xl mb-2">{selectedCategoryData.icon}</div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{selectedCategoryData.name}</h1>
            <p className="text-white/80 text-sm sm:text-base max-w-xl">{selectedCategoryData.description}</p>
          </div>
        </div>
      )}
      
      {/* Category Tabs */}
      <div className="mb-6 overflow-x-auto pb-2 md:px-2">
        <div className="flex space-x-2 md:space-x-4 min-w-max">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                selectedCategory === category.id
                  ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 shadow-sm border border-primary-200 dark:border-primary-700/40'
                  : 'text-secondary-600 dark:text-secondary-400 hover:bg-secondary-100 dark:hover:bg-secondary-800/40'
              }`}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Albums Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {filteredAlbums.map((album) => (
          <div key={album.id} className="bg-white dark:bg-dark-light rounded-xl shadow-md overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              {/* Album Cover and Info */}
              <div className="w-full sm:w-40 md:w-48 flex-shrink-0 relative group">
                <img 
                  src={album.coverArt} 
                  alt={album.title} 
                  className="w-full h-40 sm:h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <button 
                    onClick={() => playAlbum(album)}
                    className="p-3 bg-primary-600 rounded-full transform scale-0 group-hover:scale-100 transition-all duration-300"
                  >
                    <PlayIcon className="w-8 h-8 text-white" />
                  </button>
                </div>
              </div>
              
              {/* Album Details */}
              <div className="p-4 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-secondary-900 dark:text-white mb-1">{album.title}</h2>
                    <p className="text-secondary-600 dark:text-secondary-400 text-sm mb-2">{album.artist} • {album.year}</p>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="inline-flex items-center text-xs text-secondary-500 dark:text-secondary-400">
                        <MusicalNoteIcon className="w-3 h-3 mr-1" />
                        {album.songs.length} songs
                      </span>
                    </div>
                  </div>
                  
                  <button 
                    className="text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300"
                    onClick={() => toggleAlbumExpansion(album.id)}
                  >
                    <ChevronRightIcon className={`w-5 h-5 transition-transform duration-300 ${expandedAlbum === album.id ? 'rotate-90' : ''}`} />
                  </button>
                </div>
                
                <div className="flex space-x-2 mt-2">
                  <button 
                    onClick={() => playAlbum(album)}
                    className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm rounded-full flex items-center"
                  >
                    <PlayIcon className="w-4 h-4 mr-1" />
                    Play
                  </button>
                  <button className="px-4 py-2 bg-secondary-100 hover:bg-secondary-200 dark:bg-secondary-800 dark:hover:bg-secondary-700 text-secondary-700 dark:text-secondary-300 text-sm rounded-full flex items-center">
                    <HeartIcon className="w-4 h-4 mr-1" />
                    Like
                  </button>
                </div>
              </div>
            </div>
            
            {/* Expandable Songs List */}
            {expandedAlbum === album.id && (
              <div className="px-4 pb-4 divide-y divide-secondary-200 dark:divide-secondary-700/30">
                <h3 className="font-medium text-secondary-900 dark:text-white py-3">Tracks</h3>
                <div className="space-y-1 pt-2">
                  {album.songs.map((song, index) => (
                    <div 
                      key={song.id} 
                      className="flex items-center p-2 hover:bg-secondary-50 dark:hover:bg-secondary-800/30 rounded-md transition-colors cursor-pointer"
                      onClick={() => playSong(song)}
                    >
                      <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center text-secondary-400">
                        {index + 1}
                      </div>
                      <div className="ml-3 flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-secondary-900 dark:text-white truncate">{song.title}</h4>
                        <p className="text-xs text-secondary-500 dark:text-secondary-400 truncate">{song.artist}</p>
                      </div>
                      <div className="ml-3 flex items-center text-xs text-secondary-500 dark:text-secondary-400">
                        <ClockIcon className="w-3 h-3 mr-1" />
                        {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}
                      </div>
                      <button className="ml-4 p-1.5 rounded-full text-secondary-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20">
                        <PlayIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Top Tracks Section */}
      <div className="mb-8">
        <h2 className="text-lg md:text-xl font-bold text-secondary-900 dark:text-white mb-4 px-1 flex items-center">
          <SparklesIcon className="w-5 h-5 mr-2 text-primary-500" />
          Top Tracks in {selectedCategoryData?.name}
        </h2>
        
        <div className="bg-white dark:bg-dark-light rounded-xl shadow-md overflow-hidden">
          <div className="divide-y divide-secondary-200/50 dark:divide-secondary-800/50">
            {filteredAlbums.flatMap(album => album.songs).slice(0, 5).map((song, index) => (
              <div 
                key={song.id}
                className="hover:bg-secondary-50 dark:hover:bg-secondary-800/30 transition-colors"
              >
                <TrackCard
                  id={song.id}
                  title={song.title}
                  artist={song.artist}
                  album={song.album}
                  coverArt={song.coverArt}
                  audioSrc={song.audioSrc}
                  duration={song.duration}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Suggested Categories */}
      <section className="mt-10">
        <h2 className="text-lg md:text-xl font-bold text-secondary-900 dark:text-white mb-4 px-1">
          Explore Other Categories
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.filter(cat => cat.id !== selectedCategory).slice(0, 4).map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className="bg-white dark:bg-dark-light rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`h-24 bg-gradient-to-r ${category.color} relative p-4`}>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-3xl">{category.icon}</div>
                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-white">{category.name}</h3>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}; 