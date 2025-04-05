"use client";

import { useEffect, useState } from 'react';
import { Canvas, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment, Stats } from '@react-three/drei';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Cuboid as Cube3D, Sun, Moon, Info } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { MTLLoader, OBJLoader } from 'three-stdlib';

const MODEL_URL = '/models/capsule.obj';
const MTL_URL = '/models/capsule.mtl';
const TEXTURE_URL = '/models/capsule0.jpg';

function Model() {
  const materials = useLoader(MTLLoader, MTL_URL);
  materials.preload();
  
  const obj = useLoader(OBJLoader, MODEL_URL, (loader) => {
    loader.setMaterials(materials);
  });

  const texture = useLoader(TextureLoader, TEXTURE_URL);

  
useEffect(() => {
  obj.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];

      materials.forEach((mat) => {
        if (mat instanceof THREE.MeshStandardMaterial) {
          mat.map = texture;
          mat.needsUpdate = true;
        }
      });
    }
  });
}, [obj, texture]);

  return <primitive object={obj} scale={1} position={[0, 0, 0]} />;
}

function Scene() {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(0, 0, 5);
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Model />
      <OrbitControls enableDamping dampingFactor={0.05} />
      <Environment preset="sunset" />
    </>
  );
}

export default function ModelViewer() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const metadata = {
    format: "OBJ",
    source: "Local Files",
    model: "Capsule",
    materials: "MTL + Texture",
  
  };
 
  

  return (
    <div className="flex h-screen">
      <div className="flex-1 relative">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          className={isDarkMode ? "bg-gray-900" : "bg-gray-100"}
        >
          <Scene />
          {showStats && <Stats />}
        </Canvas>


        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          
        </div>
      </div>

      <Card className="w-80 p-4 rounded-none">
        <div className="flex items-center gap-2 mb-6">
          <Cube3D className="h-6 w-6" />
          <h2 className="text-xl font-semibold">3D Model Viewer</h2>
        </div>

        <div className="space-y-6">


          <div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-medium">Model Information</h3>
              <HoverCard>
                <HoverCardTrigger>
                  <Info className="h-4 w-4" />
                </HoverCardTrigger>
                <HoverCardContent>
                  <p>Technical details about the loaded 3D model</p>
                </HoverCardContent>
              </HoverCard>
            </div>
            
            <div className="space-y-2 text-sm">
              {Object.entries(metadata).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-gray-500">{key}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowStats(!showStats)}
            >
              {showStats ? "Hide Stats" : "Show Stats"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}