"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
} from "lucide-react";

const AUDIO_URL = "/English.webm";

// Keep your data here
const summaries = [
  {
    Interval_Time: 0,
    Psychometric_Summary:
      "During the analyzed segment, the individual's vocal patterns and prosodic features reveal a complex relationship with the concept of multiple personalities. Their speech rhythm and tonal variations suggest careful articulation when addressing societal misconceptions about dissociative identity disorder (DID). The measured pace and steady vocal delivery indicate thoughtful introspection, particularly evident in the modulation of their voice when discussing popular culture's portrayal versus lived experience. Their speech cadence shows notable shifts when recounting experiences of amnesia, with subtle tension in vocal quality suggesting underlying emotional processing. The speaker's tone becomes notably lighter, with slight variations in pitch when describing one personality, a three-year-old girl, while maintaining a more serious vocal quality when addressing broader challenges. The prosodic analysis reveals a layered emotional landscape through varying speech patterns, pauses, and vocal intensities, reflecting the complexity of navigating a multifaceted identity.",
  },
  {
    Interval_Time: 120,
    Psychometric_Summary:
      "The audio analysis of this segment reveals significant variations in vocal patterns as the individual discusses their experience with dissociative identity disorder (DID). Their voice carries subtle tension when addressing childhood trauma, with noticeable changes in speech rhythm and intensity during descriptions of memory lapses. The prosodic features show marked shifts when discussing their twenty-year struggle with amnesia, characterized by hesitations and altered vocal qualities that suggest emotional processing. Their tone becomes more measured and contemplative when describing their therapeutic journey, with strategic pauses indicating moments of deeper reflection. The speaker's voice modulation varies notably when addressing different aspects of their experience, particularly evident in the subtle changes of pitch and rhythm when discussing their various alters. The overall vocal patterns suggest an ongoing internal dialogue, marked by variations in speech tempo and intensity that reflect their complex psychological state.",
  },
  {
    Interval_Time: 240,
    Psychometric_Summary:
      "During this two-minute segment, the prosodic analysis reveals significant emotional depth in the speaker's discussion of dissociative identity disorder (DID). Their vocal patterns show notable variation when addressing trauma history, with subtle changes in tone and rhythm suggesting careful navigation of sensitive topics. The speaker's voice carries varying degrees of tension, particularly evident in the modulation patterns when discussing their alters as coping mechanisms. Their speech rhythm demonstrates thoughtful pacing, with strategic pauses suggesting moments of emotional processing or reflection. The vocal quality shifts noticeably when addressing childhood trauma, with subtle changes in intensity and pitch indicating the emotional weight of these memories. Throughout the segment, the speaker's prosodic features reveal a complex interplay of emotional states through variations in speech rate, tone, and vocal energy.",
  },
  {
    Interval_Time: 360,
    Psychometric_Summary:
      "The audio analysis of this interval reveals complex emotional layers through vocal patterns and prosodic features. The speaker's voice exhibits notable tension when discussing traumatic memories, particularly evident in the modulation patterns when addressing past sexual abuse. Their speech rhythm becomes more measured and careful during discussions of identity fragmentation, with strategic pauses suggesting emotional processing. The prosodic analysis indicates varying levels of emotional engagement through changes in vocal intensity and pitch, especially pronounced when expressing conflict about accepting their alters. The speaker's tone shifts between steadiness and uncertainty, reflected in the rhythm and pace of their speech when describing their therapeutic journey. The overall vocal patterns suggest an ongoing process of emotional regulation, marked by alternating periods of controlled delivery and more emotionally charged expression.",
  },
  {
    Interval_Time: 480,
    Psychometric_Summary:
      "During this interval, the audio analysis reveals sophisticated emotional processing through varied prosodic patterns. The speaker's voice demonstrates notable changes in tone and rhythm when referencing different alters, particularly 'Devin' and 'Minnie,' with distinct vocal qualities emerging for each discussion. Their speech patterns show increased fluidity when describing their journey toward acceptance, contrasting with more hesitant rhythms when addressing earlier resistance. The prosodic features indicate a developing comfort level through more consistent vocal patterns when discussing coping strategies and self-awareness. Notable variations in speech tempo and intensity occur when describing physical symptoms like dizziness and fatigue, suggesting authentic engagement with these experiences. The speaker's voice carries a measured quality during discussions of journaling and communication strategies, with subtle modulations indicating both challenge and progress in their adaptive process. The overall vocal analysis suggests an evolving relationship with their condition, reflected in the natural flow between different emotional states in their speech patterns.",
  },
];

// const emotions = [
//   {
//     Time: 2.5025,
//     Final_Emotion: "Boredom",
//   },
//   {
//     Time: 5.005,
//     Final_Emotion: "Contempt",
//   },
//   {
//     Time: 29.988291666666665,
//     Final_Emotion: "Joy",
//   },
//   {
//     Time: 29.988291666666665,
//     Final_Emotion: "Contempt",
//   },
//   {
//     Time: 32.49079166666667,
//     Final_Emotion: "Contempt",
//   },
//   {
//     Time: 34.993291666666664,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 37.49579166666666,
//     Final_Emotion: "Concentration",
//   },
//   {
//     Time: 39.99829166666667,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 45.00329166666666,
//     Final_Emotion: "Contempt",
//   },
//   {
//     Time: 50.008291666666665,
//     Final_Emotion: "Calmness",
//   },
//   {
//     Time: 52.51079166666666,
//     Final_Emotion: "Contempt",
//   },
//   {
//     Time: 55.01329166666666,
//     Final_Emotion: "Nostalgia",
//   },
//   {
//     Time: 57.515791666666665,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 60.01829166666666,
//     Final_Emotion: "Nostalgia",
//   },
//   {
//     Time: 62.52079166666666,
//     Final_Emotion: "Amusement",
//   },
//   {
//     Time: 64.98158333333333,
//     Final_Emotion: "Interest",
//   },
//   {
//     Time: 67.48408333333333,
//     Final_Emotion: "Tiredness",
//   },
//   {
//     Time: 69.98658333333333,
//     Final_Emotion: "Joy",
//   },
//   {
//     Time: 72.48908333333333,
//     Final_Emotion: "Contemplation",
//   },
//   {
//     Time: 74.99158333333332,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 77.49408333333332,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 79.99658333333333,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 82.49908333333333,
//     Final_Emotion: "Boredom",
//   },
//   {
//     Time: 85.00158333333333,
//     Final_Emotion: "Concentration",
//   },
//   {
//     Time: 92.50908333333332,
//     Final_Emotion: "Empathic Pain",
//   },
//   {
//     Time: 95.01158333333332,
//     Final_Emotion: "Empathic Pain",
//   },
//   {
//     Time: 97.51408333333332,
//     Final_Emotion: "Empathic Pain",
//   },
//   {
//     Time: 100.01658333333332,
//     Final_Emotion: "Empathic Pain",
//   },
//   {
//     Time: 102.51908333333331,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 104.979875,
//     Final_Emotion: "Empathic Pain",
//   },
//   {
//     Time: 107.482375,
//     Final_Emotion: "Empathic Pain",
//   },
//   {
//     Time: 109.984875,
//     Final_Emotion: "Empathic Pain",
//   },
//   {
//     Time: 112.487375,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 114.989875,
//     Final_Emotion: "Empathic Pain",
//   },
//   {
//     Time: 117.492375,
//     Final_Emotion: "Empathic Pain",
//   },
//   {
//     Time: 119.994875,
//     Final_Emotion: "Empathic Pain",
//   },
//   {
//     Time: 122.497375,
//     Final_Emotion: "Concentration",
//   },
//   {
//     Time: 124.999875,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 127.502375,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 130.004875,
//     Final_Emotion: "Joy",
//   },
//   {
//     Time: 132.507375,
//     Final_Emotion: "Amusement",
//   },
//   {
//     Time: 135.009875,
//     Final_Emotion: "Concentration",
//   },
//   {
//     Time: 137.512375,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 140.014875,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 142.517375,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 145.01987499999998,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 147.48066666666665,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 149.98316666666665,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 152.48566666666665,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 154.98816666666664,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 157.49066666666667,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 159.99316666666667,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 162.49566666666666,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 164.99816666666666,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 167.50066666666666,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 170.00316666666666,
//     Final_Emotion: "Empathic Pain",
//   },
//   {
//     Time: 172.50566666666666,
//     Final_Emotion: "Empathic Pain",
//   },
//   {
//     Time: 175.00816666666665,
//     Final_Emotion: "Empathic Pain",
//   },
//   {
//     Time: 177.51066666666665,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 177.51066666666665,
//     Final_Emotion: "Distress",
//   },
//   {
//     Time: 180.01316666666665,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 185.01816666666664,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 187.52066666666664,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 187.52066666666664,
//     Final_Emotion: "Distress",
//   },
//   {
//     Time: 189.9814583333333,
//     Final_Emotion: "Contemplation",
//   },
//   {
//     Time: 192.48395833333333,
//     Final_Emotion: "Empathic Pain",
//   },
//   {
//     Time: 194.98645833333333,
//     Final_Emotion: "Empathic Pain",
//   },
//   {
//     Time: 197.48895833333333,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 199.99145833333333,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 202.49395833333327,
//     Final_Emotion: "Boredom",
//   },
//   {
//     Time: 204.9964583333333,
//     Final_Emotion: "Empathic Pain",
//   },
//   {
//     Time: 207.4989583333333,
//     Final_Emotion: "Empathic Pain",
//   },
//   {
//     Time: 210.0014583333333,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 212.5039583333333,
//     Final_Emotion: "Empathic Pain",
//   },
//   {
//     Time: 215.0064583333333,
//     Final_Emotion: "Contemplation",
//   },
//   {
//     Time: 217.5089583333333,
//     Final_Emotion: "Empathic Pain",
//   },
//   {
//     Time: 220.0114583333333,
//     Final_Emotion: "Empathic Pain",
//   },
//   {
//     Time: 222.5139583333333,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 225.0164583333333,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 227.51895833333333,
//     Final_Emotion: "Empathic Pain",
//   },
//   {
//     Time: 229.97975,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 232.48225,
//     Final_Emotion: "Empathic Pain",
//   },
//   {
//     Time: 234.98475,
//     Final_Emotion: "Empathic Pain",
//   },
//   {
//     Time: 234.98475,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 237.48725,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 239.98975,
//     Final_Emotion: "Empathic Pain",
//   },
//   {
//     Time: 242.49225,
//     Final_Emotion: "Empathic Pain",
//   },
//   {
//     Time: 244.99475,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 247.49725,
//     Final_Emotion: "Empathic Pain",
//   },
//   {
//     Time: 249.99975,
//     Final_Emotion: "Boredom",
//   },
//   {
//     Time: 252.50225,
//     Final_Emotion: "Boredom",
//   },
//   {
//     Time: 255.00475,
//     Final_Emotion: "Contemplation",
//   },
//   {
//     Time: 257.50725,
//     Final_Emotion: "Contemplation",
//   },
//   {
//     Time: 260.00975,
//     Final_Emotion: "Boredom",
//   },
//   {
//     Time: 262.51225,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 265.01475,
//     Final_Emotion: "Contemplation",
//   },
//   {
//     Time: 267.51725,
//     Final_Emotion: "Contemplation",
//   },
//   {
//     Time: 270.01975,
//     Final_Emotion: "Boredom",
//   },
//   {
//     Time: 272.4805416666666,
//     Final_Emotion: "Contemplation",
//   },
//   {
//     Time: 274.9830416666666,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 277.4855416666666,
//     Final_Emotion: "Desire",
//   },
//   {
//     Time: 279.9880416666667,
//     Final_Emotion: "Interest",
//   },
//   {
//     Time: 282.4905416666667,
//     Final_Emotion: "Contemplation",
//   },
//   {
//     Time: 284.99304166666667,
//     Final_Emotion: "Contemplation",
//   },
//   {
//     Time: 287.49554166666667,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 289.99804166666667,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 292.50054166666666,
//     Final_Emotion: "Awe",
//   },
//   {
//     Time: 295.00304166666666,
//     Final_Emotion: "Boredom",
//   },
//   {
//     Time: 297.50554166666666,
//     Final_Emotion: "Contemplation",
//   },
//   {
//     Time: 300.00804166666666,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 302.51054166666665,
//     Final_Emotion: "Contemplation",
//   },
//   {
//     Time: 307.51554166666665,
//     Final_Emotion: "Contemplation",
//   },
//   {
//     Time: 310.01804166666665,
//     Final_Emotion: "Contemplation",
//   },
//   {
//     Time: 312.52054166666665,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 314.98133333333334,
//     Final_Emotion: "Boredom",
//   },
//   {
//     Time: 317.48383333333334,
//     Final_Emotion: "Boredom",
//   },
//   {
//     Time: 319.98633333333333,
//     Final_Emotion: "Concentration",
//   },
//   {
//     Time: 322.48883333333333,
//     Final_Emotion: "Concentration",
//   },
//   {
//     Time: 324.99133333333333,
//     Final_Emotion: "Contemplation",
//   },
//   {
//     Time: 327.4938333333333,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 329.9963333333333,
//     Final_Emotion: "Pain",
//   },
//   {
//     Time: 332.4988333333333,
//     Final_Emotion: "Desire",
//   },
//   {
//     Time: 335.0013333333333,
//     Final_Emotion: "Contemplation",
//   },
//   {
//     Time: 337.5038333333333,
//     Final_Emotion: "Contemplation",
//   },
//   {
//     Time: 340.0063333333333,
//     Final_Emotion: "Interest",
//   },
//   {
//     Time: 345.0113333333333,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 347.5138333333333,
//     Final_Emotion: "Nostalgia",
//   },
//   {
//     Time: 350.0163333333333,
//     Final_Emotion: "Nostalgia",
//   },
//   {
//     Time: 352.5188333333333,
//     Final_Emotion: "Nostalgia",
//   },
//   {
//     Time: 354.979625,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 357.482125,
//     Final_Emotion: "Empathic Pain",
//   },
//   {
//     Time: 359.984625,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 362.487125,
//     Final_Emotion: "Empathic Pain",
//   },
//   {
//     Time: 364.989625,
//     Final_Emotion: "Boredom",
//   },
//   {
//     Time: 367.492125,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 369.994625,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 374.999625,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 377.502125,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 380.004625,
//     Final_Emotion: "Empathic Pain",
//   },
//   {
//     Time: 382.507125,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 385.009625,
//     Final_Emotion: "Concentration",
//   },
//   {
//     Time: 387.512125,
//     Final_Emotion: "Annoyance",
//   },
//   {
//     Time: 390.014625,
//     Final_Emotion: "Distress",
//   },
//   {
//     Time: 392.517125,
//     Final_Emotion: "Annoyance",
//   },
//   {
//     Time: 395.019625,
//     Final_Emotion: "Contemplation",
//   },
//   {
//     Time: 397.48041666666666,
//     Final_Emotion: "Contemplation",
//   },
//   {
//     Time: 402.48541666666665,
//     Final_Emotion: "Concentration",
//   },
//   {
//     Time: 404.98791666666665,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 407.49041666666665,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 409.9929166666666,
//     Final_Emotion: "Awe",
//   },
//   {
//     Time: 412.4954166666666,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 414.9979166666666,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 417.5004166666666,
//     Final_Emotion: "Distress",
//   },
//   {
//     Time: 420.0029166666666,
//     Final_Emotion: "Disappointment",
//   },
//   {
//     Time: 422.5054166666666,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 425.0079166666666,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 427.5104166666666,
//     Final_Emotion: "Calmness",
//   },
//   {
//     Time: 430.0129166666666,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 432.5154166666666,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 435.0179166666666,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 437.5204166666666,
//     Final_Emotion: "Calmness",
//   },
//   {
//     Time: 439.9812083333333,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 442.4837083333333,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 444.9862083333333,
//     Final_Emotion: "Love",
//   },
//   {
//     Time: 447.4887083333333,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 449.9912083333333,
//     Final_Emotion: "Love",
//   },
//   {
//     Time: 452.4937083333333,
//     Final_Emotion: "Nostalgia",
//   },
//   {
//     Time: 454.9962083333333,
//     Final_Emotion: "Tiredness",
//   },
//   {
//     Time: 457.4987083333333,
//     Final_Emotion: "Disapproval",
//   },
//   {
//     Time: 460.0012083333333,
//     Final_Emotion: "Disapproval",
//   },
//   {
//     Time: 460.0012083333333,
//     Final_Emotion: "Disapproval",
//   },
//   {
//     Time: 462.5037083333333,
//     Final_Emotion: "Disapproval",
//   },
//   {
//     Time: 465.0062083333333,
//     Final_Emotion: "Disapproval",
//   },
//   {
//     Time: 467.5087083333333,
//     Final_Emotion: "Disapproval",
//   },
//   {
//     Time: 470.0112083333333,
//     Final_Emotion: "Disapproval",
//   },
//   {
//     Time: 472.5137083333333,
//     Final_Emotion: "Disapproval",
//   },
//   {
//     Time: 475.0162083333333,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 477.5187083333333,
//     Final_Emotion: "Concentration",
//   },
//   {
//     Time: 479.9795,
//     Final_Emotion: "Contemplation",
//   },
//   {
//     Time: 482.482,
//     Final_Emotion: "Contemplation",
//   },
//   {
//     Time: 484.9845,
//     Final_Emotion: "Contemplation",
//   },
//   {
//     Time: 487.487,
//     Final_Emotion: "Contemplation",
//   },
//   {
//     Time: 489.9895,
//     Final_Emotion: "Horror",
//   },
//   {
//     Time: 492.492,
//     Final_Emotion: "Horror",
//   },
//   {
//     Time: 494.9945,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 497.497,
//     Final_Emotion: "Horror",
//   },
//   {
//     Time: 499.9995,
//     Final_Emotion: "Horror",
//   },
//   {
//     Time: 502.502,
//     Final_Emotion: "Horror",
//   },
//   {
//     Time: 505.0045,
//     Final_Emotion: "Horror",
//   },
//   {
//     Time: 510.0095,
//     Final_Emotion: "Horror",
//   },
//   {
//     Time: 512.512,
//     Final_Emotion: "Horror",
//   },
//   {
//     Time: 515.0145,
//     Final_Emotion: "Horror",
//   },
//   {
//     Time: 517.5169999999999,
//     Final_Emotion: "Horror",
//   },
//   {
//     Time: 520.0195,
//     Final_Emotion: "Tiredness",
//   },
//   {
//     Time: 520.0195,
//     Final_Emotion: "Distress",
//   },
//   {
//     Time: 522.4802916666666,
//     Final_Emotion: "Distress",
//   },
//   {
//     Time: 524.9827916666667,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 527.4852916666666,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 529.9877916666667,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 532.4902916666666,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 534.9927916666667,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 534.9927916666667,
//     Final_Emotion: "Pain",
//   },
//   {
//     Time: 537.4952916666666,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 539.9977916666667,
//     Final_Emotion: "Concentration",
//   },
//   {
//     Time: 542.5002916666666,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 545.0027916666667,
//     Final_Emotion: "Concentration",
//   },
//   {
//     Time: 547.5052916666666,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 550.0077916666667,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 552.5102916666666,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 555.0127916666667,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 557.5152916666666,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 560.0177916666667,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 562.5202916666666,
//     Final_Emotion: "Contemplation",
//   },
//   {
//     Time: 564.9810833333333,
//     Final_Emotion: "Concentration",
//   },
//   {
//     Time: 567.4835833333333,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 569.9860833333333,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 572.4885833333333,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 574.9910833333333,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 577.4935833333333,
//     Final_Emotion: "Desire",
//   },
//   {
//     Time: 579.9960833333333,
//     Final_Emotion: "Desire",
//   },
//   {
//     Time: 582.4985833333333,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 585.0010833333333,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 587.5035833333333,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 590.0060833333333,
//     Final_Emotion: "Confusion",
//   },
//   {
//     Time: 592.5085833333333,
//     Final_Emotion: "Contemplation",
//   },
//   {
//     Time: 595.0110833333333,
//     Final_Emotion: "Confusion",
//   },
// ];

const messages = [
  {
    start: 5.0,
    end: 12.16,
    text: " When someone hears the phrase multiple personalities, it likely stirs up images from the 1976",
  },
  {
    start: 12.16,
    end: 17.7,
    text: " movie, Cible, or perhaps the opposing characters of Jekyll and Hyde.",
  },
  {
    start: 17.7,
    end: 22.5,
    text: " Popular culture would have you believe that people with multiple personalities are dangerous",
  },
  {
    start: 22.5,
    end: 24.48,
    text: " and few and far between.",
  },
  {
    start: 24.48,
    end: 32.08,
    text: " However, an estimated 150 million people experience dissociative disorders.",
  },
  {
    start: 32.08,
    end: 36.68,
    text: " What is it like to live with multiple people in one body?",
  },
  {
    start: 36.68,
    end: 39.44,
    text: " Today, you'll meet two people.",
  },
  {
    start: 39.44,
    end: 46.28,
    text: " Insina diagnosed eight years ago with dissociative identity disorder who has 11 personalities.",
  },
  {
    start: 46.28,
    end: 50.92,
    text: " And you'll meet Mini, the three-year-old girl who lives inside Insina's body.",
  },
  {
    start: 50.92,
    end: 53.760000000000005,
    text: " Alright, Insina, tell us where you're from.",
  },
  {
    start: 53.76,
    end: 59.519999999999996,
    text: " So I was born in California and lived there until I was around five years old and my",
  },
  {
    start: 59.519999999999996,
    end: 64.24,
    text: " family moved to Arizona and I've been there ever since.",
  },
  {
    start: 64.24,
    end: 70.36,
    text: " And you have a unique diagnosis of having dissociative identity disorder.",
  },
  {
    start: 70.36,
    end: 75.28,
    text: " A lot of people know that as multiple personality disorder.",
  },
  {
    start: 75.28,
    end: 77.08,
    text: " When were you diagnosed with it?",
  },
  {
    start: 77.08,
    end: 78.08,
    text: " I was diagnosed.",
  },
  {
    start: 78.08,
    end: 81.28,
    text: " I think I was about 22 or 23.",
  },
  {
    start: 82.28,
    end: 86.12,
    text: " And what led to the actual diagnosis?",
  },
  {
    start: 86.12,
    end: 96.12,
    text: " I started having a lot of amnesia feelings which a lot of people are, you know, they could",
  },
  {
    start: 96.12,
    end: 97.32,
    text: " think of as a normal thing.",
  },
  {
    start: 97.32,
    end: 102.96000000000001,
    text: " You know, you forget what you have for breakfast the day before.",
  },
  {
    start: 102.96000000000001,
    end: 107.32,
    text: " And it just became so big that things were happening.",
  },
  {
    start: 107.32,
    end: 112.39999999999999,
    text: " It's really hard to explain until you're actually like kind of going through it.",
  },
  {
    start: 112.39999999999999,
    end: 123.11999999999999,
    text: " That I was seeing therapists regularly and it was just a diagnosis that ended up happening.",
  },
  {
    start: 123.11999999999999,
    end: 128.12,
    text: " So you're having these events in your life where you Monday morning wake up and you can't",
  },
  {
    start: 128.12,
    end: 130.56,
    text: " remember what you did over the weekend.",
  },
  {
    start: 130.56,
    end: 134.4,
    text: " And Wednesday at night you're going to bed and you're thinking, what did I do this morning?",
  },
  {
    start: 134.4,
    end: 135.79999999999998,
    text: " What did I have to eat?",
  },
  {
    start: 136.20000000000002,
    end: 139.08,
    text: " You don't think too much of it because people forget stuff.",
  },
  {
    start: 139.08,
    end: 144.96,
    text: " But then after 22, 23 years of this, you're seeing a therapist and finally the therapist says,",
  },
  {
    start: 144.96,
    end: 148.24,
    text: " look, you have dissociative identity disorder.",
  },
  {
    start: 148.24,
    end: 151.04000000000002,
    text: " But I've been seeing therapists even before then.",
  },
  {
    start: 151.04000000000002,
    end: 152.64000000000001,
    text: " But it ended up coming out.",
  },
  {
    start: 152.64000000000001,
    end: 155.08,
    text: " Yeah, that's what it was.",
  },
  {
    start: 155.08,
    end: 158.60000000000002,
    text: " And when you, you're in Sina talking to me right now.",
  },
  {
    start: 158.6,
    end: 166.0,
    text: " But you have 11 other altars that you can go into.",
  },
  {
    start: 166.0,
    end: 169.56,
    text: " Can you tell me about each one of those?",
  },
  {
    start: 169.56,
    end: 179.48,
    text: " So I can tell you about basically I have five primary altars, which are the ones that I,",
  },
  {
    start: 179.48,
    end: 185.32,
    text: " you know, if I'm going to switch, I switch into them very regularly.",
  },
  {
    start: 185.32,
    end: 196.35999999999999,
    text: " And I have one that I usually, in the past, I would switch into almost every single day.",
  },
  {
    start: 196.35999999999999,
    end: 197.35999999999999,
    text: " Every day.",
  },
  {
    start: 197.35999999999999,
    end: 198.35999999999999,
    text: " Every single day.",
  },
  {
    start: 198.35999999999999,
    end: 200.64,
    text: " And how long did you switch into that person?",
  },
  {
    start: 200.64,
    end: 209.79999999999998,
    text: " So she would come out for hours at a time and sometimes for days at a time.",
  },
  {
    start: 209.79999999999998,
    end: 212.11999999999998,
    text: " But did this go on for months, years, days?",
  },
  {
    start: 212.11999999999998,
    end: 214.11999999999998,
    text: " This was like years, absolutely.",
  },
  {
    start: 214.11999999999998,
    end: 215.88,
    text: " So let's talk about her.",
  },
  {
    start: 215.88,
    end: 219.88,
    text: " Okay, so it's going to sound kind of weird.",
  },
  {
    start: 219.88,
    end: 224.76,
    text: " So basically, let me start from the beginning a little bit.",
  },
  {
    start: 224.76,
    end: 236.6,
    text: " So people with DID, they get it by having traumatic reoccurring childhood experiences that",
  },
  {
    start: 236.6,
    end: 241.2,
    text: " were just like unavoidable and it's repetitive usually.",
  },
  {
    start: 241.2,
    end: 246.32,
    text: " So it's a lot of like, you know, just different kinds of harming things that are happening",
  },
  {
    start: 246.32,
    end: 250.23999999999998,
    text: " to these people that are just super traumatic.",
  },
  {
    start: 250.23999999999998,
    end: 254.28,
    text: " And you're saying from your understanding, it's not just something that occurs once with",
  },
  {
    start: 254.28,
    end: 256.88,
    text: " something that's occurring more regularly.",
  },
  {
    start: 256.88,
    end: 259.52,
    text: " Yeah, it's absolutely more repetitive.",
  },
  {
    start: 259.52,
    end: 263.0,
    text: " It's stuff that's absolutely reoccurring.",
  },
  {
    start: 263.0,
    end: 270.96,
    text: " And people with DID, they get it around the ages of like newborn to around six to seven",
  },
  {
    start: 270.96,
    end: 272.2,
    text: " years old.",
  },
  {
    start: 272.2,
    end: 275.76,
    text: " So you can't get DID after that time.",
  },
  {
    start: 275.76,
    end: 283.64,
    text: " So to kind of describe it, everybody starts out with multiple personalities.",
  },
  {
    start: 283.64,
    end: 285.44,
    text: " If you can kind of imagine that.",
  },
  {
    start: 285.44,
    end: 291.32,
    text: " And then as you get older, you know, your personalities come into one person.",
  },
  {
    start: 291.32,
    end: 297.64,
    text: " If you've experienced trauma, reoccurring trauma as a child, you know, usually before that",
  },
  {
    start: 297.64,
    end: 303.71999999999997,
    text: " age, those ages, your personalities stay split.",
  },
  {
    start: 303.71999999999997,
    end: 310.56,
    text: " And as a child, these traumatic experiences are going to create these different personalities",
  },
  {
    start: 310.56,
    end: 313.32,
    text: " in these different altars, if you will.",
  },
  {
    start: 313.32,
    end: 320.96,
    text: " And basically, they're what you're taking from around you.",
  },
  {
    start: 320.96,
    end: 325.92,
    text: " So some people will have altars that are like animals.",
  },
  {
    start: 325.92,
    end: 333.44,
    text: " Some people will have altars that are completely like non-living things like rocks, which",
  },
  {
    start: 333.44,
    end: 334.84000000000003,
    text: " sounds very odd.",
  },
  {
    start: 334.84000000000003,
    end: 338.0,
    text: " But it's what you know as a child.",
  },
  {
    start: 338.0,
    end: 339.6,
    text: " What can protect you?",
  },
  {
    start: 339.6,
    end: 342.76000000000005,
    text: " And those altars become your protectors.",
  },
  {
    start: 342.76000000000005,
    end: 347.84000000000003,
    text: " So it's not a bad thing that they're there.",
  },
  {
    start: 347.84000000000003,
    end: 353.48,
    text: " Do you want to talk about what happened in your childhood that caused you to develop DID?",
  },
  {
    start: 353.48,
    end: 361.32000000000005,
    text: " So I don't remember the majority of my life up until like around six years old.",
  },
  {
    start: 361.32000000000005,
    end: 368.40000000000003,
    text: " I have like very small little clips, I guess, but like only a couple of them.",
  },
  {
    start: 368.4,
    end: 377.4,
    text: " But I know that it was a sexual abuse thing and it did happen with my father, along with",
  },
  {
    start: 377.4,
    end: 379.84,
    text: " like some of his friends.",
  },
  {
    start: 379.84,
    end: 384.08,
    text: " And you know this happened, but for the most part you can't remember.",
  },
  {
    start: 384.08,
    end: 393.71999999999997,
    text: " So it wasn't up until I started seeing my therapist and I started like becoming more aware",
  },
  {
    start: 393.71999999999997,
    end: 396.79999999999995,
    text: " of my altars and knowing who they were.",
  },
  {
    start: 396.8,
    end: 404.52000000000004,
    text: " So when I first started understanding that I had DID, obviously your first thought and",
  },
  {
    start: 404.52000000000004,
    end: 407.28000000000003,
    text: " first want to do is to fight against it.",
  },
  {
    start: 407.28000000000003,
    end: 408.64,
    text: " I don't want this.",
  },
  {
    start: 408.64,
    end: 411.12,
    text: " I don't want multiple personalities.",
  },
  {
    start: 411.12,
    end: 414.44,
    text: " You know, it's not a good thing like you want to get rid of them.",
  },
  {
    start: 414.44,
    end: 416.36,
    text: " You can't get rid of DID.",
  },
  {
    start: 416.36,
    end: 418.48,
    text: " You can never even get rid of an altar.",
  },
  {
    start: 418.48,
    end: 420.96000000000004,
    text: " They're always going to be there.",
  },
  {
    start: 420.96000000000004,
    end: 423.8,
    text: " So these things happen to you when you were a kid.",
  },
  {
    start: 423.8,
    end: 429.6,
    text: " And then through your teens and early 20s, you were experiencing symptoms of DID, but it",
  },
  {
    start: 429.6,
    end: 431.40000000000003,
    text: " was undiagnosed.",
  },
  {
    start: 431.40000000000003,
    end: 435.04,
    text: " And then you went to therapy, got diagnosed with DID.",
  },
  {
    start: 435.04,
    end: 441.16,
    text: " And you total have 11 altars, five of which are primary, but one used to come out every",
  },
  {
    start: 441.16,
    end: 442.16,
    text: " day.",
  },
  {
    start: 442.16,
    end: 443.48,
    text: " Let's start with her.",
  },
  {
    start: 443.48,
    end: 444.48,
    text: " Okay.",
  },
  {
    start: 444.48,
    end: 449.96000000000004,
    text: " So she is, her name is Minnie and she's a three year old girl.",
  },
  {
    start: 449.96000000000004,
    end: 452.24,
    text: " And that's one of your altars.",
  },
  {
    start: 452.24,
    end: 453.44,
    text: " She's one of my altars, isn't she?",
  },
  {
    start: 453.44,
    end: 457.36,
    text: " Is she you when you were three?",
  },
  {
    start: 457.36,
    end: 459.36,
    text: " No.",
  },
  {
    start: 459.36,
    end: 462.76,
    text: " So she was like the first one.",
  },
  {
    start: 462.76,
    end: 466.8,
    text: " The next one that ended up coming out was Devon.",
  },
  {
    start: 466.8,
    end: 470.08,
    text: " And Devon is Minnie's caretaker, if you will.",
  },
  {
    start: 470.08,
    end: 473.44,
    text: " So if there's something that is happening that a three year old shouldn't be seeing, she'll",
  },
  {
    start: 473.44,
    end: 476.44,
    text: " take over instead.",
  },
  {
    start: 476.44,
    end: 477.6,
    text: " Devon will take over.",
  },
  {
    start: 477.6,
    end: 479.08,
    text: " So Devon's a girl.",
  },
  {
    start: 479.08,
    end: 480.08,
    text: " Yeah.",
  },
  {
    start: 480.08,
    end: 481.68,
    text: " So Devon will come out.",
  },
  {
    start: 481.68,
    end: 484.48,
    text: " It's kind of like Minnie has DID.",
  },
  {
    start: 484.48,
    end: 491.8,
    text: " I feel like, and she has to become Devon in order to kind of, kind of.",
  },
  {
    start: 491.8,
    end: 500.2,
    text: " So like if a traumatic experience is happening, like the first thing in altars, like the first",
  },
  {
    start: 500.2,
    end: 502.24,
    text: " thing that they want to do is they want to help.",
  },
  {
    start: 502.24,
    end: 505.24,
    text: " So what they do is they take over.",
  },
  {
    start: 505.24,
    end: 506.96000000000004,
    text: " So that's what they would do when I was a child.",
  },
  {
    start: 506.96,
    end: 513.12,
    text: " Now, if a traumatic experience was happening to me as a child, they would take over.",
  },
  {
    start: 513.12,
    end: 519.56,
    text: " They would basically drive the body, if you will, kind of like a car.",
  },
  {
    start: 519.56,
    end: 522.76,
    text: " Are you aware that you've been taken over?",
  },
  {
    start: 522.76,
    end: 527.12,
    text: " So usually I wasn't, because I wasn't aware of all of that.",
  },
  {
    start: 527.12,
    end: 531.6,
    text: " But as, you know, I went through life and I started experiencing, okay, I get dizzy",
  },
  {
    start: 531.6,
    end: 534.6,
    text: " or I get kind of like tired and things like that.",
  },
  {
    start: 534.6,
    end: 539.36,
    text: " I started recognizing that, okay, I'm getting ready to switch.",
  },
  {
    start: 539.36,
    end: 545.0,
    text: " And as I started to work with them instead of against them, it became a lot easier.",
  },
  {
    start: 545.0,
    end: 547.16,
    text: " And it became like, okay, I'm going to switch.",
  },
  {
    start: 547.16,
    end: 548.16,
    text: " They're just going to take over.",
  },
  {
    start: 548.16,
    end: 549.36,
    text: " It's not a big deal.",
  },
  {
    start: 549.36,
    end: 550.52,
    text: " Okay, fine.",
  },
  {
    start: 550.52,
    end: 556.08,
    text: " We started to communicate with each other through a diary.",
  },
  {
    start: 556.08,
    end: 558.96,
    text: " And which was the only way that I could communicate with some of them.",
  },
  {
    start: 558.96,
    end: 561.9200000000001,
    text: " I've never even met all of them myself.",
  },
  {
    start: 561.92,
    end: 569.1999999999999,
    text: " I am co-conscious with five of them, meaning if they're out, I can see what they're seeing",
  },
  {
    start: 569.1999999999999,
    end: 570.92,
    text: " if they decide.",
  },
  {
    start: 570.92,
    end: 575.64,
    text: " So they can decide to kind of block me out.",
  },
  {
    start: 575.64,
    end: 581.4,
    text: " If I'm not co-conscious and I'm completely like an amnesia state, then you know, it's usually",
  },
  {
    start: 581.4,
    end: 583.68,
    text: " one of the other altars or something else is happening.",
  },
  {
    start: 583.68,
    end: 584.68,
    text: " One of the six.",
  },
  {
    start: 584.68,
    end: 585.68,
    text: " Yeah.",
  },
  {
    start: 585.68,
    end: 590.48,
    text: " When is the last time Mini came out?",
  },
  {
    start: 591.48,
    end: 595.9200000000001,
    text: " She actually doesn't come out as often anymore.",
  },
  {
    start: 595.9200000000001,
    end: 599.76,
    text: " I was in some pretty abusive relationships.",
  },
];
const overallSummary = `
Through vocal patterns and prosodic analysis, the individual's discussion of their experience with Dissociative Identity Disorder (DID) reveals complex emotional layers. Their voice modulation and speech patterns shift notably when describing different alters, with distinct changes in tone, rhythm, and vocal intensity marking transitions between topics. The speaker's prosodic features demonstrate varying emotional states through their narrative – their tone becomes more hesitant and measured when discussing early symptoms and diagnosis, with noticeable pauses suggesting careful reflection or possible emotional processing.

The cadence of their speech shows marked variation when addressing different aspects of their experience. When discussing the challenges of living with DID, their vocal rhythm exhibits patterns of tension and release, particularly evident in the pacing and stress patterns of their speech. The audio analysis reveals subtle shifts in vocal quality when describing traumatic childhood experiences, with changes in pitch and volume suggesting emotional engagement with these difficult memories.

Their speech patterns indicate moments of introspection through strategic pauses and variations in speaking tempo, especially pronounced when elaborating on the relationship with their alters. The prosodic features of their narrative demonstrate a complex emotional journey – the rhythm of their speech becomes more fluid when discussing acceptance of their condition, contrasting with more fragmented patterns when recounting periods of confusion and disorientation.

The speaker's vocal modulations suggest an underlying emotional processing throughout the discourse. Their tone carries varying degrees of intensity, softening notably when describing therapeutic progress and becoming more animated when discussing their growing understanding of their alters. The audio patterns reveal moments of emotional vulnerability through subtle breaks in voice and changes in speech rate, particularly evident when addressing societal perceptions of their condition.

Throughout the narrative, the prosodic analysis indicates a gradual shift in emotional state – from tension evident in early descriptions to a more measured, accepting tone when discussing their current relationship with their alters. These vocal patterns suggest an evolving psychological landscape, marked by both ongoing challenges and developing resilience in managing their condition. The rhythm and flow of their speech become more integrated when describing their journey toward acceptance, reflecting their therapeutic progress in reconciling different aspects of their identity.`;

// Wave Bar Component
const WaveBar = ({ active, height }: { active: boolean; height: number }) => (
  <motion.div
    className={`w-0.5 mx-[0.5px] rounded-full ${
      active ? "bg-amber-400" : "bg-gray-600/50"
    }`}
    animate={{
      height: height,
    }}
    transition={{
      duration: 0.2,
      ease: "easeOut",
    }}
  />
);

const AudioPlayer = () => {
  // Existing state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isAudioEnded, setIsAudioEnded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [waveHeights, setWaveHeights] = useState<number[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationFrameRef = useRef<number>();

  // Initialize wave heights
  useEffect(() => {
    const heights = Array.from(
      { length: 128 },
      () => Math.floor(Math.random() * 16) + 4
    );
    setWaveHeights(heights);
  }, []);

  // Update wave heights periodically when playing
  useEffect(() => {
    const updateWaveHeights = () => {
      if (isPlaying) {
        setWaveHeights((prev) =>
          prev.map(() => Math.floor(Math.random() * 16) + 4)
        );
      }
    };

    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(updateWaveHeights, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  // Split audio initialization and playback effects
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Initial setup
    const handleLoadedMetadata = () => {
      console.log("Metadata loaded - Duration:", audio.duration);
      setDuration(audio.duration);
      setError(null);
    };

    const handleError = (e: Event) => {
      console.error("Audio error:", e);
      setError("Failed to load audio. Please try again later.");
    };

    // Add initial event listeners
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("error", handleError);

    // Load audio
    audio.load();

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  // Handle playback and time updates
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      animationFrameRef.current = requestAnimationFrame(updateTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setIsAudioEnded(true);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };

    audio.addEventListener("ended", handleEnded);

    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(updateTime);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      audio.removeEventListener("ended", handleEnded);
    };
  }, [isPlaying]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      } else {
        if (audio.readyState < 2) {
          await new Promise((resolve) => {
            audio.addEventListener("canplay", resolve, { once: true });
          });
        }
        await audio.play();
      }
      setIsPlaying(!isPlaying);
    } catch (e) {
      console.error("Playback failed:", e);
      setError("Playback failed. Please try again.");
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSeek = (time: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      const validTime = Math.max(0, Math.min(time, duration));
      audio.currentTime = validTime;
      setCurrentTime(validTime);

      if (validTime < duration) {
        setIsAudioEnded(false);
      }

      if (isAudioEnded && validTime < duration) {
        setIsAudioEnded(false);
      }
    } catch (error) {
      console.error("Error seeking:", error);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Find current summary and transcript
  const findCurrentSummary = () => {
    if (isAudioEnded) return overallSummary;
    const summary = summaries
      .slice()
      .reverse()
      .find((s) => currentTime >= s.Interval_Time);
    return summary ? summary.Psychometric_Summary : "No summary available.";
  };

  const findCurrentMessage = () => {
    const message = messages.find(
      (msg) => currentTime >= msg.start && currentTime < msg.end
    );
    return message ? message.text : "No transcript available.";
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;
  const totalBars = 128;
  const activeBarIndex = Math.floor((progress / 100) * totalBars);

  return (
    <div className="w-screen min-h-screen rounded-3xl flex flex-col bg-white ">
      <div className="max-w-7xl w-full mx-auto p-6">
        <h2 className="text-2xl font-semibold text-[#2A6F97] mb-6">
          Audio Insights
        </h2>
        {/* Audio Player Section */}
        <div className="w-full bg-white backdrop-blur-xl p-6 rounded-xl shadow-lg text-black mb-8">
          <audio
            ref={audioRef}
            src={AUDIO_URL}
            preload="auto"
            onLoadedMetadata={(e) => {
              const audio = e.currentTarget;
              setDuration(audio.duration);
              setCurrentTime(audio.currentTime);
            }}
          />

          <div className="text-center mb-6">
            {/* <h1 className="text-2xl font-semibold">Audio Analysis</h1> */}
            {/* <p className="text-sm text-black">
              Real-time Transcription & Analysis
            </p> */}
          </div>

          {error ? (
            <div className="text-red-500 text-center mb-4">{error}</div>
          ) : (
            <>
              <div className="relative w-full h-16 mb-2 flex items-center">
                <div className="absolute inset-0 flex items-center justify-between">
                  {waveHeights.map((height, index) => (
                    <WaveBar
                      key={index}
                      active={index <= activeBarIndex}
                      height={isPlaying ? height : 4}
                    />
                  ))}
                </div>
                <input
                  type="range"
                  className="absolute inset-0 w-full opacity-0 cursor-pointer"
                  min="0"
                  max={duration || 100}
                  step="0.1"
                  value={currentTime}
                  onChange={(e) => handleSeek(Number(e.target.value))}
                />
              </div>

              <div className="flex justify-between text-sm text-gray-400 mb-6">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>

              <div className="flex items-center justify-between px-4">
                <div className="relative group">
                  <button
                    className="text-black/80 hover:text-orange-400 transition-colors relative"
                    onClick={() => handleSeek(Math.max(currentTime - 10, 0))}
                    title="Rewind 10 seconds"
                  >
                    <SkipBack size={28} />
                  </button>
                </div>

                <motion.button
                  className="bg-amber-400 text-black p-4 rounded-full"
                  onClick={togglePlay}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isPlaying ? (
                    <Pause size={28} />
                  ) : (
                    <Play size={28} className="ml-1" />
                  )}
                </motion.button>

                <div className="relative group">
                  <button
                    className="text-black/80 hover:text-orange-400 transition-colors relative"
                    onClick={() =>
                      handleSeek(Math.min(currentTime + 10, duration))
                    }
                    title="Forward 10 seconds"
                  >
                    <SkipForward size={28} />
                  </button>
                </div>

                <button
                  className="text-black/80 hover:text-orange-400 transition-colors relative"
                  onClick={toggleMute}
                >
                  {isMuted ? <VolumeX size={28} /> : <Volume2 size={28} />}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Language Selection */}

        {/* Transcript and Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Transcript Panel */}
          <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-[#2A6F97] mb-4">
              Transcript
            </h3>
            <div
              className={`text-gray-700 text-lg ${
                findCurrentMessage()?.split(".").length > 10
                  ? "h-[500px] overflow-y-auto"
                  : "min-h-fit"
              }`}
            >
              {findCurrentMessage() || "Play Audio to see the transcript ."}
            </div>
          </div>

          {/* Summary/Final Report Panel */}
          <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-[#2A6F97] mb-4">
              {isAudioEnded ? "Final Report" : "Summary"}
            </h3>
            <div
              className={`text-gray-700 text-lg justify-content${
                findCurrentSummary()?.split(".").length > 10
                  ? "h-[500px] overflow-y-auto"
                  : "min-h-fit"
              }`}
            >
              {findCurrentSummary()}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isAudioEnded && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 text-center text-sm text-gray-600"
            >
              <p>Playback has ended. Replay to continue analysis.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AudioPlayer;
