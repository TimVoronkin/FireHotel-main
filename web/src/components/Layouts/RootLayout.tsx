// import React from 'react';
import Footer from './Footer';
import Header from './Header';
import { Outlet } from 'react-router';
import { useEffect, useRef } from 'react';

function RootLayout() {
  // Parallax effect for scattered objects (global)
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const objs = document.querySelectorAll('.parallax-obj');
      objs.forEach((img) => {
        const speed = parseFloat((img as HTMLElement).getAttribute('data-parallax-speed') || '0.15');
        const rotate = (img as HTMLElement).getAttribute('data-rotate') || '0';
        // mouse offset
        const mx = parseFloat((img as HTMLElement).getAttribute('data-mouse-x') || '0');
        const my = parseFloat((img as HTMLElement).getAttribute('data-mouse-y') || '0');
        const mouseX = mouseRef.current.x;
        const mouseY = mouseRef.current.y;
        const mouseOffsetX = (mouseX - 0.5) * mx;
        const mouseOffsetY = (mouseY - 0.5) * my;
        (img as HTMLElement).style.transform =
          `rotate(${rotate}deg) translateY(${scrollY * speed + mouseOffsetY}px) translateX(${mouseOffsetX}px)`;
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
      handleScroll();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="tw-bg-primary flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col z-10">
        <Outlet />
        
      </main>
      <Footer />
      
      {/* Parallax/scattered background for all pages */}
      <div className="pointer-events-none select-none w-full h-full fixed top-0 left-0 overflow-hidden" style={{ zIndex: 0 }}>
        {[
          'obj-1.png','obj-2.png','obj-3.png','obj-4.png','obj-5.png','obj-6.png','obj-7.png','obj-8.png','obj-9.png','obj-10.png',
          'obj-11.png','obj-12.png','obj-13.png','obj-14.png','obj-15.png','obj-16.png','obj-17.png','obj-18.png','obj-19.png','obj-20.png',
          'obj-21.png','obj-22.png','obj-23.png','obj-24.png','obj-25.png','obj-26.png','obj-27.png','obj-28.png','obj-29.png','obj-30.png','obj-31.png',
        ].map((file, i) => {
          function seededRandom(seed: number) {
            var x = Math.sin(seed) * 10002;
            return x - Math.floor(x);
          }
          const seed = i * 13 + 42;
          const top = `${seededRandom(seed) * 90 + 2}%`;
          const left = `${seededRandom(seed + 1) * 90 + 2}%`;
          const size = 60 + seededRandom(seed + 2) * 60;
          const rotate = seededRandom(seed + 3);
          const parallaxSpeed = 0.08 + seededRandom(seed + 4) * -0.5;
          // Добавим индивидуальное смещение для мыши
          const mouseX = (seededRandom(seed + 5) - 0.5) * 40; // от -20 до +20 px
          const mouseY = (seededRandom(seed + 6) - 0.5) * 40;
          return (
            <img
              key={file}
              src={`/objs/${file}`}
              alt="bg-obj"
              className="parallax-obj"
              data-parallax-speed={parallaxSpeed}
              data-rotate={rotate}
              data-mouse-x={mouseX}
              data-mouse-y={mouseY}
              style={{
                position: 'absolute',
                top,
                left,
                width: size,
                height: 'auto',
                opacity: 0.2,
                transform: `rotate(${rotate}deg)`,
                zIndex: 0
              }}
              draggable={false}
            />
          );
        })}
      </div>
    </div>
  );
}

export default RootLayout;
