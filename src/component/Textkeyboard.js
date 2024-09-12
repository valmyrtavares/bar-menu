import React from "react";
import "../assets/styles/Textkeyboard.css";

const TextKeyboard = ({ addCharacter, closeKeyboard, id }) => {
  const handleCharacterClick = (char) => {
    addCharacter(char, id);
  };

  return (
    <div>
      <div className="text-keyboard-line-container">
        <div
          className="text-character"
          onClick={() => handleCharacterClick("0")}
        >
          0
        </div>
        <div
          className="text-character"
          onClick={() => handleCharacterClick("1")}
        >
          1
        </div>
        <div
          className="text-character"
          onClick={() => handleCharacterClick("2")}
        >
          2
        </div>
        <div
          className="text-character"
          onClick={() => handleCharacterClick("3")}
        >
          3
        </div>
        <div
          className="text-character"
          onClick={() => handleCharacterClick("4")}
        >
          4
        </div>
        <div
          className="text-character"
          onClick={() => handleCharacterClick("5")}
        >
          5
        </div>
        <div
          className="text-character"
          onClick={() => handleCharacterClick("6")}
        >
          6
        </div>
        <div
          className="text-character"
          onClick={() => handleCharacterClick("7")}
        >
          7
        </div>
        <div
          className="text-character"
          onClick={() => handleCharacterClick("8")}
        >
          8
        </div>
        <div
          className="text-character"
          onClick={() => handleCharacterClick("9")}
        >
          9
        </div>
        <div
          className="text-character"
          onClick={() => handleCharacterClick("@")}
        >
          @
        </div>
        <div
          className="text-character"
          onClick={() => handleCharacterClick("-")}
        >
          -
        </div>
        <div
          className="text-character"
          onClick={() => handleCharacterClick("_")}
        >
          _
        </div>
      </div>
      <div className="text-keyboard-line-container">
        <div
          className="text-character"
          onClick={() => handleCharacterClick("q")}
        >
          q
        </div>
        <div
          className="text-character"
          onClick={() => handleCharacterClick("w")}
        >
          w
        </div>
        <div
          className="text-character"
          onClick={() => handleCharacterClick("e")}
        >
          e
        </div>
        <div
          className="text-character"
          onClick={() => handleCharacterClick("r")}
        >
          r
        </div>
        <div
          className="text-character"
          onClick={() => handleCharacterClick("t")}
        >
          t
        </div>
        <div
          className="text-character"
          onClick={() => handleCharacterClick("y")}
        >
          y
        </div>
        <div
          className="text-character"
          onClick={() => handleCharacterClick("u")}
        >
          u
        </div>
        <div
          className="text-character"
          onClick={() => handleCharacterClick("i")}
        >
          i
        </div>
        <div
          className="text-character"
          onClick={() => handleCharacterClick("o")}
        >
          o
        </div>
        <div
          className="text-character"
          onClick={() => handleCharacterClick("p")}
        >
          p
        </div>
        <div
          className="text-character"
          onClick={() => handleCharacterClick("p")}
        >
          Bcksp
        </div>
      </div>
      <div className="text-keyboard-line-container">
        <div
          className="text-character"
          onClick={() => handleCharacterClick("a")}
        >
          a
        </div>

        <div
          className="text-character"
          onClick={() => handleCharacterClick("s")}
        >
          s
        </div>
        <div
          className="text-character"
          onClick={() => handleCharacterClick("d")}
        >
          d
        </div>
        <div
          className="text-character"
          onClick={() => handleCharacterClick("f")}
        >
          f
        </div>
        <div
          className="text-character"
          onClick={() => handleCharacterClick("g")}
        >
          g
        </div>
        <div
          className="text-character"
          onClick={() => handleCharacterClick("h")}
        >
          h
        </div>
        <div
          className="text-character"
          onClick={() => handleCharacterClick("j")}
        >
          j
        </div>

        <div
          className="text-character"
          onClick={() => handleCharacterClick("k")}
        >
          k
        </div>
        <div
          className="text-character"
          onClick={() => handleCharacterClick("l")}
        >
          l
        </div>
      </div>
      <div className="text-keyboard-line-container">
        <div
          className="text-character"
          onClick={() => handleCharacterClick("z")}
        >
          z
        </div>
        <div
          className="text-character"
          onClick={() => handleCharacterClick("x")}
        >
          x
        </div>
        <div
          className="text-character"
          onClick={() => handleCharacterClick("c")}
        >
          c
        </div>
        <div
          className="text-character"
          onClick={() => handleCharacterClick("v")}
        >
          v
        </div>

        <div
          className="text-character"
          onClick={() => handleCharacterClick("b")}
        >
          b
        </div>
        <div
          className="text-character"
          onClick={() => handleCharacterClick("n")}
        >
          n
        </div>
        <div
          className="text-character"
          onClick={() => handleCharacterClick("m")}
        >
          m
        </div>

        <div
          className="text-character"
          onClick={() => handleCharacterClick("p")}
        >
          p
        </div>
      </div>
      <div className="text-keyboard-line-container">
        <div
          className="text-character"
          onClick={() => handleCharacterClick("clearField")}
        >
          limpar
        </div>
        <div
          className="text-character space"
          onClick={() => handleCharacterClick(" ")}
        >
          Esp
        </div>
        <div className="text-character" onClick={closeKeyboard}>
          Enter
        </div>
        <div
          className="text-character"
          onClick={() => handleCharacterClick(".com")}
        >
          .com
        </div>
      </div>
    </div>
  );
};
export default TextKeyboard;
