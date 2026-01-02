import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navigation from '../components/Navigation';

const CookingInstructions = () => {
  return (
    <div className="bg-white">
      <Navigation />
      <div className="pt-16">
        <TextParallaxContent
          imgUrl="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2670&auto=format&fit=crop"
          subheading="Parathas"
          heading="Perfect Parathas Every Time"
        >
          <InstructionContent
            title="Cooking Instructions for Paratha"
            steps={[
              "Heat the Tawa properly kept on medium flame.",
              "Paint the Tawa lightly with (preferably) Pure Ghee/Butter.",
              "Place the frozen Paratha on the hot Tawa directly. Do Not Thaw. Place the remaining Parathas in the packet, back in the Deep Freezer without delay.",
              "Warm the Paratha. Paint the top side lightly with (preferably) Pure Ghee/Butter.",
              "Warm the Paratha alternately on both sides continuously till cooked properly.",
              "Serve hot along with appropriate add ons (like curd, chutney, pickle, sauce)."
            ]}
          />
        </TextParallaxContent>

        <TextParallaxContent
          imgUrl="https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2670&auto=format&fit=crop"
          subheading="Starters"
          heading="Crispy Golden Starters"
        >
          <InstructionContent
            title="Cooking Instructions for Starters"
            steps={[
              "Take out the required number of Pieces from the packet. Keep the packet containing the remaining Pieces back in the freezer. Do not thaw.",
              "Drop the frozen Products directly & carefully (do not thaw) in Kadhai containing hot oil kept on a little below medium/medium flame.",
              "Keep rolling the Pieces slowly & gently in the hot oil while frying.",
              "Fry till the cover of the Pieces turn golden brown, remove them from the hot oil.",
              "Serve them hot garnished with appropriate add ons (Tomato Sauce, Green Chutney/Schezwan Sauce & Fresh Coriander/Mint Leaves)."
            ]}
          />
        </TextParallaxContent>

        <TextParallaxContent
          imgUrl="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=2670&auto=format&fit=crop"
          subheading="Patty"
          heading="Delicious Patties"
        >
          <InstructionContent
            title="Cooking Instructions for Patty"
            subtitle="Method 1:"
            steps={[
              "Take out the required number of Patty from the packet. Keep the packet containing the remaining Patty back in the freezer. Do not thaw.",
              "Paint the Patty on one side with Oil or Ghee & place it on hot Non-Stick Tawa. Maintain Medium Flame.",
              "Paint the upper side of the Patty with Oil or Ghee, Turn the Patty on the Tawa. Keep changing the sides on the Tawa several times till the Patty gets hot & appears properly cooked on both the sides.",
              "Serve them hot. Garnish with Tomato Sauce, Green Chutney/Schezwan Sauce & Fresh Coriander/Mint Leaves along with freshly cut onion rings."
            ]}
            subtitle2="Method 2:"
            steps2={[
              "Same as above.",
              "Drop the Patty carefully in hot oil in a Kadhai kept on Medium Flame.",
              "Fry the Patty by turning sides gently till the cover turns golden yellow/faint brown. Remove the Patty from the hot oil.",
              "Serve them hot. Garnish with Tomato Sauce, Green Chutney/Schezwan Sauce & Fresh Coriander/Mint Leaves along with freshly cut onion rings."
            ]}
          />
        </TextParallaxContent>

        <TextParallaxContent
          imgUrl="https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2670&auto=format&fit=crop"
          subheading="Samosas"
          heading="Crispy Punjabi Samosas"
        >
          <InstructionContent
            title="Cooking Instructions for Punjabi/Mini Punjabi Samosas"
            steps={[
              "Microwave the frozen Samosa for One minute. Do not thaw. Place the remaining Samosas in the packet back in the Deep Freezer without delay.",
              "Remove the Microwaved Samosas from the Owen & without delay fry it in the hot oil (kept on medium flame) in the Kadhai.",
              "Fry the Samosas on medium flame till the colour changes to Golden Brown.",
              "Serve hot (possibly with Hot & Sweet Chatnis & Chole/Ragda, freshly cut Onion Rings sprinkled with freshly cut fine Coriander leaves, Lemon & Salt/Chaat Masala)."
            ]}
          />
        </TextParallaxContent>

        <TextParallaxContent
          imgUrl="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=2670&auto=format&fit=crop"
          subheading="Biryani"
          heading="Aromatic Biryani"
        >
          <InstructionContent
            title="Cooking Instructions for Biryani"
            steps={[
              "Take out the Microwavable Container from the freezer & place it directly in the Microwave Oven. Do not thaw.",
              "Heat for about 2 minutes.",
              "Take out the Container from the Oven. Open the lid. Gently mix the Biryani. Keep the lid back on the Container loosely.",
              "Place the Container back in the Oven. Heat for about 4 to 5 minutes.",
              "Take out the Container. Remove the lid. Garnish with Lemon piece, Round cut Onions, Fresh Coriander leaves & Veg Raita. Serve steaming hot."
            ]}
          />
        </TextParallaxContent>

        <TextParallaxContent
          imgUrl="https://images.unsplash.com/photo-1481391319762-47dff72954d9?q=80&w=2665&auto=format&fit=crop"
          subheading="Sweet Samosas"
          heading="Chocolate/Pineapple/Strawberry Samosa"
        >
          <InstructionContent
            title="Cooking Instructions for Sweet Samosas"
            steps={[
              "Take out the required number of Samosas from the packet. Keep the packet containing remaining Samosas back in the freezer. (Do Not Thaw).",
              "Drop the frozen Samosas directly (Do Not Thaw) & carefully in Kadhai containing hot oil kept on little above medium flame.",
              "Keep turning the Samosas very gently in the hot oil while frying.",
              "Fry till the cover of the Samosas turn golden brown, take them out from the hot oil.",
              "Serve them hot."
            ]}
          />
        </TextParallaxContent>

        <TextParallaxContent
          imgUrl="https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=2673&auto=format&fit=crop"
          subheading="Cheese Starters"
          heading="Cheese Based Products"
        >
          <InstructionContent
            title="Cooking Instructions for Cheese Based Starter Product"
            steps={[
              "Take out the required number Pieces from the packet. Keep the packet containing remaining Pieces back in the freezer. Do Not Thaw.",
              "Drop the Pieces directly (Do Not Thaw) & carefully in Kadhai containing hot oil kept on little above medium flame.",
              "Keep rolling the Pieces gently & continuously in the hot oil while frying.",
              "As soon as the cover of the Pieces turn golden brown, remove them from the hot oil.",
              "Serve them hot garnished with suitable Sauce/s or Hot Green Chutney + Tamarind Sweet & Sour Chutney."
            ]}
          />
        </TextParallaxContent>

        <TextParallaxContent
          imgUrl="https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=2664&auto=format&fit=crop"
          subheading="Sabudana"
          heading="Sabudana Wada & Khichdi"
        >
          <InstructionContent
            title="Cooking Instructions for Sabudana Wada"
            steps={[
              "Take out the required number of Sabudana Wadas from the packet. Keep the packet containing remaining Wadas back in the freezer. Do Not Thaw.",
              "Drop the frozen Wadas directly (do not thaw) & carefully in Kadhai containing hot oil kept on a little below medium flame.",
              "Keep turning sides of the Wadas very gently in the hot oil while frying.",
              "Fry till the cover of the Wadas turn brownish on both sides, remove them from the hot oil.",
              "Serve them hot garnished with Sweet thick Lassi portion & Green Chutney/Tomato Sauce."
            ]}
            subtitle2="For Sabudana Khichdi, Upma & Poha:"
            steps2={[
              "Take out the Microwavable Container from the freezer & place it directly in the Microwave Oven. Do not thaw.",
              "Heat for about 1 to 1.5 minute.",
              "Take out the Container from the Oven. Open the lid. With a knife, check whether the product is heated till inside & bottom of the Container. If required, place the lid back & heat for about 1 more minute.",
              "Take out the Container. Remove the lid. Garnish with Lemon piece, Freshly cut Coriander leaves & Grated Fresh Coconut.",
              "Insert a Spoon serve steaming hot."
            ]}
          />
        </TextParallaxContent>

        <TextParallaxContent
          imgUrl="https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=2670&auto=format&fit=crop"
          subheading="Chicken"
          heading="Chicken Malai Tikka"
        >
          <InstructionContent
            title="Cooking Instructions for Chicken Malai Tikka"
            subtitle="Method 1 (Microwave):"
            steps={[
              "Take out the required number of pieces from the packet kept in deep freezer. Place the packet back in the deep freezer. Do Not Thaw the product.",
              "Place the pieces, spread out properly on the base, in the Microwave Oven.",
              "Heat for about 3 minutes. Take out the pieces. Check out. If needed heat again in 1 to 2 minutes more.",
              "Take out the pieces from the oven & serve them hot with fresh coriander leaves topping. Garnish with Cut onions, Cut Lemon piece, Chili Chatni/Sauce & Chat Masala."
            ]}
            subtitle2="Method 2 (Tawa):"
            steps2={[
              "Take out the required number of pieces from the packet kept in deep freezer. Place the packet back in the deep freezer. Do Not Thaw the product.",
              "Place the pieces on hot tawa, painted with oil or butter, kept on just above low flame. Paint the top of the product pieces with oil or butter.",
              "Turn the pieces upside down a few times carefully and gently till cooked properly.",
              "Take out the pieces from the tawa & serve them hot with fresh coriander leaves topping. Garnish with Cut onions, Cut Lemon piece, Chili Chatni/Sauce & Chat Masala."
            ]}
          />
        </TextParallaxContent>

        <TextParallaxContent
          imgUrl="https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2670&auto=format&fit=crop"
          subheading="Pakodas"
          heading="Cabbage Pakoda & Onion Rings"
        >
          <InstructionContent
            title="Cooking Instructions for Cabbage Pakoda & Onion Rings"
            steps={[
              "Take out the required number of pieces from the packet. Keep the packet containing the remaining pieces back in the freezer. Do not thaw.",
              "Drop the frozen pieces directly (do not thaw) in small seperated portions, carefully in Kadhai containing oil kept on a Low Flame (100°C).",
              "Keep turning sides of the piece very gently in the hot oil while frying.",
              "Fry till the cover of the product turns golden brown (Do not overcook, be careful), take the products out from the hot oil.",
              "Serve hot garnished with Green Chutney, Schezwan Sauce, Tamarind Sweet n Sour Chutney & Tomato Sauce, as per taste prefered."
            ]}
          />
        </TextParallaxContent>

        <TextParallaxContent
          imgUrl="https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=2487&auto=format&fit=crop"
          subheading="Modak"
          heading="Ukdiche Modak"
        >
          <InstructionContent
            title="Cooking Instructions for Ukdiche Modak"
            steps={[
              "Take out the required number of pieces from the packet. Keep the packet containing remaining pieces back in the freezer. Do not thaw.",
              "Place the frozen Modaks on a thin wet white cotton cloth/banana leaf placed on the perforated vessel or directly on the perforated vessel in the steamer (Cooker or Idli Maker) already filled with hot water.",
              "Close the steamer lid. Remove the whistle or valve on the top of the steamer lid.",
              "Heat the steamer on medium to high flame.",
              "Once steam starts coming out from the outlet on the top of the steamer, continue steaming for about 6 to 7 minutes.",
              "Immediately open the steamer lid & take out the hot steamed Modaks in a plate.",
              "Wait for few minutes for the Modaks to cool slightly & settle in shape.",
              "Pour pure ghee on the warm/hot Modaks or half cut pieces of the warm/hot Modaks. Serve them fresh."
            ]}
          />
        </TextParallaxContent>
      </div>
    </div>
  );
};

const IMG_PADDING = 12;

const TextParallaxContent = ({ imgUrl, subheading, heading, children }) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy = ({ subheading, heading }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-lg sm:text-xl md:mb-4 md:text-3xl">
        {subheading}
      </p>
      <p className="text-center text-2xl sm:text-4xl font-bold md:text-7xl">{heading}</p>
    </motion.div>
  );
};

const InstructionContent = ({ title, subtitle, steps, subtitle2, steps2 }) => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:gap-8 px-4 pb-12 sm:pb-24 pt-8 sm:pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-2xl sm:text-3xl font-bold md:col-span-4">
      {title}
    </h2>
    <div className="col-span-1 md:col-span-8">
      {subtitle && <h3 className="text-lg sm:text-xl font-semibold mb-4 text-blue-600">{subtitle}</h3>}
      <ol className="space-y-3 mb-8 list-decimal list-inside text-base sm:text-lg text-neutral-600">
        {steps.map((step, idx) => (
          <li key={idx} className="leading-relaxed">
            {step}
          </li>
        ))}
      </ol>
      {subtitle2 && steps2 && (
        <>
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-blue-600 mt-8">{subtitle2}</h3>
          <ol className="space-y-3 list-decimal list-inside text-base sm:text-lg text-neutral-600">
            {steps2.map((step, idx) => (
              <li key={idx} className="leading-relaxed">
                {step}
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  </div>
);

export default CookingInstructions;
