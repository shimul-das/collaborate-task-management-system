import React from 'react';

const Slider = () => {
  return (
    <div className="carousel w-full h-[80vh] relative">
      <div id="slide1" className="carousel-item relative w-full">
        <img src="https://img.freepik.com/free-vector/flat-business-team-scrum-board-with-sticky-notes-teamwork-working-together-discussing-organizing-project-schedule-scheme-methodology-group-people-programming-with-tasks-tracker-office_88138-937.jpg" className="w-full" alt="Slide 1" />
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black opacity-50">
          <h2 className="text-2xl text-white font-semibold mb-2">Effortless Task Collaboration</h2>
          <p className="text-gray-300">Simplify teamwork and project management with our collaborative task system. Streamline communication, assign tasks, and achieve goals seamlessly.</p>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide4" className="btn btn-circle bg-green-600 text-white">❮</a> 
          <a href="#slide2" className="btn btn-circle bg-green-600 text-white">❯</a>
        </div>
      </div> 
      <div id="slide2" className="carousel-item relative w-full">
        <img src="https://img.freepik.com/free-vector/flat-business-team-scrum-board-with-sticky-notes-teamwork-working-together-discussing-organizing-project-schedule-scheme-methodology-group-people-programming-with-tasks-tracker-office_88138-937.jpg" className="w-full" alt="Slide 2" />
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black opacity-50">
          <h2 className="text-2xl text-white font-semibold mb-2">Real-time Project Tracking</h2>
          <p className="text-gray-300">Stay on top of your projects in real-time. Monitor progress, track milestones, and ensure everyone is aligned with our robust task management solution.</p>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle bg-green-600 text-white">❮</a> 
          <a href="#slide3" className="btn btn-circle bg-green-600 text-white">❯</a>
        </div>
      </div> 
      <div id="slide3" className="carousel-item relative w-full">
        <img src="https://img.freepik.com/free-photo/hands-holding-puzzle-business-problem-solving-concept_53876-129544.jpg" className="w-full" alt="Slide 3" />
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black opacity-50">
          <h2 className="text-2xl text-white font-semibold mb-2">Team Productivity Boost</h2>
          <p className="text-gray-300">Boost your team's productivity and efficiency. Our task management system empowers you to organize, prioritize, and accomplish tasks with ease.</p>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle bg-green-600 text-white">❮</a> 
          <a href="#slide4" className="btn btn-circle bg-green-600 text-white">❯</a>
        </div>
      </div> 
      <div id="slide4" className="carousel-item relative w-full">
        <img src="https://img.freepik.com/free-vector/creative-team-concept-illustration_114360-3894.jpg" className="w-full" alt="Slide 4" />
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black opacity-50">
          <h2 className="text-2xl text-white font-semibold mb-2">User-Friendly Interface</h2>
          <p className="text-gray-300">It Saves our Time</p>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide3" className="btn btn-circle bg-green-600 text-white">❮</a> 
          <a href="#slide1" className="btn btn-circle bg-green-600 text-white">❯</a>
        </div>
      </div>
    </div>
  );
};

export default Slider;
