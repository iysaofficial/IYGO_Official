'use client';

import React, { useEffect, useRef } from "react";
import Image from 'next/image';
import '../assets/css/Gallery.css';

const GalleryComp: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const leftArrowRef = useRef<HTMLElement>(null);
  const rightArrowRef = useRef<HTMLElement>(null);
  const firstImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    const firstImage = firstImageRef.current;
    const leftArrow = leftArrowRef.current;
    const rightArrow = rightArrowRef.current;

    if (!carousel || !firstImage || !leftArrow || !rightArrow) return;

    // Pindahkan variabel ke dalam useEffect
    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;
    let scrollDiff = 0;

    const toggleArrowIcons = () => {
      const maxScroll = Math.round(carousel.scrollWidth - carousel.clientWidth);
      leftArrow.style.display = carousel.scrollLeft <= 0 ? "none" : "block";
      rightArrow.style.display = Math.round(carousel.scrollLeft) >= maxScroll ? "none" : "block";
    };

    const scrollCarousel = (direction: "left" | "right") => {
      const cardWidth = firstImage.clientWidth + 14;
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;
      const scrollAmount = direction === "right" ? cardWidth : -cardWidth;
      carousel.scrollLeft = Math.min(Math.max(carousel.scrollLeft + scrollAmount, 0), maxScroll);
      toggleArrowIcons();
    };

    const autoCenterImage = () => {
      const cardWidth = firstImage.clientWidth + 14;
      const offset = carousel.scrollLeft % cardWidth;
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;
      if (carousel.scrollLeft > 0 && carousel.scrollLeft < maxScroll) {
        if (offset > cardWidth / 3) {
          carousel.scrollLeft += cardWidth - offset;
        } else {
          carousel.scrollLeft -= offset;
        }
      }
      toggleArrowIcons();
    };

    const startDragging = (event: MouseEvent | TouchEvent) => {
      isDragging = true;
      startX = 'pageX' in event ? event.pageX : event.touches[0].pageX;
      scrollStart = carousel.scrollLeft;
      carousel.classList.add("dragging");
    };

    const duringDrag = (event: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const currentX = 'pageX' in event ? event.pageX : event.touches[0].pageX;
      scrollDiff = currentX - startX;
      carousel.scrollLeft = scrollStart - scrollDiff;
    };

    const stopDragging = () => {
      if (!isDragging) return;
      isDragging = false;
      carousel.classList.remove("dragging");
      if (Math.abs(scrollDiff) > 10) {
        autoCenterImage();
      }
    };

    const onLeftClick = () => scrollCarousel("left");
    const onRightClick = () => scrollCarousel("right");

    // Inisialisasi awal
    toggleArrowIcons();

    // Event listeners
    leftArrow.addEventListener("click", onLeftClick);
    rightArrow.addEventListener("click", onRightClick);
    carousel.addEventListener("mousedown", startDragging as EventListener);
    carousel.addEventListener("touchstart", startDragging as EventListener);
    document.addEventListener("mousemove", duringDrag as EventListener);
    document.addEventListener("mouseup", stopDragging);
    carousel.addEventListener("touchmove", duringDrag as EventListener);
    carousel.addEventListener("touchend", stopDragging);
    carousel.addEventListener("scroll", toggleArrowIcons);

    // Cleanup
    return () => {
      leftArrow.removeEventListener("click", onLeftClick);
      rightArrow.removeEventListener("click", onRightClick);
      carousel.removeEventListener("mousedown", startDragging as EventListener);
      carousel.removeEventListener("touchstart", startDragging as EventListener);
      document.removeEventListener("mousemove", duringDrag as EventListener);
      document.removeEventListener("mouseup", stopDragging);
      carousel.removeEventListener("touchmove", duringDrag as EventListener);
      carousel.removeEventListener("touchend", stopDragging);
      carousel.removeEventListener("scroll", toggleArrowIcons);
    };
  }, []);

  return (
    <section className="gallery-section">
      <div className="gallery-wrapper">
        <i id="left" className="fa-solid fa-angle-left" ref={leftArrowRef}></i>
        <div className="gallery-carousel" ref={carouselRef}>
          <Image 
            src="/assets/images/gallery/1.PNG" 
            alt="Gallery image 1" 
            width={300} 
            height={200}
            draggable="false" 
            ref={firstImageRef}
            priority
          />
          <Image 
            src="/assets/images/gallery/2.PNG" 
            alt="Gallery image 2" 
            width={300} 
            height={200}
            draggable="false"
          />
          <Image 
            src="/assets/images/gallery/3.PNG" 
            alt="Gallery image 3" 
            width={300} 
            height={200}
            draggable="false"
          />
          <Image 
            src="/assets/images/gallery/4.jpg" 
            alt="Gallery image 4" 
            width={300} 
            height={200}
            draggable="false"
          />
          <Image 
            src="/assets/images/gallery/5.PNG" 
            alt="Gallery image 5" 
            width={300} 
            height={200}
            draggable="false"
          />
          <Image 
            src="/assets/images/gallery/6.jpg" 
            alt="Gallery image 6" 
            width={300} 
            height={200}
            draggable="false"
          />
          <Image 
            src="/assets/images/gallery/7.PNG" 
            alt="Gallery image 7" 
            width={300} 
            height={200}
            draggable="false"
          />
        </div>
        <i id="right" className="fa-solid fa-angle-right" ref={rightArrowRef}></i>
      </div>
    </section>
  );
};

export default GalleryComp;