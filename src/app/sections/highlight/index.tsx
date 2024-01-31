"use client";

import * as Scrollytelling from "@bsmnt/scrollytelling";

import s from "./highlight.module.scss";
import { useMemo } from "react";

const splitText = (text: string, wordClass?: string) => {
  const wordsArray = text.split(" ");

  const htmlWords = wordsArray.map((word, i) => {
    const hasLineBreak = word.includes("\n");

    return (
      <span className={wordClass} key={i}>
        {word}
        {i < wordsArray.length - 1 && " "}
        {hasLineBreak && <br />}
      </span>
    );
  });

  return htmlWords;
};

const lines = ["Welcome home", "to V. where we build", "God’s house together."];

export const Highlight = () => {
  const splittedText = useMemo(
    () =>
      lines
        .map((line, lineIdx) => {
          const isLast = lineIdx === lines.length - 1;
          const wordElements = splitText(
            line + "\n",
            isLast ? s["highlight"] : undefined
          );

          return wordElements;
        })
        .flat(),
    []
  );

  return (
    <Scrollytelling.Root
      end="bottom bottom"
      // debug={{
      //   label: "Highlight" 
      //   }}
    >
      <section className={s["spacer"]}>
        <div className={s["pin"]}>
          <p className={s["paragraph"]}>
            <Scrollytelling.Stagger
              overlap={0}
              tween={{
                start: 0,
                end: 50,
                fromTo: [
                  {
                    opacity: 0.2,
                  },
                  {
                    opacity: 1,
                    ease: "power2.out",
                  },
                ],
              }}
            >
              {splittedText}
            </Scrollytelling.Stagger>
          </p>
        </div>
      </section>
    </Scrollytelling.Root>
  );
};
