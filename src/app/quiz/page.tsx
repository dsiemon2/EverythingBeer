'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ArrowLeft, Beer, RotateCcw } from 'lucide-react';
import { beers } from '@/data/beers';
import { styles } from '@/data/styles';
import BeerCard from '@/components/BeerCard';

interface Question {
  id: string;
  question: string;
  options: {
    value: string;
    label: string;
    description: string;
    tags: string[];
  }[];
}

const questions: Question[] = [
  {
    id: 'flavor',
    question: 'What flavor profile appeals to you most?',
    options: [
      { value: 'hoppy', label: 'Bold & Bitter', description: 'I love strong hop flavors', tags: ['hoppy', 'piney', 'citrus'] },
      { value: 'malty', label: 'Sweet & Smooth', description: 'I prefer rich, malty flavors', tags: ['malty', 'smooth', 'balanced'] },
      { value: 'crisp', label: 'Light & Refreshing', description: 'Clean, easy-drinking beers', tags: ['crisp', 'light', 'refreshing'] },
      { value: 'roasty', label: 'Dark & Roasty', description: 'Coffee, chocolate notes', tags: ['roasty', 'coffee', 'bourbon'] },
    ],
  },
  {
    id: 'strength',
    question: 'How strong do you like your beer?',
    options: [
      { value: 'light', label: 'Session (Under 5%)', description: 'Easy drinking all day', tags: ['light'] },
      { value: 'medium', label: 'Standard (5-7%)', description: 'The sweet spot', tags: ['balanced'] },
      { value: 'strong', label: 'Strong (7-10%)', description: 'Sip and savor', tags: ['malty', 'hoppy'] },
      { value: 'imperial', label: 'Imperial (10%+)', description: 'Go big or go home', tags: ['bourbon', 'roasty'] },
    ],
  },
  {
    id: 'experience',
    question: "What's your craft beer experience?",
    options: [
      { value: 'beginner', label: 'Just Starting Out', description: 'New to craft beer', tags: ['crisp', 'light', 'balanced'] },
      { value: 'casual', label: 'Casual Drinker', description: 'I know what I like', tags: ['balanced', 'malty'] },
      { value: 'enthusiast', label: 'Enthusiast', description: 'Always exploring new styles', tags: ['hoppy', 'fruity'] },
      { value: 'expert', label: 'Beer Geek', description: 'The weirder, the better', tags: ['sour', 'bourbon', 'spicy'] },
    ],
  },
  {
    id: 'occasion',
    question: "What's the occasion?",
    options: [
      { value: 'bbq', label: 'BBQ / Outdoor', description: 'Hot day, grilled food', tags: ['crisp', 'hoppy', 'citrus'] },
      { value: 'dinner', label: 'Nice Dinner', description: 'Pairing with food', tags: ['malty', 'balanced', 'spicy'] },
      { value: 'chill', label: 'Relaxing at Home', description: 'Kicking back', tags: ['smooth', 'creamy', 'malty'] },
      { value: 'celebrate', label: 'Celebration', description: 'Something special', tags: ['fruity', 'spicy', 'bourbon'] },
    ],
  },
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  // Calculate recommended beers based on answers
  const getRecommendations = () => {
    const selectedTags: string[] = [];

    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = questions.find((q) => q.id === questionId);
      const option = question?.options.find((o) => o.value === answer);
      if (option) {
        selectedTags.push(...option.tags);
      }
    });

    // Score beers based on tag overlap
    const scoredBeers = beers.map((beer) => {
      const tagOverlap = beer.tags.filter((tag) => selectedTags.includes(tag)).length;
      return { beer, score: tagOverlap };
    });

    // Sort by score and return top 6
    return scoredBeers
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map((item) => item.beer);
  };

  // Get recommended styles
  const getRecommendedStyles = () => {
    const selectedTags: string[] = [];

    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = questions.find((q) => q.id === questionId);
      const option = question?.options.find((o) => o.value === answer);
      if (option) {
        selectedTags.push(...option.tags);
      }
    });

    // Map tags to style categories
    const styleMap: Record<string, string[]> = {
      hoppy: ['IPA', 'Pale Ale'],
      crisp: ['Lager', 'Wheat Beer'],
      malty: ['Belgian Ale', 'Lager'],
      roasty: ['Stout', 'Porter'],
      sour: ['Sour'],
      fruity: ['Wheat Beer', 'Belgian Ale'],
    };

    const recommendedCategories = new Set<string>();
    selectedTags.forEach((tag) => {
      const categories = styleMap[tag];
      if (categories) {
        categories.forEach((cat) => recommendedCategories.add(cat));
      }
    });

    return styles.filter((style) => recommendedCategories.has(style.category)).slice(0, 4);
  };

  if (showResults) {
    const recommendations = getRecommendations();
    const recommendedStyles = getRecommendedStyles();

    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-700 dark:text-amber-300 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Your Results
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-brown-800 dark:text-amber-100 mb-4">
              Here's What We Recommend!
            </h1>
            <p className="text-lg text-brown-600 dark:text-brown-300 max-w-2xl mx-auto">
              Based on your preferences, we think you'll love these beers.
            </p>
          </div>

          {/* Recommended Beers */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-brown-800 dark:text-amber-100 mb-6">
              Beers For You
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((beer) => (
                <BeerCard key={beer.id} beer={beer} />
              ))}
            </div>
          </div>

          {/* Recommended Styles */}
          {recommendedStyles.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-brown-800 dark:text-amber-100 mb-6">
                Styles To Explore
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {recommendedStyles.map((style) => (
                  <Link key={style.id} href={`/styles/${style.id}`}>
                    <div className="bg-white dark:bg-brown-800 rounded-xl p-4 border border-amber-100 dark:border-brown-700 hover:border-amber-400 transition-colors">
                      <h3 className="font-bold text-brown-800 dark:text-amber-100 mb-1">
                        {style.name}
                      </h3>
                      <p className="text-sm text-brown-500 dark:text-brown-400">
                        {style.category}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={resetQuiz}
              className="flex items-center gap-2 px-6 py-3 border border-amber-300 dark:border-brown-600 text-amber-600 dark:text-amber-400 font-semibold rounded-lg hover:bg-amber-50 dark:hover:bg-brown-800 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Take Quiz Again
            </button>
            <Link
              href="/beers"
              className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors"
            >
              Browse All Beers
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-amber-100 to-orange-100 dark:from-brown-900 dark:via-brown-800 dark:to-amber-900 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-700 dark:text-amber-300 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Beer Taste Quiz
          </div>
          <h1 className="text-3xl font-bold text-brown-800 dark:text-amber-100 mb-2">
            Find Your Perfect Beer
          </h1>
          <p className="text-brown-600 dark:text-brown-300">
            Answer a few questions and we'll recommend beers tailored to your taste.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-brown-500 dark:text-brown-400 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="h-2 bg-white dark:bg-brown-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white dark:bg-brown-800 rounded-2xl p-6 md:p-8 border border-amber-100 dark:border-brown-700 shadow-xl">
          <h2 className="text-2xl font-bold text-brown-800 dark:text-amber-100 mb-6 text-center">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  answers[question.id] === option.value
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/30'
                    : 'border-amber-100 dark:border-brown-600 hover:border-amber-300 dark:hover:border-brown-500'
                }`}
              >
                <div className="font-semibold text-brown-800 dark:text-amber-100 mb-1">
                  {option.label}
                </div>
                <div className="text-sm text-brown-500 dark:text-brown-400">
                  {option.description}
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2 px-4 py-2 text-brown-600 dark:text-brown-300 disabled:opacity-50 disabled:cursor-not-allowed hover:text-amber-600"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <div className="flex items-center gap-1">
              {questions.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    idx <= currentQuestion ? 'bg-amber-500' : 'bg-brown-200 dark:bg-brown-600'
                  }`}
                />
              ))}
            </div>

            <div className="w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
