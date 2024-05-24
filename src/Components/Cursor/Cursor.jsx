import React, { useEffect, useState } from "react";
import "../Cursor/Cursor.css";
import {motion} from 'framer-motion'

function Cursor() {
  const [LargeCircle, setLargeCircle] = useState({ x: 0, y: 0 });
  const [SmallCircle, setSmallCircle] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mousemove = (e) => {
        setLargeCircle({x:e.clientX,y:e.clientY})
        setSmallCircle({x:e.clientX,y:e.clientY})
    };
    window.addEventListener("mousemove", mousemove);
    return () => {
      window.removeEventListener("mousemove", mousemove);
    };
  }, []);

  return (
    <div>
      <motion.div animate={{x:LargeCircle.x-20 , y:LargeCircle.y-20,transition:{type:'spring',mass:3}}} className="large-circle"></motion.div>
      <motion.div animate={{x:SmallCircle.x-4 , y:SmallCircle.y-4,transition:{type:'spring',mass:2}}} className="small-circle"></motion.div>
    </div>
  );
}

export default Cursor;
