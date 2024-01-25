"use client";

import * as Scrollytelling from "~/lib/scrollytelling-client";

import s from "./welcome.module.scss";
// import Link from "next/link";
import { CanvasWithVarsityModel } from "./varsity-model";

export const Welcome = () => {
  return (
    <Scrollytelling.Root
      defaults={{ ease: "linear" }}
      // debug={{ label: "Welcome" }}
    >
      <Scrollytelling.Pin
        childHeight={"100vh"}
        pinSpacerHeight={"300vh"}
        pinSpacerClassName={s["pin-spacer"]}
      >
        <section>
          <div className={s["model-container"]}>
            <CanvasWithVarsityModel />
          </div>

          <div className="wrapper">
            <div className={s["content"]}>
              <div className={s["footer"]}>
                <p>
                  We are the Varsity dream team, serving in the Father's house
                  as His chosen and beloved sons and daughters. We come with whatever we
                  have—sometimes with only empty hands yet with hearts fully open.
                  To think that we would get to serve the King of kings, one can hardly fathom.
                  Yet before we even lifted a finger, He was already so proud of us. <i>How can this be?</i>
                  <br />
                </p>
                <br />
                <svg
                  viewBox="0 0 24 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 0.226562L24 6.00007L14 11.7736L14 7.00006L0 7.00006V5.00006L14 5.00007L14 0.226562Z"
                    fill="white"
                  />
                </svg>
                <p>
                  We are intentional in creating God-moments, and experiencing
                  them ourselves. Wherever you or the state of your heart may be,
                  there will always be a seat at the table—with your name on it!
                  Though there might be times you may be asked to give up your seat.
                  That's because He desires for you to come and sit closer.
                  <br />
                </p>
                <br />
                <p>
                  So what are you waiting for? There is nothing to prove,
                  nothing to lose, and everything to gain. We know that eternity is too great for us
                  to spare a second of hesitation. Surely, we are called for such a time as this.
                  <br />
                  <br />
                  We are the dream team, because we are His dream, and we make His dream our own.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Scrollytelling.Pin>
    </Scrollytelling.Root>
  );
};
