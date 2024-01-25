"use client";

import * as Scrollytelling from "~/lib/scrollytelling-client";

import s from "./outro.module.scss";
// import Link from "next/link";
import { CanvasWithHouseModel } from "./house-model";

export const Outro = () => {
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
            <CanvasWithHouseModel />
          </div>

          <div className="wrapper">
            <div className={s["content"]}>
              <div className={s["footer"]}>
                <p>
                  Welcome home to V
                  <br />
                  Where we build God's house together
                </p>
              </div>
            </div>
          </div>
        </section>
      </Scrollytelling.Pin>
    </Scrollytelling.Root>
  );
};
