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
                  Hi fam! If you’ve landed on this page, there is room just for you. The V Dream Team is all about gathering the heart of our ministry home – A place for any and everyone in V to discover your giftings, to participate in sowing into God-moments and a channel to be an expression of God’s heart in this house.
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
                  We can’t wait to have you in our teams–see you soon!
                  <br />
                  ↓↓↓ scroll down to find out more! ↓↓↓
                </p>
              </div>
            </div>
          </div>
        </section>
      </Scrollytelling.Pin>
    </Scrollytelling.Root>
  );
};
