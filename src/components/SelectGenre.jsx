import React from "react";

const SelectGenre = ({ onSelect, selectedValue }) => {
  const ChangeValue = (event) => {
    onSelect(event.target.value);
  };

  return (
    <div>
      <form>
        <section className="flex items-center justify-between text-sm">
          <div>
            <input
              className="w-[11px] h-[11px]"
              type="radio"
              id="walk"
              name="Genre"
              value="徒歩"
              checked={selectedValue === "徒歩"}
              onChange={ChangeValue}
            />
            <label className="ml-1" htmlFor="walk">
              徒歩
            </label>
          </div>
          <div>
            <input
              className="w-[11px] h-[11px]"
              type="radio"
              id="bike"
              name="Genre"
              value="自転車"
              checked={selectedValue === "自転車"}
              onChange={ChangeValue}
            />
            <label className="ml-1" htmlFor="bike">
              自転車
            </label>
          </div>
          <div>
            <input
              className="w-[11px] h-[11px]"
              type="radio"
              id="train"
              name="Genre"
              value="電車"
              checked={selectedValue === "電車"}
              onChange={ChangeValue}
            />
            <label className="ml-1" htmlFor="train">
              電車
            </label>
          </div>
          <div>
            <input
              className="w-[11px] h-[11px]"
              type="radio"
              id="car"
              name="Genre"
              value="車"
              checked={selectedValue === "車"}
              onChange={ChangeValue}
            />
            <label className="ml-1" htmlFor="car">
              車
            </label>
          </div>
        </section>
      </form>
    </div>
  );
};

export default SelectGenre;
