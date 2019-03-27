import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { Animated, Easing, Platform } from "react-native";
// import RN from "react-native/package";

// const [major, minor] = RN.version.split(".").map(item => Number(item));
// const hasLoopSupport = !major && minor >= 45;

type Props = {
  animationEasing?: (value: number) => number;
  animationDuration?: number;
  animating?: boolean;
  interaction?: boolean;
  count?: number;
  renderComponent: React.ReactNode;
};

type State = {
  animation: Animated.CompositeAnimation | null;
  progress: Animated.Value;
};

// Animated.CompositeAnimation

export default class Indicator extends PureComponent<Props, State> {
  static defaultProps = {
    animationEasing: Easing.linear,
    animationDuration: 1200,

    animating: true,
    interaction: true,

    count: 1
  };

  static propTypes = {
    animationEasing: PropTypes.func,
    animationDuration: PropTypes.number,

    animating: PropTypes.bool,
    interaction: PropTypes.bool,

    renderComponent: PropTypes.func,
    count: PropTypes.number
  };

  state = {
    progress: new Animated.Value(0),
    animation: null
  } as State;

  mounted = false;

  startAnimation = ({ finished = true }) => {
    // console.log({ param });
    // let finished = true;
    // if (param && param.finished) {
    //   finished = param.finished;
    // }
    let { progress } = this.state;
    let { interaction, animationEasing, animationDuration } = this.props;

    if (!this.mounted || false === finished) {
      return;
    }

    let animation = Animated.timing(progress, {
      duration: animationDuration,
      easing: animationEasing,
      useNativeDriver: true,
      isInteraction: interaction,
      toValue: 1
    });

    // if (hasLoopSupport) {
    // Animated.loop(animation).start();
    // } else {
    progress.setValue(0);
    animation.start(this.startAnimation);
    // }

    this.setState({ animation });
  };

  stopAnimation = () => {
    let { animation } = this.state;

    if (animation === null) {
      return;
    }

    animation.stop();

    this.setState({ animation: null });
  };

  componentDidMount = () => {
    let { animating } = this.props;

    this.mounted = true;
    console.log({ animating });
    if (animating) {
      this.startAnimation({});
    }
  };

  componentWillUnmount = () => {
    this.mounted = false;
  };

  componentWillReceiveProps = (props: Props) => {
    let { animating } = this.props;
    console.log({ animating });
    if (animating !== props.animating) {
      if (animating) {
        this.stopAnimation();
      } else {
        this.startAnimation({});
      }
    }
  };

  renderComponent = (_: undefined, index: number) => {
    let { progress } = this.state;
    let { renderComponent: renderParentComponent, count } = this.props;

    if ("function" === typeof renderParentComponent) {
      return renderParentComponent({ index, count, progress });
    } else {
      return null;
    }
  };

  render() {
    let { count, animationDuration, ...props } = this.props;

    return (
      <Animated.View style={{ animationDuration }} {...props}>
        {Array.from(new Array(count), this.renderComponent)}
      </Animated.View>
    );
  }
}
