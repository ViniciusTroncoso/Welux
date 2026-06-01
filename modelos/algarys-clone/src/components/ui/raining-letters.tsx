"use client";

import { useState, useEffect, useCallback } from "react";

interface Character {
  char: string;
  x: number;
  y: number;
  speed: number;
}

// Latim + dígitos + símbolos + letras gregas (como no hero da Algarys)
const ALL_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?" +
  "αβγδεζηθλμνξπρστυφχψωΩΣΔΦΨΓΛΘΠ";

// Fator de velocidade: 30% mais lento que o original (1.0 -> 0.7)
const SPEED_FACTOR = 0.7;

export default function RainingLetters() {
  const [characters, setCharacters] = useState<Character[]>([]);

  const createCharacters = useCallback(() => {
    const charCount = 600;
    const newCharacters: Character[] = [];
    for (let i = 0; i < charCount; i++) {
      newCharacters.push({
        char: ALL_CHARS[Math.floor(Math.random() * ALL_CHARS.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        speed: (0.1 + Math.random() * 0.3) * SPEED_FACTOR,
      });
    }
    return newCharacters;
  }, []);

  useEffect(() => {
    setCharacters(createCharacters());
  }, [createCharacters]);

  useEffect(() => {
    let animationFrameId: number;

    const updatePositions = () => {
      setCharacters((prevChars) =>
        prevChars.map((char) => ({
          ...char,
          y: char.y + char.speed,
          ...(char.y >= 100 && {
            y: -5,
            x: Math.random() * 100,
            char: ALL_CHARS[Math.floor(Math.random() * ALL_CHARS.length)],
          }),
        }))
      );
      animationFrameId = requestAnimationFrame(updatePositions);
    };

    animationFrameId = requestAnimationFrame(updatePositions);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {characters.map((char, index) => (
        <span
          key={index}
          className="absolute text-slate-400 font-light"
          style={{
            left: `${char.x}%`,
            top: `${char.y}%`,
            transform: "translate(-50%, -50%)",
            opacity: 0.8,
            willChange: "transform, top",
            fontSize: "0.9rem",
          }}
        >
          {char.char}
        </span>
      ))}
    </div>
  );
}
