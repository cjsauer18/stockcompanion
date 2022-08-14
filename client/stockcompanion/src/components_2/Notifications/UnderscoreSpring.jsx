import { animated } from "react-spring";
import { useSpring } from "react-spring";

const UnderscoreSpring = () => {
  const styles = useSpring({
    loop: { reverse: true },
    form: { opacity: 1 },
    to: { opacity: 0 },
    delay: 1000,
  });

  return (
    <animated.div className="cursor" style={styles}>
      asdfl;kasdhf
    </animated.div>
  );
};

export default UnderscoreSpring;
