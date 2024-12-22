// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import { collection, query, where, getDocs } from "firebase/firestore";
// import { db } from "../../lib/firebase";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";

// type Testimonial = {
//   id: string;
//   quote: string;
//   name: string;
//   src: string;
// };

// const staticTestimonials = [
//   { src: "/Image1.jpg", caption: "Amazing service!" },
//   { src: "/Image2.jpg", caption: "Highly recommended!" },
//   { src: "/Image3.jpg", caption: "User-friendly and efficient." },
//   { src: "/Image4.jpg", caption: "A wonderful experience." },
//   { src: "/Image5.jpg", caption: "Would use it again!" },
// ];

// export default function AcceptedReviews() {
//   const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const fetchReviews = useCallback(async () => {
//     try {
//       const q = query(
//         collection(db, "feedback"),
//         where("status", "==", "Pending")
//       );
//       const querySnapshot = await getDocs(q);

//       const fetchedTestimonials = querySnapshot.docs.map((doc, index) => {
//         const data = doc.data();
//         return {
//           id: doc.id,
//           quote: data.feedback || "No feedback provided.",
//           name: data.name || `Anonymous`,
//           src: staticTestimonials[index % staticTestimonials.length].src,
//         };
//       });

//       setTestimonials(
//         fetchedTestimonials.length > 0 ? fetchedTestimonials : []
//       );
//     } catch (error) {
//       console.error("Error fetching testimonials from Firebase:", error);
//     }
//   }, []);

//   useEffect(() => {
//     fetchReviews();
//   }, [fetchReviews]);

//   const nextSlide = useCallback(() => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
//   }, [testimonials.length]);

//   const prevSlide = useCallback(() => {
//     setCurrentIndex(
//       (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
//     );
//   }, [testimonials.length]);

//   useEffect(() => {
//     const interval = setInterval(nextSlide, 5000);
//     return () => clearInterval(interval);
//   }, [nextSlide]);

//   if (testimonials.length === 0) {
//     return (
//       <div className="py-8 px-4 max-w-6xl mx-auto">
//         <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
//           What Our Users Say
//         </h2>
//         <p className="text-center text-gray-600">
//           No reviews available at the moment.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="py-4 px-2 mx-auto max-w-[800px]">
//       <h2 className="text-lg font-bold text-gray-800 text-center mb-3">
//         What Our Users Say
//       </h2>
//       <div className="relative">
//         <Card className="overflow-hidden border rounded-xl border-gray-200 shadow-md bg-[#f2edeb] mx-auto max-w-4xl">
//           <CardContent className="p-3 md:p-4">
//             <div className="grid gap-3 md:grid-cols-2 md:gap-4 items-center">
//               {/* Testimonial Text */}
//               <div className="space-y-2 order-2 md:order-1">
//                 <h3 className="text-xs md:text-sm text-gray-800 pl-2">
//                   {testimonials[currentIndex]?.quote}
//                 </h3>
//                 <p className="text-xs font-medium text-gray-700">
//                   ~{testimonials[currentIndex]?.name}
//                 </p>
//               </div>
//               {/* Testimonial Image */}
//               <div className="relative aspect-square w-full max-w-[80px] md:max-w-[150px] mx-auto order-1 md:order-2">
//                 <Image
//                   src={testimonials[currentIndex]?.src}
//                   alt={
//                     staticTestimonials[currentIndex % staticTestimonials.length]
//                       .caption
//                   }
//                   fill
//                   className="object-cover rounded-lg"
//                 />
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Navigation Buttons */}
//         <div className="absolute top-1/2 flex w-full -translate-y-1/2 justify-between px-2">
//           <Button
//             variant="outline"
//             size="icon"
//             className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-white text-gray-800 hover:bg-gray-100 hover:text-gray-900 border-gray-300 shadow-sm -translate-x-4"
//             onClick={prevSlide}
//           >
//             <ChevronLeft className="h-3 w-3 md:h-4 md:w-4" />
//             <span className="sr-only">Previous slide</span>
//           </Button>
//           <Button
//             variant="outline"
//             size="icon"
//             className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-white text-gray-800 hover:bg-gray-100 hover:text-gray-900 border-gray-300 shadow-sm translate-x-4"
//             onClick={nextSlide}
//           >
//             <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
//             <span className="sr-only">Next slide</span>
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
//}

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  src: string;
}

const staticTestimonials = [
  { src: "/Image1.jpg", caption: "Amazing service!" },
  { src: "/Image2.jpg", caption: "Highly recommended!" },
  { src: "/Image3.jpg", caption: "User-friendly and efficient." },
  { src: "/Image4.jpg", caption: "A wonderful experience." },
  { src: "/Image5.jpg", caption: "Would use it again!" },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

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
          name: data.name || "Anonymous",
          src: staticTestimonials[index % staticTestimonials.length].src,
        };
      });

      setTestimonials(
        fetchedTestimonials.length > 0
          ? fetchedTestimonials
          : staticTestimonials
      );
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      setTestimonials(staticTestimonials);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 2) % testimonials.length);
  }, [testimonials.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 2 + testimonials.length) % testimonials.length
    );
  }, [testimonials.length]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isHovered) {
      interval = setInterval(nextSlide, 5000);
    }
    return () => clearInterval(interval);
  }, [nextSlide, isHovered]);

  if (isLoading) {
    return (
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="space-y-4 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-32" />
          <div className="h-12 bg-gray-200 rounded w-64" />
          <div className="h-6 bg-gray-200 rounded w-48" />
          <div className="h-[400px] bg-gray-200 rounded-2xl" />
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-16 px-4 max-w-6xl mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="space-y-4 mb-12">
        <p className="text-orange-500 font-medium tracking-wide uppercase">
          TESTIMONIALS
        </p>
        <div className="flex items-center justify-between">
          <h2 className="text-4xl md:text-5xl font-bold text-black">
            What our Users{" "}
            <span className="italic font-serif text-orange-500">said</span>
          </h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full bg-orange-600 hover:bg-orange-50"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous testimonial</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full bg-orange-600  hover:bg-orange-50"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next testimonial</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 50}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="flex-shrink-0 w-full md:w-[50%] px-2"
            >
              <div className="bg-orange-50 rounded-xl p-4 md:p-6">
                <div className="grid md:grid-cols-[200px,1fr] gap-4 items-center">
                  <div className="relative w-[150px] aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={testimonial.src}
                      alt={`Testimonial from ${testimonial.name}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="text-orange-500 text-4xl font-serif">‟</div>
                    <h3 className="text-lg md:text-lg text-gray-800 ">
                      {testimonial.quote}
                    </h3>
                    <p className="text-orange-500 font-medium">
                      ~{testimonial.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
