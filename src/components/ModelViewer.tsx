"use client";

import { useEffect, useState } from 'react';
import { Canvas, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment, Stats } from '@react-three/drei';
import { TextureLoader } from 'three';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Cuboid as Cube3D, RotateCcw, ZoomIn, ZoomOut, Sun, Moon, Info } from 'lucide-react';
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
    obj.traverse((child: any) => {
      if (child.isMesh) {
        child.material.map = texture;
        child.material.needsUpdate = true;
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
  const [intensity, setIntensity] = useState(0.5);
  const [showStats, setShowStats] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const metadata = {
    format: "OBJ",
    source: "Local Files",
    model: "Capsule",
    materials: "MTL + Texture",
    vertices: "Loading...",
    faces: "Loading..."
  };
  const handleReset=()=>{
    const canvas=document.querySelector('canvas')
    if(!canvas)return
    const fiber=(canvas as any).__reactThreeFiber
    if(!fiber||!fiber.camera)return
    const camera=fiber.camera
    camera.position.set(0,0,5)
    camera.zoom=1
    camera.updateProjectionMatrix()
  }
  

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

        {error && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded">
            {error}
          </div>
        )}

        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="icon">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleReset}>
            <RotateCcw className="h-4 w-4" />
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
            <label className="text-sm font-medium mb-2 block">
              Light Intensity
            </label>
            <Slider
              value={[intensity]}
              onValueChange={([value]) => setIntensity(value)}
              max={1}
              step={0.1}
            />
          </div>

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