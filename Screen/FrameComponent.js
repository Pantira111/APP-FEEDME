import React, { useMemo } from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { FontSize, FontFamily, Color, Border, Padding } from "./GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const FrameComponent = ({
  framePressablePosition,
  framePressableTop,
  framePressableLeft,
  framePressableWidth,
  onFramePressablePress,
}) => {
  const framePressableStyle = useMemo(() => {
    return {
      ...getStyleValue("position", framePressablePosition),
      ...getStyleValue("top", framePressableTop),
      ...getStyleValue("left", framePressableLeft),
      ...getStyleValue("width", framePressableWidth),
    };
  }, [
    framePressablePosition,
    framePressableTop,
    framePressableLeft,
    framePressableWidth,
  ]);

  return (
    <Pressable
      style={[styles.parent, framePressableStyle]}
      onPress={onFramePressablePress}
    >
      <Text style={styles.text}>เข้าร่วม</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: FontSize.size_smi,
    fontFamily: FontFamily.interRegular,
    color: Color.colorTomato_100,
    textAlign: "left",
  },
  parent: {
    borderRadius: Border.br_4xl,
    backgroundColor: Color.colorMistyrose,
    width: 87,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Padding.p_2xs,
    paddingVertical: Padding.p_9xs,
  },
});

export default FrameComponent;