"use client";

import { useState, useEffect, useMemo } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

// Update the Testimonial type to match the AnimatedTestimonials component
type Testimonial = {
  quote: string;
  src: string;
  name: string;
  designation: string;
};

const AcceptedReviews: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  // Use useMemo to memoize the static testimonials array
  const staticTestimonials: Testimonial[] = useMemo(
    () => [
      {
        src: "/Image1.jpg",
        quote: "Amazing service!",
      },
      {
        src: "/Image2.jpg",
        quote: "Highly recommended!",
      },
      {
        src: "/Image3.jpg",
        quote: "User-friendly and efficient.",
      },
      {
        src: "/Image4.jpg",
        quote: "A wonderful experience.",
      },
      {
        src: "/Image5.jpg",
        quote: "Would use it again!",
      },
    ],
    []
  );

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(
          collection(db, "feedback"),
          where("status", "==", "Pending") // Corrected status condition
        );
        const querySnapshot = await getDocs(q);

        // Map the fetched data into the required format for AnimatedTestimonials
        const fetchedTestimonials = querySnapshot.docs.map((doc, index) => {
          const data = doc.data();
          return {
            quote: data.feedback || "No feedback provided.",
            src: staticTestimonials[index % staticTestimonials.length].src,
          };
        });

        // Use dynamic testimonials if available, fallback to static otherwise
        setTestimonials(
          fetchedTestimonials.length > 0
            ? fetchedTestimonials
            : staticTestimonials
        );
      } catch (error) {
        console.error("Error fetching accepted reviews:", error);
        setTestimonials(staticTestimonials); // Fallback to static on error
      }
    };

    fetchReviews();
  }, [staticTestimonials]);

  return (
    <div className="py-20 px-6">
      <h2 className="text-3xl font-bold  text-[#4A4A4A] text-center mb-10  dark:text-white">
        What Our Users Say
      </h2>
      {testimonials.length > 0 ? (
        <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
      ) : (
        <p className="text-center text-gray-500">
          No reviews available at the moment.
        </p>
      )}
    </div>
  );
};

export default AcceptedReviews;