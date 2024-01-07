import React, { useRef, useState } from "react";
import "./App.css";
import Draggable from "react-draggable";
import { FaMinus, FaUndo, FaRedo, FaPlus } from "react-icons/fa";

function App() {
  const draggableRef = useRef(null);
  const [fontStyle, setFontStyle] = useState("Arial");
  const [fontSize, setFontSize] = useState(16);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [inputText, setInputText] = useState("New Text");
  const [textHistory, setTextHistory] = useState([
    {
      fontStyle: "Arial",
      fontSize: 16,
      selectedColor: "#000000",
      inputText: "New Text",
    },
  ]);
  const [currentStep, setCurrentStep] = useState(0);

  const addToHistory = ({ fontStyle, fontSize, selectedColor, inputText }) => {
    const newData = {
      fontStyle,
      fontSize,
      selectedColor,
      inputText,
    };
    setTextHistory((prev) => [...prev, newData]);
    setCurrentStep((prev) => prev + 1);
  };

  const undo = () => {
    if (currentStep > 0) {
      const newData = textHistory[currentStep - 1];
      setFontStyle(newData.fontStyle);
      setFontSize(newData.fontSize);
      setSelectedColor(newData.selectedColor);
      setInputText(newData.inputText);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const redo = () => {
    if (currentStep < textHistory.length - 1) {
      setCurrentStep((prev) => prev + 1);
      const newData = textHistory[currentStep + 1];
      setFontStyle(newData.fontStyle);
      setFontSize(newData.fontSize);
      setSelectedColor(newData.selectedColor);
      setInputText(newData.inputText);
    }
  };

  const OnChangeFontStyleOptions = (event) => {
    setFontStyle(event.target.value);
    addToHistory({
      fontStyle: event.target.value,
      fontSize,
      selectedColor,
      inputText,
    });
  };

  const increaseFontSize = () => {
    setFontSize((prevSize) => {
      const newSize = Math.min(prevSize + 2, 88);
      addToHistory({
        fontStyle,
        fontSize: newSize,
        selectedColor,
        inputText,
      });
      return newSize;
    });
  };

  const decreaseFontSize = () => {
    setFontSize((prevSize) => {
      const newSize = Math.max(prevSize - 2, 16);
      addToHistory({
        fontStyle,
        fontSize: newSize,
        selectedColor,
        inputText,
      });
      return newSize;
    });
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
    addToHistory({
      fontStyle,
      fontSize,
      selectedColor: event.target.value,
      inputText,
    });
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
    addToHistory({
      fontStyle,
      fontSize,
      selectedColor,
      inputText: event.target.value,
    });
  };

  return (
    <div className="main-container">
      <div>
        <button type="button" className="undo-redo-btn" onClick={undo}>
          <FaUndo /> Undo
        </button>
        <button type="button" className="undo-redo-btn" onClick={redo}>
          Redo <FaRedo />
        </button>
      </div>
      <div className="bg-container">
        <div className="text-container">
          <Draggable nodeRef={draggableRef} bounds="parent">
            <div className="text-display-container" ref={draggableRef}>
              <p
                className="text-font-change"
                style={{
                  fontFamily: `${fontStyle}`,
                  fontSize: `${fontSize}px`,
                  color: `${selectedColor}`,
                }}
              >
                {inputText}
              </p>
            </div>
          </Draggable>
        </div>
        <div className="font-cont">
          <h2>Font Style</h2>
          <select
            className="options-style"
            onChange={OnChangeFontStyleOptions}
            value={fontStyle}
            name={fontStyle}
          >
            <option className="font-styles" value="Arial">
              Arial
            </option>
            <option className="font-styles" value="Fantasy">
              Fantasy
            </option>
            <option className="font-styles" value="Times New Roman">
              Times New Roman
            </option>
            <option className="font-styles" value="Verdana">
              Verdana
            </option>
            <option className="font-styles" value="cursive">
              cursive
            </option>
            <option className="font-styles" value="Couier New">
              Courier New
            </option>
          </select>
          <div className="font-size-and-color">
            <div>
              <h3>Font Size</h3>
              <div className="font-size-btn">
                <FaMinus
                  style={{ cursor: "pointer", marginRight: "7px" }}
                  onClick={decreaseFontSize}
                />
                {fontSize}
                <FaPlus
                  style={{ cursor: "pointer", marginLeft: "7px" }}
                  onClick={increaseFontSize}
                />
              </div>
            </div>
            <div style={{ marginLeft: "40px" }}>
              <h3>Font Color</h3>
              <input
                type="color"
                onChange={handleColorChange}
                value={selectedColor}
              />
            </div>
          </div>
          <input
            type="text"
            className="input-text"
            placeholder="Enter Text"
            onChange={handleInputChange}
            value={inputText}
            name={inputText}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
