'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const GsapAnimations = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Text Animation
    gsap.from(".gsap-hero-text", {
      duration: 1.5,
      y: 50,
      opacity: 0,
      stagger: 0.2,
      ease: "power3.out",
      delay: 0.2
    });

    // Reveal animations for About section
    gsap.from(".gsap-reveal-left", {
      scrollTrigger: {
        trigger: ".gsap-reveal-left",
        start: "top 80%",
      },
      duration: 1,
      x: -50,
      opacity: 0,
      ease: "power2.out"
    });

    gsap.from(".gsap-reveal-right", {
      scrollTrigger: {
        trigger: ".gsap-reveal-right",
        start: "top 80%",
      },
      duration: 1,
      x: 50,
      opacity: 0,
      ease: "power2.out"
    });

    // Fade up animations
    const fadeUpElements = document.querySelectorAll(".gsap-fade-up");
    fadeUpElements.forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
        duration: 1,
        y: 40,
        opacity: 0,
        ease: "power2.out"
      });
    });

    // Staggered cards
    const cardContainers = document.querySelectorAll(".gsap-stagger-container");
    cardContainers.forEach((container) => {
      const cards = container.querySelectorAll(".gsap-stagger-card");
      gsap.from(cards, {
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
        },
        duration: 0.8,
        y: 60,
        opacity: 0,
        stagger: 0.15,
        ease: "power2.out"
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return null;
};

export default GsapAnimations;
