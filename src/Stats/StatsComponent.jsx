import React, { useState, useEffect } from "react";
import StatsPresenter from "./StatsPresenter";

export default function StatsComponent() {
  let statsPresenter = new StatsPresenter();
  const [stateViewModel, copyViewModelToStateViewModel] = useState("");
  const [counterViewModel, setBookCountViewModel] = useState("");

  useEffect(() => {
    statsPresenter.load((generatedViewModel) => {
      copyViewModelToStateViewModel(generatedViewModel);
    });

    statsPresenter.getBookCount((generatedViewModel) => {
      setBookCountViewModel(generatedViewModel);
    });
  }, []);

  return (
    <div>
      <h5>Book Count {counterViewModel}</h5>
      <h5>Last Added Book (ui)</h5>
      {stateViewModel}
    </div>
  );
}
