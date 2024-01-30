import * as Scrollytelling from "~/lib/scrollytelling-client";
import s from "./marquee.module.scss";
import { forwardRef } from "react";

const phrase = "     THE DR∑AM  TEÅM  →";
const splitted = phrase.split("");
const charsLength = splitted.length;

export const Marquee = () => {
  return (
    <Scrollytelling.Root
      start="top top+=300px"
      // debug={{ label: "Welcome" }}
    >
      <section className={s.section}>
        <div className={s.pinned}>
          <Scrollytelling.Animation
            tween={{
              start: 0,
              end: 90,
              from: { xPercent: 98, ease: "linear" },
            }}
          >
            <div className={s.animated}>
              <Scrollytelling.Animation
                tween={{
                  start: 90,
                  end: 100,
                  to: { x: "-=50vw", ease: "linear" },
                }}
              >
                <p>
                  {splitted.map((s, i) => {
                    const charDuration = 77 / charsLength;
                    const charStart = charDuration * i;
                    const charEnd = charStart + charDuration;

                    return (
                      <Scrollytelling.Animation
                        key={i}
                        tween={{
                          start: charStart * 0.7, // make it start a bit sooner, actually
                          end: charEnd,
                          fromTo: [
                            {
                              yPercent: 40,
                              scale: 0.5,
                              autoAlpha: 0,
                              transformOrigin: "center right",
                            },
                            {
                              keyframes: {
                                "0%": { autoAlpha: 0, scale: 0.5 },
                                "50%": { autoAlpha: 1, scale: 1 },
                                "100%": { yPercent: 0 },
                                easeEach: "linear",
                              },
                              ease: "linear",
                            },
                          ],
                        }}
                      >
                        <span
                          data-character
                          style={{
                            display: "inline-block",
                          }}
                        >
                          {s === " " ? <>&nbsp;</> : s}
                        </span>
                      </Scrollytelling.Animation>
                    );
                  })}
                </p>
              </Scrollytelling.Animation>
              <Scrollytelling.Animation
                tween={{
                  start: 90,
                  end: 100,
                  fromTo: [
                    { scale: 0.8, opacity: 0 },
                    { scale: 1.45, opacity: 1, ease: "linear" },
                  ],
                }}
              >
                <TheSvg />
              </Scrollytelling.Animation>
            </div>
          </Scrollytelling.Animation>
        </div>
      </section>
    </Scrollytelling.Root>
  );
};

const TheSvg = forwardRef<SVGSVGElement>((_, ref) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 300 300" ref={ref} className={s.theSvg}>
      <path fill="#FEFEFE" opacity="0.000000" stroke="none" 
        d="
      M175.000000,301.000000 
        C116.666679,301.000000 58.833355,301.000000 1.000023,301.000000 
        C1.000015,201.000031 1.000015,101.000053 1.000008,1.000064 
        C100.999947,1.000042 200.999893,1.000042 300.999878,1.000021 
        C300.999939,100.999939 300.999939,200.999878 300.999969,300.999908 
        C259.166656,301.000000 217.333328,301.000000 175.000000,301.000000 
      M217.501190,26.620340 
        C166.034378,26.620340 114.567581,26.620340 62.365978,26.620340 
        C86.166565,110.069550 109.727394,192.678146 133.248169,275.146301 
        C145.206787,275.146301 156.832153,275.146301 168.669174,275.146301 
        C192.273071,192.293106 215.803101,109.699173 239.477524,26.598368 
        C232.055237,26.598368 225.278076,26.598368 217.501190,26.620340 
      z"/>
      <path fill="#fff" opacity="1.000000" stroke="none" 
        d="
      M218.001068,26.609354 
        C225.278076,26.598368 232.055237,26.598368 239.477524,26.598368 
        C215.803101,109.699173 192.273071,192.293106 168.669174,275.146301 
        C156.832153,275.146301 145.206787,275.146301 133.248169,275.146301 
        C109.727394,192.678146 86.166565,110.069550 62.365978,26.620340 
        C114.567581,26.620340 166.034378,26.620340 218.001068,26.609354 
      M89.073128,63.329052 
        C107.763779,128.812820 126.454422,194.296585 145.098434,259.616943 
        C149.303986,259.616943 152.938461,259.616943 156.836823,259.616943 
        C177.469681,187.177170 198.067368,114.860924 218.612305,42.729843 
        C173.208405,42.729843 128.498398,42.729843 83.256233,42.729843 
        C85.264854,49.785374 87.080231,56.162113 89.073128,63.329052 
      z"/>
      <path fill="#FDFDFD" opacity="0.000000" stroke="none" 
        d="
      M88.984367,62.933952 
        C87.080231,56.162113 85.264854,49.785374 83.256233,42.729843 
        C128.498398,42.729843 173.208405,42.729843 218.612305,42.729843 
        C198.067368,114.860924 177.469681,187.177170 156.836823,259.616943 
        C152.938461,259.616943 149.303986,259.616943 145.098434,259.616943 
        C126.454422,194.296585 107.763779,128.812820 88.984367,62.933952 
      z"/>
    </svg>
  );
});
