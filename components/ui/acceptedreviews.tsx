"use client";

import React, { useState, useEffect, useCallback } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Testimonial = {
  id: string;
  quote: string;
  name: string;
  src: string;
};

const staticTestimonials = [
  { src: "/Image1.jpg", caption: "Amazing service!" },
  { src: "/Image2.jpg", caption: "Highly recommended!" },
  { src: "/Image3.jpg", caption: "User-friendly and efficient." },
  { src: "/Image4.jpg", caption: "A wonderful experience." },
  { src: "/Image5.jpg", caption: "Would use it again!" },
];

export default function AcceptedReviews() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchReviews = useCallback(async () => {
    try {
      const q = query(
        collection(db, "feedback"),
        where("status", "==", "Pending")
      );
      const querySnapshot = await getDocs(q);

      const fetchedTestimonials = querySnapshot.docs.map((doc, index) => {
        const data = doc.data();
        return {
          id: doc.id,
          quote: data.feedback || "No feedback provided.",
          name: data.name || `Anonymous`,
          src: staticTestimonials[index % staticTestimonials.length].src,
        };
      });

      setTestimonials(
        fetchedTestimonials.length > 0 ? fetchedTestimonials : []
      );
    } catch (error) {
      console.error("Error fetching testimonials from Firebase:", error);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  }, [testimonials.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  if (testimonials.length === 0) {
    return (
      <div className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          What Our Users Say
        </h2>
        <p className="text-center text-gray-600">
          No reviews available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="py-6 px-2 mx-auto max-w-[800px]">
      <h2 className="text-xl font-bold text-gray-800 text-center mb-6">
        What Our Users Say
      </h2>
      <div className="relative">
        <Card className="overflow-hidden border rounded-2xl border-gray-200 shadow-md bg-[#f2edeb] mx-auto max-w-4xl">
          <CardContent className="p-4 md:p-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 items-center">
              {/* Testimonial Text */}
              <div className="space-y-3 order-2 md:order-1">
                <h3 className="text-xs md:text-sm text-gray-800">
                  {testimonials[currentIndex]?.quote}
                </h3>
                <div className="space-y-1">
                  <p className="text-xs md:text-sm font-medium text-gray-700">
                    ~{testimonials[currentIndex]?.name}
                  </p>
                </div>
              </div>
              {/* Testimonial Image */}
              <div className="relative aspect-square w-full max-w-[100px] md:max-w-[300px] mx-auto order-1 md:order-2">
                <Image
                  src={testimonials[currentIndex]?.src}
                  alt={
                    staticTestimonials[currentIndex % staticTestimonials.length]
                      .caption
                  }
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="absolute top-1/2 flex w-full -translate-y-1/2 justify-between px-4">
          {/* Left Button */}
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-white text-gray-800 hover:bg-gray-100 hover:text-gray-900 border-gray-300 shadow-sm -translate-x-6"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
            <span className="sr-only">Previous slide</span>
          </Button>
          {/* Right Button */}
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-white text-gray-800 hover:bg-gray-100 hover:text-gray-900 border-gray-300 shadow-sm translate-x-6"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
            <span className="sr-only">Next slide</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
