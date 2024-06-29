import { ReactTyped } from "react-typed";

function Hero() {
  return (
    <section className="relative overflow-y-hidden">
      <video
        className="absolute top-0 left-0 w-full h-screen object-cover -z-2 filter brightness-50"
        src="./hero_video.webm"
        autoPlay
        muted
        loop
      ></video>
      <div className="bg-cover bg-center h-screen flex items-center justify-center relative z-10">
        <div className="text-center text-white">
          <h1 className="text-9xl font-bold mb-4 font-playfair">
            <ReactTyped
              strings={["L U X U R I A"]}
              typeSpeed={100}
              loop={false}
              showCursor={true}
              cursorChar="|"
              className="text-9xl font-bold mb-4 font-playfair min-[393px]:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
              onComplete={(self) => {
                self.cursor.remove();
              }}
            />
          </h1>
          <p className="text-4xl mb-8 font-playfair">
            Handcrafted with {""}
            <span className="text-blue-500">
              <ReactTyped
                strings={[
                  "love and passion",
                  "precision and care",
                  "elegance and artistry",
                  "timeless beauty and charm",
                  "blend of tradition and innovation",
                  "a commitment to quality and excellence",
                ]}
                typeSpeed={50}
                loop
                backSpeed={20}
                showCursor={true}
                className="font-bold "
              />
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
