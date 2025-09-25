// import { useState } from 'react'

const App = () => {

  const schedule = {
    title: "CS Courses for 2025-2026"
  };

  return (
    <div className="text-center">
      <header className="bg-[#282c34] min-h-screen flex flex-col items-center justify-center text-[calc(10px_+_2vmin)] text-white">
        <h1> {schedule.title} </h1>
      </header>
    </div>
  )
}

export default App;
