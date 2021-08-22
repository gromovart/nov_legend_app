import * as THREE from 'three';
import React, { Suspense, useState } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { Html, Preload, OrbitControls } from '@react-three/drei';
import 'antd/dist/antd.css';
import style from './style.module.scss';

const store = [
  {
    name: 'Выйти',
    color: '#E42D04C9',
    position: [10, 0, -15],
    url: '/2294472375_24a3b8ef46_o.jpg',
    link: 1,
  },
  {
    name: 'Войти',
    color: '#E42D04C9',
    position: [15, 0, 0],
    url: '/Photosphere1.jpg',
    link: 0,
  },
];

function Dome({ name, position, texture, onClick }) {
  return (
    <group>
      <mesh>
        <sphereBufferGeometry args={[500, 60, 40]} />
        <meshBasicMaterial map={texture} side={THREE.BackSide} />
      </mesh>
      <mesh position={position}>
        <sphereGeometry args={[1.25, 32, 32]} />
        <meshBasicMaterial color="white" />
        <Html center>
          <button onClick={onClick} type="button" className={style.link}>
            {name}
          </button>
        </Html>
      </mesh>
    </group>
  );
}

function Portals() {
  const [which, set] = useState(0);
  const { link, ...props } = store[which];
  const maps = useLoader(THREE.TextureLoader, store.map((entry) => entry.url)); // prettier-ignore
  return <Dome onClick={() => set(link)} {...props} texture={maps[which]} />;
}

export const RenderComponent = ({ setVisible, visible }) => {
  if (!visible) return null;
  return (
    <div
      className={style.overlay}
      onClick={(event) => {
        event.stopPropagation();
        setVisible(false);
      }}
    >
      <div
        className={style.canvas__container}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <Canvas
          frameloop="demand"
          camera={{ position: [0, 0, 0.1] }}
          style={{ height: '100%' }}
        >
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableDamping
            dampingFactor={0.2}
            autoRotate={false}
            rotateSpeed={-0.5}
          />
          <Suspense fallback={null}>
            <Preload all />
            <Portals />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};
