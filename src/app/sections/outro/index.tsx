"use client";

import s from "./outro.module.scss";
import { CanvasWithHouseModel } from "./house-model";
import { useEffect, useState } from "react";

export const Outro = () => {
  const [opacityValue, setOpacityValue] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setOpacityValue(1);
    }, 1000)
  })
  return (
    <section>
      <div style={{opacity: opacityValue, transition: "1.5s"}} className={s["model-container"]}>
        <CanvasWithHouseModel />
      </div>

      <div className="wrapper">
        <div className={s["content"]}>
          <div className={s["footer"]}>
            <p>
              Welcome home to V.
              <br />
              Where we build God's house together
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
