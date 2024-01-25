import { useHasRendered } from '~/hooks/use-has-rendered';
import s from './typewriter.module.scss'

import { FC, RefObject, useRef } from "react";

// const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
const speed = 77;

const typewriter = async (i: number, text: string, element: RefObject<HTMLParagraphElement>) => {
  if (i < text.length && element.current && element.current.innerHTML.length < text.length) {
    element.current.innerHTML += text.charAt(element.current.innerHTML.length);
    i++;
    setTimeout(() => typewriter(i, text, element), speed);
  }
}

interface TypewriterProps {
  text: string;
}

export const Typewriter: FC<TypewriterProps> = ({text}) => {
  const pref = useRef() as RefObject<HTMLParagraphElement>;
  if (useHasRendered()) {
    typewriter(0, text, pref);
  }
  return (
    <>
      <div className={s.typewriter}>
        <p ref={pref}></p>
      </div>
    </>
  )
}