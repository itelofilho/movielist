import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { View, Animated } from "react-native";

import Indicator from "./indicator";
import styles from "./ui-activity-indicator.styles";

type Props = {
  color: string;
  count: number;
  size: number;
  // style?: object;
};

export default class UIActivityIndicator extends PureComponent<Props> {
  static defaultProps = {
    color: "rgb(0, 0, 0)",
    count: 12,
    size: 40
  };

  static propTypes = {
    ...Indicator.propTypes,

    color: PropTypes.string,
    size: PropTypes.number
  };

  renderComponent = ({
    index,
    count,
    progress
  }: {
    index: number;
    count: number;
    progress: Animated.AnimatedInterpolation;
  }) => {
    let { size, color: backgroundColor } = this.props;
    let angle = (index * 360) / count;

    let layerStyle = {
      transform: [
        {
          rotate: angle + "deg"
        }
      ]
    };

    let inputRange = Array.from(
      new Array(count + 1),
      (undefined, index) => index / count
    );

    let outputRange = Array.from(new Array(count), (undefined, index) =>
      Math.max(1.0 - index * (1 / (count - 1)), 0)
    );

    // console.log("58 outputRange.length:", outputRange.length);

    for (let j = 0; j < index; j++) {
      const _outputRange = outputRange.pop();
      if (_outputRange) {
        outputRange.unshift(_outputRange);
      }
    }

    // console.log("68 outputRange.length:", outputRange.length);
    const sliced = outputRange.length - inputRange.length;
    outputRange.unshift(...outputRange.slice(sliced));

    // console.log("72 outputRange.length:", outputRange.length);
    // console.log(inputRange);
    // console.log(outputRange);

    let barStyle = {
      width: size / 10,
      margin: size / 4,
      height: size / 10,
      borderRadius: size / 20,
      backgroundColor,
      opacity: progress.interpolate({ inputRange, outputRange })
    };

    return (
      <Animated.View style={[styles.layer, layerStyle]} {...{ key: index }}>
        <Animated.View style={barStyle} />
      </Animated.View>
    );
  };

  render() {
    // let { style, size: width, size: height, ...props } = this.props;
    let { size: width, size: height, ...props } = this.props;

    return (
      <View style={[styles.container]}>
        <Indicator
          // style={{ width, height }}
          renderComponent={this.renderComponent}
          {...props}
        />
      </View>
    );
  }
}
