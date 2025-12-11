import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, isComingSoon }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>
        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20" // استایل دکمه
          >
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300" // ظرف افکت گرادیان
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`, // گرادیان دایره‌ای
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Features = () => (
  <section className="bg-black pb-52">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-blue-50">
          Piltover – The City of Progress
        </p>
        <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
          Piltover is a city built on the pillars of innovation, order, and
          ambition. Its golden towers symbolize endless progress and faith in
          the power of technology. In this city, science determines the course
          of the future, and every invention is a step closer to a better world.
        </p>
      </div>
      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="videos/Jinx.mp4"
          title={
            <>
              jin<b>x</b>
            </>
          }
          description="Jinx's transformation is a journey from shattered innocence to a new identity, one where fears, anger, and broken memories transform her into an unpredictable force.."
          isComingSoon
        />
      </BentoTilt>
      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        <BentoTilt className="relative border-hsla col-span-2 overflow-hidden rounded-md transition-transform duration-300 ease-out row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="videos/VIKTOR.mp4"
            title={
              <>
                VIKT<b>O</b>R
              </>
            }
            description="To reshape the world, one must first transcend their limits."
            isComingSoon
          />
        </BentoTilt>
        <BentoTilt className="relative border-hsla col-span-2 overflow-hidden rounded-md transition-transform duration-300 ease-out row-span-1 ms-32 md:col-span-1 md:ms-0">
          {" "}
          <BentoCard
            src="videos/two-hearts.mp4"
            title={
              <>
                T<b>W</b>o Hearts
              </>
            }
            description="A shared childhood, but two opposing paths. A spark from the past still burns between them."
            isComingSoon
          />
        </BentoTilt>
        <BentoTilt className="relative border-hsla col-span-2 overflow-hidden rounded-md transition-transform duration-300 ease-out me-14 md:col-span-1 md:me-0">
          {" "}
          <BentoCard
            src="videos/THE-BOY-SAVIOR.mp4"
            title={
              <>
                B<b>o</b>Y SA<b>v</b>IOR
              </>
            }
            description="At the height of his fall, Ekko broke time and pulled the future of Zaun out of the darkness."
            isComingSoon
          />
        </BentoTilt>
        <BentoTilt className="bento-tilt_2">
          <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
            <h1 className="bento-title special-font max-w-64 text-black">
              N<b>E</b>w Seas<b>o</b>n co<b>m</b>ing s<b>o</b>on.
            </h1>
            <TiLocationArrow className="m-5 scale-[5] self-end" />
          </div>
        </BentoTilt>
        <BentoTilt className="bento-tilt_2">
          {" "}
          <video
            src="videos/Ekko-and-Jinx.mp4"
            loop
            muted
            autoPlay
            className="size-full object-cover object-center"
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;
