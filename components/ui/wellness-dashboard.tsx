"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface EmotionData {
  emotion: string;
  intensity: number;
  timestamp: Date;
}

interface WellnessMetric {
  name: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

export function WellnessDashboard() {
  const [metrics, setMetrics] = useState<WellnessMetric[]>([
    { name: 'Emotional Balance', value: 85, trend: 'up', color: 'bg-blue-500' },
    { name: 'Stress Level', value: 42, trend: 'down', color: 'bg-green-500' },
    { name: 'Energy', value: 78, trend: 'stable', color: 'bg-purple-500' },
    { name: 'Focus', value: 92, trend: 'up', color: 'bg-orange-500' },
  ]);

  const [emotionHistory, setEmotionHistory] = useState<EmotionData[]>([]);

  useEffect(() => {
    // Simulated emotion data updates
    const interval = setInterval(() => {
      const newEmotion: EmotionData = {
        emotion: ['Joy', 'Calm', 'Focus', 'Energy'][Math.floor(Math.random() * 4)],
        intensity: Math.random() * 100,
        timestamp: new Date(),
      };
      
      setEmotionHistory(prev => [...prev.slice(-10), newEmotion]);
      
      // Update metrics based on new emotion data
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: Math.min(100, Math.max(0, metric.value + (Math.random() * 10 - 5))),
        trend: Math.random() > 0.5 ? 'up' : 'down',
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-4 backdrop-blur-lg bg-white/30 border-none shadow-lg">
              <div className="flex flex-col">
                <h3 className="text-sm font-medium text-gray-600">{metric.name}</h3>
                <div className="flex items-center mt-2">
                  <div className="text-2xl font-bold">{Math.round(metric.value)}%</div>
                  <motion.div
                    className={`ml-2 ${metric.trend === 'up' ? 'text-green-500' : metric.trend === 'down' ? 'text-red-500' : 'text-gray-500'}`}
                    animate={{
                      rotate: metric.trend === 'up' ? 0 : metric.trend === 'down' ? 180 : 90,
                    }}
                  >
                    ↑
                  </motion.div>
                </div>
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${metric.color}`}
                    initial={{ width: '0%' }}
                    animate={{ width: `${metric.value}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-6">
        <Card className="p-4 backdrop-blur-lg bg-white/30 border-none shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Emotional Journey</h3>
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <AnimatePresence>
              {emotionHistory.map((emotion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className={`flex-shrink-0 h-16 w-8 rounded-full relative overflow-hidden`}
                  style={{
                    background: `linear-gradient(to top, ${getEmotionColor(emotion.emotion)} ${emotion.intensity}%, transparent)`
                  }}
                >
                  <div className="absolute bottom-0 left-0 right-0 text-xs text-center pb-1">
                    {emotion.intensity.toFixed(0)}%
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Card>
      </div>
    </div>
  );
}

function getEmotionColor(emotion: string): string {
  const colors = {
    Joy: '#FFD700',
    Calm: '#4CAF50',
    Focus: '#2196F3',
    Energy: '#FF5722',
  };
  return colors[emotion as keyof typeof colors] || '#9E9E9E';
}