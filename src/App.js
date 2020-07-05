import React, { useState } from 'react';

import { 
  FiAlignLeft, 
  FiAlignCenter, 
  FiAlignRight, 
  FiAlignJustify, 
  FiBold,
  FiItalic,
  FiImage
} from 'react-icons/fi';

import { 
  FaQuoteLeft, 
  FaQuoteRight 
} from 'react-icons/fa';

import './app.css';

function App() {
  const [text, setText] = useState('');
  const [divs, setDivs] = useState([]);

  const [edit, setEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(0);

  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [font, setFont] = useState("Arial");
  const [fontSize, setFontSize] = useState("12");
  const [textAlign, setTextAlign] = useState("left");
  const [quote, setQuote] = useState(false);

  const [format, setFormat] = useState([]);

  function onEnter(e) {

    if(e.keyCode === 13 && e.shiftKey) {
      return
    } else if(e.keyCode === 13) {

      e.preventDefault();

      setFormat([...format, {
        'fontWeight': bold ? 'bold' : 'normal',
        'fontStyle': italic ? 'italic' : 'normal',
        'fontFamily': font,
        'fontSize': fontSize + "pt",
        'textAlign': textAlign,
      }])

      setDivs([...divs, { text, quote }]);

      setText("");
      
    }
  }

  function onEditText(e) {

    if(e.keyCode === 13 && e.shiftKey) {
      return
    } else if(e.keyCode === 13) {

      e.preventDefault();
      
      let newDiv = divs;

      newDiv[editIndex] = { text, quote };

      setDivs(newDiv);

      let newObj = format;

      newObj[editIndex] = {
        'fontWeight': bold ? 'bold' : 'normal',
        'fontStyle': italic ? 'italic' : 'normal',
        'fontFamily': font,
        'fontSize': fontSize + "pt",
        'textAlign': textAlign,
      };

      setFormat(newObj);
      setText("");
      setEdit(false);
    }
  }

  function onEdit(index) {
    setEdit(true);

    setText(divs[index].text);

    setEditIndex(index);
  }

  function addImage(e) {
    let photoFile = e.target.files[0];

    setDivs([...divs, {text: "", photo: photoFile, quote: false}]);
  }

  function removeBlock(index) {
    setDivs(divs.filter((div, divIndex) => divIndex !== index));

    setText("");
  }

  return (
    <div className="container">

      <div className="font-options">
        <div className="font-item">
          <button className="btn-option-font" style={ bold ? { backgroundColor: "#999" } : {}} onClick={() => setBold(!bold)}>
            <FiBold size={18} color="#000" />
          </button>
        </div>

        <div className="font-item">
          <button className="btn-option-font" style={ italic ? { backgroundColor: "#999" } : {}} onClick={() => setItalic(!italic)}>
            <FiItalic size={18} color="#000" />
          </button>
        </div>

        <div className="font-item">
          <input className="input-font-item" value={fontSize} onChange={e => setFontSize(e.target.value)} />
        </div>

        <div className="font-item">
          <select className="option-font-item" defaultValue={"Arial"} onChange={(e) => setFont(e.target.value)}>
            <option value="Arial">Arial</option>
            <option value="sans-serif">Sans-Serif</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Times New Roman">Times New Roman</option>
          </select>
        </div>

        <div className="font-item">
          <button className="btn-option-font" style={ textAlign === "left" ? { backgroundColor: "#999" } : {} } onClick={() => setTextAlign("left")}><FiAlignLeft color="#000" size={24} /></button>
          <button className="btn-option-font" style={ textAlign === "center" ? { backgroundColor: "#999" } : {} } onClick={() => setTextAlign("center")}><FiAlignCenter color="#000" size={24} /></button>
          <button className="btn-option-font" style={ textAlign === "right" ? { backgroundColor: "#999" } : {} } onClick={() => setTextAlign("right")}><FiAlignRight color="#000" size={24} /></button>
          <button className="btn-option-font" style={ textAlign === "justify" ? { backgroundColor: "#999" } : {} } onClick={() => setTextAlign("justify")}><FiAlignJustify color="#000" size={24} /></button>
        </div>

        <div className="font-item">
          <button className="btn-option-font" style={ quote ? { backgroundColor: "#999" } : {}} onClick={() => setQuote(!quote)}>
            <FaQuoteRight size={18} color="#000" />
          </button>
        </div>


        <label className="label-option-img">
          <input type="file" style={{ display: "none" }} onChange={e => addImage(e)} />
          <FiImage size={18} color="#000" />
        </label>
        
      </div>

      {divs.map((div, index) => (
        <div className="div-block" key={index} style={format[index]}>
            <>
            { div.quote ? (
              <div className="div-text" onClick={() => onEdit(index)}>
                <FaQuoteLeft size={18} color="#666" />
                  {div.text}
                <FaQuoteRight size={18} color="#666" />
                { div.photo ? <div style={{ backgroundImage: `url(${URL.createObjectURL(div.photo)})` }} className="photos-added" /> : <></> }
              </div>
             ) : (
              <div className="div-text" onClick={() => onEdit(index)}>
                {div.text}
                { div.photo ? <div style={{ backgroundImage: `url(${URL.createObjectURL(div.photo)})` }} className="photos-added" /> : <></> }
              </div>)}
              
              <button className="btn-remove-text" onClick={() => removeBlock(index)}>x</button>
            </>
        </div>
      ))}

      {edit && (
        <textarea className="input-all-text" id="input" value={text} onKeyDown={e => onEditText(e)} onChange={e => setText(e.target.value)} />
      )}

      { !edit && (
        <textarea className="input-all-text" id="input" value={text} onKeyDown={e => onEnter(e)} onChange={e => setText(e.target.value)} />
      )}
    </div>
  );
}

export default App;
