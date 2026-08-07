import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import SettlementField from "./SettlementField";

export default function WebGLScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <SettlementField />
      </Suspense>
    </Canvas>
  );
}
