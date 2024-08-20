import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas element not found.");
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      console.error("Failed to get 2D context.");
      return;
    }

    const frames = {
      currentIndex: 0,
      maxIndex: 1345
    };

    let imagesLoaded = 0;
    const images = [];

    function preloadImages() {
      for (let i = 1; i <= frames.maxIndex; i++) {
        const imageUrl =  `/scroll-animate-2/images/frame_${i.toString().padStart(4, "0")}.jpeg`;
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
          imagesLoaded++
          if (imagesLoaded === frames.maxIndex) {
            LoadImage(frames.currentIndex);
            startAnimation();
          }
        };
        images.push(img);
      }
    }

    function LoadImage(index) {
      if (index >= 0 && index <= frames.maxIndex) {
        const img = images[index];

        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        
        const scale = Math.max(scaleX, scaleY);

        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
        frames.currentIndex = index;
      }
    }

    window.addEventListener("resize", function () {
      LoadImage(Math.floor(frames.currentIndex))
    })

    function startAnimation() {

      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".parent",
          start: "top top",
          scrub: 2,
          end: "bottom bottom",

        }
      });
       
      function updateFrame(index) {
        return {
          currentIndex: index,
          onUpdate: function () {
            LoadImage(Math.floor(frames.currentIndex));
          }
        }
      }


      tl
      .to(frames, updateFrame(100),'a')
      .to(".text-1", {opacity: 0, ease: 'linear'},'a')

      .to(frames, updateFrame(200),'b')
      .to(".text-2", {opacity: 1, ease: 'linear'},'b')

      .to(frames, updateFrame(300),'c')
      .to(".text-2", {opacity: 0, ease: 'linear'},'c')

      .to(frames, updateFrame(400),'d')
      .to(".text-3", {opacity: 1, ease: 'linear'},'d')

      .to(frames, updateFrame(500),'e')
      .to(".text-3", {opacity: 1, ease: 'linear'},'e')

      .to(frames, updateFrame(600),'f')
      .to(".text-3", {opacity: 0, ease: 'linear'},'f')

      .to(frames, updateFrame(700),'g')
      .to(".panel", {x: "0%", ease: 'expo'},'g')

      .to(frames, updateFrame(800),'h')
      .to(".panel", {x: "0%", ease: 'expo'},'h')

      .to(frames, updateFrame(900),'i')
      .to(".panel", {opacity: 0, ease: 'linear'},'i')

      .to(frames, updateFrame(1000),'j')
      .to("canvas", {scale: .5, ease: 'linear'},'j')

      .to(frames, updateFrame(1100),'k')
      .to(".panelise", {opacity: 1, ease: 'expo'},'k')

      .to(frames, updateFrame(1200),'k')
      .to(".panelise span", {width: 200, ease: 'expo'},'k')

      .to(frames, updateFrame(1300),'l')
      .to("canvas", {scale: 1, ease: 'linear'},'l')

      .to(frames, updateFrame(1345),'l')
      .to(".panelise", {opacity: 0, scale: 2, ease: 'linear'},'l')

    }

    preloadImages()
  }, [])

  return (
    <>
      <div className="w-full bg-zinc-900">

        <div className="parent relative top-0 left-0 w-full h-[2000vh]">
          <div className="w-full sticky top-0 left-0 h-screen overflow-x-hidden">
            <canvas ref={canvasRef} id="frame" className="w-full h-screen"></canvas>
            <div className=' absolute text-1 z-[2] text-white bottom-10 w-1/2 left-10'>
              <h1 className=' leading-20 font-[100] text-3xl'>
                &copy; 2024 DOZE STD
              </h1>
              <h1 className='text-3xl'>SHAPING BRANDS - CRAFTING MOTION</h1>
            </div>
            <div className=' absolute text-2 flex z-[2] text-white opacity-0 text-right right-10 bottom-10 w-1/2'>
              <h1 className=' leading-20 font-[100] text-6xl uppercase'>
                  transforming visions
              </h1>
              <h1 className='text-xl w-1/2'>
                building indentity and inspiring action, Sculpting digital expert and resonate.
              </h1>
            </div>
            <div className=' absolute text-3 z-[2] text-white top-1/2 left-1/2 text-center opacity-0 -translate-y-1/2 -translate-x-1/2'>
              <h1 className=' leading-20 font-[100] text-6xl uppercase'>
                Elevating AestheticS
              </h1>
              <h1 className='text-xl'>
                  Crafting Solutions and exlproring new horizons, Evolving and elevating in every project.
              </h1>
            </div>
            <div className='w-1/3 panel absolute z-[2] top-0 right-0 p-10 h-screen bg-white translate-x-full'>
              <h1 className='panelelem text-xl font-[100]'>
                2024 Doze.std
              </h1>
              <p className='panellem mt-10 text-xl'>
                Sculpting-original
                Transforming visions into digital skills realistics. Wearing stories that captivate.
                Exploring new possibilities with a focus an narrative , crafting  solution that engeg
                and elevate.
              </p>
              <button className='panelelem border-[1px] px-3 py-2  border-[#555] font-[100] mt-6'>
                Get review
              </button>

              <div className=' absolute panelelem bottom-10'>
                <h3 className='text-xl'>Innovating Design</h3>
                <p className='text-sm mt-3'>Connecting ideas  to faster creativity, desighing impactful experience 
                that resourse.</p>
                <button className='bg-black text-white px-7  text-sm mt-4 py-4 font-[100] capitalize'>experience</button>
              </div>
            </div>
            <div className=' absolute opacity-0 z-[2] panelise text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-6xl tracking-tighter'>
              &copy; panelise <span className='line w-10 h-1 bg-white inline-block'></span>2048
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
