import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./style.css";

function ColorPicker(props) {
  const ref = useRef(null);
  const colors = props.colors;
  const onChange = props.onChange;
  const [initialValue, setInitialValue] = useState(props.value || '#000000');
  const [value, setValue] = useState(props.value.toUpperCase());
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [colorSliderVisible, setColorSliderVisible] = useState(false);

  const { r, g, b } = hexToRgb(value);
  const [red, setRed] = useState(r);
  const [green, setGreen] = useState(g);
  const [blue, setBlue] = useState(b);

  useEffect((initialValue) => {
    if (value !== initialValue) {
      setInitialValue(value);
      onChange(value);
      const { r, g, b } = hexToRgb(value);
      setRed(r);
      setGreen(g);
      setBlue(b);
    }
    closeAll();
  }, [value, props.value]);

  useEffect(() => {
    document.addEventListener("click", onClickOutside, true);
    return () => {
      document.removeEventListener("click", onClickOutside, true);
    };
  });

  function onClickOutside(e) {
    if (ref.current && !ref.current.contains(e.target)) {
      cancel();
    }
  }

  function closeAll() {
    setColorPickerVisible(false);
    setColorSliderVisible(false);
  }

  function submit(value) {
    setValue(value.toUpperCase());
    cancel();
  }

  function ok() {
    submit(rgbToHex(red, green, blue));
  }

  function cancel() {
    const { r, g, b } = hexToRgb(initialValue);
    setRed(r);
    setGreen(g);
    setBlue(b);
    closeAll();
  }

  function hexToRgb(selectedValue) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
      selectedValue
    );
    return result
      ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
      : {
        r: 0,
        g: 0,
        b: 0
      };
  }

  function rgbToHex(r, g, b) {
    return (
      "#" +
      [r, g, b]
        .map(x => {
          const hex = Number.parseInt(x).toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  }

  const getStyles = () => {
    return { background: `rgb(${red}, ${green}, ${blue})` };
  };

  return (
    <div className="color-picker" ref={ref}>
      <div className="hex-color-title" onClick={() => cancel()}>
        <h2>{value}</h2>
      </div>
      <div className="color-box">
        <div
          className="color-box-range-btn"
          onClick={() => { cancel(); setColorSliderVisible(!colorSliderVisible); }}
          style={getStyles()}
        />
        {colorSliderVisible && (
          <div className="color-box-ranges">
            <div className="color-range">
              <h2>
                R
                <input
                  type="range"
                  min="0"
                  max="255"
                  step="1"
                  value={red}
                  className="slider" id="red_slider"
                  onChange={e => { e.stopPropagation(); setRed(e.target.value) }}
                />
              </h2>
              <h2>
                G
                <input
                  type="range"
                  min="0"
                  max="255"
                  step="1"
                  value={green}
                  className="slider" id="green_slider"
                  onChange={e => { e.stopPropagation(); setGreen(e.target.value); }}
                />
              </h2>
              <h2>
                B
                <input
                  type="range"
                  min="0"
                  max="255"
                  step="1"
                  value={blue}
                  className="slider" id="blue_slider"
                  onChange={e => { e.stopPropagation(); setBlue(e.target.value); }}
                />
              </h2>
            </div>
            <div className="color-box-buttons">
              <button className="cancel-btn" onClick={() => cancel()}>
                Cancel
              </button>
              <button className="ok-btn" onClick={() => ok()}>
                OK
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="color-menu">
        <div
          className="color-menu-button"
          onClick={e => { cancel(); setColorPickerVisible(!colorPickerVisible); }}
        >
          {colorPickerVisible && (
            <div className="color-menu-list">
              <ul>
                {colors.map(color => {
                  return (
                    <li
                      key={color.value}
                      id={color.value}
                      onClick={e => {
                        e.stopPropagation();
                        submit(e.target.id);
                      }}
                    >
                      {color.label}
                      <div
                        className="color-menu-box"
                        style={{ backgroundColor: `${color.value}` }}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

ColorPicker.propTypes = {
  colors: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.string
}

export default ColorPicker;
