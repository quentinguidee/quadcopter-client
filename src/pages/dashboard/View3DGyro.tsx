import React, { useEffect, useState } from "react";

import { Canvas, useFrame } from "@react-three/fiber";
import Panel from "../../components/panel/Panel";
import { Clock, Euler, MathUtils, Mesh } from "three";
import { animated, config, useSpring } from "@react-spring/three";
import { Coordinate } from "./Dashboard";

type View3DGyroProps = {
    angle: Coordinate;
};

export default function View3DGyro(props: View3DGyroProps) {
    let { x, y, z } = props.angle;

    const { rotationX, rotationY, rotationZ } = useSpring({
        rotationX: MathUtils.degToRad(x),
        rotationY: MathUtils.degToRad(z),
        rotationZ: MathUtils.degToRad(y),
        config: config.default,
    });

    return (
        <Panel>
            <Canvas>
                <ambientLight color={0xffffff} />
                <directionalLight position={[0, 0, 5]} intensity={0.5} />
                <animated.mesh
                    rotation-x={rotationX}
                    rotation-y={rotationY}
                    rotation-z={rotationZ}
                >
                    <boxGeometry args={[4, 0.4, 4]} />
                    <meshStandardMaterial color="#424242" />
                </animated.mesh>
            </Canvas>
        </Panel>
    );
}
