import React, { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { ShoppingCart, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  return (
    <>
      <section ref={targetRef} className="bg-white h-[350vh]">
        <div className="h-screen sticky top-0 z-0 grid grid-cols-3 grid-rows-3 gap-4 p-4 overflow-hidden">
          <HeroCopy scrollYProgress={scrollYProgress} />
          <ProductImages scrollYProgress={scrollYProgress} />
          <DecorativeCircles />
        </div>
      </section>

      <div className="h-screen bg-gradient-to-br from-blue-600 to-cyan-600 text-white flex items-center justify-center">
        <div className="text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">Premium Quality Guaranteed</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            All our frozen food products are carefully selected and stored at optimal temperatures
          </p>
        </div>
      </div>
    </>
  );
};

const HeroCopy = ({ scrollYProgress }) => {
  const copyScale = useTransform(scrollYProgress, [0, 0.75], [1, 0.5]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 0.75], ['0%', '7.5%']);

  return (
    <motion.div
      style={{
        scale: copyScale,
        opacity: copyOpacity,
        y: copyY,
      }}
      className="absolute px-8 w-full h-screen z-20 flex flex-col items-center justify-center"
    >
      <h1 className="text-slate-950 text-5xl md:text-7xl font-bold text-center max-w-3xl leading-tight">
        Premium Frozen Food
        <br />
        <span className="text-blue-600">Delivered Fresh</span>
      </h1>
      <p className="text-slate-600 text-sm md:text-base text-center max-w-2xl my-6">
        Explore our premium collection of frozen food products. Perfect for bulk orders and commercial use. 
        Quality guaranteed with fast, reliable delivery.
      </p>
      <div className="flex items-center gap-4 flex-wrap justify-center">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold rounded-lg"
        >
          <ShoppingCart className="w-5 h-5" />
          Browse Products
        </Link>
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-transparent hover:bg-slate-100 transition-colors text-slate-950 font-semibold rounded-lg border border-slate-300">
          <Info className="w-5 h-5" />
          Learn More
        </button>
      </div>
    </motion.div>
  );
};

const ProductImages = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  const image1Offset = useTransform(scrollYProgress, [0, 1], ['-35%', '0%']);

  const image2OffsetX = useTransform(scrollYProgress, [0, 1], ['30%', '0%']);
  const image2OffsetY = useTransform(scrollYProgress, [0, 1], ['-30%', '0%']);

  const image3OffsetX = useTransform(scrollYProgress, [0, 1], ['-25%', '0%']);
  const image3OffsetY = useTransform(scrollYProgress, [0, 1], ['25%', '0%']);

  const image4OffsetX = useTransform(scrollYProgress, [0, 1], ['25%', '0%']);
  const image4OffsetY = useTransform(scrollYProgress, [0, 1], ['-145%', '0%']);

  const image5OffsetX = useTransform(scrollYProgress, [0, 1], ['-25%', '0%']);
  const image5OffsetY = useTransform(scrollYProgress, [0, 1], ['25%', '0%']);

  const image6OffsetX = useTransform(scrollYProgress, [0, 1], ['25%', '0%']);
  const image6OffsetY = useTransform(scrollYProgress, [0, 1], ['25%', '0%']);

  const images = [
    'https://plus.unsplash.com/premium_photo-1668790459004-780996a6404c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=607&q=80',
    'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80',
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1624&q=80',
    'https://plus.unsplash.com/premium_photo-1668790459004-780996a6404c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    'https://plus.unsplash.com/premium_photo-1668790459004-780996a6404c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
  ];

  return (
    <>
      <motion.div
        className="col-span-2 relative z-10 rounded-lg overflow-hidden"
        style={{
          backgroundImage: `url(${images[0]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          scale,
          x: image1Offset,
          y: image1Offset,
        }}
      />
      <motion.div
        className="row-span-2 relative z-10 rounded-lg overflow-hidden"
        style={{
          backgroundImage: `url(${images[1]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          scale,
          x: image2OffsetX,
          y: image2OffsetY,
        }}
      />

      <motion.div
        className="row-span-2 relative z-10 rounded-lg overflow-hidden"
        style={{
          backgroundImage: `url(${images[2]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          scale,
          x: image3OffsetX,
          y: image3OffsetY,
        }}
      />
      <motion.div
        className="relative z-10 rounded-lg overflow-hidden"
        style={{
          backgroundImage: `url(${images[3]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          scale,
          x: image4OffsetX,
          y: image4OffsetY,
        }}
      />

      <motion.div
        className="relative z-10 rounded-lg overflow-hidden"
        style={{
          backgroundImage: `url(${images[4]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          scale,
          x: image5OffsetX,
          y: image5OffsetY,
        }}
      />
      <motion.div
        className="relative z-10 rounded-lg overflow-hidden"
        style={{
          backgroundImage: `url(${images[5]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          scale,
          x: image6OffsetX,
          y: image6OffsetY,
        }}
      />
    </>
  );
};

const DecorativeCircles = () => (
  <>
    <div className="w-3/5 max-w-[850px] min-w-[400px] aspect-square border-[8px] border-blue-200 rounded-full absolute z-0 left-0 top-0 -translate-x-[50%] -translate-y-[50%]" />
    <div className="w-1/2 max-w-[600px] min-w-[300px] aspect-square border-[8px] border-blue-200 rounded-full absolute z-0 right-0 bottom-0 translate-x-[50%] translate-y-[50%]" />
  </>
);

export default HeroSection;
