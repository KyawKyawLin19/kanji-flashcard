import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Check, X, BookOpen, List, ArrowLeft, Play, Pause, Clock } from 'lucide-react';

const KANJI_CHAPTERS = {
  1: {
    title: "Numbers 1-10",
    kanji: [
      { kanji: '一', reading: 'いち、ひと-', meaning: 'one', example: '一つ (ひとつ) - one thing' },
      { kanji: '二', reading: 'に、ふた-', meaning: 'two', example: '二つ (ふたつ) - two things' },
      { kanji: '三', reading: 'さん、みっ-', meaning: 'three', example: '三つ (みっつ) - three things' },
      { kanji: '四', reading: 'し、よん、よっ-', meaning: 'four', example: '四つ (よっつ) - four things' },
      { kanji: '五', reading: 'ご、いつ-', meaning: 'five', example: '五つ (いつつ) - five things' },
      { kanji: '六', reading: 'ろく、むっ-', meaning: 'six', example: '六つ (むっつ) - six things' },
      { kanji: '七', reading: 'しち、なな-', meaning: 'seven', example: '七つ (ななつ) - seven things' },
      { kanji: '八', reading: 'はち、やっ-', meaning: 'eight', example: '八つ (やっつ) - eight things' },
      { kanji: '九', reading: 'きゅう、ここの-', meaning: 'nine', example: '九つ (ここのつ) - nine things' },
      { kanji: '十', reading: 'じゅう、とお', meaning: 'ten', example: '十 (じゅう) - ten' }
    ]
  },
  2: {
    title: "People & Body",
    kanji: [
      { kanji: '人', reading: 'じん、にん、ひと', meaning: 'person', example: '人 (ひと) - person' },
      { kanji: '手', reading: 'しゅ、て', meaning: 'hand', example: '手 (て) - hand' },
      { kanji: '足', reading: 'そく、あし', meaning: 'foot, leg', example: '足 (あし) - foot' },
      { kanji: '口', reading: 'こう、くち', meaning: 'mouth', example: '口 (くち) - mouth' },
      { kanji: '目', reading: 'もく、め', meaning: 'eye', example: '目 (め) - eye' },
      { kanji: '耳', reading: 'じ、みみ', meaning: 'ear', example: '耳 (みみ) - ear' },
      { kanji: '心', reading: 'しん、こころ', meaning: 'heart, mind', example: '心 (こころ) - heart' },
      { kanji: '体', reading: 'たい、からだ', meaning: 'body', example: '体 (からだ) - body' }
    ]
  },
  3: {
    title: "Time & Calendar",
    kanji: [
      { kanji: '日', reading: 'にち、じつ、ひ、か', meaning: 'day, sun', example: '今日 (きょう) - today' },
      { kanji: '月', reading: 'げつ、がつ、つき', meaning: 'month, moon', example: '月 (つき) - moon' },
      { kanji: '火', reading: 'か、ひ', meaning: 'fire, Tuesday', example: '火曜日 (かようび) - Tuesday' },
      { kanji: '水', reading: 'すい、みず', meaning: 'water, Wednesday', example: '水曜日 (すいようび) - Wednesday' },
      { kanji: '木', reading: 'もく、き', meaning: 'tree, Thursday', example: '木曜日 (もくようび) - Thursday' },
      { kanji: '金', reading: 'きん、かね', meaning: 'gold, Friday', example: '金曜日 (きんようび) - Friday' },
      { kanji: '土', reading: 'ど、つち', meaning: 'earth, Saturday', example: '土曜日 (どようび) - Saturday' },
      { kanji: '年', reading: 'ねん、とし', meaning: 'year', example: '今年 (ことし) - this year' },
      { kanji: '時', reading: 'じ、とき', meaning: 'time', example: '時間 (じかん) - time' }
    ]
  },
  4: {
    title: "Nature & Elements",
    kanji: [
      { kanji: '山', reading: 'さん、やま', meaning: 'mountain', example: '山 (やま) - mountain' },
      { kanji: '川', reading: 'せん、かわ', meaning: 'river', example: '川 (かわ) - river' },
      { kanji: '田', reading: 'でん、た', meaning: 'rice field', example: '田んぼ (たんぼ) - rice field' },
      { kanji: '空', reading: 'くう、そら', meaning: 'sky, empty', example: '空 (そら) - sky' },
      { kanji: '雨', reading: 'う、あめ', meaning: 'rain', example: '雨 (あめ) - rain' },
      { kanji: '天', reading: 'てん、あま', meaning: 'heaven, sky', example: '天気 (てんき) - weather' },
      { kanji: '気', reading: 'き、け', meaning: 'spirit, air', example: '天気 (てんき) - weather' }
    ]
  },
  5: {
    title: "Size & Direction",
    kanji: [
      { kanji: '大', reading: 'だい、たい、おお-', meaning: 'big, large', example: '大きい (おおきい) - big' },
      { kanji: '小', reading: 'しょう、ちい-、こ-', meaning: 'small, little', example: '小さい (ちいさい) - small' },
      { kanji: '中', reading: 'ちゅう、なか', meaning: 'middle, inside', example: '中 (なか) - inside' },
      { kanji: '上', reading: 'じょう、うえ、あ-', meaning: 'up, above', example: '上 (うえ) - above' },
      { kanji: '下', reading: 'か、した、さ-', meaning: 'down, below', example: '下 (した) - below' },
      { kanji: '左', reading: 'さ、ひだり', meaning: 'left', example: '左 (ひだり) - left' },
      { kanji: '右', reading: 'う、みぎ', meaning: 'right', example: '右 (みぎ) - right' },
      { kanji: '前', reading: 'ぜん、まえ', meaning: 'front, before', example: '前 (まえ) - front' },
      { kanji: '後', reading: 'ご、あと、うし-', meaning: 'after, behind', example: '後ろ (うしろ) - behind' }
    ]
  },
  6: {
    title: "Learning & Education",
    kanji: [
      { kanji: '学', reading: 'がく、まな-', meaning: 'study, learn', example: '学校 (がっこう) - school' },
      { kanji: '校', reading: 'こう', meaning: 'school', example: '学校 (がっこう) - school' },
      { kanji: '生', reading: 'せい、い-', meaning: 'life, student', example: '先生 (せんせい) - teacher' },
      { kanji: '先', reading: 'せん、さき', meaning: 'previous, ahead', example: '先生 (せんせい) - teacher' },
      { kanji: '本', reading: 'ほん、もと', meaning: 'book, origin', example: '本 (ほん) - book' },
      { kanji: '文', reading: 'ぶん、もん', meaning: 'writing, sentence', example: '文字 (もじ) - letter' },
      { kanji: '字', reading: 'じ、あざ', meaning: 'character, letter', example: '文字 (もじ) - letter' }
    ]
  },
  7: {
    title: "Family & Home",
    kanji: [
      { kanji: '父', reading: 'ふ、ちち', meaning: 'father', example: '父 (ちち) - father' },
      { kanji: '母', reading: 'ぼ、はは', meaning: 'mother', example: '母 (はは) - mother' },
      { kanji: '子', reading: 'し、こ', meaning: 'child', example: '子供 (こども) - child' },
      { kanji: '家', reading: 'か、いえ', meaning: 'house, family', example: '家 (いえ) - house' },
      { kanji: '国', reading: 'こく、くに', meaning: 'country', example: '国 (くに) - country' },
      { kanji: '名', reading: 'めい、な', meaning: 'name', example: '名前 (なまえ) - name' },
      { kanji: '私', reading: 'し、わたし', meaning: 'I, private', example: '私 (わたし) - I' }
    ]
  },
  8: {
    title: "Movement & Action",
    kanji: [
      { kanji: '行', reading: 'こう、い-、ゆ-', meaning: 'go', example: '行く (いく) - to go' },
      { kanji: '来', reading: 'らい、く-、き-', meaning: 'come', example: '来る (くる) - to come' },
      { kanji: '出', reading: 'しゅつ、で-、だ-', meaning: 'exit, go out', example: '出る (でる) - to go out' },
      { kanji: '入', reading: 'にゅう、い-、はい-', meaning: 'enter', example: '入る (はいる) - to enter' },
      { kanji: '立', reading: 'りつ、た-', meaning: 'stand', example: '立つ (たつ) - to stand' },
      { kanji: '休', reading: 'きゅう、やす-', meaning: 'rest', example: '休む (やすむ) - to rest' },
      { kanji: '見', reading: 'けん、み-', meaning: 'see, look', example: '見る (みる) - to see' }
    ]
  },
  9: {
    title: "Food & Daily Life",
    kanji: [
      { kanji: '食', reading: 'しょく、た-', meaning: 'eat, food', example: '食べる (たべる) - to eat' },
      { kanji: '飲', reading: 'いん、の-', meaning: 'drink', example: '飲む (のむ) - to drink' },
      { kanji: '肉', reading: 'にく', meaning: 'meat', example: '肉 (にく) - meat' },
      { kanji: '魚', reading: 'ぎょ、さかな', meaning: 'fish', example: '魚 (さかな) - fish' },
      { kanji: '米', reading: 'べい、こめ', meaning: 'rice', example: '米 (こめ) - rice' },
      { kanji: '茶', reading: 'ちゃ、さ', meaning: 'tea', example: '茶 (ちゃ) - tea' },
      { kanji: '牛', reading: 'ぎゅう、うし', meaning: 'cow', example: '牛 (うし) - cow' }
    ]
  },
  10: {
    title: "Transportation & Places",
    kanji: [
      { kanji: '車', reading: 'しゃ、くるま', meaning: 'car, vehicle', example: '車 (くるま) - car' },
      { kanji: '電', reading: 'でん', meaning: 'electricity', example: '電車 (でんしゃ) - train' },
      { kanji: '駅', reading: 'えき', meaning: 'station', example: '駅 (えき) - station' },
      { kanji: '道', reading: 'どう、みち', meaning: 'road, way', example: '道 (みち) - road' },
      { kanji: '店', reading: 'てん、みせ', meaning: 'shop, store', example: '店 (みせ) - shop' },
      { kanji: '町', reading: 'ちょう、まち', meaning: 'town', example: '町 (まち) - town' },
      { kanji: '村', reading: 'そん、むら', meaning: 'village', example: '村 (むら) - village' }
    ]
  },
  11: {
    title: "Time Expressions",
    kanji: [
      { kanji: '今', reading: 'こん、いま', meaning: 'now', example: '今 (いま) - now' },
      { kanji: '新', reading: 'しん、あたら-', meaning: 'new', example: '新しい (あたらしい) - new' },
      { kanji: '古', reading: 'こ、ふる-', meaning: 'old', example: '古い (ふるい) - old' },
      { kanji: '早', reading: 'そう、はや-', meaning: 'early, fast', example: '早い (はやい) - early' },
      { kanji: '間', reading: 'かん、あいだ、ま', meaning: 'interval, between', example: '時間 (じかん) - time' },
      { kanji: '分', reading: 'ふん、ぶん、わ-', meaning: 'minute, part', example: '分かる (わかる) - to understand' },
      { kanji: '半', reading: 'はん、なか-', meaning: 'half', example: '半分 (はんぶん) - half' }
    ]
  }
};

export default function KanjiFlashcardApp() {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [studiedCards, setStudiedCards] = useState(new Set());
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [autoplaySpeed, setAutoplaySpeed] = useState(5);
  const [timeRemaining, setTimeRemaining] = useState(5);
  const [allChaptersMode, setAllChaptersMode] = useState(false);
  const [kanjiOnlyMode, setKanjiOnlyMode] = useState(false);

  // Get all kanji from all chapters for "All Chapters" mode
  const getAllKanji = () => {
    const allKanji = [];
    Object.entries(KANJI_CHAPTERS).forEach(([chapterNum, chapterData]) => {
      chapterData.kanji.forEach(kanji => {
        allKanji.push({ ...kanji, chapter: parseInt(chapterNum), chapterTitle: chapterData.title });
      });
    });
    return allKanji;
  };

  const currentChapterData = allChaptersMode 
    ? { kanji: getAllKanji(), title: "All Chapters" }
    : (selectedChapter ? KANJI_CHAPTERS[selectedChapter] : null);
  const currentCard = currentChapterData ? currentChapterData.kanji[currentIndex] : null;
  const progress = currentChapterData ? ((currentIndex + 1) / currentChapterData.kanji.length) * 100 : 0;

  // Autoplay effect
  useEffect(() => {
    let interval;
    if (isAutoplay && currentChapterData) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            if (kanjiOnlyMode) {
              // In kanji-only mode, just move to next card
              handleNext();
              return autoplaySpeed;
            } else {
              // In normal mode, show answer first, then move to next
              if (!showAnswer) {
                setShowAnswer(true);
                return autoplaySpeed;
              } else {
                handleNext();
                return autoplaySpeed;
              }
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setTimeRemaining(autoplaySpeed);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoplay, showAnswer, autoplaySpeed, currentIndex, currentChapterData, kanjiOnlyMode]);

  // Reset timer when autoplay speed changes
  useEffect(() => {
    setTimeRemaining(autoplaySpeed);
  }, [autoplaySpeed]);

  const handleChapterSelect = (chapterNumber) => {
    setSelectedChapter(chapterNumber);
    setAllChaptersMode(false);
    setCurrentIndex(0);
    setShowAnswer(false);
    setCorrectCount(0);
    setIncorrectCount(0);
    setStudiedCards(new Set());
    setIsAutoplay(false);
    setTimeRemaining(autoplaySpeed);
    setKanjiOnlyMode(false);
  };

  const handleAllChaptersSelect = () => {
    setAllChaptersMode(true);
    setSelectedChapter(null);
    setCurrentIndex(0);
    setShowAnswer(false);
    setCorrectCount(0);
    setIncorrectCount(0);
    setStudiedCards(new Set());
    setIsAutoplay(false);
    setTimeRemaining(autoplaySpeed);
    setKanjiOnlyMode(false);
  };

  const handleNext = () => {
    if (currentIndex < currentChapterData.kanji.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      setCurrentIndex(0);
      setShowAnswer(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    } else {
      setCurrentIndex(currentChapterData.kanji.length - 1);
      setShowAnswer(false);
    }
  };

  const handleCorrect = () => {
    setCorrectCount(correctCount + 1);
    setStudiedCards(new Set([...studiedCards, currentIndex]));
    handleNext();
  };

  const handleIncorrect = () => {
    setIncorrectCount(incorrectCount + 1);
    setStudiedCards(new Set([...studiedCards, currentIndex]));
    handleNext();
  };

  const resetProgress = () => {
    setCurrentIndex(0);
    setShowAnswer(false);
    setCorrectCount(0);
    setIncorrectCount(0);
    setStudiedCards(new Set());
    setIsAutoplay(false);
    setTimeRemaining(autoplaySpeed);
  };

  const toggleAnswer = () => {
    if (!kanjiOnlyMode) {
      setShowAnswer(!showAnswer);
      setTimeRemaining(autoplaySpeed);
    }
  };

  const backToChapters = () => {
    setSelectedChapter(null);
    setAllChaptersMode(false);
    setCurrentIndex(0);
    setShowAnswer(false);
    setCorrectCount(0);
    setIncorrectCount(0);
    setStudiedCards(new Set());
    setIsAutoplay(false);
    setTimeRemaining(autoplaySpeed);
    setKanjiOnlyMode(false);
  };

  const toggleAutoplay = () => {
    setIsAutoplay(!isAutoplay);
    setTimeRemaining(autoplaySpeed);
  };

  const handleSpeedChange = (newSpeed) => {
    setAutoplaySpeed(newSpeed);
    setTimeRemaining(newSpeed);
  };

  const toggleKanjiOnlyMode = () => {
    setKanjiOnlyMode(!kanjiOnlyMode);
    setShowAnswer(false);
    setTimeRemaining(autoplaySpeed);
  };

  // Chapter Selection Screen
  if (!selectedChapter && !allChaptersMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="w-8 h-8 text-indigo-600" />
              <h1 className="text-4xl font-bold text-gray-800">JLPT N5 Kanji</h1>
            </div>
            <p className="text-lg text-gray-600">Choose a chapter to start studying</p>
          </div>

          {/* All Chapters Option */}
          <div className="mb-8">
            <div
              onClick={handleAllChaptersSelect}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">
                  🌟 All Chapters
                </div>
                <h3 className="text-lg font-semibold mb-3">
                  Study All JLPT N5 Kanji
                </h3>
                <div className="text-sm mb-4">
                  {getAllKanji().length} kanji total • Perfect for comprehensive review
                </div>
                <div className="text-sm opacity-90">
                  Includes all kanji from chapters 1-11 with autoplay support
                </div>
              </div>
            </div>
          </div>

          {/* Chapter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(KANJI_CHAPTERS).map(([chapterNum, chapterData]) => (
              <div
                key={chapterNum}
                onClick={() => handleChapterSelect(parseInt(chapterNum))}
                className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-indigo-200"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600 mb-2">
                    Chapter {chapterNum}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    {chapterData.title}
                  </h3>
                  <div className="text-sm text-gray-600 mb-4">
                    {chapterData.kanji.length} kanji
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {chapterData.kanji.slice(0, 6).map((kanjiItem, index) => (
                      <span key={index} className="text-lg text-gray-700">
                        {kanjiItem.kanji}
                      </span>
                    ))}
                    {chapterData.kanji.length > 6 && (
                      <span className="text-lg text-gray-500">...</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div className="mt-12 bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-3 text-xl">How to use this app:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Study Method:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Choose a chapter that interests you</li>
                  <li>• Look at each kanji and try to recall its meaning</li>
                  <li>• Click "Show Answer" to check yourself</li>
                  <li>• Mark whether you got it correct or incorrect</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Features:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Track your progress through each chapter</li>
                  <li>• See your correct/incorrect ratio</li>
                  <li>• Navigate easily between cards</li>
                  <li>• Reset progress anytime to study again</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Flashcard Study Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <button
              onClick={backToChapters}
              className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Chapters
            </button>
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-indigo-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {allChaptersMode ? "All Chapters" : `Chapter ${selectedChapter}`}
                </h1>
                <p className="text-lg text-gray-600">
                  {allChaptersMode ? "Complete JLPT N5 Review" : currentChapterData.title}
                  {allChaptersMode && currentCard && currentCard.chapter && (
                    <span className="text-sm"> • Chapter {currentCard.chapter}: {currentCard.chapterTitle}</span>
                  )}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Progress</span>
              <span className="text-sm text-gray-600">{currentIndex + 1} / {currentChapterData.kanji.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Autoplay Controls */}
        <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleAutoplay}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isAutoplay 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {isAutoplay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isAutoplay ? 'Pause' : 'Autoplay'}
              </button>
              
              {isAutoplay && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-600">
                    {timeRemaining}s
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600">Speed:</span>
              <div className="flex gap-2">
                {[1, 2, 3, 5, 8, 10].map(speed => (
                  <button
                    key={speed}
                    onClick={() => handleSpeedChange(speed)}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      autoplaySpeed === speed
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    {speed}s
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Study Mode Toggle */}
          <div className="flex items-center justify-center gap-4 pt-4 border-t">
            <span className="text-sm font-medium text-gray-600">Study Mode:</span>
            <div className="flex gap-2">
              <button
                onClick={() => !kanjiOnlyMode || toggleKanjiOnlyMode()}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  !kanjiOnlyMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                📖 Full Study
              </button>
              <button
                onClick={() => kanjiOnlyMode || toggleKanjiOnlyMode()}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  kanjiOnlyMode
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                🎯 Kanji Only
              </button>
            </div>
          </div>
          
          {kanjiOnlyMode && (
            <div className="mt-3 text-center text-sm text-purple-600 bg-purple-50 rounded-lg p-2">
              Kanji Only Mode: Perfect for quick recognition practice • No answers shown
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-green-600">{correctCount}</div>
            <div className="text-sm text-gray-600">Correct</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-red-600">{incorrectCount}</div>
            <div className="text-sm text-gray-600">Incorrect</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-indigo-600">{studiedCards.size}</div>
            <div className="text-sm text-gray-600">Studied</div>
          </div>
        </div>

        {/* Flashcard */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 min-h-[400px] flex flex-col justify-center">
          <div className="text-center">
            {/* Kanji Display */}
            <div className="mb-8">
              <div className="text-8xl font-bold text-gray-800 mb-4 select-none">
                {currentCard.kanji}
              </div>
              
              {!kanjiOnlyMode && (
                <>
                  <button
                    onClick={toggleAnswer}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
                    disabled={isAutoplay}
                  >
                    {showAnswer ? 'Hide Answer' : 'Show Answer'}
                  </button>
                  {isAutoplay && (
                    <div className="mt-2 text-sm text-gray-500">
                      Autoplay active - answer will show automatically
                    </div>
                  )}
                </>
              )}
              
              {kanjiOnlyMode && (
                <div className="text-sm text-purple-600 mt-4">
                  Recognition Practice Mode
                </div>
              )}
            </div>

            {/* Answer Section - Only show in Full Study mode */}
            {!kanjiOnlyMode && showAnswer && (
              <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-300">
                <div className="border-t pt-6">
                  <div className="text-left space-y-3">
                    <div>
                      <span className="font-semibold text-gray-700">Reading: </span>
                      <span className="text-lg text-indigo-600">{currentCard.reading}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Meaning: </span>
                      <span className="text-lg text-gray-800">{currentCard.meaning}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Example: </span>
                      <span className="text-lg text-gray-600">{currentCard.example}</span>
                    </div>
                  </div>
                </div>

                {/* Correct/Incorrect Buttons */}
                <div className="flex gap-4 justify-center pt-4">
                  <button
                    onClick={handleIncorrect}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
                    disabled={isAutoplay}
                  >
                    <X className="w-5 h-5" />
                    Incorrect
                  </button>
                  <button
                    onClick={handleCorrect}
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
                    disabled={isAutoplay}
                  >
                    <Check className="w-5 h-5" />
                    Correct
                  </button>
                </div>
                {isAutoplay && (
                  <div className="mt-2 text-sm text-gray-500">
                    Autoplay active - will advance automatically
                  </div>
                )}
              </div>
            )}

            {/* Kanji Only Mode - Show chapter info if in All Chapters mode */}
            {kanjiOnlyMode && allChaptersMode && currentCard.chapter && (
              <div className="mt-8 pt-6 border-t">
                <div className="text-sm text-gray-500">
                  Chapter {currentCard.chapter}: {currentCard.chapterTitle}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            disabled={isAutoplay}
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>
          
          <button
            onClick={resetProgress}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            disabled={isAutoplay}
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}